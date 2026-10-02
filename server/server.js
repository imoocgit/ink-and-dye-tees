/**
 * Ink & Dye Tees - Scalable Node.js / Express Backend Architecture
 * Ready for SQLite (via better-sqlite3 or sqlite3) integration.
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Helper to read JSON data store (Easily replaceable with database queries later)
const getData = () => {
    const raw = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8');
    return JSON.parse(raw);
};

const saveData = (data) => {
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(data, null, 2));
};

// API Routes
app.get('/api/products', (req, res) => {
    const data = getData();
    let results = data.products;
    const { category, search } = req.query;
    
    if (category && category !== 'all') {
        results = results.filter(p => p.category === category);
    }
    if (search) {
        results = results.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    res.json({ success: true, count: results.length, data: results });
});

app.get('/api/products/:id', (req, res) => {
    const data = getData();
    const product = data.products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, data: product });
});

app.post('/api/custom-orders', (req, res) => {
    const order = req.body;
    // Validation
    if (!order.customer_name || !order.email || !order.size) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    
    // In production, save to SQLite `custom_orders` table:
    // db.run(`INSERT INTO custom_orders (...) VALUES (...)`, [...]);
    
    res.json({ 
        success: true, 
        message: 'Custom order quote request received!', 
        orderId: Math.floor(100000 + Math.random() * 900000),
        estimatedPrice: order.estimatedPrice || 35.00
    });
});

app.get('/api/faqs', (req, res) => {
    const data = getData();
    res.json({ success: true, data: data.faqs });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Ink & Dye Tees server running on port ${PORT}`);
});

module.exports = app;
