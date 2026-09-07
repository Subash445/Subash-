// Tiny proxy server.
// The browser can't call api.experientiallabs.ai directly (CORS blocks it),
// so this server sits in between: your page calls THIS server,
// and this server calls experientiallabs.ai on your behalf.

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the static site (index.html, etc.) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint: browser calls /api/whoami, we forward it with the key
app.get('/api/whoami', async (req, res) => {
  const apiKey = req.header('x-api-key'); // key comes from the browser, per-request

  if (!apiKey) {
    return res.status(400).json({ error: 'Missing x-api-key header' });
  }

  try {
    const upstream = await fetch('https://api.experientiallabs.ai/api/whoami', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    const text = await upstream.text();
    res.status(upstream.status);
    res.set('Content-Type', upstream.headers.get('content-type') || 'application/json');
    res.send(text);
  } catch (err) {
    res.status(502).json({ error: 'Upstream request failed', detail: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
