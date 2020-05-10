enum Genres {
  Literature = 'Literature',
  Fantasy = 'Fantasy',
  ScienceFiction = 'Science Fiction',
  History = 'History',
  Biography = 'Biography',
}

interface Book {
  title: string
  author: Author
  pages: number
  genre: Genres
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
  genre: Genres
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
  "George Orwell": [{ title: "1984", pages: 328, author: georgeOrwell, genre: Genres.Literature }],
  "Herman Melville": [{ title: "Moby-Dick", pages: 704, author: hermanMelville, genre: Genres.Literature }],
}

enum PublicationState {
  Draft = 0,
  Editing,
  Published,
  OutOfPrint,
}

type AuthorInfo = [string, number]

const getAuthorInfo: (author: Author) => AuthorInfo = ({ firstName, lastName, books }) => [`${lastName}, ${firstName}`, books.length]

const [melvilleFullName, melvilleBooksCount]: AuthorInfo = getAuthorInfo(hm2)
const [orwellFullName, orwellBooksCount]: AuthorInfo = getAuthorInfo(georgeOrwell)

console.log(melvilleFullName, melvilleBooksCount)
