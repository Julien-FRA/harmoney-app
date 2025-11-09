# Guide de développement - Harmoney App Frontend

## Standards de code

Ce projet suit des règles strictes de développement pour garantir un code de qualité, maintenable et robuste.

### TypeScript

- **Mode strict activé** : Toutes les vérifications de type sont activées
- **Typage explicite requis** : Les types de retour de fonctions doivent être explicites
- **Pas de `any`** : L'utilisation de `any` est interdite
- **Pas de `non-null assertion`** : L'opérateur `!` est interdit
- **Null safety** : Utilisation de `noUncheckedIndexedAccess` pour la sécurité des tableaux

### ESLint

- **Règles strictes** : Configuration avec règles maximales pour TypeScript et React
- **Accessibilité** : Vérification automatique avec `jsx-a11y`
- **Hooks React** : Vérification des règles des hooks et des dépendances
- **Imports** : Organisation automatique et vérification des imports

### Prettier

- **Formatage automatique** : Code formaté automatiquement selon les standards
- **Single quotes** : Utilisation de guillemets simples
- **Semicolons** : Pas de point-virgule
- **Trailing commas** : Virgules finales activées

## Scripts disponibles

### Développement

```bash
npm run dev              # Démarrer le serveur de développement
npm run type-check       # Vérifier les types TypeScript
npm run type-check:watch # Vérifier les types en mode watch
```

### Qualité de code

```bash
npm run lint             # Vérifier le code avec ESLint
npm run lint:fix         # Corriger automatiquement les erreurs ESLint
npm run format           # Formater le code avec Prettier
npm run format:check     # Vérifier le formatage sans modifier
npm run validate         # Exécuter toutes les vérifications (type-check + lint + format)
```

### Build

```bash
npm run build            # Build de production (inclut type-check)
npm run preview          # Prévisualiser le build de production
```

## Hooks Git (Husky)

Des hooks Git sont configurés pour garantir la qualité du code :

- **pre-commit** : Exécute `lint-staged` pour vérifier et formater les fichiers modifiés
- **pre-push** : Exécute `type-check` et `lint` avant le push

## Structure du projet (Atomic Design)

```
src/
├── components/
│   ├── atoms/          # Composants atomiques (Button, Input, etc.)
│   ├── molecules/      # Combinaisons d'atomes (SearchBar, Card, etc.)
│   ├── organisms/      # Sections complexes (Header, Form, etc.)
│   └── templates/      # Mises en page (PageLayout, etc.)
├── pages/              # Pages de l'application
└── ...
```

## Règles importantes

### 1. Typage fort

- Toujours typer les props des composants
- Utiliser `interface` plutôt que `type` pour les objets
- Typer les valeurs de retour des fonctions
- Éviter `any`, utiliser `unknown` si nécessaire

### 2. Composants React

- Utiliser des composants fonctionnels uniquement
- Utiliser les hooks React correctement
- Props en lecture seule (pas de mutation)
- Nommer les composants en PascalCase

### 3. Imports

- Imports organisés automatiquement
- Utiliser `type` pour les imports de types uniquement
- Imports groupés : builtin → external → internal → parent → sibling

### 4. Gestion des erreurs

- Toujours gérer les erreurs dans les Promises
- Utiliser `try/catch` pour les opérations asynchrones
- Typer les erreurs correctement

### 5. Performance

- Utiliser `React.memo` pour les composants coûteux
- Utiliser `useMemo` et `useCallback` judicieusement
- Éviter les re-renders inutiles

## Exemple de composant

```tsx
import type { FC } from 'react'

interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export const Button: FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <button
      className={`button button--${variant}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {label}
    </button>
  )
}
```

## IDE Configuration

### VSCode

Ajoutez dans `.vscode/settings.json` :

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## Extensions recommandées

- ESLint
- Prettier
- TypeScript Vue Plugin (si vous utilisez Vue)
- Error Lens (pour voir les erreurs inline)

