import React, { useState } from "react"

import { graphql, navigate } from "gatsby"
import { groupBy } from "../util/utils"
import moment from "moment"
import styled from "styled-components"
import ListItem from "../components/ListItem"
import "../test.css"
//import the Prism package
require("prismjs/themes/prism-okaidia.css")
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const [asidebarVisible, setAsideBarVisible] = useState(false)
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
  console.log(result)
  console.log(markdownRemark)
  return (
    <div className={`theme-container ${asidebarVisible ? "sidebar-open" : ""}`}>
      <header className="navbar">
        <div
          className="sidebar-button"
          onClick={() => {
            setAsideBarVisible(!asidebarVisible)
          }}
          onBlur={() => {
            setAsideBarVisible(false)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            viewBox="0 0 448 512"
            className="icon"
          >
            <path
              fill="currentColor"
              d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
            ></path>
          </svg>
        </div>
        <a
          href="#"
          onClick={() => {
            navigate("/")
          }}
          className="home-link router-link-active"
        >
          <span className="site-name">Today I Learned</span>
        </a>
        <div className="links" style={{ maxWidth: "913px" }}>
          <nav className="nav-links can-hide">
            <div className="nav-item">
              <a
                href="https://github.com/cucupops/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link external"
              >
                GitHub
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                    x="0px"
                    y="0px"
                    viewBox="0 0 100 100"
                    width="15"
                    height="15"
                    className="icon outbound"
                  >
                    <path
                      fill="currentColor"
                      d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
                    ></path>
                    <polygon
                      fill="currentColor"
                      points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
                    ></polygon>
                  </svg>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </header>
      <div className="sidebar-mask"></div>
      <aside className="sidebar">
        <nav className="nav-links">
          <div className="nav-item">
            <a
              href="#"
              onClick={() => {
                navigate("https://github.com/cucupops/")
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link external"
            >
              GitHub
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  width="15"
                  height="15"
                  className="icon outbound"
                >
                  <path
                    fill="currentColor"
                    d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
                  ></path>
                  <polygon
                    fill="currentColor"
                    points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
                  ></polygon>
                </svg>
              </span>
            </a>
          </div>
        </nav>
        <ul className="sidebar-links">
          {parentList.map((v, i) => {
            return (
              <ListItem
                title={v}
                isOpen={v === markdownRemark.frontmatter.slug.split("/")[1]}
              >
                {result[v].map((v2, i2) => (
                  <li>
                    <a
                      href="#"
                      onClick={() => {
                        navigate(v2.child)
                      }}
                      class={`sidebar-link ${
                        markdownRemark.frontmatter.slug === v2.child
                          ? "active"
                          : ""
                      }`}
                    >
                      {v2.child.split("/")[2]}
                    </a>
                  </li>
                ))}
              </ListItem>
            )
          })}
        </ul>
      </aside>
      <main className="page">
        <div className="theme-default-content content__default">
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
          />
        </div>
        <footer className="page-edit"> </footer>
      </main>

      {/* <FlexDiv style={{ height: "calc( 100% - 60px )", flexDirection: "row" }}>
        <SideBar>
          {parentList.map((v, i) => {
            return (
              <ListItem
                title={v}
                isOpen={v === markdownRemark.frontmatter.slug.split("/")[1]}
              >
                {result[v].map((v2, i2) => (
                  <li               
                  >
                  <a  onClick={() => {
                      navigate(v2.child)
                    }} class="sidebar-link">
                    {v2.child.split("/")[2]}
                    </a>
                  </li>
                ))}
              </ListItem>
            )
          })}
        </SideBar>
        <ContentView>
          <Content>
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
              classNameName="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
              style={{ paddingBottom: "50px" }}
            />
          </Content>
        </ContentView>
      </FlexDiv> */}
    </div>
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
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___priority, frontmatter___slug]
        order: [ASC, ASC]
      }
      limit: 1000
    ) {
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
  flex-direction: row;
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
