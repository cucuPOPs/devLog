import React from "react"
import "../test.css"
import Layout from "../components/layout"
require("prismjs/themes/prism-okaidia.css")
export default function Template(props) {
  const frontmatter = props.pageContext.frontmatter
  const slug = props.pageContext.slug
  const html = props.pageContext.html
  const totalNode = props.pageContext.totalNode
  console.log("props", props)
  return (
    <Layout
      isMain={false}
      currentSlug={slug}
      totalNode={totalNode}
      contentTitle={frontmatter.title}
      contentFirstDate={frontmatter.firstDate}
      contentLastUpdate={frontmatter.lastDate}
    >
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}
