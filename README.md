# Ink & Dye Tees — Scalable E-Commerce Platform

Handmade, hand-dyed, and hand-painted custom T-shirts designed for Gen Z art, anime, and streetwear fans.

## Architecture & Scalability
- **Frontend**: Responsive, mobile-first single page app with Tailwind CSS styling, live product filters, interactive custom order quote builder, shopping cart, and API Inspector.
- **Backend**: Node.js & Express RESTful API (`server/server.js`).
- **Data Layer**: Structured JSON repository (`data/products.json`) with an included SQLite migration schema (`database/schema.sql`) for seamless future plug-and-play database scaling.
- **Assets**: Organized asset directories (`public/assets/images/`, `public/assets/css/`, `public/assets/js/`).

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000` in your browser.
