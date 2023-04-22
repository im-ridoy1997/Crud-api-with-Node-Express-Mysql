const multer  = require('multer');
const nodemailer = require('nodemailer');
const connection = require('../mysqlConnection.js');


const getUser = (req, res) => {
    connection.query('SELECT * FROM users', (err, rows) => {
        if (err) throw err;
        res.status(200).send(JSON.stringify(rows));
    })
};

const createUser = (req, res) => {
    const {name, email, password} = req.body;
    const image = Date.now() + '-' + req.file['originalname'];
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



module.exports = {
    getUser,
    createUser
};