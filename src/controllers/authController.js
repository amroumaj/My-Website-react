const bcrypt = requre ('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const handleLogin = async (req, res) =>{
    const {user, pwd} = res.body;
    if(!user|| !pwd) return res.status(400);
    const foundUser = usersDB.uer.find(person =>person.username ===user );
    if(!foundUser) return res.sendStatus(401);//Unauthorized status
    //checking the password
    const match = await bcrypt.compare(pwd, foundUser,password);
    if(match) {
        const accessToken = jwt.sign(
            {"username":foundUser.username}, 
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'15m'}
            ) ;
        const refreshToken = jwt.sign(
            {"username":foundUser.username}, 
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
            ) ;
        res.json({'success': `User ${user} is logged in!`});
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = {handleLogin};