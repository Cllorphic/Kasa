# Kasa - Frontend

Application Next.js pour la plateforme Kasa de location d'appartements entre particuliers.

🔗 **Site en ligne** : [https://kasa-git-main-cllorphics-projects.vercel.app/](https://kasa-git-main-cllorphics-projects.vercel.app/)

## Prérequis

- Node.js 18+
- npm
- Le backend Kasa disponible sur [ce repo](https://github.com/Cllorphic/dev-react-P12)

## Installation

```bash
git clone https://github.com/Cllorphic/Kasa.git
cd Kasa
npm install
```

## Lancement du projet

Lancez d'abord le backend sur le port 3001 :

```bash
cd chemin/vers/backend
PORT=3001 npm start
```

Puis lancez le frontend :

```bash
npm run dev
```

Le site est accessible sur `http://localhost:3000`.

## Tests

```bash
npm test
```

14 tests unitaires (8 pour le carousel, 6 pour les favoris).

## Description du projet

Kasa est une plateforme de location d'appartements entre particuliers. Ce projet est le frontend développé en Next.js 16 avec Tailwind CSS, connecté à une API Express.js.

### Fonctionnalités

- Affichage des logements sous forme de cartes interactives
- Carousel d'images navigable au clavier avec animation
- Système de favoris persistant (Context + localStorage)
- Authentification JWT (connexion / inscription avec rôles client et owner)
- Ajout de propriétés avec upload d'images (réservé aux owners)
- Messagerie entre utilisateurs et hôtes
- Sections repliables (collapses) animées sur la page de détail
- Page à propos
- Page 404 personnalisée
- Sitemap dynamique et microdonnées schema.org pour le SEO

### Architecture

```
src/
├── app/           # Pages et layouts (App Router)
├── components/    # Composants réutilisables
├── context/       # Contextes React (Auth, Favoris)
├── services/      # Services API
├── lib/           # Utilitaires
└── proxy.js       # Protection des routes
```

### Technologies

- Next.js 16
- React 19
- Tailwind CSS
- JWT pour l'authentification
- Jest + Testing Library pour les tests
- Vercel (frontend) et Render (backend) pour le déploiement

### Notes

- Le backend est hébergé sur Render (plan gratuit). La base de données SQLite et les images uploadées sont réinitialisées périodiquement.
- Pour tester toutes les fonctionnalités, il est recommandé de lancer le projet en local.
- Les utilisateurs sont stockés dans la table `users` de la base SQLite du backend, créés via l'API `/auth/register`.