function getIine(message) {

  if (message.length <= 0) message = 'みな';
  
  var words = [
    '素敵です！', 
    'かっこいい～～！', 
    'さすがですね！', 
    'そこにシビれる！あこがれるゥ！', 
    '気に入った！', 
    'ぼくは敬意を表するッ！', 
    'いつも頑張ってるね！おかげで助かるよ！', 
    '真似したら男性にモテモテになるかも！？',
    '下手な鉄砲だって数撃ちゃ当たるって！恋愛だってそうだもん！',
    '私たちが歩いた道が戦車道になるんだよ！',
    'ナカナカなびかないもんだよねぇ、戦車も男も・・・',
    'すごいよ！　当ったよ！',
    '命中！',
    'その調子でドンドンいこう！',
    '榴弾直撃！　すごいよ！',
    'もしかしてすごいんじゃない？',
    'やっぱ違うわぁ～！'
  ];
  
  var random = Math.floor( Math.random() * words.length );
  message = message + 'さん！' + words[random];
  
}

function getWaruine(message) {

  if (message.length <= 0) message = 'みな';
  
  var words = [
    'やだもー！', 
    'もぉーやだぁー！どうすればいいのよー！', 
    'こんなの彼氏と別れるより辛いよ！', 
    'それはやめてよー', 
    'ど、同士撃ちはやめようよぉ！', 
    'み、味方を撃ってどうするの！？', 
    '大変、弾薬庫に被弾してるよぉ！', 
    '大丈夫？', 
    'え、動けないの！？　はやく修理しようよぉ', 
    'やっぱ簡単じゃないよね、恋愛も、戦車道も…', 
    '簡単にはいかないねぇ、恋愛も戦車道も'
  ];
  
  var random = Math.floor( Math.random() * words.length );
  message = message + 'さん！' + words[random];
  
}