const GeralController = {
    home: (req, res) => {
        return res.render("home")
      },
      master: (req, res) => {
        return res.render("master")
      }
};

module.exports = GeralController;