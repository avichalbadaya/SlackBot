//imports
var quayio = require('../services/quay.js'),
    config = require('../config/config.js'),
    Botkit = require('botkit');

//health check for bot, check if bot is able to connect with slack using SLACKTOKEN
exports.health=function (req, res) {
    var controller = Botkit.slackbot({json_file_store:'./bot_store'});
    var bot = controller.spawn({token:process.env.SLACKTOKEN||config.SLACKTOKEN}).startRTM();
    bot.startRTM(function(err,bot,payload) {
        if (err) {
            res.status(200).json({status: "Failure", message: "Cannot connect to slack, check your Slack Auth Token"});
        }
        else{
            res.status(200).json({status: "Success", message: "Bot Connected to Slack"});
        }
    });
    bot.closeRTM();
};

//Slack hear which triggers with the start of our node application
exports.slack_hear=function(){
    var controller = Botkit.slackbot({json_file_store:'./bot_store'});
    var bot = controller.spawn({token:process.env.SLACKTOKEN||config.SLACKTOKEN}).startRTM();
    controller.hears(['.*'],'direct_message,direct_mention,mention',function(bot, message) {
        function callback(err, resp) {
            if(resp.statusCode.toString().match('20[0-9]')!=null) {
                var func_resp=resp.body.name +" repository created under organization/namespace " +resp.body.namespace;
                bot.reply(message, quayio.gen_response(func_resp,"success"));
            }
            else{
                var func_resp=resp.body.message ||resp.body.error_description || resp.body.error;
                bot.reply(message,quayio.gen_response(func_resp,"fail"));
            }
        }
        switch (message.text.trim().split(' ')[0].toLowerCase()) {
            case 'createrepo':
                quayio.create_repo(message.text, callback);
                break;
            case 'set':
                var response = quayio.set_config(message.text);
                bot.reply(message, quayio.gen_response(response.text, response.status));
                break;
            default:
                bot.reply(message, quayio.gen_response(quayio.help(), "success"));
                break;
        }
    });
};