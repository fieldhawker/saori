function executeDice(message) {

  var words = [
    'https://i.imgur.com/1VWxc1e.jpg',
    'https://i.imgur.com/I1orSk5.jpg',
    'https://i.imgur.com/mF1X0XP.jpg',
    'https://i.imgur.com/w4zBUt8.jpg',
    'https://i.imgur.com/BKkAWG4.jpg',
    'https://i.imgur.com/pZ5qRK6.jpg'
  ];
  
  var random = Math.floor( Math.random() * words.length );
  return words[random];
  
}
