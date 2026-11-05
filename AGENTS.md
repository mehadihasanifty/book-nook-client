<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` / `npm run build` (Turbopack) / `npm run lint` (`eslint`). No test suite exists.
- Typecheck is **not** in npm scripts: run `npx tsc --noEmit`.
- Prettier is **not** a dependency; format ad hoc with `npx prettier --write "src/**/*.{ts,tsx,css}"` and verify with `--check`. Verify order: `prettier --check` → `tsc --noEmit` → `next build`.

## Next 16 with `cacheComponents` (enabled in `next.config.ts` — read breaking-change rules above)

- Client components calling `usePathname()` above dynamic routes must sit inside a `<Suspense>` boundary (`<Navbar />` is wrapped in `layout.tsx`).
- Routes reading `use(params)` in a client page must wrap the content in `<Suspense fallback={...}>` — see the `BookDetailsPage` → `<Suspense>` → `BookDetails` split in `src/app/books/[id]/page.tsx`. `next build` fails with "blocking-prerender" errors otherwise.
- Only **one** `next dev` instance may run per directory; a second exits with "Another next dev server is already running". Dev-server log: `.next/dev/logs/next-development.log`.

## Backend is a separate project

- Express/MongoDB API at `F:\Projects\book-nook-server` (port 5000, CORS allows `localhost:3000`). If not running, pages fail with `TypeError: Failed to fetch` — start it there with `npm run dev`.
- `NEXT_PUBLIC_API_URL` (http://localhost:5000) comes from this repo's `.env`; never hardcode other base URLs.
- `GET /books` is public. Everything else (`/books/:id`, `POST /books`, `/borrows`…) needs the Bearer token from `getApiToken()` (proxied through this app's `/api/token` route) or `apiRequest()` from `src/lib/booknook-api.ts`.

## Auth

- better-auth: server config `src/lib/auth.ts`, client `src/lib/auth-client.ts`, mounted at `src/app/api/auth/[...all]/route.ts`. Read session with `authClient.useSession()`.
- The auth middleware is `src/proxy.ts` (Next 16's middleware) and gates `/add-book`, `/my-books`, `/my-borrows`, `/books/:path*` → redirects unauthenticated requests to `/login` (raw `curl` of those pages returns 307 without a session cookie).

## Conventions

- UI stack: HeroUI v3 (`toast.success`/`toast.danger`; global `<Toast.Provider>` already in `layout.tsx`), shadcn-style components in `src/components/ui`, lucide-react icons.
- Every mutating user action (create/update/delete/auth/borrow) must surface toast feedback — established project-wide pattern; check that any new action includes success and failure toasts.
- Styling uses the custom palette as hex values, not Tailwind theme slots: `#174D38` (green), `#D5B477` (gold), `#071F17`/`#0E241C` (dark surfaces). Keep new markup consistent with existing pages. `reactCompiler` is enabled, so keep hooks deterministic.
