# Harmoney App - Frontend

Application React avec TypeScript suivant les principes de l'Atomic Design et des standards de code stricts.

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Développement
npm run dev

# Build de production
npm run build
```

## 📋 Scripts disponibles

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Build de production (avec vérification de types)
- `npm run preview` - Prévisualiser le build
- `npm run lint` - Vérifier le code avec ESLint
- `npm run lint:fix` - Corriger automatiquement les erreurs ESLint
- `npm run format` - Formater le code avec Prettier
- `npm run format:check` - Vérifier le formatage
- `npm run type-check` - Vérifier les types TypeScript
- `npm run validate` - Exécuter toutes les vérifications

## 🏗️ Structure du projet

```
src/
├── components/
│   ├── atoms/          # Composants atomiques (Button, Input, etc.)
│   ├── molecules/      # Combinaisons d'atomes
│   ├── organisms/      # Sections complexes
│   └── templates/      # Mises en page
├── pages/              # Pages de l'application
└── ...
```

## 🎯 Standards de code

Ce projet suit des règles strictes pour garantir un code de qualité :

- ✅ **TypeScript strict** : Typage fort et explicite
- ✅ **ESLint** : Règles strictes pour React et TypeScript
- ✅ **Prettier** : Formatage automatique
- ✅ **Husky** : Hooks Git pour la qualité du code
- ✅ **Atomic Design** : Architecture modulaire


## 🛠️ Technologies

- React 19
- TypeScript 5.9
- Vite 7
- ESLint
- Prettier
- Husky

