const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var pdf = require("pdf-creator-node");
var fs = require('fs')

var html = fs.readFileSync('template.html', 'utf8');


app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
  });

app.get('',async(req,res) => {




  var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm"
 };


var users = [
    {
        name:"Shyam",
        age:"26"
    },
    {
        name:"Richard Jebasingh",
        age:"30"
    },
    {
        name:"Vijay",
        age:"34"
    },
    {
        name:"issac",
        age:"34"
    }
]


for(i in users){
    var document = {
        html: html,
        data: {
            users: [
                {
                    name:users[i].name,
                    age:users[i].age
                }
            ]
        },
        path: "./"+users[i].name+"-output.pdf"
    };
    pdf.create(document, options)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    });
}



}); 

    app.use(cors());

    const server = app.listen(4200, function() {
      let host = server.address().address;
      let port = server.address().port;
    
      console.log('App listening at http://%s:%s', host, port);
    });
    