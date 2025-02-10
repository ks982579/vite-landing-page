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

- [WebDevSimplified](https://blog.webdevsimplified.com/2022-07/react-folder-structure/)
- [Medium by Kthamodaran](https://medium.com/@kthamodaran/react-8-best-practices-folder-structure-5dbda48a69e)

## Imports into Project

- Material UI = `@mui/material` `@emotion/styled` `@emotion/react`

### Material UI

- [ReactGo.com](https://reactgo.com/material-ui-react-tutorial/);
- [MUI.com/learn](https://mui.com/material-ui/getting-started/learn/);
- [Youtube | FrontStart](https://youtu.be/FB-sKY63AWo?si=cSnLj_0cTrB0sdk4)
- [Zenoo | MUI Theme Creator](https://zenoo.github.io/mui-theme-creator/)
- [Youtuve | FrontStart Ultimate Guide](https://youtu.be/HsdjivqQ7BA?si=bR3_ODk8cM2_hzOf)
- [Material Design Foundation | m3.material.io](https://m3.material.io/foundations)

### Axios

- [GeeksForGeeks | Axios](https://www.geeksforgeeks.org/axios-in-react-a-guide-for-beginners/)
- [Axios-HTTP.com | docs](https://axios-http.com/docs/intro)

### Cookies

Firstly, I ruled out session storage because the logged-in state is deleted after closing the page.
I spent time considering the trade-offs between using localstorage and cookies.
Localstorage can be accessed by Javascript and is vulnerable to XSS.
Given the token comes with an expiry time, I opted for using Cookies.
Setting cookies in the browser is also vulnerable to XSS,
but given practices of setting them on the server side and with flags like 'HTTPOnly',
and 'SameSite=Strict'.

- [SameSite Cookies Explained | Web.dev](https://web.dev/articles/samesite-cookies-explained)
- [JS Cookie](https://www.npmjs.com/package/js-cookie)

### Context Provider

I considered Redux as the provider;
however, because the context is not that complicated,
I am settling for the built-in Context Provider.

- [React Context TypeScript | LogRocket.com](https://blog.logrocket.com/how-to-use-react-context-typescript/)

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
