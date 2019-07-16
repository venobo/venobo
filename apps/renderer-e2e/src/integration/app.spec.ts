import { getGreeting } from '../support/app.po';

describe('renderer', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to renderer!');
  });
});
