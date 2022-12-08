export default function capitalize(text, option) {
  let capitalizedText = '';

  switch (option | '') {
    case 'WoRd':
      capitalizedText = text.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
      break;
    case 'SenTenCe':
      capitalizedText = text[0].toUpperCase() + text.substring(1);
      break;
    case 'Word':
    default:
      capitalizedText = text
        .split(' ')
        .map((word) =>
          word
            .split('')
            .map((letter, index) => (index ? letter.toLowerCase() : letter.toUpperCase()))
            .join(''),
        )
        .join(' ');
  }

  return capitalizedText;
}
