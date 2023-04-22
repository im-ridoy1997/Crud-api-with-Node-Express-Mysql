const multer  = require('multer');
const connection = require('../mysqlConnection.js');


const getUser = (req, res) => {
    connection.query('SELECT * FROM users', (err, rows) => {
        if (err) throw err;
        res.status(200).send(JSON.stringify(rows));
    })
};

const createUser = (req, res) => {
    const {name, email, password} = req.body;
    // const image = Date.now() + '-' + req.files[0]['originalname'];
    console.log(req);
    // connection.query(`INSERT INTO users (name, email, password, image) VALUES('${name}', '${email}', '${password}', '${image}') `, (err, rows) => {
    //     if(err){
    //         res.status(401).send(err);
    //         return;
    //     }
    //     res.status(200).send("insert successfully");
    // });
};

module.exports = {
    getUser,
    createUser
};