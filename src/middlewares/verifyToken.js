module.exports = (req, res, next) =>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const fragmentBearerHeader =  bearerHeader.split(" ")
        if(fragmentBearerHeader.length == 2){
            const bearerToken = fragmentBearerHeader[1]
            req.token = bearerToken;
            next()
        }else{
            res.sendStatus(404)
        }
    }else{
        res.sendStatus(403)
    }
}