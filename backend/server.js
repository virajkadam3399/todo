const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 2222;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'todo'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});


app.post('/tasks', (req, res) => {
    const { title, description, status, due_date } = req.body;
    const query = 'INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, status, due_date], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId });
    });
});

app.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM tasks';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;
    const query = 'UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ?';
    db.query(query, [title, description, status, due_date, id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


app.get('/tasks/:id',(req,res)=>{
    const sql = "SELECT * FROM tasks WHERE id = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result) =>{
        if(err) return res.json({message: 'Error inside server'});
        return res.json(result);
    })
})


app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});