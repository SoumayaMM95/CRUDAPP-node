import express from "express";
// const express = require('express');
const app = express();

const PORT = 3001;

app.get('/', (req, res) => res.send('Hello from Homepage.'));

app.listen(PORT, () => console.log(`Server Running on PORT: http://localhost:${PORT}`));