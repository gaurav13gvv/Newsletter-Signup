const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const firstName = req.body.fn
    const lastName = req.body.ln
    const email = req.body.em

    var data = {
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

    const url = "https://us6.api.mailchimp.com/3.0/lists/74ef459337"
    const options = {
        method: "POST",
        auth: "farhan35574:f189c655d88356cec3c5a1e4f287629f-us6"
    }

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})


app.post("/failure",function(req,res){
    res.redirect("/")
})

app.post("/success",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function () {
    console.log("server is running at 3000");
})

// 970f219be48b19e15496565e42c31b70-us6