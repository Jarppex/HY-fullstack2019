import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Kirjoitelmia elämästä',
    author: 'Helena',
    likes: 3
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Kirjoitelmia elämästä')
  expect(component.container).toHaveTextContent('Helena')
  expect(component.container).toHaveTextContent(3)
})