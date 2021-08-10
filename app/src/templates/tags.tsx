import React, { FC } from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import TagsList from "../components/TagsList"
import { rhythm } from "../utils/typography"

// Components
import { Link, graphql, PageProps } from "gatsby"

type TagProps = {
  tag: string
}

const Tags: FC<PageProps<TagProps>> = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tags = data.tagsGroup.group
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  }`

  return (
    <Layout location={location} title={`Posts tagged "${tag}"`}>
      <h6>{tagHeader}</h6>
      {edges.map(({ node }) => {
        const { slug } = node.fields
        const { title } = node.frontmatter
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>
                {node.frontmatter.date}
                {process.env.NODE_ENV === 'development' ? (<em> – {node.frontmatter.status}</em>) : ''}
              </small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
      <TagsList tags={tags} />
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    tagsGroup: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`
