const path = require("path");

const GeralController = {
    home: (req, res) => {
        return res.render("home");
      },
      master: (req, res) => {
        return res.render("master");
      },
      header: (req, res) => {
        return res.render("header");
      }
};

module.exports = GeralController;