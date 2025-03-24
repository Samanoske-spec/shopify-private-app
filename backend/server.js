require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

// Fetch Products
app.get("/api/products", async (req, res) => {
    try {
        const response = await axios.get(`https://${SHOPIFY_STORE}/admin/api/2024-01/products.json`, {
            headers: {
                "X-Shopify-Access-Token": ACCESS_TOKEN,
                "Content-Type": "application/json",
            },
        });
        console.log('here');
        res.json(response.data);
    } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
});

// Get Single Product
app.get("/api/products/:id", async (req, res) => {
    try {
        const response = await axios.get(
            `https://${SHOPIFY_STORE}/admin/api/2024-01/products/${req.params.id}.json`,
            {
                headers: {
                    "X-Shopify-Access-Token": ACCESS_TOKEN,
                    "Content-Type": "application/json",
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
});

// Create Product
app.post("/api/products", async (req, res) => {
    try {
        const response = await axios.post(
            `https://${SHOPIFY_STORE}/admin/api/2024-01/products.json`,
            req.body,
            {
                headers: {
                    "X-Shopify-Access-Token": ACCESS_TOKEN,
                    "Content-Type": "application/json",
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
});

// Update Product
app.put("/api/products/:id", async (req, res) => {
    try {
        console.log('Updating product:', req.params.id);
        console.log('Update data:', JSON.stringify(req.body, null, 2));
        
        const response = await axios({
            method: 'put',
            url: `https://${SHOPIFY_STORE}/admin/api/2024-01/products/${req.params.id}.json`,
            headers: {
                "X-Shopify-Access-Token": ACCESS_TOKEN,
                "Content-Type": "application/json",
            },
            data: req.body
        });
        
        res.json(response.data);
    } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ 
            error: error.response?.data || error.message,
            details: error.response?.data
        });
    }
});

// Delete Product
app.delete("/api/products/:id", async (req, res) => {
    try {
        await axios.delete(
            `https://${SHOPIFY_STORE}/admin/api/2024-01/products/${req.params.id}.json`,
            {
                headers: {
                    "X-Shopify-Access-Token": ACCESS_TOKEN,
                    "Content-Type": "application/json",
                },
            }
        );
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
});

// Fetch Orders
app.get("/api/orders", async (req, res) => {
    try {
        const response = await axios.get(`https://${SHOPIFY_STORE}/admin/api/2024-01/orders.json?status=any`, {
            headers: {
                "X-Shopify-Access-Token": ACCESS_TOKEN,
                "Content-Type": "application/json",
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));