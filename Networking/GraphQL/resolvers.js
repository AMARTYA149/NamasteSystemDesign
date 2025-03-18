const data = {
    authors: [
        {id: "1", name: "Amartya Aishwarya", bookIds: ["101", "102"]},
        {
            id: "2", name: "Swati Rani", bookIds: ["103"]
        }
    ],
    books: [
        {id: "101", title: "Namaste Frontend System Design", publishedYear: 2001, authorId: "1"},
        {id: "102", title: "Namaste NodeJS", publishedYear: 2003, authorId: "1"},
        {id: "103", title: "Namaste React", publishedYear: 2004, authorId: "2"}
    ]
}

export const resolvers = {
    Book: {
        author: (parent, args, context, info) => {
            return data.authors.find(authorDetails => authorDetails.id === parent.authorId);
        }
    },
    Author: {
        books: (parent, args, context, info) => {
            return data.books.filter(book => parent.bookIds.includes(book.id))
        }
    }, 
    Query: {
        authors: () => {
            return data.authors
        },

        books: () => {
            return data.books
        }
    },
    Mutation: {
        addBook: (parent, args, context, info) => {
            console.log(args);
            const newBook = {...args, id: data.books.length++};
            data.books.push(newBook);
            return newBook;
        }
    }
}