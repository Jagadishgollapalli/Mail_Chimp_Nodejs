const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const console = require("console");




const app = express();

app.use(express.static("public")) //this is used to use our local files like style.css otherwise they wont work


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        update_existing:true,
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };


    // if(!data.members.email_address && !data.merge_feilds){
    //     console.log("PLease fill the details")
    // }else{
    //     
       const jsonData = JSON.stringify(data);

    

        const url = "https://us10.api.mailchimp.com/3.0/lists/b3bd6d2597"

        const options = {
            method: "POST",
            auth: "jagadish24:778abfec4d0542b87c0759928ded4a96-us10"
        }

        const request = https.request(url,options,function(response){

            if (response.statusCode === 200){
                res.sendFile(__dirname + "/SuccessPage.html")
            }else{
                res.sendFile(__dirname + "/FailurePage.html")
            }

            response.on("data", function(data){
                console.log(JSON.parse(data));
            })
        })

        request.write(jsonData);
        request.end();
    // }
})



app.post("/success", function(req,res){
    res.redirect("https://e-shop-ui-reactjs.netlify.app/")
});

app.post("/failure", function(req,res){
    res.redirect("/")
});

app.listen(process.env.PORT || 5000, function () {
    console.log("server running succesfully in 5000");
  });



  //apikey - 778abfec4d0542b87c0759928ded4a96-us10

  //listid - b3bd6d2597