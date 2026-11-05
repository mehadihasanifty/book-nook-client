<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` / `npm run build` (Turbopack) / `npm run lint` (`eslint`). No test suite exists.
- `README.md` is stray create-next-app boilerplate — it points at non-existent paths (`app/`, Geist font); don't trust it.
- Typecheck is **not** in npm scripts: run `npx tsc --noEmit`.
- Prettier is **not** a dependency; format ad hoc with `npx prettier --write "src/**/*.{ts,tsx,css}"` and verify with `--check`. Verify order: `prettier --check` → `tsc --noEmit` → `next build`.
- ESLint is clean and must stay that way: `eslint-config-next` plus React Compiler-aware hook rules (e.g. `react-hooks/set-state-in-effect` flagged our `useIsMobile`; kept clean via `useSyncExternalStore` in `src/hooks/use-mobile.ts`).

## Next 16 with `cacheComponents` (enabled in `next.config.ts` — read breaking-change rules above)

- Client components calling `usePathname()` above dynamic routes must sit inside a `<Suspense>` boundary (`<Navbar />` is wrapped in `layout.tsx`).
- Routes reading `use(params)` in a client page must wrap the content in `<Suspense fallback={...}>` — see the `BookDetailsPage` → `<Suspense>` → `BookDetails` split in `src/app/books/[id]/page.tsx`. `next build` fails with "blocking-prerender" errors otherwise.
- Only **one** `next dev` instance may run per directory; a second exits with "Another next dev server is already running". Dev-server log: `.next/dev/logs/next-development.log`.

## Backend is a separate project

- Express/MongoDB API at `F:\Projects\book-nook-server` (port 5000, CORS allows `localhost:3000`). If not running, pages fail with `TypeError: Failed to fetch` — start it there with `npm run dev` (nodemon; plain `node index.js` never auto-reloads after edits).
- `NEXT_PUBLIC_API_URL` (http://localhost:5000) flows only through `API_URL` from `src/lib/booknook-api.ts` — don't reference the env var elsewhere. `apiRequest(path)` already prepends that base, so pass **relative** paths (`"/books"`); passing an absolute URL created a double-prefix bug (`http://localhost:5000http://localhost:5000/books`).
- `GET /books` is public (supports `?limit=N` → newest-first by `addedDate`; used by the home page's New Arrivals). Everything else (`/books/:id`, `POST /books`, `/borrows`…) needs the Bearer token from `getApiToken()` (proxied through this app's `/api/token` route) or `apiRequest()` from `src/lib/booknook-api.ts`.

## Auth

- better-auth: server config `src/lib/auth.ts` (reads `BETTER_AUTH_URL` and Vercel auto-injected `VERCEL_URL` for `baseURL`/`trustedOrigins`), client `src/lib/auth-client.ts`, mounted at `src/app/api/auth/[...all]/route.ts`. Read session with `authClient.useSession()`.
- The auth middleware is `src/proxy.ts` (Next 16's middleware) and gates `/add-book`, `/my-books`, `/my-borrows`, `/books/:path*` → redirects unauthenticated requests to `/login` (raw `curl` of those pages returns 307 without a session cookie).

## Deployment (Vercel + Render)

- Client → Vercel (repo `github.com/mehadihasanifty/booknook-client`); the Express API can't run on Vercel — deploy `book-nook-server` as a Render Web Service (`github.com/mehadihasanifty/booknook-server`).
- `.env` is never committed — all required vars must be filled manually in Vercel/Render from local `.env` values.
- Vercel builds **fail without `MONGODB_URL`** in the build env: `src/lib/auth.ts` throws at module load, and middleware + `/api/*` routes import it. Set all env vars *before* the first build.
- `NEXT_PUBLIC_API_URL` is **inlined at build time** — after changing it on Vercel you must rebuild/redeploy.
- The API's CORS allow-list comes from `CLIENT_ORIGIN` in the backend env; deployed client origins must be listed there or every browser fetch is silently rejected (symptom: pages render but data never loads — "works on localhost, dead when deployed").
- Also set `BETTER_AUTH_URL=https://<client-domain>`, `API_JWT_SECRET`, `IMGBB_API_KEY`, `GOOGLE_CLIENT_ID/SECRET` on both platforms; add the deployed origin + `/api/auth/callback/google` to Google OAuth redirect URIs.

## Conventions

- UI stack: HeroUI v3 (`toast.success`/`toast.danger`; global `<Toast.Provider>` already in `layout.tsx`), shadcn-style components in `src/components/ui`, lucide-react icons.
- Every mutating user action (create/update/delete/auth/borrow) must surface toast feedback — established project-wide pattern; check that any new action includes success and failure toasts.
- All data fetching happens client-side in `useEffect` (API returns plain JSON arrays; `my-books` filters by user email in the browser). Home-page sections under `src/app/component/` follow the same pattern (`NewArrivals.tsx` for reference) — keeping fetches client-side is why `/` stays fully static (○) under `cacheComponents`.
- Styling uses the custom palette as hex values, not Tailwind theme slots: `#174D38` (green), `#D5B477` (gold), `#071F17`/`#0E241C` (dark surfaces). Keep new markup consistent with existing pages. `reactCompiler` is enabled, so keep hooks deterministic.
