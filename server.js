const express = require('express');
const handlebars = require('express-handlebars');
const PORT = process.env.PORT || 8080;
const app = express();
const bodyParser = require('body-parser');
const override = require('method-override');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(override('_method'));

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

app.listen(PORT);
