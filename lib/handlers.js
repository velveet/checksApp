/*
 *request handlers
 *
 */


//dependencies
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');
var _url = require('url');
var dns = require('dns');
var _performance = require('perf_hooks').performance;
var util = require('util');
var debug = util.debuglog('performance');

//magic numbers
const MILISECS_IN_A_SECS = 1000;
const SECS_IN_A_MIN = 60;
const MINS_IN_A_HOUR = 60;

//define the handlers
 var handlers = {};

 /*
  *HTML handlers
  *
  */

//index handlers
handlers.index = function(data,callback){
  //reject any request that isn't GET
  if (data.method == 'get') {

    //prepare data for interpolation
    var templateData = {
      'head.title' : 'Uptime Monitoring - Made Simple',
      'head.description' : 'We offer free, simple uptime monitoring for HTTP/HTTPS sites of all kinds. When your site goes down, we\'ll send you a text to let you know.',
      'body.class' : 'index'
    };

    //read the template as a string
    helpers.getTemplate('index',templateData,function(err,str){
      if (!err && str) {
        //add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str) {
            //return the page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

//create account
handlers.accountCreate = function(data,callback){
  //reject any request that isn't GET
  if (data.method == 'get') {

    //prepare data for interpolation
    var templateData = {
      'head.title' : 'Create an Account',
      'head.description' : 'Signup is easy and only takes a few seconds.',
      'body.class' : 'accountCreate'
    };

    //read the template as a string
    helpers.getTemplate('accountCreate',templateData,function(err,str){
      if (!err && str) {
        //add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str) {
            //return the page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

//create new session
handlers.sessionCreate = function(data,callback){
  //reject any request that isn't GET
  if (data.method == 'get') {

    //prepare data for interpolation
    var templateData = {
      'head.title' : 'Login to your Account',
      'head.description' : 'Please enter your phone number and password to access your account.',
      'body.class' : 'sessionCreate'
    };

    //read the template as a string
    helpers.getTemplate('sessionCreate',templateData,function(err,str){
      if (!err && str) {
        //add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str) {
            //return the page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

//session has been delete
handlers.sessionDeleted = function(data,callback){
  //reject any request that isn't GET
  if (data.method == 'get') {

    //prepare data for interpolation
    var templateData = {
      'head.title' : 'Logged Out',
      'head.description' : 'You have been logged out of your account.',
      'body.class' : 'sessionDeleted'
    };

    //read the template as a string
    helpers.getTemplate('sessionDeleted',templateData,function(err,str){
      if (!err && str) {
        //add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str) {
            //return the page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

//edit your account
handlers.accountEdit = function(data,callback){
  //reject any request that isn't GET
  if (data.method == 'get') {

    //prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Settings',
      'body.class' : 'accountEdit'
    };

    //read the template as a string
    helpers.getTemplate('accountEdit',templateData,function(err,str){
      if (!err && str) {
        //add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str) {
            //return the page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

//account has been deleted
handlers.accountDeleted = function(data,callback){
  //reject any request that isn't GET
  if (data.method == 'get') {

    //prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Deleted',
      'head.description' : 'Your account has been deleted.',
      'body.class' : 'accountDeleted'
    };

    //read the template as a string
    helpers.getTemplate('accountDeleted',templateData,function(err,str){
      if (!err && str) {
        //add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str) {
            //return the page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

//create a new check
handlers.checksCreate = function(data,callback){
  //reject any request that isn't GET
  if (data.method == 'get') {

    //prepare data for interpolation
    var templateData = {
      'head.title' : 'Create a New Check',
      'body.class' : 'checksCreate'
    };

    //read the template as a string
    helpers.getTemplate('checksCreate',templateData,function(err,str){
      if (!err && str) {
        //add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str) {
            //return the page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

//dashboard (view all checks)
handlers.checksList = function(data,callback){
  //reject any request that isn't GET
  if (data.method == 'get') {

    //prepare data for interpolation
    var templateData = {
      'head.title' : 'Dashboard',
      'body.class' : 'checksList'
    };

    //read the template as a string
    helpers.getTemplate('checksList',templateData,function(err,str){
      if (!err && str) {
        //add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str) {
            //return the page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

//edit a check
handlers.checksEdit = function(data,callback){
  //reject any request that isn't GET
  if (data.method == 'get') {

    //prepare data for interpolation
    var templateData = {
      'head.title' : 'Check Details',
      'body.class' : 'checksEdit'
    };

    //read the template as a string
    helpers.getTemplate('checksEdit',templateData,function(err,str){
      if (!err && str) {
        //add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str) {
            //return the page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

//favicon handler
handlers.favicon = function(data,callback){
  //reject any request that isn't a GET
  if (data.method == 'get') {
      //read in the favicon's data
      helpers.getStaticAsset('favicon.ico',function(err,data){
        if (!err && data) {
          //callback the data
          callback(200,data,'favicon');
        } else {
          callback(500);
        }
      });
  } else {
    callback(405);
  }
};

//public assets
handlers.public = function(data,callback) {
  //reject any request that isn't a GET
  if (data.method == 'get') {
    //get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
    if (trimmedAssetName.length > 0) {
      //read in the asset's data
      helpers.getStaticAsset(trimmedAssetName,function(err,data){
        if (!err && data) {
          //determine the content type (default to plain text)
          var contentType = 'plain';

          if (trimmedAssetName.indexOf('.css') > -1) {
            contentType = 'css';
          }

          if (trimmedAssetName.indexOf('.png') > -1) {
            contentType = 'png';
          }

          if (trimmedAssetName.indexOf('.jpg') > -1) {
            contentType = 'jpg';
          }

          if (trimmedAssetName.indexOf('.ico') > -1) {
            contentType = 'favicon';
          }

          callback(200,data,contentType);

        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }
  } else {
    callback(405);
  }
};

 /*
  *JSON handlers
  *
  */

//Example error
handlers.exampleError = function(err,callback) {
  var err = new Error('This is an example error');
  throw(err);
};

//users handler
handlers.users = function(data,callback) {
  //define acceptable methods
  var acceptableMethods = ['post','get','put','delete'];

  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data,callback);
  }else {
    callback(405); //http status code for method not allowed
  }
}

//container for user submethods
handlers._users = {};

/*
post
required data: firstName, lastName, phone, password, tosAgreement
optional data: none
*/
handlers._users.post = function(data,callback){
  //check all required fields are filled out
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    //check if the user exists
    _data.read('users',phone,function(err,data){
      if (err) {

        //hash the password
        var hashedPassword = helpers.hash(password);

        //check if hashedPassword exists
        if (hashedPassword) {

          //create the user object
          var userObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'phone' : phone,
            'hashedPassword' : hashedPassword,
            'tosAgreement' : tosAgreement
          };

          //store the user
          _data.create('users',phone,userObject,function(err){
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error':'Could not create the new user'});
            }
          });
        } else {
          callback(500,{'Error':'Could not hash the user\'s password'});
        };

      } else {
        callback(400,{'Error':'A user with that phone number already exists'});
      }
    });

  } else {
    callback(400,{'Error':'Missing required fields'});
  }
};

/*
get
required data: phone
optional data: none
@TODO only let an authenticated user access their object. Don't expose private information
*/
handlers._users.get = function(data,callback){
  //check if the phone number is valid
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone : false;
  if (phone) {

    //get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    //verify the given token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if (tokenIsValid) {
        //lookup for the user
        _data.read('users',phone,function(err,data){
          if (!err && data) {
            //remove hashedPassword from the user userObject before giving it to the requester
            delete data.hashedPassword;
            callback(200,data);
          } else {
            callback(404);
          }
        });
      } else {
        callback(403,{'Error':'Missing required token in header, or token is invalid'});
      }
    });
  } else {
    callback(400,{'Error':'Missing required field'});
  }
};

/*
put
required data: phone
optional data: firstName, lastName, password (at least one must be specified)
@TODO only let an authenticated user update their own object. Don't expose private information
*/
handlers._users.put = function(data,callback){
  //check for the required field
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone : false;

  //check for the optional fields
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  //error if the phone is invalid
  if (phone) {
    //error if nothing's sent for update
    if (firstName || lastName || password) {

      //get the token from the headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

      //verify the given token is valid for the phone number
      handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
        if (tokenIsValid) {
          //lookup the user
          _data.read('users',phone,function(err,userData){
            if (!err && userData) {

              //update the chosen fields
              if (firstName) {
                userData.firstName = firstName;
              }

              if (lastName) {
                userData.lastName = lastName;
              }

              if (password) {
                userData.hashedPassword = helpers.hash(password);
              }

              //store the new updates
              _data.update('users',phone,userData,function(err){
                if (!err) {
                  callback(200);
                } else {
                  console.log(err);
                  callback(500,{'Error':'Could not update the user'});
                }
              });

            } else {
              callback(400,{'Error':'The specified user does not exist'})
            }
          });
          } else {
            callback(403,{'Error':'Missing required token in header, or token is invalid'});
          }
        });
    } else {
      callback(400,{'Error':'Missing fields to update'});
    }
  } else {
    callback(400,{'Error':'Missing required field'});
  }
};

/*
delete
required field: phone
@TODO only let an authenticated user delete their object. Don't let anyone else delete the other's object
@TODO cleanup (remove) any other data file associated with the user deleted
*/
handlers._users.delete = function(data,callback){
  //check the required field
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone : false;
  if (phone) {

    //get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    //verify the given token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if (tokenIsValid) {
        //lookup for the user
        _data.read('users',phone,function(err,userData){
          if (!err && userData) {
            //delete the user
            _data.delete('users',phone,function(err){
              if (!err) {
                //delete each one of the checks associated with the user deleted
                var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                var checksToDelete = userChecks.length;
                if (checksToDelete > 0) {
                  var checksDeleted = 0;
                  var deletionErrors = false;
                  //loop through the checks
                  userChecks.forEach(function(checkId){
                    //delete the check
                    _data.delete('checks',checkId,function(err){

                      if (err) {
                        deletionErrors = true;
                      }

                      checksDeleted++;

                      if (checksDeleted == checksToDelete) {
                        if (!deletionErrors) {
                          callback(200);
                        } else {
                          callback(500,{'Error':'Errors encountered while attempting to delete all of the user\'s checks. All checks may not have been deleted from the system successfully'});
                        }
                      }
                    });
                  });
                } else {
                  callback(200);
                }
              } else {
                callback(500,{'Error':'Could not delete the specified user'});
              }
            });
          } else {
            callback(400,{'Error':'Could not find the specified user'});
          }
        });
      } else {
        callback(403,{'Error':'Missing required token in header, or token is invalid'});
      }
    });
  } else {
    callback(400,{'Error':'Missing required field'});
  }
};

//tokens handler
handlers.tokens = function(data,callback) {
  //define acceptable methods
  var acceptableMethods = ['post','get','put','delete'];

  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data,callback);
  }else {
    callback(405); //http status code for method not allowed
  }
}

//container for all tokens methods
handlers._tokens = {};

/*
tokens post
required data: phone, password
optional data: none
*/
handlers._tokens.post = function(data,callback){
  _performance.mark('entered function');
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  _performance.mark('inputs validated');
  if (phone && password) {
    //lookup the user who matches that phone number
    _performance.mark('beginning user lookup');
    _data.read('users',phone,function(err,userData){
      _performance.mark('user lookup complete');
      if (!err && userData) {
        //hash the sent password, && compare to one stored in the user data object
        _performance.mark('beginning password hashing');
        var hashedPassword = helpers.hash(password);
        _performance.mark('password hashing complete');

        if (hashedPassword == userData.hashedPassword) {
          //if valid, create a new token {random name, expiration date: 1 hour}
          _performance.mark('creating data for token');
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + (MILISECS_IN_A_SECS * SECS_IN_A_MIN * MINS_IN_A_HOUR);
          var tokenObject = {
            'phone' : phone,
            'id' : tokenId,
            'expires' : expires
          };

          //store the token
          _performance.mark('beginning storing token');
          _data.create('tokens',tokenId,tokenObject,function(err) {
            _performance.mark('storing token complete');

            //gather all the measurements
            _performance.measure('Beginning to end','entered function','storing token complete');
            _performance.measure('Validating user input','entered function','inputs validated');
            _performance.measure('User lookup','beginning user lookup','user lookup complete');
            _performance.measure('Password hashing','beginning password hashing','password hashing complete');
            _performance.measure('Token data creation','creating data for token','beginning storing token');
            _performance.measure('Token storing','beginning storing token','storing token complete');

            //log out all the measurements
            /*
            var measurements = _performance.getEntriesByType('measure'); //getEntriesByType
            measurements.forEach(function(measurement){
              debug('\x1b[33m%s\x1b[0m',measurement.name+' '+measurement.duration);
            });
            */

            if (!err) {
              callback(200,tokenObject);
            } else {
              callback(500,{'Error':'Could not create the new token'});
            }
          });

        } else {
          callback(400,{'Error':'Password did not match the specified user\'s stored password'});
        }
      } else {
        callback(400,{'Error':'Could not find the specified user'});
      }
    });
  } else {
    callback(400,{'Error':'Missing required field(s)'});
  }
};

/*
tokens get
required data: id
optional data: none
*/
handlers._tokens.get = function(data,callback){
  //check if the id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id : false;
  if (id) {
    //lookup for the user
    _data.read('tokens',id,function(err,tokenData){
      if (!err && tokenData) {
        callback(200,tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error':'Missing required field'});
  }
};

/*
tokens put
required data: id, extend
optional data: none
*/
handlers._tokens.put = function(data,callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id : false;
  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  if (id && extend) {
    //lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if (!err && tokenData) {
        //check if the token has not already expired
        if (tokenData.expires > Date.now()) {
          //extend expiration date one hour more
          tokenData.expires = Date.now() + (MILISECS_IN_A_SECS * SECS_IN_A_MIN * MINS_IN_A_HOUR);

          //store the new updates
          _data.update('tokens',id,tokenData,function(err){
            if (!err) {
              callback(200);
            } else {
              callback(500,{'Error':'Could not update the token\'s expiration'});
            }
          });
        } else {
          callback(400,{'Error':'The token has already expired, and cannot be extended'});
        }
      } else {
        callback(400,{'Error':'Specified token does not exist'});
      }
    });
  } else {
    callback(400,{'Error':'Missing required field(s) or field(s) are invalid'});
  }
};

/*
tokens delete
required data: id
optional data: none
*/
handlers._tokens.delete = function(data,callback){
  //check if the id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id : false;
  if (id) {
    //lookup the token
    _data.read('tokens',id,function(err,data){
      if (!err && data) {
        //delete the token
        _data.delete('tokens',id,function(err){
          if (!err) {
            callback(200);
          } else {
            callback(500,{'Error':'Could not delete the specified token'});
          }
        });
      } else {
        callback(400,{'Error':'Could not find the specified token'});
      }
    });
  } else {
    callback(400,{'Error':'Missing required field'});
  }
};

//verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id,phone,callback){
  //lookup the token
  _data.read('tokens',id,function(err,tokenData){
    if (!err && tokenData) {
      //check the token is for the given user && it has not expired
      if (tokenData.phone == phone && tokenData.expires > Date.now()) {
        callback(true);
      }
    } else {
      callback(false)
    }
  });
};

//checks
handlers.checks = function(data,callback) {
  //define acceptable methods
  var acceptableMethods = ['post','get','put','delete'];

  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._checks[data.method](data,callback);
  }else {
    callback(405); //http status code for method not allowed
  }
}

//container for all checks methods
handlers._checks = {};

/*
checks post
required data: protocol, url, method, successCodes, timeoutSeconds
optional data: none
*/
handlers._checks.post = function(data,callback) {
  //validate inputs
  var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url : false;
  var method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
  var successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  if (protocol && url && method && successCodes && timeoutSeconds) {
    //get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    //lookup the user by reading the token
    _data.read('tokens',token,function(err,tokenData){
      if (!err && tokenData) {
        var userPhone = tokenData.phone;

        //lookup the user data
        _data.read('users',userPhone,function(err,userData){
          if (!err && userData) {
            var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];

            //verify if the user has less than the number of max checks allowed per user
            if (userChecks.length < config.maxChecks) {
              //create a random id for the check
              var checkId = helpers.createRandomString(20);

              //verify that the URL given has DNS entries (and therefore can resolve)
              var parsedUrl = _url.parse(protocol+'://'+url,true);
              var hostName = typeof(parsedUrl.hostname) == 'string' && parsedUrl.hostname.length > 0 ? parsedUrl.hostname : false;
              dns.resolve(hostName,function(err,records){
                if (!err && records) {

                  //create the object, include the user's phone
                  var checkObject = {
                      'id' : checkId,
                      'phone' : userPhone,
                      'protocol' : protocol,
                      'url' : url,
                      'method' : method,
                      'successCodes' : successCodes,
                      'timeoutSeconds' : timeoutSeconds
                  };

                  //save the new object
                  _data.create('checks',checkId,checkObject,function(err){
                    if (!err) {
                      //add checkId to the user's object
                      userData.checks = userChecks;
                      userData.checks.push(checkId);

                      //save the new user's data
                      _data.update('users',userPhone,userData,function(err){
                        if (!err) {
                          //return the data about the new check
                          callback(200,checkObject);
                        } else {
                          callback(500,{'Error':'Could not update the user with the new check'});
                        }
                      });

                    } else {
                      callback(500,{'Error':'Could not create the new check'});
                    }
                  });

                } else {
                  callback(400,{'Error' : 'The hostname of the URL entered did not resolve to any DNS entries'});
                }
              });
            } else {
              callback(400,{'Error':'The user has already the maximum number of checks ('+config.maxChecks+')'});
            }
          } else {
            callback(403);
          }
        });
      } else {
        callback(403); //http status code for non authorized
      }
    });
  } else {
    callback(400,{'Error':'Missing required inputs, or inputs are invalid'});
  }

};

/*
checks get
required data: id
optional data: none
*/
handlers._checks.get = function(data,callback){
  //check if the phone number is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id : false;
  if (id) {

    //lookup the check
    _data.read('checks',id,function(err,checkData){
      if (!err && checkData) {
        //get the token from the headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        //verify the given token is valid && belongs to the user who created the check
        handlers._tokens.verifyToken(token,checkData.phone,function(tokenIsValid){
          if (tokenIsValid) {
            //return the check data
            callback(200,checkData);
          } else {
            callback(403);
          }
        });
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error':'Missing required field'});
  }
};

/*
checks put
required data: id
optional data: protocol, url, method, successCodes, timeoutSeconds (at least one must be sent)
*/
handlers._checks.put = function(data,callback){
  //check for the required field
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id : false;

  //check for the optional fields
  var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url : false;
  var method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
  var successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  //check if the id is valid
  if (id) {
    //check if one or more optional fields has been sent
    if (protocol || url || method || successCodes || timeoutSeconds) {
      //lookup the check
      _data.read('checks',id,function(err,checkData){
        if (!err && checkData) {
          //get the token from the headers
          var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
          //verify the given token is valid && belongs to the user who created the check
          handlers._tokens.verifyToken(token,checkData.phone,function(tokenIsValid){
            if (tokenIsValid) {
              //update the check where necessary
              if (protocol) {
                checkData.protocol = protocol;
              }
              if (url) {
                checkData.url = url;
              }
              if (method) {
                checkData.method = method;
              }
              if (successCodes) {
                checkData.successCodes = successCodes;
              }
              if (timeoutSeconds) {
                checkData.timeoutSeconds = timeoutSeconds;
              }

              //store the updated data
              _data.update('checks',id,checkData,function(err){
                if (!err) {
                  callback(200);
                } else {
                  callback(500,{'Error':'Could not update the check'});
                }
              });
            } else {
              callback(403);
            }
          });
        } else {
          callback(400,{'Error':'Check ID did not exist'});
        }
      });
    } else {
      callback(400,'Missing fields to update');
    }
  } else {
    callback(400,{'Error':'Missing required field'});
  }
};

/*
checks delete
required data: id
optional data: none
*/
handlers._checks.delete = function(data,callback){
  //check the required field
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id : false;
  if (id) {

    //lookup the check
    _data.read('checks',id,function(err,checkData){
      if (!err && checkData) {
        //get the token from the headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

        //verify the given token is valid for the phone number
        handlers._tokens.verifyToken(token,checkData.phone,function(tokenIsValid){
          if (tokenIsValid) {

            //delete the check data
            _data.delete('checks',id,function(err){
              if (!err) {
                //lookup the user
                _data.read('users',checkData.phone,function(err,userData){
                  if (!err && userData) {
                    var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];

                    //remove the deleted check from the list of checks
                    var checkPosition = userChecks.indexOf(id);

                    if (checkPosition > -1) {
                      userChecks.splice(checkPosition,1);

                      //update the user's object
                      _data.update('users',checkData.phone,userData,function(err){
                        if (!err) {
                          callback(200);
                        } else {
                          callback(500,{'Error':'Could not update the user'});
                        }
                      });
                    } else {
                      callback(500,{'Error':'Could not find the check on the user\'s object, so could not remove it'});
                    }
                  } else {
                    callback(500,{'Error':'Could not find the user who created the check, so could not remove the check from the list of checks on the user object'});
                  }
                });
              } else {
                callback(500,{'Error':'Could not delete the check data'});
              }
            });
          } else {
            callback(403,{'Error':'Missing required token in header, or token is invalid'});
          }
        });
      } else {
        callback(400,{'Error':'Specified check ID does not exist'});
      }
    });
  } else {
    callback(400,{'Error':'Missing required field'});
  }
};


//ping handler
handlers.ping = function(data,callback){
  callback(200);
};

//not found handler
handlers.notFound = function(data,callback){
  callback(404);
};

//export the module
module.exports = handlers;
