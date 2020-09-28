const assert = require('chai').strict;
const { PseudoExists } = require('../controllers/user');

describe('User db Test Suite', () => {
  it('should check if the pseudo exists in db ', async () => {
    const check = await PseudoExists('esteme');
    expect(check).to.be.false;
    expect(check === undefined).to.be.false;
    expect(check === null).to.be.false;
  });
});
