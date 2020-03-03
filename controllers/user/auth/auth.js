module.exports = {
  signIn: async (req, res) => {
    res.status(200).send({ data: null, message: "Signin endpoint hit!" });
  },
  signOut: async (req, res) => {
    res.status(200).send({ data: null, message: "Signout endpoint hit!" });
  }
};
