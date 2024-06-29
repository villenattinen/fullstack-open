import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Card } from '@blueprintjs/core'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} className="blog">
          <Link to={`/blogs/${blog.id}`}>
            <Button minimal text={`${blog.title} by ${blog.author}`} />
          </Link>
        </BlogCard>
      ))}
    </div>
  )
}

const BlogCard = styled(Card)`
  margin-top: 10px;
  margin-bottom: 10px;
`

export default BlogList
