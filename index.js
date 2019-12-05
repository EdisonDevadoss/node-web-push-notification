const express  = require('express');
const webpush  = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json())


const publicVapidKey = 'BC-m2A1tQrWmqcp55m0vSqiYHngPUmhtiYr65NVirRygz-klpR6pqp3W_TYPv7rOS_-8m4sD19sGVM83YUEn_pA';
const privateVapidKey = 'ao6Vudym9DL6iVALb5hoMysWph5bE1gXWldFgECfEUw';

webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

//Subscribe route
app.post('/subscribe', (req, res)=>{
    //Get pushsubscription
    const subscription = req.body

    res.status(201).json({})

    //Create payload
    const payload = JSON.stringify({title: 'Test payload'});

    //Pass object to send notification
     webpush.sendNotification(subscription, payload).catch((error)=> console.error(error));

})

const port = 5000;
app.listen(port, ()=>{
    console.log(`server listening ${port}`)
})