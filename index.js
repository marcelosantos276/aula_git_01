const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')
const url = require('node:url')

const app = express()

app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.render('home')
})

app.get('/books/inserirbook', (req,res) =>{
    res.render('inserir')
})

app.get('/books/listabook',(req,res)=>{
    const sql = 'SELECT * FROM books'
    conn.query(sql,function(err,result) {
        if(err){
            console.log(err)
        }
        res.render('lista',{ result })
    })
})

app.get('/books/excluirbooks', (req,res)=>{
    const url = req.url.split('=')
    const id = url[1]
    const sql = `DELETE FROM books WHERE id = ${id}`
    conn.query(sql, function(err) {
        if(err) {
            console.log(err)
        }
        console.log("Excluido com sucesso!!!")
        res.redirect('/')
    })
})

app.get('/books/alterarbooks', (req,res)=>{
    const url = req.url.split('=')
    const id = url[1]
    const sql = `SELECT * FROM books WHERE id = ${id}`
    conn.query(sql, function(err,result) {
        if(err) {
            console.log(err)
        }
        res.render('alterar', { result })
    })
})

app.post('/books/alterabook',(req,res)=>{
    const id = req.body.id
    const titulo = req.body.titulo
    const  nmr_pags = req.body.nmr_pags
    const sql = `UPDATE books SET titulo = '${titulo}',nmr_pags ='${nmr_pags}' WHERE id = '${id}'`
    conn.query(sql,function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})

app.post('/books/inserebook',(req,res)=>{
    const titulo = req.body.titulo
    const  nmr_pags = req.body.nmr_pags
    const sql = `INSERT INTO books (titulo,nmr_pags) VALUES ('${titulo}','${nmr_pags}')`

    conn.query(sql,function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})

const conn = mysql.createConnection({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: '',
    database: 'nodemysql'
})

conn.connect(function (err) {
    if(err){
        console.log(err)
    }
    console.log('Conectou Mysql')
    app.listen(3000)
})