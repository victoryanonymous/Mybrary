const express =require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

const app = express();

mongoose.connect('mongodb://localhost:27017/testDb')
.then(()=> console.log("Connected"))
.catch(()=> console.log("Error"));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/books', bookRouter);

const port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log(`Server is Running on ${port}`);
})
