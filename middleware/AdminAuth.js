const jwt = require("jsonwebtoken");


//const secret = "";

module.exports = function (req, res, next){


    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];
        try {
            var decoded = jwt.verify(token, process.env.SECRET); ///----
            if(decoded.role == 1){
                next();
            }else{
                res.status(401);
                res.send("Você não possui autorização de administrador!");
                return; 
            }
            
        } catch (err) {
            res.status(401);
            res.send("Você não está autenticado!");
            return; 
        }
        
        
        
    }else{
        res.status(401);
        res.send("Você não está autenticado!");
        return;
    }
}