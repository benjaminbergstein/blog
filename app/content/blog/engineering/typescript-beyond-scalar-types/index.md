---
title: "Typescript Primer"
date: "2020-05-08T00:12:03.284Z"
description: "A list of things I wish I'd known sooner about Typescript"
category: engineering
tags: ["typescript", "tutorials", "learn to code", "typing", "javascript"]
status: published
---

## Background

When I started learning Typescript, I found it difficult to find resources for how to type several common use cases. While there is plenty of documentation, some key techniques for typing Javascript were missing or scattered across the web. In this post, I'll give examples that I wish I'd found all in one place.

This guide is for anyone starting with Typescript who is hitting a wall on how
to express typed code, especially coming from untyped languages. It assumes
familiarity with modern Javascript syntax.

## Use Cases

In this post, I'll take a look at the following use cases:

```toc
exclude: Use Cases|Background
fromHeading: 1
toHeading: 2
```

## Review: Basic Type Annotations

Let's quickly cover some examples of scalar types in Typescript.

#### Typed strings, numbers, arrays

These are your everyday types.

```typescript
const typedString: string = "bar" // Typed string
const typedNumber: number = 123 // Typed number
const typedArrayOfStrings: string[] = ['foo', 'bar', 'baz'] // Array of strings
```

#### Any, void, null, undefined

These tend to be used when typing function argument or return values.

```typescript
const flexibleConstant: any = 'anything'
const uselessConstant: void = undefined
const undefinedConstant: undefined = undefined
const nullConstant: null = null
```

#### Union types

*Union types* declare a type that can be any of a number of types. This is often
useful for arrays with mixed types or functions that take various input.

```typescript
type stringOrNumberType = string | number
const typedArrayOfStringAndNumbers: stringOrNumberType[] = ['foo', 123, 'baz'] // Array of strings and numbers
```

## How to Type Functions

When I first came to Typescript, typing functions was confusing and frustrating.
Let's start simple!

#### Number to string

This function takes a number as input and returns the string version of that
number:

```typescript
type convertNumberToStringType = (num: number) => string;
const convertNumberToString: convertNumberToStringType = (num) => '' + num
> convertNumberToString(8)
'8'
```

Above, the function type is declared before the function itself. While useful
when used more than once, in practice, function type signatures are typically
declared inline:

```typescript
const convertNumberToString: (num: number) => string = (num) => '' + num
```

## How to Type Objects: Interfaces  

It won't be long after you start writing Typescript, before you need to declare
an object. At this point, I occasionaly found myself scratching my head as to
how best to type them.

For me, the answer was *interfaces*. Interfaces are a way of declaring the
structure of an object for typing purposes.

### A Basic Interface: Book

Let's take the example of a book. In Javascript, it might look like this:

```typescript
{
  title: '1984',
  author: 'George Orwell',
  pages: 328,
}
```

The Typescript interface for this object would look like this:

#### "My First Typescript Interface"

```typescript
interface Book {
  title: string
  author: string
  pages: number
}
```

To apply this interface as a type annotation to our Javascript object:

```typescript
const book: Book = {
  title: '1984',
  author: 'George Orwell',
  pages: 328,
}
```

### Nested interfaces: Author

What if the `author` property requires additional data to the author's name?
Let's add more properties about the author.

#### Typescript Interface with Nested Object

```typescript
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
```

Now let's set our novel's author to `georgeOrwell`:

```typescript
> const book: Book = {
>  title: '1984',
>  author: georgeOrwell,
>  pages: 328,
>}
Type 'Author' is not assignable to type 'string'.

25   author: georgeOrwell,
     ~~~~~~
```

Oops! Our `Book` expects the `author` to property to be a string. We need to 
update the Book type to allow an `Author` type assigned to its `author`
property:

```typescript
interface Book {
  title: string
  author: Author
  pages: number
}
```

### Interfaces with dynamic key names.

What happens when you have an object but don't necessarily know the keys? An
example of this is indexing data for quicker access.

Here is how to declare an interface without knowing the exact keys, but only
the keys' type:

#### Object with Unknown keys

```typescript
interface BookRepository {
  [authorName: string]: Book[]
}

const repo: BookRepository = {
  "George Orwell": [{ title: "1984", pages: 328, author: georgeOrwell }],
  "Herman Melville": [{ title: "Moby-Dick", pages: 704, author: hermanMelville }],
}
```

The `BookRepository` type can accept a variety of author's names as keys, and we
are not required to delineate every possible key.

## Advanced Function Typing

Let's take the previous example a step further by adding a function that appends
a book to an author's bibliography.

#### Function: Publish Book

```typescript
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
```

Let's try it out!

```typescript
> publishBook(georgeOrwell, { title: '1984', pages: 328 })
{
  firstName: 'George',
  lastName: 'Orwell',
  born: '1903-06-25',
  died: '1950-01-21',
  books: [ { title: '1984', pages: 328, author: [Object] } ]
}
```

:muscle: Success! The function returns a new representation of the
"George Orwell" author, with *1984* appended to the `Author`'s list of books.

## Bonus: Enums and Tuples

Let's take a quick look at two other, useful types: Enums and Tuples.

### Enums: Categorization and State

Often, we have a property or variable with a specific set of possible values.
For the above `Book` scenario, a natural example is genres. For book genres, a
(non-comprehensive) enum might look like this:

#### Enums for categorization

```typescript
enum Genres {
  Literature = 'Literature',
  Fantasy = 'Fantasy',
  ScienceFiction = 'Science Fiction',
  History = 'History',
  Biography = 'Biography',
}

interface Book {
  ...
  genre: Genres
}

const mobyDick = {
  title: 'Moby-Dick',
  pages: 704,
  author: hermanMelville,
  genre: Genres.Literature,
}
```

Let's inspect the `genre` property:

```typescript
> mobyDick.genre
"Literature"
```

That's right, *Moby-Dick* is a work of literature :book:. 

#### State

Enums are also useful for representing state:

```typescript
enum PublicationState {
  Draft = 0,
  Editing,
  Published,
  OutOfPrint,
}
```

In this example, Typescript automatically sets the enum value of `Editing` to
`1`, `Published` to `2`, and so on.

### Tuples: Useful for Return Types

Tuples are an array with a finite, ordered array with defined types. While used less frequently than Enums, they are useful for function return types. A
specific example is when a function returns multiple values, and we want to
allow the consumer of those values flexibility to name them.

#### Function with Multiple Return Values

```typescript
type AuthorInfo = [string, number]
const getAuthorInfo: (author: Author) => AuthorInfo = ({ firstName, lastName, books }) => [`${lastName}, ${firstName}`, books.length]

const [melvilleFullName, melvilleBooksCount]: AuthorInfo = getAuthorInfo(hermanMelville)
const [orwellFullName, orwellBooksCount]: AuthorInfo = getAuthorInfo(georgeOrwell)
```
