const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async(req, res) =>{
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

/*     const foundUser = /* dataBase .users.find(person =>person.refreshToken ==refreshToken); */
    if (!foundUser) return res.sendStatus(403);
    //evaluating the JWT
    jwt.verify(
        refreshToken,process.env.REFRESH_TOKEN__SECRET,(err, decoded)=> {
            if (err || foundUser.username !==decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"username": decoded.username}, process.env,ACCESS_TOKEN_SECRET, {expiresIn: '30s' }
            );
            res.json({accessToken})
        }
    )
}
y
module.exports = {handleRefreshToken}