export const typeDefs = ` #graphQL
    type Author {
        id: ID!  # ! - means required
        name: String!
        books: [Book]
    }

    type Book{
    id: ID!
    title: String!
    publishedYear: Int
    author: Author
    }

    type Query { # Query is used for fetching data
        authors: [Author]
        books: [Book]
    }

    type Mutation {
        addBook(title: String!, publishedYear: Int, authorId: ID!): Book!
    }
`