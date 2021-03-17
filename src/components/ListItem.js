import { navigate } from "gatsby-link"
import React, { useState } from "react"
import styled from "styled-components"

const ListItem = props => {
  const { title, children, isOpen } = props
  const [open, setOpen] = useState(isOpen)
  return (
    <div>
      <Title
        onClick={() => {
          setOpen(!open)
        }}
      >
        {title}
      </Title>
      {open && <ChildItem>{children}</ChildItem>}
    </div>
  )
}
export default ListItem
const Title = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #555;
  color: #fff;
  &:hover {
    background-color: #ccc;
  }
  padding-left: 10px;
`
const ChildItem = styled.div`
  padding-left: 30px;
  background-color: #f1f1f1;
  & div {
    &:hover {
      color: yellowgreen;
    }
  }
`
