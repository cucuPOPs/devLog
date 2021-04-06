import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "../global.css"
import Layout from "../components/layout"
export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
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
`
const IndexPage = props => {
  console.log("props", props.data)
  return (
    <Layout
      isMain={true}
      totalNode={props.data.allMarkdownRemark.edges}
      contentTitle={
        <>
          오늘 배운 건
          <br />
          오늘 적자
        </>
      }
      contentFirstDate={`2021.03.18 `}
      contentLastUpdate={`2021.03.28 `}
    >
      <div className="infoContainer">
        <div className="name">박기락's TIL</div>
        <ul>
          <li>
            <a href="https://github.com/cucupops">GitHub</a>
          </li>
          <li>홀리몰리~</li>
          <li>홀리몰리~</li>
        </ul>
      </div>
    </Layout>
  )
}

export default IndexPage
