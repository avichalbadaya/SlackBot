/**
 * Created by badayaa on 3/6/16.
 */

// imports
var request = require('request'),
    config = require('../config/config.js');


//create repo function which takes slack text input string as input and calls back cb function on completion.

exports.create_repo = function (text,cb) {
    var list_v=text.trim().replace(/\s+/g, " ").replace(": ",":").split(' ');
    var req={};
    //var req={repository:list_v[1],visibility:list_v[3],description:list_v.slice(4).join(" ")}
    for (var i = 0; i < list_v.length; i++) {
        var key=list_v[i].split(':')[0].toLowerCase();
        var value=list_v[i].split(':')[1];
        switch(key){
            case 'orgname':
                req.organization=value;
                break;
            case 'reponame':
                req.repository=value;
                break;
            case 'visible':
                req.visibility=value;
                break;
            case 'desc':
                req.description=value+' '+list_v.slice(i+1).join(" ");
                break;
        }
    }

    var endpoint = config.quayiourl + "repository";
    var payload={
        "namespace": req.organization,
        "visibility":req.visibility || config.visibility,
        "repository":req.repository || config.reponame,
        "description":req.description || config.description
    };
    var options = {
        url: endpoint,
        strictSSL: false,
        timeout: config.quaytimeout,
        headers: {
            'Authorization': "Bearer "+config.QUAYTOKEN
        },
        json: payload
    };
    request.post(options, cb);
};

//this function sets quayio auth token, takes slack text input string as input and returns back text and status of this operation.
exports.set_config = function (text) {
    var list_v=text.trim().replace(/\s+/g, " ").replace(": ",":").split(' ');
    if (list_v.length<=1){
        return {
            text: "please provide some valid config parameter",
            status: "fail"
        }
    }
    else {
        for (var i = 0; i < list_v.length; i++) {
            var key=list_v[i].split(':')[0];
            var value=list_v[i].split(':')[1];
            config[key] = value;
        }
        return {
            text: "config parmeters were successfully changed",
            status: "success"
        }
    }

};

//this function returns help text, i.e. commands usage available for quay bot. It is triggered when someone types help or any unknown command
exports.help = function () {
    var createrepo_text="# createrepo reponame:<string-repository name>  organame:<string-organization name or namespace> visible:<string-public or private> desc:<string-description of repository> \n default values reponame=testingrepo, visibility=private,description=Default Description";
    var setqtoken_text ="# set QUAYTOKEN:<string- QUAYTOKEN> quaytimeout:<integer- timeout in ms for calling quay api> reponame:< string- default repository name> visibility:<string-public or private> description:< string -default description>" ;
    var resp_text= "Commands Available - createrepo , set \n ";
    resp_text=resp_text+createrepo_text+"\n";
    resp_text=resp_text+setqtoken_text;
    return resp_text;
};

//this is bot reply formatter
exports.gen_response=function(text,status){
    var response={
        text: text,
        icon_emoji: ":green_apple:"
    };
    if(status=="fail"){
        response.icon_emoji=":apple:";
    }
    return response;
};