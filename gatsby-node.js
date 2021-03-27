const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const relativeFilePath = createFilePath({
      node,
      getNode,
    })
    createNodeField({
      name: `slug`,
      node,
      value: `${relativeFilePath}`,
    })
  }
}
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const postTemplete = require.resolve(`./src/templates/blogTemplate.js`)
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }, index, array) => {
    const parent = node.fields.slug.split("/")[1].split(".")[1]
    const child = node.fields.slug.split("/")[2].split(".")[1]
    createPage({
      path: `${parent}/${child}`,
      component: postTemplete,
      context: {
        slug: node.fields.slug,
        frontmatter: node.frontmatter,
        html: node.html,
        totalNode: array,
      },
    })
  })
}
