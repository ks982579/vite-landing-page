# Landing Page Project

This is a React and Typescript project.
The goal was to design a landing page to log into a travel account and view your details.
Details include Trip and Passenger information.
Trips are composed on Flights.

## Controls

### In CodeSandBox

I had to import the project from Github.
There were issues with the sandbox environment,
it was lagging and slowing down development speed.
Additionally, the dependencies stopped registering after some time.

With luck, a preview will spawn automatically in CodeSandBox.io,
from [this link to the environment](https://codesandbox.io/p/github/ks982579/vite-landing-page/main).
If it does not, there is a "Previews" icon on the left side-bar.
The preview "5173 dev" pulls up the landing page in the preview window from port 5173.

A popup should appear to open a preview at `http://localhost:5173`.

**Additionally**, the project should still be TypeScript safe.
There is a command in the "package.json":

```json
{
  ...
  "scripts": {
    ...
    "typecheck": "tsc --noEmit --project tsconfig.app.json"
  },
  ...
}
```

So running the following will check for compiler errors / warnings:

```bash
npm run typecheck
```

Running commands on the code may require forking the repo in CodeSandBox,
or cloning it locally and running the command.

### Locally

You should be able to run the following commands in your terminal,
after installing dependencies.

```bash
bun run dev
```

or

```bash
npm run dev
```

Navigate to `http://localhost:5173`.

## Challenges

This project was both enjoyable and a learning experience.
It was good practice for Typescript on the frontend and I also did a lot of research into Material UI (MUI).

The biggest challenge was getting the project to work correctly in CodeSandBox.io.
Having built the project in my NeoVim editor using my WSL environment,
transfering the code from there to CodeSandBox was a challenge.
The imports broke initially, the preview wouldn't work, and the browser slowed to a crawl or froze.
I eventually figured out how to import from a Github repo, allowing the project to work again.

Other challenges include:

- Some code duplication may still exist in the dashboard components.
- Passing props to children in components following Typescript types.
- I worked with MUI previously (mostly for icons), but found it challenging to determine the best component for each job.
- Getting the Trips and Passenger Box components to resize properly based on screen size required troubleshooting.
- Knowing the best information to provide to the user, what would be most valuable to them.

## Folder Layout

I kept to a (hopefully) simple folder structure to keep things simple, but organized.
The `root` directory ("src") of the project has the `main.tsx` and `AppRouter.tsx` files.
They work together to launch the rest of the application.

```yaml
src:
  - components: "shared components."
  - context: "global context provider - would be 'store' if using Redux."
  - features: "featured-based mods - looks like recursion."
  - layouts: "page layouts - currently only one."
  - pages: "pages of application."
  - services: "Folder to hold API requests."
  - testing: "Tests to be Implemented."
  - types: "TS type definitions."
  - utils: "Contains shared utility functions - Not Required (yet)."
```

- Per "React Application Architecture for Production" pp. 28-32.
- [WebDevSimplified](https://blog.webdevsimplified.com/2022-07/react-folder-structure/)
- [Medium by Kthamodaran](https://medium.com/@kthamodaran/react-8-best-practices-folder-structure-5dbda48a69e)

## Main Imports into Project

- React = `react` `react-dom` `@types/react` `@types/react-dom`
- React Router = `@types/react-router-dom` `react-router-dom`
- Axios = `axios`
- TypeScript = `typescript` `typescript-eslint`
- Material UI = `@mui/material` `@emotion/styled` `@emotion/react` `@mui/icons-material`

### TypeScript

- [Using CLI | TypeScriptLang.org](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [React Clone Elements](https://stackoverflow.com/questions/42261783/how-to-assign-the-correct-typing-to-react-cloneelement-when-giving-properties-to)

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

> I wrote this section before testing in Chrome.
> Unfortunately, setting cookies did not work in Chrome, but it works in FireFox.
> I decided to switch to using localStorage to avoid issues with cookies.

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
