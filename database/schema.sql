-- SQLite Migration Schema for Ink & Dye Tees
-- Designed for future backend scalability

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    rating REAL DEFAULT 5.0,
    image TEXT,
    badge TEXT,
    description TEXT,
    inStock BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_variants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    size TEXT,
    color TEXT,
    stock_qty INTEGER DEFAULT 10,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS custom_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    size TEXT NOT NULL,
    shirt_color TEXT NOT NULL,
    placement TEXT NOT NULL,
    image_size TEXT NOT NULL,
    preferred_colors TEXT,
    notes TEXT,
    estimated_price REAL,
    status TEXT DEFAULT 'Pending Review',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);
