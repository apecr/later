const articleS = require('../article');
const sqlite = require('sqlite');
const expect = require('chai').expect;

/* global define, it, describe, before, after, afterEach */

describe('Testing the article methods', () => {
  it('Should include a new article', () => {
    const insertedArticle = {
      url: 'https://github.com/luin/readability/blob/master/test/fixtures/white-house.html',
      title: 'luin/readability'
    };
    return articleS.create(insertedArticle)
      .then((article) => expect(article.title).to.be.equal(insertedArticle.title));
  }).timeout(5000);
});