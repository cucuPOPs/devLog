import * as React from "react"
import { Link, navigate, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import moment from "moment"
import { groupBy } from "../util/utils"
import ListItem from "../components/ListItem"
import "./src/global.css"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
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
  `)
  const { allMarkdownRemark } = data
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
              <ListItem title={v} isOpen={false}>
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
            <p
              style={{
                fontSize: "80px",
                whiteSpace: "pre-wrap",
                margin: "80px 0px",
                lineHeight: "100px",
                borderBottom: "15px solid yellowgreen",
              }}
            >
              {`오늘 배운건\n오늘 적자`}
            </p>
            <p
              style={{
                fontSize: "32px",
                textAlign: "right",
                whiteSpace: "pre-wrap",
              }}
            >
              {`박기락's TIL`}
            </p>
          </Content>
        </ContentView>
      </FlexDiv>
    </Container>
  )
}

export default IndexPage
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`
const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
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
  flex-direction: row;
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
