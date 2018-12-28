const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const mongoose = require('mongoose')

// connect mlab
mongoose.connect('mongodb://lam:lam123@ds247101.mlab.com:47101/store-book');
mongoose.connection.once('open', () => {
    console.log("connected to database")
})

app.use('/graphql',graphqlHTTP({
schema,
graphiql:true
}))

app.listen(4000,() => {
    console.log("now on port 4000")
});
