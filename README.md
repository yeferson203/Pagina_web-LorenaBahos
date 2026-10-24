# Apple Glow Business Showcase

genea una web luxuri con buen seo para este negocio ahi estan los servicios tines una foto tambein de ella. el diseño debe4 implenetar animaciones y estecia muy profesional combinando la estecia apple

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploy and social previews

Set `VITE_SITE_URL` to the site's public origin at build time (for example,
`https://www.example.com`). The homepage uses it to generate absolute canonical and Open Graph URLs.
The social preview image is served from `/social-share.webp`.

`public/_headers` configures long-lived immutable caching for hashed build assets and shorter
caching for the social preview and favicon on hosts that support the Cloudflare Pages `_headers`
format. Configure equivalent response headers in your hosting provider if it does not support this
file.

The public crawler files are `public/robots.txt` and `public/sitemap.xml`. If the site's domain
changes, update the sitemap URL in `robots.txt` and the canonical URL in `sitemap.xml` to match
`VITE_SITE_URL`. After deployment, add the site in Google Search Console, verify domain ownership,
and submit `https://mglorenabahos.netlify.app/sitemap.xml`. Discovery and indexing are controlled
by search engines and are not guaranteed by these files alone.
