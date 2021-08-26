const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const data = require('./data.json')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send(data)
})

function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear();
    return dia+"/"+mes+"/"+ano;
}

app.get('/:id', (req, res) => {
    const id = req.params.id
    const cliente = data.find(cli => cli.id == id)
    res.write("<html>")
    res.write("<body style='display:flex; justify-content: center; align-items: center; font-family: sans-serif'>")
    res.write("<div style='text-align: center'>")
    res.write("<h5 style='color: #d60'>"+dataAtualFormatada()+"</h5>")
    res.write("<h1>"+cliente.nome+"</h1>")
    res.write("</div>")
    res.write("</body>")
    res.write("</html>")
    res.end()
})

// app.get('/:id', (req, res) => { 
//     const id = req.params.id
//     const cliente = data.find(cli => cli.id == id)
//     if(!cliente) return res.status(204).json(cliente)
//     res.send(cliente.nome)
// })

app.listen(3000, function(){
    console.log('listening on http://localhost:3000/')
})