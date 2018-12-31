const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const mongoose = require('mongoose')

// connect mlab
mongoose.connect('mongodb://admin:admin123@ds215563.mlab.com:15563/graph-ql',{useNewUrlParser: true});
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
