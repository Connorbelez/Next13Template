# Next.js + NextUI + NextAuth + PlanetScale + Kysely Template

This is a template for creating applications using Next.js 13 (app directory) and NextUI (v2).

## Technologies Used

- [Next.js 13](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui-docs-v2.vercel.app/)
- [NextAuth](https://next-auth.js.org/)
- [PlanetScale](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Features
- Role based google authentication with JWT tokens, with per page auth control through middleware. 
- Responsive and sexy nav bar with profile avatar.
- PlanetScale Integration with sample code
- Kyslely Integration for low weight easy SQL queries
- Tailwind CSS with variants

### SET YOUR LOCAL ENV
```
GOOGLE_ID=
GOOGLE_SECRET=
GOOGLE_APPLICATION_CREDENTIALS=
AUTH_SECRET=
NEXTAUTH_URL="http://localhost:3000" <- for dev only set to actual URL in production env
DATABASE_URL=
DATABASE_USER=
DATABASE_PASSWORD=
```

### Install dependencies

```bash
yarn install
```

### Run the development server

```bash
yarn run dev
```

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
# get-active-platform
