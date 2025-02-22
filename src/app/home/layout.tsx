"use client"

import { useEffect } from "react";

interface Props {
  children: React.ReactNode
}

function Layout(props: Props) {
  const {
    children
  } = props 

  return (
    <div className=' w-full ' >
      {children}
    </div>
  )
}

export default Layout
