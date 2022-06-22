// mengimport terlebih dahulu
const express = require('express') // cara ke 1 
const db = require('./connection/database')
// import express from 'express' -> cara ke 2

const app = express()
// mengimport terlebih dahulu

// menampung port
const port = 8000
// menampung port

const dBase = require('./connection/database')

//mengirimkan data menggunakan hbs atau set view engine hbs
app.set('view engine', 'hbs')

app.use('/assets', express.static(__dirname + '/assets')) // routing, supaya datanya berjalan dan bisa ditampilkan

app.use(express.urlencoded({extended: false})) // untuk "app.post", menampilkan data ke terminal. Data supaya tampil ke terminal harus mengambil berdasarkan "name" yang ada di hbs. Cara ke 1

/* app.use(express.urlencoded()) */ // untuk "app.post", menampilkan data ke terminal. Data supaya tampil ke terminal harus mengambil berdasarkan "name" yang ada di hbs. Cara ke 2

app.get('/', function(request,response){ //menampilkan data menggunakan hbs
    response.render('index')
})

app.get('/contact', function(request,response){ //menampilkan data menggunakan hbs
    response.render('contact')
})


let isLogin = true
//let dataEdit = []

app.get('/blog', function(request,response){ //menampilkan data menggunakan hbs atau memanggil
    //console.log(dataBlog) // bersifat HOF
    dBase.connect(function(err, client, done){
        if(err) throw err // menampilkan error koneksi dari database
        client.query('SELECT * FROM tb_blog', function(ror,resault){
            if(ror) throw ror
            console.log(resault.rows);
            let file = resault.rows //mengirim ke hbs

            response.render('blog',{isLogin, blogs: file}) 
        })//melakukan query untuk bisa menampilkan data
    })

})

/* let nawa = 'bambang oleng' */ 
app.get('/blog-detail/:kod', function(request,response){ //menampilkan data menggunakan hbs. Params adalah penampung yang bisa di isi sesuai keinginan kita
    
    response.render('blog-detail', tampungBlog)
    /* response.render('blog-detail',{nawa}) */
})

app.get('/add-blog', function(request,response){ //menampilkan data menggunakan hbs atau memanggil
    response.render('add-blog')
})

app.post('/add-blog', function(request,response){ // memanggil datanya atau memasukkan datanya. menangkap data hasil inputan
    
    response.redirect('/blog') //mengarahkan akses ke "blog" atau agar pindah ke halaman yang blognya
})

app.get('/edit/:index', function(request,response){ //menampilkan data menggunakan hbs atau memanggil
    
    response.render('edit', { edit });
}) 
app.post('/edit', function(request, response){
    
    response.redirect('/blog');
}) 


app.get('/delete/:index', function(request, response){

    response.redirect('/blog')
})





//mengirimkan data menggunakan hbs atau set view engine hbs

// menampilkan data di dalam server kita (ngodingnya disini)
app.get('/', function(request,response){
    response.send('Hello bro')
})

app.get('/user', function(request,response){
    response.send('Hello user')
})

app.get('/contact', function(request,response){
    response.send('Hello contact')
})

/* app.get('/edit', function(request, response){
    response.send('hello edit')
}) */
// menampilkan data di dalam server kita (ngodingnya disini)

// menjalankan import
app.listen(port, function(request, response){
    console.log(`Server running ${port}`)
})
/* app.listen(port, (request,response) => {
    console.log(`Example app listening on port ${port}`)
}) */

// menjalankan import
// note -> jangan lupa direfresh -> clear -> node index.js