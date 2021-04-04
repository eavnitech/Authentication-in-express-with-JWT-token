
const express = require('express')
const app = express()
const port = 3000

var jwt = require('jsonwebtoken');
var yourKey = "yourkey";


app.get('/', (req, res) => {
  res.send('Hello World!')
})


var middleware = function(req, res, next){
	var token = req.header('x-auth');
	
    jwt.verify(token, yourKey, function(err, decoded) {    
    if (err) {    
        res.status(401).send({message:'Please login'});
    } 
	 next();
  });
}

app.get('/createJwtToken', (req, res) => {
	var token = jwt.sign({ name: 'eavnitech' }, yourKey);
	
	res.send({token});
});



app.get('/verifyJwt', (req, res) => {
	let token = req.query.token;
	var decoded = jwt.verify(token, yourKey);
	
	res.send({decoded});
});

app.post('/verifyThroughHeader', middleware , (req, res) => {
	
	res.send({result:"Your are authenticated"});
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})