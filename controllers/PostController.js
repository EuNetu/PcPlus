const post = require('../models/Post')
const User = require('../models/User')

module.exports = class PostController {
  static async showPosts(req, res){
    res.render('posts/home')
  }

  static async showDashboard(req, res){
    res.render('posts/dashboard')
  }
  
  static async createPost(req, res){
    res.render('posts/create')
  }


}