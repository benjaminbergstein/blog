const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const PAGES_QUERY = `
{
  allMarkdownRemark(
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
        }
      }
    }
  }
}`

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogIndex = path.resolve(`./src/templates/index.js`)
  createPage({
    path: '/',
    component: blogIndex,
    context: {
      statuses: ["draft", "published"],
    },
  })

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(PAGES_QUERY)

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

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
