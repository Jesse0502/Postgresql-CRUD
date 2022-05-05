let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const cors = require('cors')
let indexRouter = require('./routes/index');
let booksRouter = require('./routes/books');

let app = express();

app.listen(4000, () => {
  console.log("Server started on port 4000")
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors())

//routes
app.use('/api', indexRouter); 

module.exports = {}