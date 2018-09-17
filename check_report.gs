function checkReport(sheet_name, message) {
  
  if (sheet_name.length <= 0) sheet_name = 'weekly_reports';
  if (message.length <= 0)    message    = 'メッセージ';
    
  var id = '1XMXaH-msQKtTZYg0o00KCLDCnjytO9PzluOSEd4sK-o'; // スプレットシートID
  var staff_count = 30; // ループ上限
  
  // 行と列の指定 (要素番号) 0 -

  var group_name_rownum = 0;
  var group_addr_rownum = 1;
  var name_rownum   = 2;
  var tel_rownum    = 3;
  var email_rownum  = 4;
  var result_rownum = 5;  // 済と入力する行番号
  
  var head_col = 1;
  
  var export_message = '';
  

  // =============================
  // シートから提出状況を取得
  // =============================
  
  var ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheetByName(sheet_name);
  var reports = sheet.getDataRange().getValues();
  
  // =============================
  // 未提出者のみを抽出
  // =============================
  
  for(var i=head_col;i<reports[email_rownum].length;i++){
       
    if (reports[email_rownum][i] == '') {
      break;
    }
    
    if (/済/.test(reports[result_rownum][i])) {
      continue;
    }
    
    export_message += '[##Group##] ##Name##  ##Email##\n'
      .replace('##Group##', reports[group_name_rownum][i])
      .replace('##Name##',  reports[name_rownum][i])
      .replace('##Email##', reports[email_rownum][i])
    ;
        
  }
  
  Logger.log("export_message: " + export_message);
  return export_message;
  
}
