# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Controls

```
bun run dev
```

Navigate to `https://localhost:5173`.

## Folder Layout

Per "React Application Architecture for Production" pp. 28-32:

```yaml
src:
  - components: "shared components"
  - config: "application configuration"
  - features: "featured-based mods - looks like recursion"
  - layouts: "page layouts"
  - lib: "configs for different libraries"
  - pages: "pages of application"
  - providers: "application providers"
  - stores: "global state stores"
  - testing: "rest-related mocks and such"
  - types: "TS type definitions"
  - utils: "Contains shared utility functions"
```

## Imports into Project

- Material UI = `@mui/material` `@emotion/styled` `@emotion/react`

### Material UI

- [ReactGo.com](https://reactgo.com/material-ui-react-tutorial/);
- [MUI.com/learn](https://mui.com/material-ui/getting-started/learn/);

### Axios

- [GeeksForGeeks | Axios](https://www.geeksforgeeks.org/axios-in-react-a-guide-for-beginners/)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
