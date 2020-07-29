import React, { useEffect } from 'react'
import Container from './Container.js'

function Page(props) {
  // useEffect (a,b) a is the function to run when the value in b changes
  // useEffect(a,[]) tells react to run the first-time (as it looks for an empty array)
  useEffect(() => {
    document.title = `${props.title} | ComplexApp`
    window.scrollTo(0, 0)
  }, [])

  return <Container wide={props.wide}>{props.children}</Container>
}

export default Page
