Function.prototype.call = Function.prototype.call || function (context) {
  var context = context || window;
  context.fn = this;
  var args = [];
  for(var i = 0; i < arguments.length; i++) {
      args.push('arguments['+ i +']');
  }
  debugger;
  var result = eval('context.fn('+ args +  ')');
  delete context.fn;
  return result;
};