const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4004;

// Middleware
app.use(express.json()); 
app.use(cors()); 

// Import Sequelize and Models
const { sequelize } = require('./util/database');
const { User } = require('./models/user');
const { Post } = require('./models/post');

// Define Relationships
User.hasMany(Post); 
Post.belongsTo(User); 

// Endpoints
app.post('/register', register);
app.post('/login', login);

app.get('/posts', getAllPosts);
app.get('/userposts/:userId', getCurrentUserPosts);
app.post('/posts', addPost);
app.put('/posts/:id', editPost);
app.delete('/posts/:id', deletePost);

// Synchronize Database and Start Server
sequelize.sync()
   .then(() => {
      app.listen(PORT, () => {
         console.log(`Database sync successful & server running on port ${PORT}`);
      });
   })
   .catch(err => {
      console.error('Database synchronization error:', err);
   });
