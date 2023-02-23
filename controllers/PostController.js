const Post = require('../models/Post')
const User = require('../models/User')

module.exports = class PostController {

  static async showPosts(req, res){
    const postsData = await Post.findAll({include: User,})

    const posts = postsData.map((result) => result.get({plain: true}))
    res.render('posts/home', {posts})
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

    let emptyPosts = false

    if(posts.length === 0){
      emptyPosts = true
    }

    res.render('posts/dashboard', {posts, emptyPosts})
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

  static async updatePost(req, res){
    const id = req.params.id

    const post = await Post.findOne({where: {id: id}, raw: true})

    res.render('posts/edit', {post})
  }

  static async updatePostSave(req, res){
    const id = req.body.id

    const post = {
      title: req.body.title,
      description: req.body.description,
    }

    try {
      await Post.update(post, {where: {id: id}})
      req.flash('message', 'Você atualizou o seu post! :)')

      req.session.save(() => {
        res.redirect('/posts/dashboard')
      })
    } catch (error) {
      console.log(error)
    }
  }
}