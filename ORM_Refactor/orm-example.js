/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "banjolina", "OKOKOK");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var abUser = sequelize.define('abUser', {
  userName: Sequelize.STRING
});

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
abUser.sync().success(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newUser = abUser.build({userName: "Jean Valjean"});
  newUser.save().success(function() {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    abUser.findAll({ where: {userName: "Jean Valjean"} }).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].userName + " exists");
      }
    });
  });
});
