# Print Profit System™ — site vitrine

Site vitrine premium pour **Print Profit System™**, cabinet de conseil spécialisé dans la
rentabilité des imprimeries (10 à 100 salariés). Implémentation du design validé dans Claude
Design (`../Site vitrine.dc.html` et `../chats/chat1.md`) en Next.js 15 / TypeScript / Tailwind CSS.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** — thème configuré dans `src/app/globals.css` (`@theme`) à partir des tokens
  du design system (`../project/_ds/.../tokens/*.css`) : couleurs navy/or/crème, polices
  Manrope + Inter, tailles de texte, tracking, line-height, radius, ombres, breakpoints 580/960px.
- **Nodemailer** pour l'envoi d'email du formulaire de contact (SMTP)
- Webhook sortant (Make / n8n) pour le formulaire de contact

## Structure du projet

```
site/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx           # Layout racine : fonts, metadata, Nav + Footer, JSON-LD
│  │  ├─ page.tsx             # Page d'accueil — assemble les 11 sections
│  │  ├─ globals.css          # Tokens du design system → thème Tailwind
│  │  ├─ sitemap.ts           # /sitemap.xml
│  │  ├─ robots.ts            # /robots.txt
│  │  ├─ icon.png             # Favicon (monogramme de marque)
│  │  ├─ not-found.tsx        # Page 404
│  │  ├─ mentions-legales/    # Page légale (placeholders [À COMPLÉTER])
│  │  ├─ confidentialite/     # Politique de confidentialité (placeholders)
│  │  └─ api/contact/route.ts # Endpoint POST : email (SMTP) + webhook
│  ├─ components/
│  │  ├─ nav.tsx              # Nav fixe, transparente→opaque au scroll, menu mobile
│  │  ├─ footer.tsx
│  │  ├─ faq-accordion.tsx    # Accordéon FAQ (client)
│  │  ├─ contact-form.tsx     # Formulaire de contact (validation + états)
│  │  ├─ ui/
│  │  │  ├─ button.tsx        # 5 variantes × 3 tailles (mirroring le DS Button.jsx)
│  │  │  ├─ section-label.tsx # Eyebrow label (ligne dorée + texte uppercase)
│  │  │  └─ fade-in.tsx       # Animation fade-up au scroll (IntersectionObserver)
│  │  └─ sections/            # Une section = un fichier (Hero, Reconnais, Philosophie…)
│  └─ lib/
│     ├─ content.ts           # Tous les textes (copié du .dc.html validé, ne pas reformuler)
│     ├─ site-config.ts       # SITE_URL, CALENDLY_URL, JSON-LD Organization
│     ├─ contact-schema.ts    # Validation partagée client/serveur du formulaire
│     └─ cn.ts                # Petit helper de concaténation de classes
└─ public/images/             # Logos + portraits copiés depuis le bundle de design
```

## Installation

```bash
npm install
cp .env.example .env.local   # puis renseigner les variables (voir ci-dessous)
npm run dev                  # http://localhost:3000
```

## Variables d'environnement

Voir `.env.example` pour la liste complète. Résumé :

