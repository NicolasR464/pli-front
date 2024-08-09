<p align="center"><img src="https://res.cloudinary.com/dy2ds7yua/image/upload/w_300,h_169/v1723194828/blocmark_holo_blue_2x_zgwt0w.png"/></p>

## Welcome to the Trocup project's front-end side 👋

Trocup is a platform that enables users to exchange products without involving money. It revives the traditional bartering system, enhanced by advanced AI technology to assess the value of items ✨.

### Introduction

This is a [Next.js](https://nextjs.org/docs) project.
Check out [this link](https://nextjs.org/learn) for an interactive Next.js tutorial.

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
-   Has a strong set of linters from [Eslint](https://eslint.org/docs/latest/)
-   [Tailwind](https://tailwindcss.com/) for styling
-   [Shadcn](https://ui.shadcn.com/) as a component library
-   [Zustand](https://zustand-demo.pmnd.rs/) for state management, along with [Immer](https://docs.pmnd.rs/zustand/integrations/immer-middleware) middleware for conveniency.
-   [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Getting Started

Start the development server by running:

```bash
pnpm dev
```

#### ⚠️ Before a Merge request

-   Check if your branch is up to date with the main branch:
    ```bash
      git pull -r origin main
    ```

If either of theses commands fail, the MR won't pass:

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
