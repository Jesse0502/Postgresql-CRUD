var express = require('express');
var router = express.Router();
const pool = require("./db")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({msg:"Server running successfully!"})
});

router.post('/book', async (req, res) => {
  try{
    let {isbn, title, author} = req.body 
    const newBook = await pool.query("INSERT INTO book (isbn, title, author) VALUES($1, $2, $3) RETURNING *", [isbn, title, author])

    res.json({msg: newBook})
  }catch(error){
    res.json({msg: error.message}, 500)
  }
})

router.get('/books', async function(req, res, next) {
  try {
    let allBooks = await pool.query("SELECT * FROM book")
    res.json({data: allBooks.rows})
  } catch (error) {
    res.json({msg: error.message}, 500)
    
  }
  res.json({msg:"Books Data"})
});

router.get('/book/:id', async function(req, res, next) {
  try {
    let {id} = req.params
    let book = await pool.query("SELECT * FROM book WHERE id = $1", [id])
    res.json({data: book.rows[0]})
  } catch (error) {
    res.json({data: error.message})
  }
});


router.put('/book/:id', async function(req, res, next) {
  try {
    let {id} = req.params
    let dat = req.body
    let fetchOld = await pool.query("SELECT * FROM book WHERE id = $1", [id])
    let old = fetchOld.rows[0]
    let isbn = dat.hasOwnProperty("isbn") ? dat.isbn : old.isbn
    let title = dat.hasOwnProperty("title") ? dat.title : old.title
    let author = dat.hasOwnProperty("author") ? dat.author : old.author
    await pool.query("UPDATE book SET isbn = $1, title = $2, author = $3 WHERE id = $4", [ isbn, title , author, id ])

    res.json({data: "Updated Successfully"})
  } catch (error) {
    res.json({data: error.message})
  } 
});

router.delete('/book/:id', async function(req, res, next) {
  try {
    let {id} = req.params;
    await pool.query("DELETE FROM book WHERE id = $1", [id])
    res.json({data: "Book deleted successfully"})
    
  } catch (error) { 
    res.json({msg: error.message})
  }
});




module.exports = router;
