const express = require("express");
const app = express();
const port = 3033;

app.use(express.json()) 
const tasks = [{ name: "bob", age: 32 },{ name: "eric", age: 20 }]; // j'ai utilisé cette variable juste pour tester
let mysql = require("mysql2");

// fonction de connexion à la bdd, à faire le .close après utilisation
function get_connection_db() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "exolce",
  });

  return connection;
}

// 1- récupérer la liste de toutes les tâches
app.get("/AllTasks", (request, response) => {
  let connection = get_connection_db();
  let sql = "select * from tasks";
  connection.query(sql,
    function (error, results, fields) {
      response.json(results);
    }
  );
});

// 2 - Récupérer la liste de toutes les tâches non faites
app.get("/undone_task", (request, response) => {
    let connection = get_connection_db();
    let sql = "SELECT * FROM `tasks` WHERE isDone = 0";
    connection.query(
      sql,
      function (error, results, fields) {
        response.json(results);
      }
    );
});

// 3 - Ajouter une nouvelle tâche
app.post('/new-task', (request, response) => {
    let connection = get_connection_db();
    const { name, isDone } = request.body
    connection.query(
        'INSERT INTO `tasks`(`name`, `isDone`) VALUES (name, isDone)',         
        function (error, results, fields) {
          response.json(results);
          if (error) return res.json({ error: error });

     });
});
// 4 - 5 Marquer une tâche à done revient à Modifier une existante
app.put('/task/:id', (request, response) => {  
  let connection = get_connection_db();
  const { name, isDone } = request.body
  let id = request.params.id
  connection.query(
      'UPDATE `tasks` SET `name` = ?,  `isDone` = ? WHERE id = ?', [name, isDone, id],        
      function (error, results, fields) {        
        if (error) response.json({ error: error });
        response.json(results);
   });
});

// 6 - Supprimer une tâche (bonus)
app.delete('/task/:id', (request, response) => {
  let connection = get_connection_db();
  let id = request.params.id
  connection.query(
      'DELETE FROM `tasks` WHERE id = ?', [id],      
      function (error, results, fields) {
        console.log(results);
        if (error) response.json({ error: error });
        response.json(results);
   });
});

// bonus
// En passant par ce endpoint et en supposant que 42 est le token, 
//s'il s'identifie avec le bon token alors il sera dans la page admin et aura un h1 "Admin space"

app.get('/restricted', (req, res) => {
  if (req.headers.token != 42){
    res.status(403).send()
  }
  else {
    res.send("<h1>Admin space</h1>")
  }    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
