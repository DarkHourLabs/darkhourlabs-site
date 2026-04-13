# Dark Hour Labs Website

IT consulting and AI solutions for businesses ready to modernize.

## Tech Stack

- Static HTML/CSS/JS (no framework)
- Vercel deployment with serverless contact form
- Gmail SMTP for form submissions

## Structure

```
├── index.html          # Main landing page
├── privacy.html        # Privacy policy
├── terms.html          # Terms & conditions
├── api/contact.js      # Contact form serverless function
├── favicon.svg         # Hourglass favicon
├── logo-hourglass.svg  # Logo asset
├── vercel.json         # Vercel config
└── package.json        # Dependencies (nodemailer)
```

## Development

```bash
# Open index.html locally
open index.html

# Deploy to Vercel
vercel --prod
```

## Environment Variables (Vercel)

- `GMAIL_USER` — Gmail address for sending
- `GMAIL_APP_PASSWORD` — Gmail app password

## License

© 2026 Dark Hour Labs. All rights reserved.