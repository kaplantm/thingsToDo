const Colors = {
  pink: 'hsla(0, 100%, 67%, 1)',
  orange: 'hsla(20, 100%, 57%, 1)',
  green: 'hsla(150, 60%, 48%, 1)',
  blue: 'hsla(199, 98%, 48%, 1)',
  darkPrimary: 'hsla(224, 62%, 26%, 1)',
  defaultPrimaryAlt: 'hsla(221, 44%, 41%, 1)',
  defaultPrimary: 'hsla(221, 45%, 56%, 1)',
  medPrimary: 'hsla(221, 60%, 60%, 1)',
  lightPrimary: 'hsla(205, 100%, 95%, 1)',
  accentPrimary: 'hsla(14, 100%, 57%, 1)',
  darkGreyscale: 'hsla(0, 0%, 13%, 1)',
  mediumDarkGreyscale: 'hsla(0, 0%, 46%, 1)',
  lightGreyscale: 'hsla(0, 0%, 74%, 1)',
  lighterGreyscale: 'hsla(0, 0%, 88%, 1)',
  lightestGreyscale: 'hsla(0, 100%, 100%, 1)',
};

export function hslaToTransparent(hslaColorString, opacity) {
  const sections = hslaColorString.split(',');
  sections[3] = `${opacity})`;
  return sections.join(',');
}

export default Colors;
