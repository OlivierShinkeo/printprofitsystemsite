-- Print Profit System™ — Audit de faisabilité
-- Schéma initial : rôles, audits, réponses, historique, notes admin,
-- recommandation interne, réglages globaux. RLS activée sur toutes
-- les tables contenant des données de prospect ou d'analyse interne.
--
-- À exécuter une fois dans l'éditeur SQL du projet Supabase (ou via
-- `supabase db push` si vous utilisez la CLI Supabase).

-- ── Types ────────────────────────────────────────────────────────
create type public.app_role as enum ('admin', 'prospect');

create type public.audit_status as enum (
  'invited',
  'in_progress',
  'submitted',
  'under_review',
  'additional_information_requested',
  'approved',
  'approved_with_conditions',
  'rejected',
  'archived'
);

create type public.audit_recommendation as enum (
  'recommended',
  'conditional',
  'not_recommended'
);

-- ── profiles ─────────────────────────────────────────────────────
-- Un profil par utilisateur Supabase Auth (admin ou prospect).
create table public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  role       public.app_role not null default 'prospect',
  first_name text not null,
  last_name  text not null,
  email      text not null,
  created_at timestamptz not null default now()
);

-- ── audits ───────────────────────────────────────────────────────
create table public.audits (
  id                    uuid primary key default gen_random_uuid(),
  prospect_profile_id   uuid not null references public.profiles (id) on delete cascade,
  created_by_admin_id   uuid references public.profiles (id) on delete set null,
  company_name          text not null,
  country               text not null,
  contact_first_name    text not null,
  contact_last_name     text not null,
  contact_email         text not null,
  status                public.audit_status not null default 'invited',
  invited_at            timestamptz not null default now(),
  submitted_at          timestamptz,
  last_saved_at         timestamptz,
  progress_percent      int not null default 0 check (progress_percent between 0 and 100),
  locked                boolean not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  deleted_at            timestamptz
);

create index audits_prospect_profile_id_idx on public.audits (prospect_profile_id);
create index audits_status_idx on public.audits (status);

-- ── audit_answers ────────────────────────────────────────────────
-- Une ligne par (audit, section) pour les 13 étapes à instance unique
-- (entreprise, dirigeant, activités, flux commercial, prépresse,
-- production, qualité, pilotage, équipe, difficultés-résumé,
-- objectifs, accompagnement, validation). Voir §3 de l'architecture
-- validée pour la justification du choix JSONB par section plutôt
-- qu'une colonne par champ ou un unique blob JSON global.
create table public.audit_answers (
  id           uuid primary key default gen_random_uuid(),
  audit_id     uuid not null references public.audits (id) on delete cascade,
  section_slug text not null,
  data         jsonb not null default '{}'::jsonb,
  updated_at   timestamptz not null default now(),
  unique (audit_id, section_slug)
);

create index audit_answers_audit_id_idx on public.audit_answers (audit_id);

