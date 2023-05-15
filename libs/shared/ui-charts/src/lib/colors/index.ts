export const colors = ['#4A7FB0', '#5B9BD5', '#ADC6E5', '#03045E', '#00B4D8', '#20CBC2'];

export const barColors = [
  {
    endColor: '#005CA2',
    startColor: '#015ca27d',
  },
  {
    endColor: '#20CBC2',
    startColor: '#20cbc2c2',
  },
  {
    endColor: '#EB8D00',
    startColor: '#eb8d009d',
  },
];
export const barLightColors = [
  {
    endColor: '#005ca2e7',
    startColor: '#015ca234',
  },
  {
    endColor: '#20CBC2',
    startColor: '#20cbc24e',
  },
  {
    endColor: '#EB8D00',
    startColor: '#eb8d0057',
  },
];

const usedColors = new Set();

export const randomlyGeneratedColors = () => {
  if (usedColors.size === colors.length) {
    usedColors.clear();
    colors.forEach((color, index) => {
      colors[index] = darkenColor(color, 0.1);
    });
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * colors.length);
  } while (usedColors.has(randomIndex));

  usedColors.add(randomIndex);
  return colors[randomIndex];
};

const darkenColor = (color: string, percent: number) => {
  const num = parseInt(color.slice(1), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) - amt,
    G = ((num >> 8) & 0x00ff) - amt,
    B = (num & 0x0000ff) - amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};
