import React, { useContext, createContext, useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagsList from "../components/TagsList"
import { rhythm } from "../utils/typography"

import { Divider, Box, Row, Card, Column, HoverCard, TagCard } from '../components/ui'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const firstThree = posts.slice(0, 3)
  const rest = posts.slice(3)
  const tags = data.tagsGroup.group
  const images = data.photosGroup.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <Row>
        <Column>
          <TagCard tag="typescript">
            Posts about TypeScript
          </TagCard>
        </Column>
        <Column>
          <TagCard tag="tutorials">
            Coding tutorials
          </TagCard>
        </Column>
        <Column>
          <TagCard tag="react">
            Learn React
          </TagCard>
        </Column>
      </Row>
      <div>
        <h3>Latests posts</h3>
        <Row>
          {firstThree.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <Column>
                <Link to={node.fields.slug}>
                  <HoverCard>
                    {title}
                  </HoverCard>
                </Link>
              </Column>
            )
          })}
        </Row>
      </div>

      <Divider />

      <TagsList tags={tags} />
      <div>
        <h3>Latest photography</h3>
        <Row>
          {images.map(({ node: { base, childImageSharp: img } }) => (
            <Column>
              <Link to="/photography">
                <HoverCard padding={0} minHeight={"0px"} margin={0} overflow="hidden">
                  <img style={{ marginBottom: 0 }} src={img.thumbnail.src} width="100%" />
                </HoverCard>
              </Link>
            </Column>
          ))}
        </Row>
      </div>
      <Divider />

      <h3>More posts</h3>
      {rest.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
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
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogIndex($statuses: [String]!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { status: { in: $statuses } } },
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            category
            title
            description
            status
          }
        }
      }
    }
    tagsGroup: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
    photosGroup: allFile(
      filter: { absolutePath: { regex: "/portfolio.+JPG/" } }
      sort: { fields: [absolutePath], order: DESC },
      limit: 3
    ) {
      edges {
        node {
          base
          childImageSharp {
            thumbnail: fluid(maxWidth: 1024) {
              src
            }
            original {
              width
              height
              src
            }
          }
        }
      }
    }
  }
`

export default BlogIndex
