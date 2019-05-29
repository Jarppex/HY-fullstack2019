import React from 'react'
import {
  render, waitForElement, act
} from 'react-testing-library'
//import { prettyDOM } from 'dom-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {

  it('if no user logged, blogs are not rendered', async () => {
    let component
    act(() => component = render(<App />))
    act(() => component.rerender(<App />))
    // <App/> renderöinti tulostaa testissä virheviestin
    // konsoliin, joka kehoittaa laittamaan sen act() sisään.
    // Tämä ei kuitenkaan poista herjausta.
    // Nopea googlettelu antoi vihjettä, että kyseessä voisi
    // olla bugi.
    const element = await waitForElement(
      () => component.container.querySelector('.loginForm')
    )
    expect(element).toHaveTextContent('käyttäjätunnus')
    expect(element).toHaveTextContent('salasana')
    expect(element).toHaveTextContent('kirjaudu')
    expect(element).not.toHaveTextContent('blog')

    const blogs = await waitForElement(
      () => component.container.querySelectorAll('.blog')
    )
    expect(blogs.length).toBe(0)
  })

  it('if user is logged, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }
    localStorage.setItem('lastLoggedUser', JSON.stringify(user))

    let component
    act(() => component = render(<App />))
    act(() => component.rerender(<App />))

    expect(component.container).toHaveTextContent('Teuvo Testaaja logged in')

    await waitForElement(
      () => component.container.querySelector('.blog')
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(2)
    expect(component.container).toHaveTextContent('Kirjoitelmia elämästä by Helena')
    expect(component.container).toHaveTextContent('Ruoanlaitto by Timppa')
  })
})