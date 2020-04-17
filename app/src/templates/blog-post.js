import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const formatQuantity = ({ quantity, unit }) => {
  if (quantity && unit) return `${quantity} ${unit} `
  if (quantity && !unit) return `${quantity} `
  if (!quantity && unit) return `${unit} `
  if (!quantity && !unit) return ""
}
const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const intro = data.intro
  const siteTitle = data.site.siteMetadata.title
  const ingredients = (data.ingredients || {}).childrenIngredientsYaml
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>

        {intro && <section dangerouslySetInnerHTML={{ __html: intro.html }} />}
        {ingredients && <>
          <h2>Ingredients</h2>
          <section>
            <ul>
            {ingredients.map(({ name, unit, quantity, note, prep }) => (
              <li>
                {formatQuantity({ quantity, unit })}{name}{prep && `, ${prep}`}

                {note && <p>{note}</p>}
              </li>
            ))}
            </ul>
          </section>
          </>}

        {post.frontmatter.type !== 'engineering' && <h2>Procedure</h2>}
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    intro: file(
      absolutePath: {
        regex: $slug
      },
      name: { eq: "intro" }
    ) {
      childMarkdownRemark {
        html
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        type
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    ingredients: file(
      absolutePath: {
        regex: $slug
      },
      name: { eq: "ingredients" }
    ) {
      childrenIngredientsYaml {
        name
        unit
        note
        quantity
        prep
      }
    }
  }
`
