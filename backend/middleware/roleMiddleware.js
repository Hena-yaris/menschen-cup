function roleMiddleware(...requiredRole) {


    return (req,res,next)=> {

        if(!req.user) {
            return res.status(401).json({message: "Unauthorized"})
        }

        if(!requiredRole.includes(req.user.role)){
            return res.status(403).json({message: "Forbidden: Access Denied"})
        }

        next();
    }
}

module.exports = roleMiddleware;