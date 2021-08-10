---
title: "Typescript Generics: Writing a node-fetch wrapper"
date: "2021-08-07T00:12:03.284Z"
description: "Diving into one the type system's more opaque features."
category: engineering
status: published
---

## Background

For most use cases, built-in and custom types serve the needs of Typescript
developers. However, at some point in any sufficiently complex codebase,
abstractions are necessary. But how to type abstract or reusable functions? We
can use generic types, of course!

## Contents

```toc
exclude: Contents|Background
fromHeading: 1
toHeading: 2
```

## Use case: fetch client.

Let's say we are building a project that requires integration with an API
endpoint. We have a few parameter and response types:

```typescript
type SearchMoviesParameters = Partial<{
  q: string
  genre: string
}>

type SearchMoviesResponse = {
  movies: Movie[]
}

type FetchMovieParameters = {
  uuid: string
}

type FetchMovieResponse  = {
  movie: Movie
}

type Movie = {
  uuid: string
  title: string
  director: string
  released: number
}
```

We could integrate with fetch directly for each request. However, it is DRY-er
("Don't repeat yourself") to write a generic function to integrate with fetch,
and then write a function to wrap each request.  It will also establish a foundation
for other requests, allowing us to simply add additional types & write a little 
wrapper, but still use the same code for shared logic like performing the request.

## The generic function

```typescript
import fetch, { RequestInfo, RequestInit } from 'node-fetch'

const baseUrl = 'https://www.example.com/api'

async function performRequest<Parameters, Response>(
  path: string,
  params: Parameters,
  init?: RequestInit
): Promise<Response> {
  const { headers } = init || {}
  const body = JSON.stringify(params)

  const response = await fetch(`${baseUrl}${path}, {
    ...init,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body,
  })
  const json = await response.json()
  return json as Response
}
```

Let's break that down.

## Breakdown

```typescript
async function performRequest<Parameters, Response>(
```

This declares an asynchronous function, `performRequest`, that requires
two generic arguments: `Parameters` and `Response`.

Why do we require generic type arguments? Because the input and output of this
function varies depending on what request it is using. Different requests have
different input and outputs. Generic arguments allow uses of this function to
share this code while varying input and output types.

```typescript
path: string,
params: Parameters,
init?: RequestInit
```

First, we accept a string, `path`, which we concatenate with the base URL to
arrive at the fully resolved URL for the request.

The real key here is `params: Parameters`, which specifies that the parameters
argument will be of whatever type is specified at the time this function is
used. This allows usages to specify that parameters must be of a certain type.

Finally, optionally access any additional arguments to pass along to `fetch`.

```typescript
return json as Response
```

The fetch request itself is straightforward. Once we arrive at the final JSON
data by awaiting `response.json()`, we cast the json as `Response`, the second type argument.

## Using the function

Let's implement the `searchMovies` function:

```typescript
const searchMovies = async (
  params: SearchMoviesParameters
): Promise<SearchMoviesResponse> => performRequest<
  SearchMoviesParameters,
  SearchMoviesResponse
>("/movies/search", params)
```

Implementation was quite easy! Then to 

```typescript
const movies = await searchMovies(q: "still walking")
```

Pretty nice!

## Wrap up

TypeScript generics can seem intimidating. But without them, refactoring and
reusing your code will be very difficult to type. It's definitely worth getting
comfortable using them, especially as they enable strongly-typed integrations
with libraries!
