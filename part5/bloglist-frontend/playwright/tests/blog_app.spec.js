const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Reset the database (delete blogs and users)
    await request.post('http:localhost:3003/api/testing/reset')
    // Add a single user
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })

    // Open the application
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // Check that the login text is visible
    const locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // Enter the username and password
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('salainen')
      // Click the login button
      await page.getByRole('button' , { name: 'login' }).click()

      // Check that the user is logged in
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // Enter the username and password
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('wrong')
      // Click the login button
      await page.getByRole('button' , { name: 'login' }).click()

      // Check that the error message is visible
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // Log in as default user
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('salainen')
      await page.getByRole('button' , { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      // Open the new blog form
      await page.getByRole('button' , { name: 'new blog' }).click()
      // Fill in the form
      await page.getByRole('textbox', { name: 'title' }).fill('test title')
      await page.getByRole('textbox', { name: 'author' }).fill('test author')
      await page.getByRole('textbox', { name: 'url' }).fill('test url')
      // Submit the form
      await page.getByRole('button', { name: 'create' }).click()

      // Check that the new blog is shown
      await expect(page.getByText('test title test author')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      // Open the new blog form
      await page.getByRole('button' , { name: 'new blog' }).click()
      // Fill in the form
      await page.getByRole('textbox', { name: 'title' }).fill('test title')
      await page.getByRole('textbox', { name: 'author' }).fill('test author')
      await page.getByRole('textbox', { name: 'url' }).fill('test url')
      // Submit the form
      await page.getByRole('button', { name: 'create' }).click()
      // Open the blog
      await page.getByRole('button', { name: 'view' }).click()
      // Like the blog
      await page.getByRole('button', { name: 'like' }).click()

      // Check that likes have increased to one
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {
      // Open the new blog form
      await page.getByRole('button' , { name: 'new blog' }).click()
      // Fill in the form
      await page.getByRole('textbox', { name: 'title' }).fill('test title')
      await page.getByRole('textbox', { name: 'author' }).fill('test author')
      await page.getByRole('textbox', { name: 'url' }).fill('test url')
      // Submit the form
      await page.getByRole('button', { name: 'create' }).click()
      // Open the blog
      await page.getByRole('button', { name: 'view' }).click()
      // Will auto-accept the dialog when it pops up
      page.on('dialog', dialog => dialog.accept())
      // Delete the blog
      await page.getByRole('button', { name: 'remove' }).click()

      // Check that the blog is no longer shown
      await expect(page.getByText('test title test author')).toHaveCount(0)
    })

    test('only the user who created a blog sees the remove button', async ({ page, request }) => {
      // Open the new blog form
      await page.getByRole('button' , { name: 'new blog' }).click()
      // Fill in the form
      await page.getByRole('textbox', { name: 'title' }).fill('test title')
      await page.getByRole('textbox', { name: 'author' }).fill('test author')
      await page.getByRole('textbox', { name: 'url' }).fill('test url')
      // Submit the form
      await page.getByRole('button', { name: 'create' }).click()
      // Log out of default user
      await page.getByRole('button', { name: 'logout' }).click()
      // Create second user
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Toinen Matti',
          username: 'mattimasa',
          password: 'nenialas',
        },
      })
      // Log in as second user
      await page.getByRole('textbox').first().fill('mattimasa')
      await page.getByRole('textbox').last().fill('nenialas')
      await page.getByRole('button' , { name: 'login' }).click()
      // Open the blog
      await page.getByRole('button', { name: 'view' }).click()
      // Check that the remove button is not visible
      await expect(page.getByRole('button', { name: 'remove' })).toHaveCount(0)
    })
  })
})