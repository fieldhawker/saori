function sendReportResult(sheet_name, template_row) {
  
  if (typeof sheet_name === "undefined" || sheet_name.length <= 0) row = 'weekly_reports';
  if (typeof template_row === "undefined" || template_row.length <= 0) row = '1';
  
  // 週報の提出者に返信するときに使用するIFTTTのhook名
  var response_hook_event = "not_submitters_mail";
  
//  var mailto = 'fieldhawker@gmail.com';
  var mailto = 'matsushige@se-project.co.jp,izumi@se-project.co.jp,takano@se-project.co.jp,nakamurashinya@se-project.co.jp,machidatakahiro@se-project.co.jp,takenagakota@se-project.co.jp,naruseyuki@se-project.co.jp,takahashi@se-project.co.jp,takayama@se-project.co.jp';
  var mailtitle = '[SEP][二課１G] 週報の提出状況の共有';
  
  var staff_message = checkReport(sheet_name, '');
  
  if (staff_message.length <= 0) staff_message = '【未提出者は検知されませんでした。】';
  
  var template = getMailTemplate(template_row);
  
  var tmp   = new Object();
  tmp.mail  = mailto;
  tmp.title = mailtitle;
  tmp.body  = template
  .replace(/__TARGET__/, staff_message)
  .replace(/さきほどリマインドメールを送付しました。/, '')
  .replace(/正午の段階で未提出の対象者のフォローをお願いします。/, '');
  
  sendMailHookRequest(response_hook_event, tmp);
  
}

function sendWeeklyReportResult() {

  var sheet_name = 'weekly_reports';
  
  sendReportResult(sheet_name, '1');
  
}

function getMailTemplate(row) {

  if (typeof row === "undefined" || row.length <= 0) row = '1';
  
  var id = '1XMXaH-msQKtTZYg0o00KCLDCnjytO9PzluOSEd4sK-o'; // スプレットシートID
  var sheet_name = 'メールテンプレート';

  var ss = SpreadsheetApp.openById(id);
  var sheet = ss.getSheetByName(sheet_name);
  var template = sheet.getDataRange().getValues();
  
  // 0 : 週報 社員
  // 1 : 週報 管理
  
  Logger.log("template: " + template[row][0]);
  Logger.log("name: " + template[row][1]);
  
  return template[row][0];
  
}