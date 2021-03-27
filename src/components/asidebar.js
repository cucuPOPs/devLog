import React from "react"
import { navigate } from "gatsby"
import ListItem from "../components/ListItem"
import { groupBy } from "../util/utils"
const Asidebar = props => {
  const { isMain, currentSlug, totalNode } = props
  const arr = totalNode
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
    ...new Set(totalNode.map((v, i) => v.node.fields.slug.split("/")[1])),
  ]
  const result = groupBy(arr, "parent")

  return (
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
              key={i}
              title={v.split(".")[1]}
              isOpen={!isMain && v === currentSlug.split("/")[1]}
            >
              {result[v].map((v2, i2) => (
                <li key={i2} style={{ paddingLeft: "15px" }}>
                  <a
                    href="#"
                    onClick={() => {
                      const parent = v2.child.split("/")[1].split(".")[1]
                      const child = v2.child.split("/")[2].split(".")[1]
                      navigate(`/${parent}/${child}`)
                    }}
                    className={`sidebar-link ${
                      !isMain && currentSlug === v2.child ? "active" : ""
                    }`}
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
  )
}

export default Asidebar
