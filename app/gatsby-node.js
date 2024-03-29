const path = require(`path`)
const kebabCase = require('lodash/kebabCase')
const { createFilePath } = require(`gatsby-source-filesystem`)

const PAGES_QUERY = `
query PagesQuery($statuses: [String]!) {
  allMarkdownRemark(
    filter: { frontmatter: { status: { in: $statuses } } }
    sort: { fields: [frontmatter___date], order: DESC },
    limit: 1000
  ) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          category
        }
      }
    }
  }
  tagsGroup: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
      }
  }
}`

const isProduction = process.env.NODE_ENV === 'production'
const INDEXED_STATUSES = isProduction ? ["published"] : ["draft", "published"]

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogIndex = path.resolve(`./src/templates/index.js`)
  createPage({
    path: '/',
    component: blogIndex,
    context: {
      statuses: INDEXED_STATUSES,
    },
  })

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve("src/templates/tags.tsx")

  const result = await graphql(PAGES_QUERY, {
    statuses: INDEXED_STATUSES,
  })

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const { category } = post.node.frontmatter

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  const tags = result.data.tagsGroup.group
  tags.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  const portfolio = path.resolve(`./src/templates/portfolio.js`)
  createPage({
    path: '/photography',
    component: portfolio,
  })

  if (!isProduction) {
    const gallery = path.resolve(`./src/templates/gallery.js`)
    createPage({
      path: '/gallery',
      component: gallery,
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
