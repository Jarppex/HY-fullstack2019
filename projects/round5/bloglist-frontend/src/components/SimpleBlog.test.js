import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

const blog = {
  title: 'Kirjoitelmia elämästä',
  author: 'Helena',
  likes: 3
}

test('renders content', () => {
  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Kirjoitelmia elämästä')
  expect(component.container).toHaveTextContent('Helena')
  expect(component.container).toHaveTextContent(3)
})

it('clicking the button calls event handler once', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = component.container.querySelector('.button')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})