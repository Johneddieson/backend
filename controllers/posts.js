const { validationResult } = require('express-validator');


const Post = require('../models/post');

exports.getsinglePost = async (req, res, next) => {
  try {
    const wak = await Post.get(req.params.id)
    res.status(200).json({message: wak})
  } catch (error) {
    
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(err);
  }
}

exports.fetchAll = async (req, res, next) => {
    try {
    const [allPosts] = await Post.fetchAll()
    res.status(200).json(allPosts)    
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
}
exports.postPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const title = req.body.title;
  const body = req.body.body;
  const user = req.body.user;

  try {


    const postDetails = {
      title: title,
      body: body,
      user: user,
    };

    const result = await Post.save(postDetails)

    res.status(201).json({ message: 'Post Created!' });
  } catch (err) {
    console.log(err)
    if (!err.statusCode) {
      

      err.statusCode = 500;
    }
    next(err);
  }
};



exports.deletePost = async (req, res, next) => {
    try {
    const deleteResponse = await Post.delete(req.params.id)
    res.status(200).json(deleteResponse)    
    } catch (err) {
    
    
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
}


