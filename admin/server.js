const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static('public'));

let productsPath = path.join(__dirname, '..', 'shared', 'products.json');

app.get('/products', (req, res) => {
    fs.readFile(productsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading products file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/products', (req, res) => {
    const newProduct = req.body;
    fs.readFile(productsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading products file');
            return;
        }
        const products = JSON.parse(data);
        products.push(newProduct);
        fs.writeFile(productsPath, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing products file');
                return;
            }
            res.status(201).json(newProduct);
        });
    });
});

app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    fs.readFile(productsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading products file');
            return;
        }
        let products = JSON.parse(data);
        products = products.map(product => product.id === productId ? updatedProduct : product);
        fs.writeFile(productsPath, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing products file');
                return;
            }
            res.json(updatedProduct);
        });
    });
});

app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    fs.readFile(productsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading products file');
            return;
        }
        let products = JSON.parse(data);
        products = products.filter(product => product.id !== productId);
        fs.writeFile(productsPath, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing products file');
                return;
            }
            res.status(204).send();
        });
    });
});

app.listen(PORT, () => {
    console.log(`Admin server is running on http://localhost:${PORT}`);
});
