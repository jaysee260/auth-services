exports.userController = {
    createUser: function(req, res) {
        console.log("createsUser route");
        
        res.status(200).json({ body: req.body })
    }
}