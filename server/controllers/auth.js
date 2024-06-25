const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const { createToken } = require('../util/auth');

module.exports = {
  login: async (req, res) => {
    try {
      let { username, password } = req.body;

      // Find user by username
      let foundUser = await User.findOne({ where: { username: username } });

      // Check if user exists
      if (foundUser) {
        // Compare passwords
        const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass);

        if (isAuthenticated) {
          // Generate JWT token
          let token = createToken(foundUser.dataValues.username, foundUser.dataValues.id);
          const exp = Date.now() + 1000 * 60 * 60 * 48; // Token expiration time (2 days)

          // Construct response data
          const data = {
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.id,
            token: token,
            exp: exp
          };

          // Send response with user data and token
          res.status(200).send(data);
        } else {
          // Password incorrect
          res.status(400).send("Password is incorrect");
        }
      } else {
        // User not found
        res.status(400).send("User does not exist.");
      }
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  }
};
