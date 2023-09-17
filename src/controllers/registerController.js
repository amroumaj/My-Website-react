const usersDB ={};
 
const fsPromises = require('fs').promises;
const path = require ('path');
const bcrypt = require('bcrypt');

const handleNewUSer = async(req, res) =>{
    const { user, pwd } = req.body;
    if(!user || !pwd) return res.status(400).json( {'message': 'Username and password are mandatory'});
//    checking for duplicate accounts in the DataBase

    if (duplicate) return res.sendStatus(400);   
    try {
        //encrypting the passwords and adding a salt
        const hashPwd = await bcrypt.hash(pwd, 10);
        //storing the new account
        const newUser = {"username": user, "password": hashPwd};
        usersDB.setUsers([...usersDB.users, newUser]);
        //add the new use to the preferred database technology

    } catch(err) {
        //send out an error message
        res.status(500);
    }
}

module.exports = { handleNewUser };