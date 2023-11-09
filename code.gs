const LINE_URL = 'https://api.line.me/v2/bot/message/reply';
const USER_ID = PropertiesService.getScriptProperties().getProperty("USER_ID"); 
const LINE_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE_TOKEN"); 
const MAIL = PropertiesService.getScriptProperties().getProperty("MAIL"); 

function doPost(e){
  const json = JSON.parse(e.postData.contents);

  if (json.events[0].source.userId != USER_ID) { return; }
  if (typeof json.events[0].replyToken === 'underfined') { return; }
  
  if (json.events[0].message.type == 'text') {
    MailApp.sendEmail(MAIL, 'test', text);
    line_post(json.events[0].replyToken, json.events[0].message.text); // オウム返し
  }

  return;
}

function line_post(reply_token, text){
  const option = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + LINE_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': text,
      }],
    }),
  }
  UrlFetchApp.fetch(LINE_URL, option);
}
