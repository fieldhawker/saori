function sendMailHookRequest(hook_event, tmp) {

  // IFTTTのWebHook情報
  var hook_key = "bVARe0_iYKvylPAk1e609M";
  var url = "https://maker.ifttt.com/trigger/"+hook_event+"/with/key/"+hook_key;
  
  var headers = {
    "Accept"      : "application/json",
    "Content-type": "application/json"
  }
  
  var data = {
    "value1": tmp.mail,
    "value2": tmp.title,
    "value3": tmp.body
  }
  
  var options = {
    "method" : "post",
    "payload": JSON.stringify(data),
    "headers": headers
  };
  
  UrlFetchApp.fetch(url, options);

}