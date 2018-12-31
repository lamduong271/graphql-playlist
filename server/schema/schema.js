const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType,
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const Book = require('../models/book');
const Author = require('../models/author')
//dummy data

var books = [
    {name: 'Book1', genre:'Book', id:'1', authorId:'2'},
    {name: 'Book2', genre:'Book haha', id:'2', authorId:'3'},
    {name: 'Book3', genre:'Book hihi', id:'3', authorId:'1'},
    {name: 'Book4', genre:'Aeroflop', id:'4', authorId:'3'},
    {name: 'Book5', genre:'finland', id:'5', authorId:'1'},
]

var authors = [
    {name: 'Lam', age:23, id:'1'},
    {name: 'Le', age:22, id:'2'},
    {name: 'Nghia', age:30, id:'3'},
]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                //return _.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:() => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return _.filter(books, {authorId:parent.id})
                return Book.find({authorId:parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent,args){
                // code to get data from db for other source
               console.log(typeof(args.id))
                //return  _.find(books,{id:args.id})
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID}
            },
            resolve(parent,args) {
                //return _.find(authors, {id: args.id})
                return Author.findById(args.id)

            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args) {
                //return books
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                //return authors
                return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age:{type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})