const { Post } = require('../models/post');

module.exports = {
   addPost: async (req, res) => {
      try {
         const { title, content, status, userId } = req.body;
         const newPost = await Post.create({
            title,
            content,
            privateStatus: status,
            userId
         });

         res.status(201).json(newPost); 
      } catch (error) {
         console.error('Error adding post:', error);
         res.status(500).json({ error: 'Failed to add post' });
      }
   },

   getAllPosts: async (req, res) => {
      try {
         const posts = await Post.findAll();

         res.status(200).json(posts); 
      } catch (error) {
         console.error('Error fetching posts:', error);
         res.status(500).json({ error: 'Failed to fetch posts' });
      }
   },

   getCurrentUserPosts: async (req, res) => {
      const userId = req.params.userId; 
      try {
         const userPosts = await Post.findAll({
            where: {
               userId 
            }
         });

         res.status(200).json(userPosts); 
      } catch (error) {
         console.error('Error fetching user posts:', error);
         res.status(500).json({ error: 'Failed to fetch user posts' });
      }
   },

   editPost: async (req, res) => {
      try {
         const { id } = req.params;
         const { status } = req.body;
         
         await Post.update({ privateStatus: status }, {
            where: { id: +id }
         });

         res.sendStatus(200);
      } catch (error) {
         console.error('Error editing post:', error);
         res.sendStatus(400);
      }
   },

   deletePost: async (req, res) => {
      const postId = req.params.id; 

      try {
         const deletedPost = await Post.findByPk(postId);
         
         if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
         }

         await deletedPost.destroy(); 

         res.status(200).json({ message: 'Post deleted successfully' });
      } catch (error) {
         console.error('Error deleting post:', error);
         res.status(500).json({ error: 'Failed to delete post' });
      }
   }
};
