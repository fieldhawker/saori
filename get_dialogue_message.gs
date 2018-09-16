function getDialogueMessage(message) {

  if (message.length <= 0) message = '元気ですか？';
  
  var dialogueUrl = "https://chatbot-api.userlocal.jp/api/chat?message=##message##&key=3249ad8e8790d2b8b4c4"
    .replace('##message##', message);

  var dialogue = UrlFetchApp.fetch(dialogueUrl);

  var json = JSON.parse(dialogue.getContentText());
  Logger.log("dialogue: " + json.toSource());
  Logger.log("result: " + json.result);
  
  return json.result;
}
