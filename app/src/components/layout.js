import React from "react"
import { Link } from "gatsby"
import { ViewportProvider } from '../hooks/useViewport'

import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children, isFull }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.25),
          marginBottom: rhythm(1),
          marginTop: 0,
          border: 'none',
          textAlign: 'center',
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <ViewportProvider>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: isFull ? "100%" : rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © 2020 - {new Date().getFullYear()} Benjamin Bergstein
        </footer>
      </div>
    </ViewportProvider>
  )
}

export default Layout
