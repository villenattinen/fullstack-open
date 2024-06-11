import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, but not url and likes by default', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'Blog url',
    likes: 1,
  }

  render(
    <Blog
      blog={blog}
      username='username'
      updateBlog={() => {}}
      deleteBlog={() => {}}
    />
  )

  expect(screen.getByRole('button', { name: /view/i })).toBeDefined()
  expect(screen.getByText('Blog title Blog author')).toBeDefined()
  expect(screen.queryByText('Blog url')).toBeNull()
  expect(screen.queryByText('likes')).toBeNull()
})