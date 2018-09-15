function doPost(e) {

  // 設定値の取得
  var token        = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var bot_name     = PropertiesService.getScriptProperties().getProperty('BOT_NAME');
  var bot_icon     = PropertiesService.getScriptProperties().getProperty('BOT_ICON');
  var verify_token = PropertiesService.getScriptProperties().getProperty('VERIFY_TOKEN');
  var len_trigger  = 'saori:'.length;
  
  // 投稿の認証
  if (verify_token != e.parameter.token) {
    throw new Error("invalid token.");
  }
  
  var app = SlackApp.create(token);
  
  //Trigger Words部分の削除
  var text = e.parameter.text.substr(len_trigger);
  
  // 出力メッセージ
  var message = '';
  
  if (text.match(/おはよう/)) {
      message = "おはようございます。今日もお仕事頑張りましょう！";
      
  } else if (text.match(/weather:/)) {
      result_message = getWeather();
      message = "<@" + e.parameter.user_name + ">\n" + result_message;
      
  } else if (text.match(/codec:/)) {
      result_message = executeCodec(text.substr("codec:".length).trim());
      message = "<@" + e.parameter.user_name + ">\n" + result_message;
      
  } else if (text.match(/praise:/)) {
      result_message = text.substr("praise:".length).trim();
      var words = ['素敵です！', 'かっこいい～～！', 'さすがですね！', 'やっぱ違うわぁ～！'];
      var random = Math.floor( Math.random() * words.length );
      message = result_message + 'さん！' + words[random];
      
  } else if (text.match(/image:/)) {
      result_message = getSearchImage(text.substr("image:".length).trim());
      message = "<@" + e.parameter.user_name + ">\n" + result_message;
      
  } else if (text.match(/talk:/)) {
      result_message = getDialogueMessage(text.substr("talk:".length).trim());
      message = "<@" + e.parameter.user_name + ">\n" + result_message;      
      
  } else if (text.match(/help:/)) {
      message = "<@" + e.parameter.user_name + ">\n"
        + '現在使用できるコマンドは以下になります。\n'
        + '[ weather: ] 千代田区の天気を教えてくれます。\n'
        + '[ codec:(文字列) ] (文字列)をプログラムでよく使用される英単語に変換してくれます。\n'
        + '[ praise:(@名前) ] (@名前)を褒めてくれます。\n'
        + '[ image:(文字列) ] (文字列)で画像検索します。\n'
        + '[ talk:(文字列) ] (文字列)でBOTに話しかけます。\n'
        + '[ help: ] 使用可能なコマンドが確認できます。\n'
      ;
  } else {
      message = e.parameter.user_name + "さんは「" + text + "」と言っています。";  
  }
  
  return app.postMessage(e.parameter.channel_id, message, {
    username: bot_name,
    icon_url: bot_icon
  });
  
}