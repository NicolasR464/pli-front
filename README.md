<p align="center"><img src="https://res.cloudinary.com/etnaassets/image/upload/v1723194835/Fichier_31_3x_qbogmr.png"/></p>

## Welcome to the TrocUp project's front-end side 👋

TrocUp is a platform that enables users to exchange products without involving money. It revives the traditional bartering system, enhanced by advanced AI technology to assess the value of items ✨.

### Introduction

This is a [Next.js](https://nextjs.org/docs) project.
Check out [this link](https://nextjs.org/learn) for an interactive Next.js tutorial.

-   To enforce a Node.js version, the project uses [fnm](https://github.com/Schniz/fnm), a fast and simple Node.js version manager, built in Rust. Check out the documentation for more information and quick install.

-   The default package manager is [PNPM](https://pnpm.io/installation)

```bash
npm install -g pnpm
```

-   Install the dependencies

```bash
pnpm install
```

-   Refer to `.env.example` to create your `.env` and `.env.local`

-   It uses [Jest](https://jestjs.io/) for unit testing.
-   It has a strong set of linters from [Eslint](https://eslint.org/docs/latest/).
-   [Tailwind](https://tailwindcss.com/) for styling.
-   [Shadcn](https://ui.shadcn.com/) as a component library.
    -   To [install](https://ui.shadcn.com/docs/changelog?ck_subscriber_id=2472719707#199:%20shadcn,%20Next.js,%20TanStack,%20Remix,%20MDX,%20Astro,%20Storybook,%20@svg-use,%20MSW,%20RAG,%20RN-WebGPU,%20React-Three-Fiber,%20Re.Pack,%20Super%20Apps,%20RN-macOS,%20EAS,%20Node.jx,%20Stage%202.7,%20AggregateError,%20Style-Observer...%20-%2014908011) components, themes, hooks, utils and more, your can use: `npx shadcn add`
-   [React Query](https://tanstack.com/query/latest) to efficiently manage server state and caching.
-   [Axios](https://axios-http.com/) for making HTTP requests.
-   [Zustand](https://zustand-demo.pmnd.rs/) for state management (for client components [only](https://github.com/pmndrs/zustand/discussions/2200)), along with [Immer](https://docs.pmnd.rs/zustand/integrations/immer-middleware) middleware for conveniency.
-   [T3 Env](https://env.t3.gg/) for typing environment variables (src/types/environment.ts file).
-   [Zod](https://zod.dev/) for type inference and form validation.
-   [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#with-tailwind-css) Next's font manager linked to Google Font.
-   [Knip](https://knip.dev/) to check for dead code and unused dependencies (tweak knip.json to your liking).
-   [Eraser](https://docs.eraser.io/docs/what-is-eraser) to make diagrams/UMLs (folder named `UMLs`). Download the plugin to visualize diagrams (plugin id: EraserLabs.eraserlabs)
-   [Clerk](https://clerk.com/) for user authentication
-   [React-hot-toast](https://react-hot-toast.com/docs/toast) for toasters (user notifications)
-   We use [JSDoc](https://jsdoc.app/) to document the code.

### Getting Started

-   Start the development server by running:

```bash
  pnpm dev
```

#### ⚠️ Before a Pull request

-   If you don't have Prettier plugin that formats code on save you can alternatively run:

```bash
  pnpm format
```

-   Check if your branch is up to date with the main branch:

```bash
  git pull -r origin main
```

If either of these following commands fail, the PR won't pass:

```bash
# for checking the linter
pnpm lint
# Typescript
pnpm ts-check
# if there is dead code
pnpm knip
# Jest unit tests
pnpm test
# or for all of the above rules
pnpm troc
```
