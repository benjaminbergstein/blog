---
title: "Typescript: Beyond Scalar Types"
date: "2020-05-08T00:12:03.284Z"
description: "Learn how to set up and use your own types in Typescript"
category: engineering
status: published
---

Over the last few months, I've been working more and more with Typescript. I've
found it difficult to find a number of use cases stated plainly.

This guide is for anyone starting with typescript who is hitting a wall on how
to express typed code, especially coming from untyped languages. It presumes
familiarity with modern Javascript syntax.

## Typing Use Cases

Let's look at a few use cases:

:one: Review: Basic Types  
:two: Typing Functions  
:three: Interfaces  
:four: Advanced Function Typing  
:five: Tuples  

## Review: Basic Types

Let's quickly cover some examples of scalar typing in Typescript.

#### Typed strings, numbers, arrays

These are everyday types.

```typescript
const typedString: string = "bar" // Typed string
const typedNumber: number = 123 // Typed number
const typedArrayOfStrings: string[] = ['foo', 'bar', 'baz'] // Array of strings
```

#### Any, void, null, undefined

These tend to be used when typing function argument or return values

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

## Typing functions

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

## Interfaces  

It won't be long after you start writing Typescript, before you need to declare
an object. At this point, you might be scratching your head as to how to type
them. The answer is *interfaces*.

Interfaces are a way of declaring the structure of an object for typing
purposes.

### A Basic Interface: Book

Let's use the classic example of a book, which in Javascript might look like
this:

```typescript
{
  title: '1984',
  author: 'George Orwell',
  pages: 328,
}
```

The interface for this object would look like this:

```typescript
interface Book {
  title: string
  author: string
  pages: number
}
```

To apply this interface:

```typescript
const book: Book = {
  title: '1984',
  author: 'George Orwell',
  pages: 328,
}
```

#### Layering interfaces: Author

What if we want the `author` property to be more than a string? Let's add an `Author` interface:

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

Oops! We need to update the book type:

```typescript
interface Book {
  title: string
  author: Author
  pages: number
}
```

#### Interfaces with dynamic key names.

What happens when you have an object but don't necessarily know the keys? An
example of this is indexing data for quicker access.

Here is how to declare an interface when knowing they types of the keys and
values, but not the actual keys:

```typescript
interface BookRepository {
  [authorName: string]: Book[]
}

const repo: BookRepository = {
  "George Orwell": [{ title: "1984", pages: 328, author: georgeOrwell }],
  "Herman Melville": [{ title: "Moby-Dick", pages: 704, author: hermanMelville }],
}
```

## Advanced Function Typing: Book

Let's take the previous example a step further, and add a function that adds
book to an author's bibliography.

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

## 
## Tuples  


