//usei o express para cria e configurar meu servidor
const express = require("express")
const server = express()


//habilitar o body do formulario
server.use(express.urlencoded({extended:true}))

const db = require('./db')
/* const ideas = [
{
    title: "Balões de Água",
    img: "water-balon.png",
    category:"Brincadeiras",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos perferendis molestias id quam voluptatem repellat pariatur, doloremque suscipit, earum iste quis hic! Itaque porro eveniet recusandae esse quis illum deleniti.",
    url:"https://www.youtube.com/watch?v=epRA_uxxFB0"
},
{
    title: "Acampamento em casa",
    img: "indoor-camping.png",
    category:"Brincadeiras",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos perferendis molestias id quam voluptatem repellat pariatur, doloremque suscipit, earum iste quis hic! Itaque porro eveniet recusandae esse quis illum deleniti.",
    url:"https://casavogue.globo.com/Interiores/Ambientes/noticia/2018/07/acampamento-na-sala-tudo-que-voce-precisa-saber-sobre-o-acampadentro.html"
},
{
    title: "Treino em casa",
    img: "sport.png",
    category:"Saúde",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos perferendis molestias id quam voluptatem repellat pariatur, doloremque suscipit, earum iste quis hic! Itaque porro eveniet recusandae esse quis illum deleniti.",
    url:"https://www.youtube.com/watch?v=pZ1USShIrqY"
},
{
    title: "Meditaçao",
    img: "meditation.png",
    category:"Saúde",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos perferendis molestias id quam voluptatem repellat pariatur, doloremque suscipit, earum iste quis hic! Itaque porro eveniet recusandae esse quis illum deleniti.",
    url:"https://www.youtube.com/watch?v=Iub-qQmNSYU"
},
{
    title: "Cursos de Programação",
    img: "coding.png",
    category:"Educação",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos perferendis molestias id quam voluptatem repellat pariatur, doloremque suscipit, earum iste quis hic! Itaque porro eveniet recusandae esse quis illum deleniti.",
    url:"https://rocketseat.com.br"
},
{
    title: "Leituras recomendadas",
    img: "read.png",
    category:"Hobby",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos perferendis molestias id quam voluptatem repellat pariatur, doloremque suscipit, earum iste quis hic! Itaque porro eveniet recusandae esse quis illum deleniti.",
    url:"https://www.culturagenial.com/dicas-livros/"
}
] */

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
//liguei meu servidor na porta 3000
server.listen('3000')
