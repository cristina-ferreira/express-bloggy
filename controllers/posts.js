var express = require('express');
const Post = require(__dirname + '/../models/Post');

const postsIndex = (req, res, next) => {
    Post.find({}, (err, foundPosts) => {
        if (err) {
            res.sendStatus(500, err);
        }
        res.render('index', {posts: foundPosts});
    });
};

const postShow = (req, res, next) => {
    Post.findById(req.params.id, (err, foundPost) => {
        if (err) {
            res.sendStatus(500, err);
        }
        // res.render('post', {title:foundPost.tilte, content:foundPost.content})
        res.render('post', foundPost);
    });
};

const postNew = (req, res, next) => {
    res.render('new-post', { title: 'New Post' });
};

const createPost = (req, res, next) => {
    console.log(req.body);
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
        });
        if (newPost.title === "" && newPost.content === "") {
            res.redirect('/');
        } else {
            newPost.save((err, savedPost) => {
                if (err) {res.sendStatus(500,err);}
                res.redirect('/');
            })
        }
}

const postEdit = (req, res, next) => {
    Post.findById(req.params.id, (err, foundPost) => {
        if (err) {
            res.sendStatus(500, err);
        }
        res.render('edit-post', foundPost);
    });
};


const postSave = (req, res, next) => {
    Post.findById(req.params.id, (err, foundPost) => {
        foundPost.title = req.body.title;
        foundPost.content = req.body.content;
        foundPost.save((err,savedPost) => {
            if(err) {
                res.sendStatus(500, err);
            }
            res.redirect('/');
        });
    });
}

const postDelete = (req, res, next) => {
    Post.deleteOne({_id: req.params.id}, (err) => {
        if (err) {
            res.json({error: 'Post not deleted !'});
        }
        res.redirect('/');
    })
}




module.exports = { postsIndex, postShow, postNew, createPost, postEdit, postDelete, postSave };