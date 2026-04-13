# Ashley Website

This repository contains a personal website built and maintained by Ashley.

## Repository

https://github.com/ashley/websiteforreal

## Author

Ashley

## Local development

1. Install dependencies:

```sh
npm install
```

2. Start the development server:

```sh
npm run dev
```

3. Build for production:

```sh
npm run build
```

4. Preview the built site locally:

```sh
npm run preview
```

## Why Live Server is not the right option here

This is a React + TypeScript app built with Vite. It does not work correctly if you open `index.html` directly with Live Server or a static file preview tool, because the app relies on Vite's bundling and TypeScript transformation.

Use `npm run dev` to run the project locally, or `npm run preview` after building.

## Technologies

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-ui
- Vitest

## Notes

This project is fully owned and managed by Ashley. All design, code, and content are part of the personal website and do not reference any external branding.
