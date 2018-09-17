function createWeeklyReportTrigger() {

  var hours = [9] // 未来時を指定する必要がある
  var now = new Date()

  // ---------------------------
  // 残っているトリガを削除する
  // ---------------------------
  
  var triggers = ScriptApp.getProjectTriggers()
  
  if (Array.isArray(triggers)) {
  
    triggers.forEach(function(trigger) {
      // 他のトリガは削除しないように名前で判定
      if(trigger.getHandlerFunction() === 'sendWeeklyReportResult') {
        ScriptApp.deleteTrigger(trigger);
      }
    })
    
  }
  
  // ---------------------------
  // トリガを設定
  // ---------------------------

  hours.forEach(function(hour) {
  
    var date = new Date()
    date.setHours(hour)
    date.setMinutes(0)
    
    if (now.valueOf() < date.valueOf()) {
      // sendWeeklyReportResult() のトリガを指定した日時で作成
      ScriptApp.newTrigger("sendWeeklyReportResult").timeBased().at(date).create()
    }
    
  })
  
}
