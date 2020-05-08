interface Book {
  title: string
  author: Author
  pages: number
}

interface Author {
  firstName: string
  lastName: string
  born: string
  died: string
  books: Book[]
}

const georgeOrwell: Author = {
  firstName: 'George',
  lastName: 'Orwell',
  born: '1903-06-25',
  died: '1950-01-21',
  books: [],
}

interface BookInput {
  title: string
  pages: number
}

const publishBook: (author: Author, bookInput: BookInput) => Author = (author, bookInput) => {
  const { books } = author
  const book = { ...bookInput, author }

  return {
    ...author,
    books: [...books, book],
  }
}

interface BookRepository {
  [authorName: string]: Book[]
}

const hermanMelville = georgeOrwell

const repo: BookRepository = {
  "George Orwell": [{ title: "1984", pages: 328, author: georgeOrwell }],
  "Herman Melville": [{ title: "Moby-Dick", pages: 704, author: hermanMelville }],
}

console.log(repo)
