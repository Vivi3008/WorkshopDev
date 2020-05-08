const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function(){
     //criar a tabela
     db.run(`
        CREATE TABLE IF NOT EXISTS Ideias(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          image TEXT,
          title TEXT,
          category TEXT,
          description TEXT,
          link TEXT
       );
     `)

    //inserir dados na tabela
    const query = `INSERT INTO Ideias(
      title,
      image,
      category,
      description,
      link
    ) VALUES (?,?,?,?,?);`

    const values = [
      "Balões de Água",
      "water-balon.png",
      "Brincadeiras",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos perferendis molestias id quam voluptatem repellat pariatur, doloremque suscipit, earum iste quis hic! Itaque porro eveniet recusandae esse quis illum deleniti.",
      "https://www.youtube.com/watch?v=epRA_uxxFB0"
    ]
   
  /*   db.run(query, values, function(err){
        if (err) return console.log(err)

        console.log(this)
    }) */

//deletar um dado da tabela
/* db.run(`DELETE FROM Ideias WHERE id=?`,[3], function(err){
    if (err) return console.log(err)

    console.log("Deletei", this)
}) */

//consultar dados na tabela
db.all(`SELECT * FROM Ideias`, function(err,rows){
     if (err) return console.log(err)

  //  console.log(rows)
})

})


module.exports = db




