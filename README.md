# ÉTOI – Plateforme de mise en relation

## 📌 Présentation

ÉTOI est une plateforme web permettant de mettre en relation des établissements scolaires et des intervenants bénévoles.

Le système permet :
- la création et gestion de demandes d’intervention
- la mise en relation entre écoles et intervenants
- le suivi des échanges via un dashboard dédié

---

## 🧱 Stack technique

- **Framework :** Next.js (App Router)
- **Langage :** TypeScript
- **Backend :** API Routes Next.js
- **Base de données :** PostgreSQL (Neon)
- **ORM :** Prisma
- **Authentification :** NextAuth
- **Styling :** Tailwind CSS
- **Déploiement :** Vercel / Netlify compatible

---

## 🚀 Installation du projet

### 1. Cloner le repository

```bash
git clone https://github.com/ORG/REPO.git
cd REPO
```

### 2. Installer les dépendances

`npm install`

### 3. Configuration des variables d'environnement

Créer un fichier `.env.local` à la racine :
```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

### 4. Base de données (Prisma)

Générer le client Prisma :
`npx prisma generate`
Appliquer les migrations :
`npx prisma migrate dev`

### 5. Lancer l'application

`npm run dev`
Application accessible sur : 
`http://localhost:3000`
