const db = require('./db');
const rctp = require('runas-callback-to-promise');
const read = require('node-readability');

const all = db.all;
const find = db.find;
const create = (url) => {
  return rctp.c2p(read, url.url)
    .then((article) => db.create({title: article.title, content: article.content}))
    .then(db.find);
};
const deleted = db.delete;
const initialize = db.initialize;

module.exports = {
  all,
  find,
  create,
  delete: deleted,
  initialize
};