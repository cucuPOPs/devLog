import React from "react"

import { graphql, navigate } from "gatsby"
import { groupBy } from "../util/utils"
import moment from "moment"
import styled from "styled-components"
import ListItem from "../components/ListItem"
require("prismjs/themes/prism-solarizedlight.css")
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark, allMarkdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const arr = allMarkdownRemark.edges.map((v, i) => ({
    child: v.node.frontmatter.slug,
    parent: v.node.frontmatter.slug.split("/")[1],
  }))
  const parentList = [
    ...new Set(
      allMarkdownRemark.edges.map(
        (v, i) => v.node.frontmatter.slug.split("/")[1]
      )
    ),
  ]
  const result = groupBy(arr, "parent")
  return (
    <Container>
      <Header>
        <FlexDiv
          style={{ fontSize: "24px" }}
          onClick={() => {
            navigate("/")
          }}
        >{`Today I Learned`}</FlexDiv>
        <FlexDiv>책책체킷아웃~</FlexDiv>
      </Header>
      <FlexDiv style={{ height: "calc( 100% - 60px )" }}>
        <SideBar>
          {parentList.map((v, i) => {
            return (
              <ListItem
                title={v}
                isOpen={v === markdownRemark.frontmatter.slug.split("/")[1]}
              >
                {result[v].map((v2, i2) => (
                  <div
                    onClick={() => {
                      navigate(v2.child)
                    }}
                  >
                    {v2.child.split("/")[2]}
                  </div>
                ))}
              </ListItem>
            )
          })}
        </SideBar>
        <ContentView>
          <Content>
            {/* <p style={{ textAlign: "center", fontSize: "40px" }}>
              {frontmatter.title}
            </p> */}
            <h1>{frontmatter.title}</h1>
            <p
              style={{
                fontSize: "14px",
                textAlign: "right",
                lineHeight: "20px",
                whiteSpace: "pre-wrap",
              }}
            >
              {`Last update\n`}
              {moment(frontmatter.date).format("YYYY년 MM월 DD일")}
            </p>

            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
              style={{ paddingBottom: "50px" }}
            />
          </Content>
        </ContentView>
      </FlexDiv>
    </Container>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
    allMarkdownRemark(sort: { fields: frontmatter___slug }, limit: 1000) {
      edges {
        node {
          frontmatter {
            slug
          }
        }
      }
    }
  }
`

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`
const FlexDiv = styled.div`
  display: flex;
  margin-top: ${props => props.mt || 0};
  margin-right: ${props => props.mr || 0};
  margin-bottom: ${props => props.mb || 0};
  margin-left: ${props => props.ml || 0};

  padding-top: ${props => props.pt || 0};
  padding-right: ${props => props.pr || 0};
  padding-bottom: ${props => props.pb || 0};
  padding-left: ${props => props.pl || 0};
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11.2px 24px;
  color: #2c3e50;
  border-bottom: 1px solid #eaecef;
  min-height: 60px;
`
const SideBar = styled.div`
  min-width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1000px;
  padding: 32px 40px;
`
const ContentView = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  justify-content: center;
`
