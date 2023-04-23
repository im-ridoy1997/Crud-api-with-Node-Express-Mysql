const multer  = require('multer');
const nodemailer = require('nodemailer');
const connection = require('../mysqlConnection.js');


const getUser = (req, res) => {
    connection.query('SELECT * FROM users', (err, rows) => {
        if(err){
            res.status(400).json({
                status: 'false',
                message: err.message
            });
            return;
        }
        res.status(200).json({
            status: 'true',
            data: rows
        });
        return;
    })
};

const createUser = (req, res) => {
    const {name, email, password} = req.body;
    const image = 'uploads/' + req.file['originalname'];
    connection.query(`INSERT INTO users (name, email, password, image) VALUES('${name}', '${email}', '${password}', '${image}') `, (err, rows) => {
        if(err){
            res.status(401).json({
                status: 'false',
                message: err
            });
            return;
        }else{
            const tranporter = nodemailer.createTransport({
                service : 'gmail',
                auth: {
                    user: 'ridoyayazul@gmail.com',
                    pass: 'kibrpgkxcvfxerra'
                }
            });

            const mailOptions = {
                from: 'ridoyayazul@gmail.com',
                to: email,
                subject: 'Registration Successful',
                text: 'Hello user your registration is successful!',
            };

            tranporter.sendMail(mailOptions, (err, info) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(info.response);
                }
            });
            res.status(200).json({
                status: 'false',
                message: 'insert successfully'
            });
        }
        
    });
};

const editUser = (req, res) => {
    const id = req.params.id;
    let data = null;
    connection.query(`SELECT * FROM users WHERE id = '${id}'`, (err, row) => {
        if(err){
            res.status(401).json({
                status: 'false',
                message: err
            });
            return;
        }
        const baseUrl = req.protocol + '://' + req.hostname + '/uploads/';
        data = row[0];
        data.image = baseUrl + data.image;
        res.status(200).json({
            status: 'true',
            data: data
        });
        return;
    });
    
};

const updateUser = (req,res) => {
    const { id, name, email, password } = req.body;
    if(req.file != null){
        const image = 'uploads/' + req.file['originalname'];
        connection.query(`UPDATE users SET name = '${name}', email = '${email}', password = '${password}', image = '${image}' WHERE id = '${id}'`, (err, row) => {
            if(err){
                return res.status(400).json({
                    status: false,
                    message: err.message
                });
            }else{
                return res.status(200).json({
                    status: true,
                    message: 'user update successfully'
                });
            }
        });
    }else{
        connection.query(`UPDATE users SET name = '${name}', email = '${email}', password = '${password}' WHERE id = '${id}'`, (err, row) => {
            if(err){
                return res.status(400).json({
                    status: false,
                    message: err.message
                });
            }else{
                return res.status(200).json({
                    status: true,
                    message: 'user update successfully'
                });
            }
        });
    }
};

const deleteUser = (req, res) => {
    const id = req.params.id;
    connection.query(`DELETE FROM users WHERE id = '${id}'`, (err, row) => {
        if(err){
            return res.status(400).json({
                status: false,
                message: err.message
            });
        }else{
            return res.status(200).json({
                status: true,
                data: 'delete successfully'
            });
        }
    });
};


module.exports = {
    getUser,
    createUser,
    editUser,
    updateUser,
    deleteUser,
};