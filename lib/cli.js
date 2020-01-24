/*
 *CLI related-tasks
 *
 */

 //dependencies
var readline = require('readline');
var util = require('util');
var debug = util.debuglog('cli');
var events = require('events');
class _events extends events{};
var e = new _events();

//instantiate the CLI module object
var cli = {};

//input handlers
e.on('man',function(str){
  cli.responders.help();
});

e.on('help',function(str){
  cli.responders.help();
});

e.on('exit',function(str){
  cli.responders.exit();
});

e.on('stats',function(str){
  cli.responders.stats();
});

e.on('list users',function(str){
  cli.responders.listUsers();
});

e.on('more user info',function(str){
  cli.responders.moreUserInfo(str);
});

e.on('list checks',function(str){
  cli.responders.listChecks(str);
});

e.on('more check info',function(str){
  cli.responders.moreCheckInfo(str);
});

e.on('list logs',function(str){
  cli.responders.listLogs();
});

e.on('more log info',function(str){
  cli.responders.moreLogInfo(str);
});

//responders object
cli.responders = {};

//help - man
cli.responders.help = function(){
  var commands = {
    'exit' : 'Kill the CLI (and the rest of the application)',
    'man' : 'Shows this help page',
    'help' : 'Alias of the "man" command',
    'stats' : 'Get statistics of the underlying operating system and resource utilization',
    'list users' : 'Show a list of all the registered (undeleted) users in the system',
    'more user info --{userId}' : 'Show details of a specific user',
    'list checks --up --down' : 'Show a list of all the active checks in the system, including their state. The "--up" and the "--down" flags are both optional',
    'more check info--{checkId}' : 'Show details of a specificied check',
    'list logs' : 'Show a list of all the log files available to be read (compressed and uncompressed)',
    'more log info --{fileName}' : 'Show details of a specificied log file'
  };

  //show the header for the help page that is as wide as the screen
  cli.horizontalLine();
  cli.centered('CLI MANUAL');
  cli.horizontalLine();
  cli.verticalSpace(2);

  //show each command, followed by its explanation, in white and yellow respectively
  for(var key in commands){
    if (commands.hasOwnProperty(key)) {
      var value = commands[key];
      var line = '\x1b[33m'+key+'\x1b[0m';
      var padding = 60 - line.length;
      for(i = 0; i < padding; i++){
        line+=' ';
      }
      line+=value;
      console.log(line);
      cli.verticalSpace(1);
    }
  }

  cli.verticalSpace(1);
  //end with another horizontal line
  cli.horizontalLine();

};

//create a vertical space
cli.verticalSpace = function(lines){
  lines = typeof(lines) == 'number' && lines > 0 ? lines : 1;
  for (i = 0; i < lines; i++) {
    console.log('');
  }
};

//create a horizontal line across the screen
cli.horizontalLine = function() {
  //get the available screen size
  var witdh = process.stdout.columns;

  var line = '';
  for(i = 0; i < witdh; i++){
    line+='-';
  }
  console.log(line);
};

//centered text on the screen
cli.centered = function(str){
  str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : '';

  //get the available screen size
  var witdh = process.stdout.columns;

  //calculate the left padding there should be
  var leftPadding = Math.floor((witdh - str.length)/2);

  //put in left padded spaces before the string itself
  var line = '';
  for(i = 0; i < leftPadding; i++){
    line+=' ';
  }
  line+=str;
  console.log(line);
}

//exit
cli.responders.exit = function(){
  process.exit(0);
};

//stats
cli.responders.stats = function(){
  console.log('You asked for stats');
};

//list users
cli.responders.listUsers = function(){
  console.log('You asked to list users');
};

//more user info
cli.responders.moreUserInfo = function(str){
  console.log('You asked for more user info',str);
};

//list checks
cli.responders.listChecks = function(str){
  console.log('You asked to list checks',str);
};

//more check info
cli.responders.moreCheckInfo = function(str){
  console.log('You asked for more check info',str);
};

//list logs
cli.responders.listLogs = function(){
  console.log('You asked to list logs');
};

//more log info
cli.responders.moreLogInfo = function(str){
  console.log('You asked for more log info',str);
};

//input processor
cli.processInput = function(str){
  str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;

  //only process the input if the user actually wrote sommething. Otherwise ignore it.
  if (str) {
    //codify the unique strings that identify the unique questions allowed to be asked
    var uniqueInputs = [
      'man',
      'help',
      'exit',
      'stats',
      'list users',
      'more user info',
      'list checks',
      'more check info',
      'list logs',
      'more log info'
    ];

    //go through possible inputs, emit an event when a match is found
    var matchFound = false;
    var counter = 0;
    uniqueInputs.some(function(input){
      if (str.toLowerCase().indexOf(input) > -1) {
        matchFound = true;
        //emit an event matching the unique input, and include the full string given
        e.emit(input,str);
        return true;
      }
    });

    //if no match is found, tell the user to try again
    if(!matchFound){
      console.log('Sorry, try again');
    }
  }
};

//init script
cli.init = function(){
  //send the start message to the console, in dark blue
  console.log('\x1b[34m%s\x1b[0m','The CLI is running');

  //start the interface
  var _interface = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    prompt : '',
  });

  //create the initial prompt
  _interface.prompt();

  //handle each line of input separately
  _interface.on('line',function(str){
    //send to the input processor
    cli.processInput(str);

    //re-initialize the prompt afterwards
    _interface.prompt();
  });

  //if the user kills the CLI, kill the associated process
  _interface.on('close',function(){
      process.exit(0);
  });

};


//export the module
module.exports = cli;