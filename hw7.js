var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7777);

app.get('/',function(req,res){
  
  var pars = [];
  for (var items in req.query){
    pars.push({'parameters':items,'value':req.query[items]})
  }
  var rec = {};
  rec.dataList = pars;
  res.render('get', rec);

});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function(req,res){
  var pars = [];
  for (var items in req.body){
    pars.push({'parameters':items,'value':req.body[items]})
  }
  console.log(pars);
  console.log(req.body);
  var rec = {};
  rec.dataList = pars;
  res.render('post', rec);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
