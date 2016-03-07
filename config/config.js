/**
 * Created by badayaa on 3/6/16.
 */
// Configuration constants for slack and quay.io
var config = {}
config.SLACKTOKEN = "<SLACK_AUTH_TOKEN>";
config.quayiourl  = "https://quay.io/api/v1/";
config.QUAYTOKEN  = "<QUAY_AUTH_TOKEN>";
config.quaytimeout=10000;
config.reponame   = "testingrepo";
config.visibility = "private";
config.description= "Default Description";
module.exports    = config;
