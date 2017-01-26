const Twitter  = require('twitter');

const client = new Twitter ({
  consumer_key:         'fQNz3M7EpfMpUU52TYwI46ng1',
  consumer_secret:      '2t7xpTMlm85eo0wrkVHTQbbQ6BbkRLy8gaXtxJYzqlb0idRXY1',
  access_token_key:     '3880918943-TA0eE2QFGqQGsAvTkbxscY7XSsFCGbbtccvBnPl',
  access_token_secret:  'ANDr9b24DmqocGkv5xG0tAWTSXzWufT7Wm1Mza49gbIMk'
})

module.exports = client;