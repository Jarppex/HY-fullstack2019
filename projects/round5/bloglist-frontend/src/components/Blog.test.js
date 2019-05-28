import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Blog from './Blog'

const blog = {
  title: 'Kirjoitelmia elämästä',
  author: 'Helena',
  url: 'www.helenankirjoitelmat.fi',
  likes: 3,
  user: {
    name: 'Helena Helisevä'
  }
}
const user = {
  name: 'Jorma Jykevä'
}

describe('<Blog />', () => {
  let component
  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} />
    )
  })
  afterEach(cleanup)

  it('at start only title and author are displayed', () => {
    //const mockHandler = jest.fn()
    //component.debug()
    expect(component.container).toHaveTextContent(
      'Kirjoitelmia elämästä')
    expect(component.container).toHaveTextContent('Helena')
    expect(component.container).not.toHaveTextContent(3)
    expect(component.container).not.toHaveTextContent(
      'www.helenankirjoitelmat.fi')
    expect(component.container).not.toHaveTextContent(
      'Helena Helisevä')
    expect(component.container).not.toHaveTextContent(
      'Jorma Jykevä')
    //component.debug()
  })
  it('after clicking the blog, other information is displayed aswell', () => {
    //const mockHandler = jest.fn()
    //component.debug()
    const element = component.container.querySelector(
      '.minInfo')
    fireEvent.click(element)
    expect(component.container).toHaveTextContent(
      'Kirjoitelmia elämästä')
    expect(component.container).toHaveTextContent('Helena')
    expect(component.container).toHaveTextContent(3)
    expect(component.container).toHaveTextContent(
      'www.helenankirjoitelmat.fi')
    expect(component.container).toHaveTextContent(
      'Helena Helisevä')
    //component.debug()
  })
})