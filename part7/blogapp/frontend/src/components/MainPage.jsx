import { createRef } from 'react'
import BlogList from './BlogList'
import Togglable from './Togglable'
import NewBlog from './NewBlog'

const MainPage = () => {
  const blogFormRef = createRef()

  return (
    <div>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default MainPage
