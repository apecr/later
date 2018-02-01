const sqlite = require('sqlite');


const dbName = 'later.sqlite';
const sql = `CREATE TABLE IF NOT EXISTS articles 
  (id integer primary key, title, content TEXT)`;

  // Change for 0.1.1 version

const initialize = () => {
  return sqlite.open(dbName)
    .then(() => sqlite.exec(sql))
    .then(() => sqlite.close());
};

const all = () => {
  const select = 'SELECT * FROM articles';
  return sqlite.open(dbName)
    .then(() => sqlite.all(select))
    .then((results) => {
      sqlite.close();
      return results;
    });
};

// const find = id => rctp.c2p(db.get, 'SELECT * FROM articles WHERE id = ?', id);
const create = data => {
  const insertStatement = 'INSERT INTO articles (title, content) VALUES (?, ?)';
  let lastId = 0;
  return sqlite.open(dbName)
    .then(() => sqlite.prepare(insertStatement))
    .then(stmt => stmt.run(data.title, data.content))
    .then((stmt) => {
      lastId = stmt.lastID;
      return stmt.finalize();
    })
    .then(() => sqlite.close())
    .then(() => lastId)
    .catch((error) => console.log('Error inserting', error));
};

const deleted = id => {
  return sqlite.open(dbName)
    .then(() => sqlite.run('DELETE FROM articles WHERE id = ?', id))
    .then(() => sqlite.close());
};

const find = (id) => {
  return sqlite.open(dbName)
    .then(() => sqlite.get('SELECT * FROM articles where id = ?', id))
    .then((result) => [result, sqlite.close()])
    .then((result) => result[0]);
};

module.exports = {
  initialize,
  dbName,
  create,
  all,
  delete: deleted,
  find
};
