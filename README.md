# experientiallabs.ai key checker

A tiny site + server so you can check your `EXPLABS_API_KEY` from a webpage.

## Why the server exists

Calling `api.experientiallabs.ai` straight from a browser fails with a CORS
error — the API doesn't send the header that tells browsers "it's okay for
web pages to call me." The fix is to have a server make that call instead
(servers aren't subject to CORS), and have the browser talk to your server.

## Run it locally

```bash
npm install
npm start
```

Then open http://localhost:3000 in your browser, paste your key, and click
"Check key."

## Deploying it for real

Running it on your own laptop only works while your laptop is on and the
terminal is open. To have a real, always-on website, deploy this same
`server.js` + `public/` folder to a host that runs Node servers, e.g.:

- **Render** or **Railway** — connect a GitHub repo, it runs `npm start` automatically.
- **Vercel** or **Netlify** — these prefer serverless functions rather than a
  long-running Express server; the `/api/whoami` route would become a
  function file instead of an Express route. Ask me if you want that version.

## Files

- `server.js` — the proxy server (Node + Express)
- `public/index.html` — the page itself
- `package.json` — dependencies (just Express)

## Security note

The key is typed in by whoever uses the page and is never stored anywhere —
not in the HTML, not on the server, not in a file. It only travels:
browser → your server → experientiallabs.ai, per request.