-- ── audit_machines (étape 4 — parc machines, table dynamique) ─────
create table public.audit_machines (
  id                uuid primary key default gen_random_uuid(),
  audit_id          uuid not null references public.audits (id) on delete cascade,
  position          int not null default 0,
  type              text,
  brand             text,
  model             text,
  year              int,
  technology        text,
  format            text,
  condition         text,
  usage_frequency   text,
  monthly_volume    text,
  main_use          text,
  main_difficulty   text,
  maintenance_type  text,
  is_critical       boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index audit_machines_audit_id_idx on public.audit_machines (audit_id);

-- ── audit_difficulties (étape 11 — 5 difficultés principales) ─────
create table public.audit_difficulties (
  id                  uuid primary key default gen_random_uuid(),
  audit_id            uuid not null references public.audits (id) on delete cascade,
  rank                int not null check (rank between 1 and 5),
  description         text,
  frequency           text,
  age                 text,
  operational_impact  text,
  financial_impact    text,
  client_impact       text,
  urgency             text,
  actions_tried        text,
  result              text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (audit_id, rank)
);

create index audit_difficulties_audit_id_idx on public.audit_difficulties (audit_id);

-- ── audit_status_history ──────────────────────────────────────────
create table public.audit_status_history (
  id          uuid primary key default gen_random_uuid(),
  audit_id    uuid not null references public.audits (id) on delete cascade,
  from_status public.audit_status,
  to_status   public.audit_status not null,
  changed_by  uuid references public.profiles (id) on delete set null,
  note        text,
  changed_at  timestamptz not null default now()
);

create index audit_status_history_audit_id_idx on public.audit_status_history (audit_id);

-- ── admin_notes ────────────────────────────────────────────────────
-- Notes internes libres, distinctes de l'analyse structurée
-- (audit_recommendations). Jamais visibles par le prospect.
create table public.admin_notes (
  id         uuid primary key default gen_random_uuid(),
  audit_id   uuid not null references public.audits (id) on delete cascade,
  admin_id   uuid references public.profiles (id) on delete set null,
  note       text not null,
  created_at timestamptz not null default now()
);

create index admin_notes_audit_id_idx on public.admin_notes (audit_id);

-- ── audit_recommendations ─────────────────────────────────────────
-- Analyse interne structurée. Jamais visible par le prospect.
create table public.audit_recommendations (
  id                  uuid primary key default gen_random_uuid(),
  audit_id            uuid not null unique references public.audits (id) on delete cascade,
  maturity_level      text,
  organization_level  text,
  growth_potential    text,
  compatibility       text,
  main_needs          text,
  risks               text,
  recommendation      public.audit_recommendation,
  comment             text,
  updated_by          uuid references public.profiles (id) on delete set null,
  updated_at          timestamptz not null default now()
);

-- ── app_settings (une seule ligne — réglages globaux) ─────────────
create table public.app_settings (
  id                             boolean primary key default true check (id),
  chiffre_affaires_obligatoire   boolean not null default false,
  updated_at                     timestamptz not null default now()
);

insert into public.app_settings (id) values (true);

-- ── updated_at automatique ────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger audits_set_updated_at
  before update on public.audits
  for each row execute function public.set_updated_at();

create trigger audit_answers_set_updated_at
  before update on public.audit_answers
  for each row execute function public.set_updated_at();

create trigger audit_machines_set_updated_at
  before update on public.audit_machines
  for each row execute function public.set_updated_at();

create trigger audit_difficulties_set_updated_at
  before update on public.audit_difficulties
  for each row execute function public.set_updated_at();

create trigger audit_recommendations_set_updated_at
  before update on public.audit_recommendations
  for each row execute function public.set_updated_at();

create trigger app_settings_set_updated_at
  before update on public.app_settings
  for each row execute function public.set_updated_at();

-- ── is_admin() ─────────────────────────────────────────────────────
-- `security definer` : contourne la RLS de `profiles` pour éviter une
-- récursion (les policies de `profiles` appellent elles-mêmes cette
-- fonction). C'est la seule fonction du schéma à avoir ce privilège.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ── Row Level Security ─────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.audits enable row level security;
alter table public.audit_answers enable row level security;
alter table public.audit_machines enable row level security;
alter table public.audit_difficulties enable row level security;
alter table public.audit_status_history enable row level security;
alter table public.admin_notes enable row level security;
alter table public.audit_recommendations enable row level security;
alter table public.app_settings enable row level security;

-- profiles : chacun lit son propre profil ; admin lit/écrit tout.
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());

create policy "profiles_select_admin" on public.profiles
  for select using (public.is_admin());

create policy "profiles_admin_write" on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- audits : prospect voit/modifie uniquement le sien, et seulement
-- tant qu'il est en brouillon. Admin : accès total.
create policy "audits_select_own_or_admin" on public.audits
  for select using (prospect_profile_id = auth.uid() or public.is_admin());

create policy "audits_update_own_draft" on public.audits
  for update using (
    prospect_profile_id = auth.uid() and status in ('invited', 'in_progress')
  ) with check (
    prospect_profile_id = auth.uid() and status in ('invited', 'in_progress')
  );

create policy "audits_admin_all" on public.audits
  for all using (public.is_admin()) with check (public.is_admin());

