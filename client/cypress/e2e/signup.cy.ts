describe('Sign up', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/signup');
  });

  it('Happy sign up flow', () => {
    cy.get('input[name=firstName]').type('test');
    cy.get('input[name=lastName]').type('test');
    cy.get('input[name=email]').type('testar@mail.com');
    cy.get('input[name=userName]').type('Testaren')
    cy.get('input[name=password]').type('testaren123!');

    cy.get('button#signUpButton').click();

    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/users/add',
      headers: {
        'content-type': 'application/json'
      },
      body: {
        firstName: 'test',
        lastName: 'test',
          userEmail: 'testar@mail.com',
          userName: 'Testaren',
          userPassword: 'testaren123!',
      }
    })
    .then((resp) => {
      expect(resp.body).to.have.property('message','User created succesfully')
    });
  });

it('Duplicate entry key', () => {
  cy.get('input[name=firstName]').type('test');
  cy.get('input[name=lastName]').type('test');
  cy.get('input[name=email]').type('testar@mail.com');
  cy.get('input[name=userName]').type('Testaren')
  cy.get('input[name=password]').type('testaren123!');

  cy.get('button#signUpButton').click();

  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/users/add',
    headers: {
      'content-type': 'application/json'
    },
    body: {
      firstName: 'test',
      lastName: 'test',
        userEmail: 'testar@mail.com',
        userName: 'Testaren',
        userPassword: 'testaren123!',
    }
  })
  .then((resp) => {
    expect(resp.body).to.have.property('message',"Duplicate entry 'Testaren' for key 'username'")
  });
});
it('Empty field', () => {
  cy.get('input[name=firstName]').clear();

  cy.get('button#signUpButton').click();

  cy.get('#error-message-form').contains('You cant leave any fields empty')
})

  it('Not correct typed firstname', () => {
    cy.get('input[name=firstName]').type('t');

    cy.get('#error-message-firstname').contains('Must contain at least 2 character')
  });

  it('Not correct typed lastname', () => {
    cy.get('input[name=lastName]').type('t');

    cy.get('#error-message-lastname').contains('Must contain at least 2 character')
  })

  it('Not correct typed email', () => {
    cy.get('input[name=email]').type('t');

    cy.get('#error-message-email').contains('The email address seems to be incorrect. Please check that it contains an "@" symbol and a valid domain.')
  })
 
  it('Not correct typed username', () => {
    cy.get('input[name=userName]').type('t');

    cy.get('#error-message-username').contains('Must contain at least 2 character')
  });

  it('Not correct typed password', () => {
    cy.get('input[name=password]').type('t');

    cy.get('#error-message-password').contains("Password must contain at least 8 character and contain letters, numbers and symbols '!&%'")
  })

});