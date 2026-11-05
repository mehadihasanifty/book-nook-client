# BookNook Client

> A shared reading space to discover, contribute, and borrow books.

BookNook is a responsive book library built with Next.js. Readers can browse a community shelf, view book information, add and manage their own titles, and keep track of active borrows.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" />
  <img alt="MongoDB" src="https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white" />
</p>

## What you can do

- Browse the full collection and see the newest arrivals.
- Search books and filter the shelf by category.
- Create an account, sign in, and view your reader profile.
- Add books with a cover image, description, and copy count.
- Edit or remove books you contributed.
- Borrow an available book and return it from your borrow list.
- See clear loading, empty, success, and error states throughout the app.

## Built with

- [Next.js 16](https://nextjs.org/) App Router and React 19
- TypeScript and Tailwind CSS
- [Better Auth](https://www.better-auth.com/) for authentication
- MongoDB for authentication data and the BookNook API
- Express API in the companion `book-nook-server` project
- imgbb for book cover uploads
- HeroUI and Lucide icons

## Run locally

### Requirements

- Node.js 20.9 or newer
- npm
- A MongoDB connection string
- The BookNook API running locally (see the server README)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the client project root:

```dotenv
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>/<database>
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
API_JWT_SECRET=use-the-same-secret-as-the-server
NEXT_PUBLIC_API_URL=http://localhost:5000
IMGBB_API_KEY=your-imgbb-api-key
```

`MONGODB_URL` must point to the database used by the server. Keep real credentials in your local `.env` or deployment environment settings; never commit them. Google sign-in and cover uploads need their corresponding provider credentials.

### 3. Start the server

In a separate terminal, start the companion Express API:

```bash
cd ../book-nook-server
npm install
nodemon index.js
```

The server listens at `http://localhost:5000` by default.

### 4. Start the client

From the client project directory:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Main pages

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Home page and newest arrivals |
| `/books` | Public | Search and browse the full shelf |
| `/books/[id]` | Signed in | View details and borrow a book |
| `/add-book` | Signed in | Add a title to the collection |
| `/my-books` | Signed in | Edit or remove your contributed books |
| `/my-borrows` | Signed in | View and return borrowed books |
| `/login` | Public | Sign in |
| `/register` | Public | Create an account |
| `/profile` | Signed in | View your profile |

## Project commands

```bash
npm run dev       # Start the local development server
npm run build     # Create a production build
npm run start     # Serve the production build
npm run lint      # Run ESLint
npx tsc --noEmit  # Check TypeScript types
```

## Deployment

Deploy the client and API as separate projects. In the client deployment settings, configure the same variables listed above with production values. Set `BETTER_AUTH_URL` to the deployed client URL, `NEXT_PUBLIC_API_URL` to the deployed API URL, and share `API_JWT_SECRET` with the API project. Configure `MONGODB_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `IMGBB_API_KEY` as needed. Redeploy after changing environment variables.

## Troubleshooting

- **The shelf keeps loading in production:** Check that `NEXT_PUBLIC_API_URL` points to the deployed API and that its `/books` endpoint returns JSON.
- **The API rejects browser requests:** Set the server's `CLIENT_ORIGIN` to the exact client origin, including `https://` in production.
- **Authentication or protected API calls fail:** Ensure the client and server use the same `API_JWT_SECRET` and the client `BETTER_AUTH_URL` matches its deployed URL.
- **Book cover upload fails:** Check `IMGBB_API_KEY` in the client deployment settings.
- **MongoDB connection fails:** Verify `MONGODB_URL` in both projects and allow the deployment to connect in MongoDB Atlas Network Access.

## License

This project was created as an educational BookNook assignment.
