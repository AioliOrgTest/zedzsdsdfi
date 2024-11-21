import nock from 'nock'

export const mochaHooks = {
  beforeEach(done) {
    nock.disableNetConnect();
    nock.enableNetConnect('127.0.0.1');
    done();
  },
};