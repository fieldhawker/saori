function getSearchImage(keyword) {

  if (keyword.length <= 0) keyword = '猫';
  
  var API_KEY = "AIzaSyAyx8Ua4FxYxycvWDf0XgOcc2L2n3atRpw"
  var CSE_ID = "002193515395559237552:ljw0o7z1zg0"
  var uri = "https://www.googleapis.com/customsearch/v1?key=" + API_KEY + "&cx=" + CSE_ID + "&q=" + keyword + "&searchType=image"
  
  var response = UrlFetchApp.fetch(uri);
  var json = JSON.parse(response);
  var random_params = Math.floor(Math.random() * json["items"].length);
  
  var result = json["items"][random_params]["link"];
  
  Logger.log("codec: " + json.toSource());
  
  return result;
  
}
