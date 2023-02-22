const Post = require('../models/Post')
const User = require('../models/User')

module.exports = class PostController {

  static async showPosts(req, res){
    res.render('posts/home')
  }

  static async showDashboard(req, res){
    const userId = req.session.userid

    const user = await User.findOne({
      where: { id: userId },
      include: Post,
      plain: true,
    });

    if(!user){
      res.redirect('/login')
    }


    const posts = user.Posts.map((result) => result.dataValues)


    res.render('posts/dashboard', {posts})
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

  static async removePost(req, res){
    const id = req.body.id
    const userId = req.session.userid

    try {
      await Post.destroy({where: {id: id, UserId: userId}})

      req.flash('message', 'Sua postagem foi removida com sucesso!')

      req.session.save(() => {
        res.redirect('/posts/dashboard')
      })
    } catch (error) {
      console.log(error)
    }
  }

}