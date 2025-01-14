describe('Sign in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/signin');
  });

  it('Happy sign in flow', () => {
    cy.get('input[name=email]').type('cecilia@mail.com');
    cy.get('input[name=password]').type('test');

    cy.get('button#signInButton').click();

    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/users/login',
      headers: {
        'content-type': 'application/json'
      },
      body: {
          userEmail: 'cecilia@mail.com',
          userPassword: 'test',
      }
    })
    .then((resp) => {
      window.localStorage.setItem('token', resp.body.token)
      window.localStorage.setItem('user', resp.body.user )
    })

    
    cy.url().should('include', '/calendar'); 
   
    cy.window().then((window) => {
      const token = JSON.parse(window.localStorage.getItem('token'));
      const user = JSON.parse(window.localStorage.getItem('user'));
      
      
      cy.request({
        method: 'GET',
        url: `http://localhost:3000/api/workout/${user.userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      }).then((resp) => {
        expect(resp.status).to.eq(200);
      });
    });
  });

  it('Wrong Email/password',() => {
      cy.get('input[name=email]').type('test@test.com');
      cy.get('input[name=password]').type('test');
  
      cy.get('button#signInButton').click();
  
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/users/login',
        headers: {
          'content-type': 'application/json'
        },
        body: {
            userEmail: 'test@test.com',
            userPassword: 'test',
        },
        failOnStatusCode: false
      })
      .then((resp) => {
        expect(resp.body).to.have.property('message','Wrong email or password.')
      })
    });
  

    it('Bad request', () => {
      cy.get('input[name=email]').clear();
      cy.get('input[name=password]').clear();
  
      cy.get('button#signInButton').click();
  
      cy.get('#error-message').contains('Something went wrong. Please try again');
    });
});