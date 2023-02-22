module.exports.checkAuth = function(req, res, next) {
  const userId = req.session.userid
  if(!userId){
    console.log("entrou")
    res.redirect('/login')
  }

  next()
}