-- audit_answers : même règle de propriété/brouillon, via jointure sur audits.
create policy "audit_answers_select" on public.audit_answers
  for select using (
    exists (
      select 1 from public.audits a
      where a.id = audit_id and (a.prospect_profile_id = auth.uid() or public.is_admin())
    )
  );

create policy "audit_answers_insert_own_draft" on public.audit_answers
  for insert with check (
    exists (
      select 1 from public.audits a
      where a.id = audit_id
        and a.prospect_profile_id = auth.uid()
        and a.status in ('invited', 'in_progress')
    )
  );

create policy "audit_answers_update_own_draft" on public.audit_answers
  for update using (
    exists (
      select 1 from public.audits a
      where a.id = audit_id
        and a.prospect_profile_id = auth.uid()
        and a.status in ('invited', 'in_progress')
    )
  );

create policy "audit_answers_admin_all" on public.audit_answers
  for all using (public.is_admin()) with check (public.is_admin());

-- audit_machines : même pattern que audit_answers.
create policy "audit_machines_select" on public.audit_machines
  for select using (
    exists (
      select 1 from public.audits a
      where a.id = audit_id and (a.prospect_profile_id = auth.uid() or public.is_admin())
    )
  );

create policy "audit_machines_write_own_draft" on public.audit_machines
  for insert with check (
    exists (
      select 1 from public.audits a
      where a.id = audit_id
        and a.prospect_profile_id = auth.uid()
        and a.status in ('invited', 'in_progress')
    )
  );

create policy "audit_machines_update_own_draft" on public.audit_machines
  for update using (
    exists (
      select 1 from public.audits a
      where a.id = audit_id
        and a.prospect_profile_id = auth.uid()
        and a.status in ('invited', 'in_progress')
    )
  );

create policy "audit_machines_delete_own_draft" on public.audit_machines
  for delete using (
    exists (
      select 1 from public.audits a
      where a.id = audit_id
        and a.prospect_profile_id = auth.uid()
        and a.status in ('invited', 'in_progress')
    )
  );

create policy "audit_machines_admin_all" on public.audit_machines
  for all using (public.is_admin()) with check (public.is_admin());

-- audit_difficulties : même pattern.
create policy "audit_difficulties_select" on public.audit_difficulties
  for select using (
    exists (
      select 1 from public.audits a
      where a.id = audit_id and (a.prospect_profile_id = auth.uid() or public.is_admin())
    )
  );

create policy "audit_difficulties_write_own_draft" on public.audit_difficulties
  for insert with check (
    exists (
      select 1 from public.audits a
      where a.id = audit_id
        and a.prospect_profile_id = auth.uid()
        and a.status in ('invited', 'in_progress')
    )
  );

create policy "audit_difficulties_update_own_draft" on public.audit_difficulties
  for update using (
    exists (
      select 1 from public.audits a
      where a.id = audit_id
        and a.prospect_profile_id = auth.uid()
        and a.status in ('invited', 'in_progress')
    )
  );

create policy "audit_difficulties_delete_own_draft" on public.audit_difficulties
  for delete using (
    exists (
      select 1 from public.audits a
      where a.id = audit_id
        and a.prospect_profile_id = auth.uid()
        and a.status in ('invited', 'in_progress')
    )
  );

create policy "audit_difficulties_admin_all" on public.audit_difficulties
  for all using (public.is_admin()) with check (public.is_admin());

-- audit_status_history, admin_notes, audit_recommendations :
-- réservés à l'administrateur, jamais accessibles au prospect.
create policy "status_history_admin_only" on public.audit_status_history
  for all using (public.is_admin()) with check (public.is_admin());

create policy "admin_notes_admin_only" on public.admin_notes
  for all using (public.is_admin()) with check (public.is_admin());

create policy "audit_recommendations_admin_only" on public.audit_recommendations
  for all using (public.is_admin()) with check (public.is_admin());

-- app_settings : lisible par tout utilisateur authentifié (le
-- questionnaire a besoin de savoir si le CA est obligatoire),
-- modifiable uniquement par l'admin.
create policy "app_settings_read_authenticated" on public.app_settings
  for select using (auth.role() = 'authenticated');

create policy "app_settings_admin_write" on public.app_settings
  for update using (public.is_admin()) with check (public.is_admin());
