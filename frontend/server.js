const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const productsPath = path.join(__dirname, '..', 'shared', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));


const schema = buildSchema(`
    type Product {
        id: Int!
        name: String!
        description: String
        price: Float
        category: [String]
    }

    type Query {
        products: [Product]
        product(id: Int!): Product
        productNames: [String]
        productNamesAndPrices: [ProductNamesAndPrices]
    }

    type ProductNamesAndPrices {
        name: String
        price: Float
    }
`);


const root = {
    products: () => products,
    product: ({ id }) => products.find(product => product.id === id),
    productNames: () => products.map(product => product.name),
    productNamesAndPrices: () => products.map(product => ({
        name: product.name,
        price: product.price
    }))
};


app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Frontend server is running on http://localhost:${PORT}`);
});
