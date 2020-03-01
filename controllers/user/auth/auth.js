module.exports = {
  signIn: async (req, res) => {
    res.status(200).send({data: req, message: 'Signin endpoint hit!'});
  },
  signOut: async (req, res) => {
    res.status(200).send({data: req, message: 'Signout endpoint hit!'});
  }
};