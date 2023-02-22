const Post = require('../models/Post')
const User = require('../models/User')

module.exports = class PostController {
  static async showPosts(req, res){
    res.render('posts/home')
  }

  static async showDashboard(req, res){
    res.render('posts/dashboard')
  }
  
  static createPost(req, res){
    res.render('posts/create')
  }

  static async createPostSave(req, res){

    const post = {
      title: req.body.title,
      description: req.body.description,
      UserId: req.session.userid,
    }

    try {
      await Post.create(post)

      req.flash('message', 'Seu post está no ar! :)')

      req.session.save(() => {
        res.redirect('/posts/dashboard')
      })
    } catch (error) {
      console.log(error)
    }

  }
}