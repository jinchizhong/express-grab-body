exports.init = function() {
  return function(req, res, next) {
    req.rawBody = new Buffer('');
    req.rawBodyDone = false;
    req.rawBodyChip = [];
    req.on('data', function(chunk) {
      req.rawBodyChip.push(chunk);
    });
    req.on('end', function() {
      req.rawBody = Buffer.concat(req.rawBodyChip);
      req.rawBodyChip = undefined;
      req.rawBodyDone = true;
      req.emit('bodyGrabed');
    });
    next();
  };
};

exports.grab = function() {
  return function(req, res, next) {
    if (req.rawBody === undefined) {
      throw new Error('bodyGrab.grab() invoked without bodyGrab.init()');
    }
    if (req.rawBodyDone) {
      next();
    } else {
      req.on('bodyGrabed', function() {
        next();
      });
    }
  };
};
