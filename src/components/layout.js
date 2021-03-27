import React, { useState } from "react"

import moment from "moment"
import Header from "../components/header"
import Asidebar from "../components/asidebar"

const Layout = props => {
  const {
    currentSlug,
    isMain,
    contentTitle,
    contentFirstDate,
    contentLastUpdate,
    children,
    totalNode,
  } = props

  const [asidebarVisible, setAsideBarVisible] = useState(false)
  return (
    <div className={`theme-container ${asidebarVisible ? "sidebar-open" : ""}`}>
      <Header
        asidebarVisible={asidebarVisible}
        setAsideBarVisible={setAsideBarVisible}
      />
      <Asidebar
        totalNode={totalNode}
        isMain={isMain}
        currentSlug={currentSlug}
      />
      <main className="page">
        <div className="theme-default-content content__default">
          <div>
            <h1>{contentTitle}</h1>
            <p
              style={{
                fontSize: "14px",
                textAlign: "right",
                lineHeight: "20px",
                whiteSpace: "pre-wrap",
              }}
            >
              {moment(contentFirstDate).format("YYYY.MM.DD.")}
              {`에 처음씀\n`}
              {moment(contentLastUpdate).format("YYYY.MM.DD.")}
              {`에 수정함`}
            </p>
            {children}
          </div>
        </div>
        <footer className="page-edit"> </footer>
      </main>
    </div>
  )
}
export default Layout
