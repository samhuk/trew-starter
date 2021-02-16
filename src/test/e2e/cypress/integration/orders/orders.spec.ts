describe('Orders', () => {
  it('Loads page', () => {
    cy.visit('/orders')
    expect(true).to.equal(true)
  })
})

export {}
