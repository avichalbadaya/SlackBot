Slack Bot for automating Quay.io tasks
======

# Current Functionality
1. Create repositories in Quay.io under given organization with public/private visibility and user defined description.
2. Set Quay authorization token, Quay api url, Quay api timeout, default repository name,
repository description and default visibility.
3. For all other keywords/commands, bot will respond back with help text. 
4. This bot should respond back with error messages incase there was any problem while creating repository. 

# Initial Preparation
- Create a bot user in slack (https://my.slack.com/services/new/bot) and put Auth token generated in ./config/config.js SLACKTOKEN variable. You can add this bot as Direct Message contact in your Slack or add it to any channel from where you would like to pass commands to this bot.
- Create a application in your Quay.io Org and generate a auth token which has permission to create repositories. Put Auth token generated in ./config/config.js QUAYTOKEN variable . Ref Link http://docs.quay.io/api/ to generate token.
- Once we are done with adding bot and putting correct tokens in config file (config/config.js), we are good for moving ahead with installation process.

# Installation

## Prerequisites**
- This app was developed using following node and npm versions 
    - node: v5.1.1
    - npm: v3.3.12
BUT I have also tested it on node v4.2.1 and v0.8.28, so application should work for any version above v0.8.28.

## Steps
- Fork this repository or download this code and unzip it.
- Once you have it locally, go project directory and run following commands.

```shell
npm install
export PORT=8000 //only if you are running bot locally, as bot will try to run on port 80 which might not be allowed.
node server.js
```
## Desired output

```shell
info: ** Using simple storage. Saving data to ./bot_store
info: ** Setting up custom handlers for processing Slack messages
info: ** API CALL: https://slack.com/api/rtm.start
notice: ** BOT ID:  quay  ...attempting to connect to RTM!
```

## Run Mocha basic test

```shell
./node_modules/mocha/bin/mocha -R spec tests/index.js
```

## Desired Output

```shell
express app test
✓ testing /
info: ** Using simple storage. Saving data to ./bot_store
info: ** Setting up custom handlers for processing Slack messages
info: ** API CALL: https://slack.com/api/rtm.start
✓ testing /_health
✓ testing 404 for invalid url

3 passing (188ms)
```


You can also check status of app from : http://127.0.0.1:8000/

# Slack Commands


## Creating Repository

### Syntax
>> createrepo reponame:string-repository-name organame:string-organization-name visible:string-public-private desc:string-description-of-repository 

**if no parameter are set, it will pick default values i.e.
**default values reponame=testingrepo, visibility=private,description=Default Description  

### Sample valid request
```shell
createrepo reponame:avichaltest visible:public orgname:avichalorg desc:Test Description
```
### Sample Success Output
```shell
avichaltest repository created under organization/namespace avichalorg
```
### Sample Error Outputs
```shell
Payment Required //as default visibility is private and free users can only create public repositories.
Unauthorized //invalid organization
OAuth access token could not be validated:QUAYTOKEN // Invalid QUAY Auth token
Repository already exists //another repo exists with same name under given namespace/organization
Invalid repository name //Improper repository name
```
## Setting Config Parameters

### Syntax
>> set QUAYTOKEN:string-QUAYTOKEN quaytimeout:integer-timeout-in-ms-for-calling-quay-api reponame:string-default-repository-name visibility:string-public-or-private description:string-default-description

**if no parameter are set, it will pick default values i.e.
**default values reponame=testingrepo, visibility=private,description=Default Description  

### Sample valid request
```shell
set QUAYTOKEN:VALIDTOKEN quaytimeout:10000 reponame:avichaltest visibility:public description:Test Description
```

**provide atleast one key:value pair . 

### Sample Success Output
```shell
config parmeters were successfully changed
```
### Sample Error Outputs
```shell
please provide some valid config parameter
```


# Deploy it on Heroku

## Prerequisits
- Heroku toolbelt - install it from https://toolbelt.heroku.com/

## Steps
- Go inside SlackBot project folder
- run following commands

```shell
heroku login
heroku create
git push heroku master
heroku ps:scale web=1
heroku open
```

## Desired output
- Heroku open should open up base url of bot that will give you its status. And you should see your bot active in Slack.
