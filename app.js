
//jshint esversion:6

const express = require("express");


const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use("/public" , express.static(__dirname + "/public"));
app.use(express.urlencoded({extented: true}));

app.get("/" , function(req ,res){

    res.sendFile(__dirname + "/index.html");

});

app.post("/" , function(req , res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;


    const data = {

        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };


    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/594374cfb2";

    const Option = {
        method: "POST",
        auth: "lakshya1342002:f801abaa0bad739412fd7116b0bf258b-us17" 
    }

   const request =  https.request(url , Option , function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }

        response.on("data" , function(data){
console.log(JSON.parse(data));
        })
    })

request.write(jsonData);
request.end();


});



app.listen(process.env.PORT || 3000, function(){

        console.log("server is running on port 3000");
    });



    //api key
   // f801abaa0bad739412fd7116b0bf258b-us17

//    listid
//    594374cfb2