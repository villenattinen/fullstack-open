import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { Card, H2 } from '@blueprintjs/core'
import BlogComments from './BlogComments'
import BlogLikes from './BlogLikes'
import BlogDelete from './BlogDelete'

const Blog = () => {
  const user = useSelector((state) => state.login)
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)

  if (!user || !blog) {
    return null
  }

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  return (
    <Card className="blog">
      <Card>
        <H2>
          {blog.title} {blog.author}
        </H2>
        <div>
          <DivWithMargin>
            <a href={blog.url}>{blog.url}</a>
          </DivWithMargin>
          <BlogLikes blog={blog} />
          <DivWithMargin>Added by {nameOfUser}</DivWithMargin>
          <BlogDelete blog={blog} user={user} />
        </div>
      </Card>
      <BlogComments blog={blog} />
    </Card>
  )
}

const DivWithMargin = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`

export default Blog
