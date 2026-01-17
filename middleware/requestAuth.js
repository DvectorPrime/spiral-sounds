export function requestAuth(req, res, next){
    if(!req.session.userId){
        console.log(`Accessed blocked at ${Date.now()}`)
        return res.status(401).json({error : "Unauthorised"})
    }

    next()
}