const db = require('../db');
const sqlite = require('sqlite');
const expect = require('chai').expect;

/* global define, it, describe, before, beforeEach, after, afterEach */

describe('Testing Database interface functions', () => {
  const insertedValue = {title: 'Titulo', content: 'Content'};

  it('Should check the database is created and exists the article TABLE', () => {
    return db.initialize()
      .then(() => sqlite.open(db.dbName))
      .then(() => sqlite.all('SELECT * FROM articles'))
      .then((results) => expect(results).to.be.deep.equal([]))
      .then(() => sqlite.close());
  });
  it('Should get all the elements in the table articles (zero elements)', () => {
    return db.initialize()
      .then(() => db.all())
      .then((results) => expect(results.length).to.be.equal(0));
  });
  it('Should insert one element in the database', () => {
    return db.initialize()
      .then(() => db.create(insertedValue))
      .then((lastId) => expect(lastId).to.be.equal(1))
      .then(() => db.all())
      .then((results) => expect(results[0].title).to.be.equal(insertedValue.title));
  });
  it('Should delete an article previously created', () => {
    return db.initialize()
      .then(() => db.create(insertedValue))
      .then((id) => db.delete(id))
      .then(() => db.all())
      .then((results) => expect(results).to.be.deep.equal([]));
  });
  it('Should find a specific article', () => {
    return db.initialize()
      .then(() => db.create(insertedValue))
      .then((id) => db.find(id))
      .then((article) => {
        expect(article.title).to.be.equal(insertedValue.title);
        return expect(article.content).to.be.equal(insertedValue.content);
      });
  });
  beforeEach('Delete all the elements in the articles table', () => {
    return sqlite.open(db.dbName)
      .then(() => sqlite.run('DELETE FROM articles'))
      .then(() => sqlite.close());
  });
});