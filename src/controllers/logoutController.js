const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async(req, res) =>{
    // on Client delete the accessToken

    const cookies =req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);//no content found 
    const refreshToken = cookies.jwt;

    //Is the refresh token in the database
    const foundUser = usersDB.users.find(person =>person.handleRefreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly :true})
        return res.sendStatus(204);
    };
    //Delete refreshToken in the daatabase
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser, refreshToken:''};
    usersDB.setUsers([...otherUsers, currentUser]);

    res.clearCookie('jwt', {httpOnly:true}, {secure: true});
    res.sendStatus(204);
}
 
module.exports = {handleLogout}
