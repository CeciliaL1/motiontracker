describe('Sign up', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/signup');
  });

  it('Happy sign up flow', () => {
    cy.get('input[name=firstName]').type('test');
    cy.get('input[name=lastName]').type('test');
    cy.get('input[name=email]').type('cecilia@test.com');
    cy.get('input[name=userName]').type('Test1')
    cy.get('input[name=password]').type('test');

    cy.get('button#signInButton').click();

    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/users/add',
      headers: {
        'content-type': 'application/json'
      },
      body: {
        firstName: 'test',
        lastName: 'test',
          userEmail: 'cecilia@test.com',
          userName: 'Test1',
          userPassword: 'test',
      }
    })
    .then((resp) => {
      expect(resp.body).to.have.property('message','User created succesfully')
    });
  });

 

});