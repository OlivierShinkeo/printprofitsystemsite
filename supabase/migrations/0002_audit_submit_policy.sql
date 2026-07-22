-- Phase 4 — soumission et verrouillage.
--
-- `audits_update_own_draft`'s `with check` requires the resulting row's
-- status to still be invited/in_progress, so a prospect's own session
-- cannot transition their own audit to `submitted` — the update would be
-- silently rejected by RLS. This adds a second, narrower policy just for
-- that one-way transition; everything else about editing stays governed
-- by the existing draft-only policy.
--
-- À exécuter dans l'éditeur SQL Supabase, en plus de 0001.

create policy "audits_prospect_submit" on public.audits
  for update using (
    prospect_profile_id = auth.uid() and status in ('invited', 'in_progress')
  ) with check (
    prospect_profile_id = auth.uid() and status = 'submitted'
  );
