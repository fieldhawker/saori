function getWeather() {

    var weather = UrlFetchApp.fetch("http://weather.livedoor.com/forecast/webservice/json/v1?city=130010"); // 東京

    if(weather.getResponseCode() != 200){
      return '天気が取得できませんでした';
    }

    var json = JSON.parse(weather.getContentText());
    var today = json["forecasts"][0]["telop"]; // 今日の天気
    var tomorrow = json["forecasts"][1]["telop"]; // 明日の天気
    var message = " 今日の東京の天気は「" + today + "」。明日は「" + tomorrow + "」だよー。";
    return message;
}
