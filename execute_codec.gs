function executeCodec(message) {

  if (message.length <= 0) message = '変換';

  var converted_message  = '';
  var candidates         = '';
  
  var options = {
    'headers' : {
      'Authorization': 'Bearer Qtrh1TkeAGKPeLfg49sfnylyOlLpRXyZ73'
    },
    'muteHttpExceptions': true,
  };
  var requestUrl = 'https://api.codic.jp/v1/engine/translate.json?casing=lower+underscore&text=##message##'
    .replace('##message##', encodeURI(message));
    
  var codec = UrlFetchApp.fetch(requestUrl, options);
  var json  = JSON.parse(codec.getContentText());
    
//  Logger.log("codec: " + json.toSource());

  Logger.log("message: " + message);
  Logger.log("translated_text: " + json[0]["translated_text"]);
  
  converted_message = " [ ##message## ] の翻訳結果は [##translated_text##] です。\n他の選択肢として\n##candidates##があります。";
  converted_message = converted_message
    .replace('##message##', message)
    .replace('##translated_text##', json[0]["translated_text"]);

  json[0]["words"][0]["candidates"].forEach(function( text ) {
    candidates += ' [##candidates##] \n'.replace('##candidates##', text["text"]);
  });
  
  converted_message = converted_message
    .replace('##candidates##', candidates);
    
  Logger.log("message: " + converted_message);

  return converted_message;
    
}
