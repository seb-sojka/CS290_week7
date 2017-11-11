var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3354);

app.get('/',function(req,res){
	var pars = genParsList(req.query)
	displayType(pars, 'GET', res);
});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function(req,res){
	var pars = genParsList(req.body)
	displayType(pars, 'POST', res);
});

function genParsList(list){
	var newPars = []
	for (var items in list){
		newPars.push({'parameters':items,'value':list[items]})
	}
	return newPars;
}

function displayType(parsIn, type, res)
{
	var rec = {};
	rec.dataList = parsIn;
	rec.type =  type;
	res.render('typeList', rec);
}

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
  console.log('Website Located at http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
