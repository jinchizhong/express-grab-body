express-body-grab
=================

Grab raw body in express 4, works with body parser, multer, multiparty and etc...

Sometimes, you have to get raw request body. (e.g. check digest of request body).
But, only one middleware can get body in express. That's really bad design.
So I make this middleware to work around this problem. This is not a prefect solution.
I hope express 5 can solve this problem.

Usage
=====

    var bodyGrab = require('..');

    // you have to call this, before all body parser middlewares...
    // elsewise, body-grab may leak body
    app.use(bodyGrab.init());

    // you body parser middlewares...
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    ...

    // you have to call this, after all body parser middlewares...
    // elsewise, your body parser middlewares will not works...
    app.use(bodyGrab.grab());

    app.post('/', function(req, res)) {
      // req.body  from your body parser middlewares...
      // req.rawBody  from body-grab
    });


