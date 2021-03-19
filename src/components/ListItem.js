import { navigate } from "gatsby-link"
import React, { useState } from "react"
import styled from "styled-components"

const ListItem = props => {
  const { title, children, isOpen } = props
  const [open, setOpen] = useState(isOpen)
  return (
    <div>
      <p
        className={`sidebar-heading ${isOpen ? "open" : ""}`}
        onClick={() => {
          setOpen(!open)
        }}
      >
        <span>{title}</span>
        <span className={`arrow ${open ? "down" : "right"}`}></span>
      </p>
      {open && (
        <ul className={"sidebar-links sidebar-group-items"}>{children}</ul>
      )}
    </div>
  )
}
export default ListItem
