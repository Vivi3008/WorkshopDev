//usei o express para cria e configurar meu servidor
const express = require("express")
const server = express()


//habilitar o body do formulario
server.use(express.urlencoded({extended:true}))

const db = require('./db')


//configurar arquivos estáticos(css, scripts, imagens)
server.use(express.static("public"))

//habilitar o body do formulario
server.use(express.urlencoded({extended:true}))


//configurar o nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache:true,
})

//criei uma rota e capturo o pedido do cliente para responder
server.get("/", function(req, res) {

    db.all(`SELECT * FROM Ideias`, function(err,rows){
        if (err) {
            console.log(err)
            return res.send("Erro de banco de dados")
       }
        
        const reverseIdeas = [...rows].reverse()
        let lastIdeas = []

      for (idea of reverseIdeas){
            if(lastIdeas.length<2){
                lastIdeas.push(idea)
            }
      }

    return res.render("index.html" , {ideas: lastIdeas})
    })
     
})

server.get("/ideias", function(req, res) {

    db.all(`SELECT * FROM Ideias`, function(err,rows){
        if (err) {
             console.log(err)
             return res.send("Erro de banco de dados")
        }

    const reverseIdeas = [...rows].reverse()

    return res.render("ideias.html", {ideas: reverseIdeas})
    })
})

server.post('/', function(req,res){
   
    const query = `INSERT INTO Ideias(
        title,
        image,
        category,
        description,
        link
      ) VALUES (?,?,?,?,?);`
  
      const values = [
        req.body.title,
        req.body.image,
        req.body.category,
        req.body.description,
        req.body.link
      ]
     
      
      db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro de banco de dados")
       }
       
       return res.redirect("/ideias")
    
      })
})

//deletar uma ideia
server.get('/del/:id',function(req,res){
    
    const id  = req.params.id

    db.run(`DELETE FROM Ideias WHERE id=?`,[id], function(err){
        if (err) {
             console.log(err)
             return res.send("Erro de banco de dados")
        }
       
    })
    return res.redirect("/ideias")
})
 

//liguei meu servidor na porta 3000
server.listen('3000')
