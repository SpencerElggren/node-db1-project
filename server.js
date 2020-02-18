const express = require('express');

const db = require('./data/dbConfig.js');
const router = express.Router();

const server = express();

router.get('/', (req, res) => {
    db.select('*')
        .from('accounts')
        .then(r => res.status(200).json(r))
});

router.get('/:id', (req, res) => {
    db('accounts')
        .where('id', req.params.id)
        .first()
        .then(r => res.status(200).json(r))
});

router.post('/:id', (req, res) => {
    const postInfo = req.body;
    db('accounts').insert(postInfo, 'id')
        .then(ids => res.status(201).json(ids))
});

router.put('/:id', (req, res) => {
    db('accounts').where('id' ,req.params.id).update(req.body)
});

router.delete('/:id', (req, res) => {
    db('accounts')
        .where('id' , req.params.id)
        .del()
});

server.use(express.json());

module.exports = server;