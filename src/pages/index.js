import React, { useState } from "react"
import { Link, navigate, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import moment from "moment"
import { groupBy } from "../util/utils"
import ListItem from "../components/ListItem"
import "../global.css"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
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
    }
  `)
  const { allMarkdownRemark } = data
  const arr = allMarkdownRemark.edges
    .sort((a, b) => {
      const temp1 = Number(a.node.fields.slug.split("/")[1].split(".")[0])
      const temp2 = Number(b.node.fields.slug.split("/")[1].split(".")[0])
      if (temp1 === temp2) {
        return (
          Number(a.node.fields.slug.split("/")[2].split(".")[0]) -
          Number(b.node.fields.slug.split("/")[2].split(".")[0])
        )
      } else {
        return temp1 - temp2
      }
    })
    .map((v, i) => ({
      child: v.node.fields.slug,
      parent: v.node.fields.slug.split("/")[1],
      title: v.node.frontmatter.title,
    }))
  const parentList = [
    ...new Set(
      allMarkdownRemark.edges.map((v, i) => v.node.fields.slug.split("/")[1])
    ),
  ]
  const result = groupBy(arr, "parent")
  const [asidebarVisible, setAsideBarVisible] = useState(false)
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
              <ListItem title={v} isOpen={false} key={i}>
                {result[v].map((v2, i2) => (
                  <li key={i2} style={{ paddingLeft: "15px" }}>
                    <a
                      href="#"
                      onClick={() => {
                        const parent = v2.child.split("/")[1].split(".")[1]
                        const child = v2.child.split("/")[2].split(".")[1]
                        navigate(`/${parent}/${child}`)
                      }}
                      className={`sidebar-link`}
                    >
                      {v2.title}
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
          <div>
            <div className="titleContainer">
              <h1>
                오늘 배운 건
                <br />
                오늘 적자
              </h1>

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
            </div>
          </div>
        </div>
        <footer className="page-edit"> </footer>
      </main>
    </div>
  )
}

export default IndexPage
