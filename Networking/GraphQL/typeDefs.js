export const typeDefs = ` #graphQL
    type Author {
        id: ID!  # ! - means required
        name: String!
    }

    type Book{
    id: ID!
    title: String!
    publishedYear: Int
    }

    type Query { # Query is used for fetching data
        authors: [Author]
        book: [Book]
    }

    type Mutation { # Mutation is used for updating data}
`