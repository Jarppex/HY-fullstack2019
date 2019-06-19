/* eslint-disable no-undef */

describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Janne Mäkelä',
      username: 'JarppeXX',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login page can be opened', function() {
    cy.contains('Log in to application')
  })

  describe('when logged in', function() {

    beforeEach(function() {
      cy.get('#username')
        .type('JarppeXX')
      cy.get('#password')
        .type('salainen')
      cy.contains('Login')
        .click()
    })

    it('name of the user is shown', function() {
      cy.contains('Janne Mäkelä logged in')
    })

    describe('after blog creation', function() {

      beforeEach(function() {
        cy.get('#openForm')
          .click()
        cy.get('#title')
          .type('Nice new blog')
        cy.get('#author')
          .type('Mr.tester')
        cy.get('#url')
          .type('www.test.org')
        cy.contains('Add blog')
          .click()
        cy.get('#closeForm')
          .click()
      })

      it('a new blog can be seen', function() {
        cy.contains('Nice new blog')
      })

      describe('after opening the blog', function() {

        beforeEach(function() {
          cy.contains('Nice new blog')
            .click()
        })

        it('a blog view can be seen', function() {
          cy.contains('Nice new blog')
          cy.contains('Mr.tester')
          cy.contains('www.test.org')
          cy.contains('Like')
          cy.contains('Added by You')
        })

        it('can like the blog', function() {
          cy.get('#likes').contains(0)
          cy.get('#likeButton').click()
          cy.get('#likes').contains(1)
        })

        describe('after commenting the blog', function() {
          beforeEach(function() {
            cy.get('#comment')
              .type('Such great blog')
            cy.contains('Add comment')
              .click()
          })

          it('a comment can be seen', function() {
            cy.contains('Such great blog')
          })
        })
      })
    })
  })
})