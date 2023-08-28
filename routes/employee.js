const express = require("express");
const router = express.Router()
const mysql = require('mysql');
const connection = require("../config/database-config");

router.get('/',(req,res) => {
    res.send("Employee")
})
router.get('/employee', (req, res) => {
    connection.query("SELECT * FROM users", (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        // Process the results and send a response
        res.json(results);
    })
})

router.get('/employee/:id', (req, res) => {
    connection.query("SELECT * FROM users WHERE id=?",[req.params.id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        // Process the results and send a response
        res.json(results);
    })
})

router.post('/employee', (req, res) => {
    const { name, email, password } = req.body;

    connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        // Process the results and send a response
        res.json(results);
    });
});

router.put('/employee/:id', (req, res) => {
    const allowedFields = ['name','email','password']

    const filedsToUpdate = []

    allowedFields.forEach(field => {
        if(req.body[field] !== undefined){
            filedsToUpdate.push(field);
        }
    });

    if (filedsToUpdate === 0){
        return res.status(400).json({error:"No Valid field to update were provided."})
    }
    filedsToUpdate.forEach((field, index) => {
        const newValue = req.body[field];
        
        connection.query(`UPDATE users SET ${field} = ? WHERE id = ?`, 
        [newValue, req.params.id], (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            if (index === filedsToUpdate.length - 1){
                res.json(results)
            }
        }
        )
    })
})

router.delete('/employee/:id', (req, res) => {
    connection.query('DELETE FROM users WHERE id=?',[req.params.id],(err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        res.json(results)
    })
})


module.exports = router;