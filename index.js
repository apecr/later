const express = require('express');
const parser = require('body-parser');
const articlesService = require('./article');

const app = express();
const port = process.env.PORT || 3000;
const articles = [ {title: 'Example'} ];


app.set('port', port);
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.get('/articles', (req, res, next) => {
  articlesService.all()
    .then((results) => {
      res.send(results);
    }).catch((error) => {
      next(error);
    });
});

app.post('/articles', (req, res, next) => {
  return articlesService.create({url: req.body.url})
    .then((article) => res.send('OK'))
    .catch((error) => {
      res.status(500).send('Error downloading and saving article');
      return next(error);
    });
});

app.get('/articles/:id', (req, res, next) => {
  console.log('Fetching: ', req.params.id);
  return articlesService.find(req.params.id)
    .then((article) => res.send(article))
    .catch(next);
});

app.delete('/articles/:id', (req, res, next) => {
  console.log('Deleting: ', req.params.id);
  delete articles[req.params.id];
  res.send({message: 'Deleted'});
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'));
});

module.exports = app;