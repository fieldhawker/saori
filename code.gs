function doPost(e) {

  // 設定値の取得
  var token        = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var bot_name     = PropertiesService.getScriptProperties().getProperty('BOT_NAME');
  var bot_icon     = PropertiesService.getScriptProperties().getProperty('BOT_ICON');
  var verify_token = PropertiesService.getScriptProperties().getProperty('VERIFY_TOKEN');
  
  Logger.log("token: " + e.parameter.token);
  
  // 投稿の認証
  if (verify_token != e.parameter.token) {
    throw new Error("invalid token.");
  }
  
  var app = SlackApp.create(token);
  
  //Trigger Words部分の削除
  var text = e.parameter.text.replace('saori:', '');
  
  // 出力メッセージ
  var message = '';
  
  if (text.match(/おはよう/)) {
      message = "おはようございます。今日もお仕事頑張りましょう！";
      
  } else if (text.match(/ぬるぽ/)) {
      message = "<@" + e.parameter.user_name + ">\n" + "ガッ";
      
  } else if (text.match(/weather:/)) {
      var result_message = getWeather();
      message = "<@" + e.parameter.user_name + ">\n" + result_message;
      
  } else if (text.match(/codic:/)) {
      var result_message = executeCodic(text.replace("codic:", "").trim());
      message = "<@" + e.parameter.user_name + ">\n" + result_message;
      
  } else if (text.match(/chkshuho:/)) {
      var prefix = '現時点で提出を検知していないのは以下の方々です。\n\n';
      var result_message = checkReport('weekly_reports', text.replace("chkshuho:", "").trim());
      
      if (result_message.length <= 0) result_message = '全員の提出を確認しました！お疲れ様です！';
  
      message = "<@" + e.parameter.user_name + ">\n" + prefix + result_message;
      
  } else if (text.match(/chkgeppo:/)) {
      var prefix = '現時点で提出を検知していないのは以下の方々です。\n\n';
      var result_message = checkReport('monthly_reports', text.replace("chkgeppo:", "").trim());
      
      if (result_message.length <= 0) result_message = '全員の提出を確認しました！お疲れ様です！';
      
      message = "<@" + e.parameter.user_name + ">\n" + prefix + result_message;
      
  } else if (text.match(/dice:/)) {
      var result_message = executeDice(text.replace("dice:", "").trim());
      message = "<@" + e.parameter.user_name + ">\n" + result_message;
      
  } else if (text.match(/iine:/)) {
      var result_message = getIine(text.replace("iine:", "").trim());
      message = result_message;
      
  } else if (text.match(/waruine:/)) {
      var result_message = getWaruine(text.replace("waruine:", "").trim());
      message = result_message;
       
  } else if (text.match(/image:/)) {
      var result_message = getSearchImage(text.replace("image:", "").trim());
      message = "<@" + e.parameter.user_name + ">\n" + result_message;
      
  } else if (text.match(/talk:/)) {
      var result_message = getDialogueMessage(text.replace("talk:", "").trim());
      message = "<@" + e.parameter.user_name + ">\n" + result_message;
      
  } else if (text.match(/21:/)) {
      var result_message = "https://script.google.com/macros/s/AKfycbwI7Ye7jN-Fi82zHcXcLG80tDn7n8fcgcCWmiIRnlePe9PgN6Q1/exec";
      message = "<@" + e.parameter.user_name + ">\n" + result_message;
      
  } else if (text.match(/help:/) || (text.length <= 0)) {
      message = "<@" + e.parameter.user_name + ">\n"
        + '現在使用できるコマンドは以下になります。\n'
        + '[ weather: ] 千代田区の天気を教えてくれます。\n'
        + '[ codic:(文字列) ] (文字列)をプログラムでよく使用される英単語に変換してくれます。\n'
        + '[ chkshuho: ] 週報の未提出者を確認します。\n'
        + '[ chkgeppo: ] 月報の未提出者を確認します。\n'
        + '[ dice: ] サイコロを振ってくれます。\n'
        + '[ iine:(@名前) ] (@名前)を褒めてくれます。\n'
        + '[ waruine:(@名前) ] (@名前)を貶してくれます。\n'
        + '[ image:(文字列) ] (文字列)で画像検索します。\n'
        + '[ talk:(文字列) ] (文字列)でBOTに話しかけます。\n'
        + '[ 21: ] 二課１ＧのポータルサイトＵＲＬをお知らせします。\n'
        + '[ help: ] 使用可能なコマンドが確認できます。\n'
        + '\n'
        + '※パブリックチャンネルを対象として稼働しています。\n'
      ;
  } else {
      message = e.parameter.user_name + "さんは「" + text + "」と言っています。";  
  }
  
  return app.postMessage(e.parameter.channel_id, message, {
    username: bot_name,
    icon_url: bot_icon
  });
  
}