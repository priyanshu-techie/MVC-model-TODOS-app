const passport = require('passport');
const LocalStrategy = require('passport-local');
// accessing the db
const Users=require('../model/userModel');
// custome function to validate
const  { validatePassword }  = require('../utilities/passportUtils');

// setting up passport


passport.use(new LocalStrategy({usernameField: 'email'} , // passport doesn't automagically know that you want to put in email field from all places, you have to specify it in this line 
  async function verify(username, password, callback) {

    try {
      const user = await Users.findOne({ email: username });
      // if no user
      if (!user) { return callback(null, false) } // (no error, no user);
      // user found then validate password
      const isValid = validatePassword(password, user.salt, user.hash );

      if (isValid) {
        // console.log("user found");
        return callback(null, user);
      }
      else {
        // console.log("user not found");
        return callback(null, false);
      }
    }
    catch (e) {
      return callback(e);
    }
  }));
  
  // concept of serialization and deserialization, which are used in computer science and software engineering to convert complex data structures or objects into a format suitable for storage, transmission, or representation, and then reconstruct them back into their original form when needed
  // "serializeUser" converts a user object into a format that can be stored in the session. This typically involves extracting a unique identifier or key from the user object, such as the user ID, and serializing it into a format that can be easily stored and retrieved. The serialized user data is then stored in the session store, allowing the application to identify the user in subsequent requests.
  // Once the user is successfully authenticated, Passport invokes the passport.serializeUser function to determine what user data to store in the session.
  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  // "deserializeUser" refers to the process of reconstructing the user object from the serialized data stored in the session. It involves taking the serialized identifier, such as the user ID, and using it to retrieve the corresponding user object from a database or any other data source. Once the user object is reconstructed, it is made available to the application, typically by attaching it to the request object,
  // When a request is received, Passport middleware checks for the session ID and invokes the passport.deserializeUser function.
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
  
  

  module.exports=passport;