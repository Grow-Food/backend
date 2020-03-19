module.exports = {
  setJsonHeaders: (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Content-Type", "application/json");
    next();
  },
  // TODO: make this work using postgres
  authorizeUser: async (req, res, next) => {
    // pull props off request
    const { email, accessToken, refreshToken } = req.body;

    // if there is a valid access token that matches the given email grant request as usual
    if (accessToken) {
      let decodedAccessEmail = decodeToken(accessToken);
      if (decodedAccessEmail && decodedAccessEmail === email) next();
      else if (refreshToken) {
        let decodedRefreshEmail = decodeToken(refreshToken);
        if (decodedRefreshEmail === email) {
          let newAccessToken = await generateTokenAndSetCookie(
            res,
            email,
            "access"
          );
          res.status(200).send({ success: 1, newAccessToken });
        } else {
          res.status(401).send({
            status: 0,
            message: "Request unauthorized. Please log in again."
          });
        }
      } else
        res.status(401).send({
          status: 0,
          message: "Request unauthorized. Please log in again."
        });
    } else if (!accessToken && !refreshToken) {
      res.status(401).send({
        status: 0,
        message: "Request unauthorized. Please log in again."
      });
    }
  },
  // TODO: make this work using postgres
  determineIfAdmin: async (req, res, next) => {
    const { email } = req.body;

    try {
      // find user
      const user = await User.findOne({ email });

      // if user is admin call next, otherwise send error
      if (user !== null && user.isAdmin) next();
      else {
        const responseBody = {
          status: 0,
          message:
            "There was an error with your credentials. Please try again using different credentials.",
          err: "Unauthorized Admin"
        };
        res.status(401).send(responseBody);
      }
    } catch (err) {
      const responseBody = {
        status: 0,
        message:
          "There was an error with your credentials. Please try again using different credentials.",
        err
      };
      res.status(401).send(responseBody);
    }
  }
};
