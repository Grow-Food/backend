module.exports = {
  create: async (req, res) => {
    res.status(200).send({data: req, message: 'Signup endpoint hit!'});
  },
  readSingle: async (req, res) => {
    res.status(200).send({data: req, message: 'read single user endpoint hit!'});
  },
  readAll: async (req, res) => {
    try {
      const users = await User.findAll();
      console.log(users);
      res.status(200).send(users);
  
    } catch (err) {
      const errorObj = {data: "", message: 'There was an error fetching all users.', error: err};
      res.status(500).send(errorObj);
    }
  },
  update: async (req, res) => {
    res.status(200).send({data: req, message: 'update single user endpoint hit!'});
  },
  delete: async (req, res) => {
    res.status(200).send({data: req, message: 'delete user endpoint hit!'});
  }
};