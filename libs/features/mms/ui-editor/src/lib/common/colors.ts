const colors = {
  sidebar: { background: '#f5f5f5', divider: '#0000001f', textInput: { background: '#fff' } },
  editor: {
    background: '#D9D9D9',
    highlight: '#FF9A02',
    mobile: { background: '#121213' },
    text: '#FFFFFF',
    subText: '#ABABAC',
    smallText: '#E2E2E3',
    divider: '#BA9765',
  },
  navigator: {
    title: 'rgba(0, 0, 0, 0.60)', addButton: { color: '#46494C', border: '#46494C' },
  },
  quicklink: { background: '#BA9765' },
  fanGuide: { background: 'linear-gradient(180deg, rgba(36, 37, 38, 0) 0%, #242526 100%)', underline: '#BA9765' },
  simpleImagePicker: {
    image: { background: '#F5F5F5' },
    button: { background: '#FFFFFF', text: '#3D4752', border: '#BDBDBD' },
  },
  container: { background: '#121213' },
  card: {
    background: '#242526',
    border: '#505051',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.04)',
  },
  button: {
    background: '#FFFFFF',
    text: '#121213',
    brand: 'linear-gradient(180deg, #AD7C35 0%, #8D6834 66.67%, #785523 100%)',
    border: '#636364',
  },
  hero: {
    background: 'linear-gradient(180deg, #888888, #000000)',
    boxShadow: '0px 16px 24px -4px #0000004D, 0px 4px 8px -2px #0000004D',
    cardText: {
      background: '#f5f5f5',
    },
  },
  quickLinkButton: {
    background: '#303031',
    border: '#313335',
    boxShadow: '0px 8px 12px -2px #0000004D, 0px 2px 6px -2px #0000004D',
    text: '#D8BA90',
  },
  halfWidthText: {
    background: '#242526',
    titleText: '#FFFFFF',
    subTitleText: '#ABABAC',
    sectionText: '#ABABAC',
    descriptionText: '#E2E2E3',
    button: {
      border: '#636364',
      text: '#FFFFFF',
    },
  },
  componentLibrary: {
    background: '#1A1B1E',
    title: 'rgb(158, 158, 158)',
    category: 'rgba(0, 0, 0, 0.6)',
  },
  calendar: {
    tabBar : { background: '#1B1C1D' },
    background: '#242526',
    day: {
      notCurrentMonth: {
        background: 'unset',
        text: '#636364',
      },
      isCurrentMonth: {
        background: '#303031',
        text: '#FFFFFF',
      },
    }
  },
};

export default colors;
