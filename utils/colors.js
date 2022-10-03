export const translateColor = (color) => {
  switch (color) {
    case 'gray':
      return 'bg-brand-gray';
      break;
    case 'darkgray':
      return 'bg-brand-darkgray';
      break;
    case 'black':
      return 'bg-black';
      break;
    case 'white':
      return 'bg-white';
      break;
  }
};
