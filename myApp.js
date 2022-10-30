require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser=require('body-parser');
//console.log(mySecret);

app.use(function(req,res,next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(__dirname + '/public'));
app.get('/now',function(req,res,next){
  req.time=new Date().toString();
  next();
},function(req,res){
  res.send({time:req.time});
})

app.get('/:word/echo',function(req,res) {
 res.json({echo: req.params.word});
})

//task 10
app.get('/name',function(req,res) {
  let string = req.query.first + ' ' + req.query.last;
  res.json({name: string});
})
app.post('/name',bodyParser.urlencoded({extended: false}),
         (req,res) => {
           let string = req.body.first + ' ' + req.body.last;
           res.json({name: string});
         }
        )


app.get('/',function(req, res) {
  res.sendFile('/home/runner/boilerplate-express/views/index.html');
})
app.get('/json',function(req,res) {
  if (process.env['MESSAGE_STYLE'] === 'uppercase') {
     res.json(
    {"message": "HELLO JSON"}
  );
  }
  else{
    res.json(
    {"message": "Hello json"}
  );
  }  
 
})

app.use('/public',express.static(__dirname + '/public'));




//console.log('__dirname')



































 module.exports = app;
