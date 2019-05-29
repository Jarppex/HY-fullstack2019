import React from 'react'
import {
  render, waitForElement, act
} from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    let component
    // <App/> renderöinti tulostaa testissä virheviestin
    // konsoliin, joka kehoittaa laittamaan sen act() sisään.
    // Tämä ei kuitenkaan poista herjausta.
    // Nopeaa googlettelu antoi vihjettä, että kyseessä voisi
    // olla bugi.
    act(() => {
      component = render(<App />)
    })
    //console.log(component)
    //component.debug()
    act(() => {
      component.rerender(<App />)
    })
    //component.debug()
    await waitForElement(
      () => component.container.querySelector('.loginForm')
    )
    //component.debug()
    const element = component.container.querySelector('.loginForm')
    //console.log(element)
    expect(element).toHaveTextContent('käyttäjätunnus')
    expect(element).toHaveTextContent('salasana')
    expect(element).toHaveTextContent('kirjaudu')
    expect(element).not.toHaveTextContent('blog')

    const blogs = component.container.querySelectorAll('.blog')
    //console.log(blogs)
    expect(blogs.length).toBe(0)
  })
})