| Variable | Rôle | Obligatoire ? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (sitemap, OpenGraph, JSON-LD) | Recommandé en prod |
| `NEXT_PUBLIC_CALENDLY_URL` | Lien de prise de rendez-vous utilisé par tous les CTA "Demander un rappel" | Recommandé — remplace le placeholder `calendly.com/printprofitsystem/30min` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | Envoi d'email du formulaire de contact via Nodemailer | Optionnel — si absent, l'email est simplement ignoré (pas d'erreur pour le visiteur) |
| `CONTACT_EMAIL_TO` | Adresse qui reçoit les demandes de contact | Optionnel (défaut : `SMTP_USER`) |
| `CONTACT_EMAIL_FROM` | Adresse d'expédition des emails | Optionnel (défaut : `SMTP_USER`) |
| `WEBHOOK_URL` | URL de webhook Make/n8n qui reçoit chaque soumission en JSON | Optionnel — si absent, aucun appel n'est fait |

Le formulaire de contact fonctionne dès maintenant (validation, état de succès/erreur) même sans
SMTP/webhook configurés : dans ce cas, la soumission est acceptée mais rien n'est expédié — utile
pour développer/démontrer avant d'avoir les identifiants définitifs.

## Formulaire de contact

- Validation côté client (React) **et** côté serveur (`src/lib/contact-schema.ts`, mêmes règles,
  y compris des longueurs maximales par champ), messages d'erreur par champ, état de succès dédié.
- Honeypot anti-spam (`website`) — champ invisible, non annoncé aux lecteurs d'écran.
- Limitation de débit (`src/lib/rate-limit.ts`) : 5 soumissions / 10 min / IP, réponse `429` au-delà.
  C'est une protection en mémoire, best-effort (par instance serverless) — pour une garantie plus
  forte en production, ajouter un limiteur au niveau plateforme (Vercel Firewall, Cloudflare,
  Upstash Ratelimit…).
- `POST /api/contact` envoie en parallèle : un email (Nodemailer/SMTP) et un appel webhook
  (Make/n8n). La soumission n'est considérée en échec que si **au moins un canal configuré**
  échoue sans qu'aucun autre canal configuré n'ait réussi ; si aucun canal n'est configuré dans
  l'environnement, la soumission est acceptée sans blocage (cf. ci-dessus).
- Les valeurs saisies sont nettoyées (retours à la ligne supprimés) avant d'être injectées dans les
  en-têtes de l'email (sujet, etc.) pour empêcher toute injection d'en-tête.

## Sécurité

- En-têtes HTTP (`next.config.ts`) : `X-Content-Type-Options`, `X-Frame-Options: DENY`,
  `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`.
- Tous les liens externes (`Button` avec `href` `http(s)://…`) s'ouvrent avec
  `target="_blank" rel="noopener noreferrer"` pour éviter le reverse tabnabbing.
- `npm audit` : 0 vulnérabilité (voir l'entrée `overrides.postcss` dans `package.json`, qui force
  la version de PostCSS embarquée par Next.js à une version corrigée).

## Design system → Tailwind

Toutes les valeurs (couleurs, typographies, espacements, rayons, ombres, breakpoints) viennent du
bundle de design (`../project/_ds/.../tokens/*.css`) et sont portées 1:1 dans
`src/app/globals.css` via `@theme`. Ne pas modifier ces valeurs sans revérifier le design source —
c'est la seule référence pixel-perfect du site.

Deux breakpoints personnalisés remplacent les breakpoints par défaut de Tailwind pour coller
exactement aux règles du prototype : `sm` = 580px, `lg` = 960px.

## SEO & performance

- Metadata (title/description/OpenGraph/Twitter), canonical par page, `metadataBase`.
- JSON-LD `ProfessionalService` dans le layout racine.
- `sitemap.ts` / `robots.ts` générés dynamiquement.
- Favicon = monogramme de marque (`src/app/icon.png`).
- Images (`next/image`) : formats AVIF/WebP, lazy-loading natif hors LCP, tailles explicites.
- Polices (`next/font/google`) auto-hébergées, `display: swap`.

## Déploiement (Vercel)

1. Importer le repo sur [vercel.com/new](https://vercel.com/new).
2. Renseigner les variables d'environnement du tableau ci-dessus dans les réglages du projet
   Vercel (Production + Preview).
3. Le build (`next build`) et le déploiement sont automatiques à chaque push.

## Commandes

```bash
npm run dev     # serveur de développement
npm run build   # build de production
npm run start   # sert le build de production
npm run lint    # ESLint
```

## Pages à compléter avant mise en production

- `src/app/mentions-legales/page.tsx` et `src/app/confidentialite/page.tsx` contiennent des
  champs `[À COMPLÉTER]` (SIRET, adresse, hébergeur, durée de conservation des données…) à
  remplacer par les informations réelles de l'entreprise.
- `NEXT_PUBLIC_CALENDLY_URL` : remplacer le lien Calendly placeholder par le vrai lien.
