const BlogForm = ({
  createBlog,
  handleNewBlogTitleChange,
  handleNewBlogAuthorChange,
  handleNewBlogUrlChange,
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            value={newBlogTitle}
            onChange={handleNewBlogTitleChange}
            name='title'
          />
        </div>
        <div>
          author:
          <input
            value={newBlogAuthor}
            onChange={handleNewBlogAuthorChange}
            name='author'
          />
        </div>
        <div>
          url:
          <input
            value={newBlogUrl}
            onChange={handleNewBlogUrlChange}
            name='url'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm