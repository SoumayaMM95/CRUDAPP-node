import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from "cors";
// const express = require('express');
// const mysql = require('mysql');
const app = express();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cruddb',
})

const PORT = 3001;

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get",(req,res)=>{
    const sqlGet = "SELECT * FROM movie_reviews;"
    db.query(sqlGet, (err,result)=>{
        res.send(result);
    });
});

app.post("/api/insert",(req,res)=>{

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);"
    db.query(sqlInsert, [movieName,movieReview], (err,result)=>{
        // console.log(result);
    });
});


app.listen(PORT, () => console.log(`Server Running on PORT: http://localhost:${PORT}`));