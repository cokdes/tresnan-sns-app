const express = require('express');
const app = express();

const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({profile: 'sns_profile'});
const sns = new AWS.SNS({credentials: credentials, region: 'ap-southeast-1'});

const port = 3000;

app.use(express.json());

app.get('/status', (req, res) => res.json({status: "ok", sns: sns}));

app.post('/subscribe', (req, res) => {
    let params = {
        Protocol: 'SMS', 
        TopicArn: 'arn:aws:sns:ap-southeast-1:102255146012:TresnanSurvey',
        Endpoint: req.body.sms
    };

    sns.subscribe(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.send(data);
        }
    });
});

app.listen(port, () => console.log(`SNS App listening on port ${port}!`));

