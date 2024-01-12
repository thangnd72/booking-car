enum Colors {
  primary = '#ff8b99',
  bgTabBar = 'rgb(255,243,246)',
  mainDarkerColor = '#F18916',
  mainLighterColor = '#FFB767',
  mainSubtleColor = '#FFEBD5',
  errorColor = '#EF2828',
  infoColor = '#0D67ED',
  successColor = '#0FDE82',
  darkOneColor = '#333333',
  darkTwoColor = '#595F6A',
  darkThreeColor = '#c6c6c6',
  darkFourColor = '#AFB0B8',
  darkFiveColor = '#D2D7DD',
  darkSixColor = '#8A8A8A',
  lightOneColor = '#D3D3D3',
  lightTwoColor = '#E0E0E0',
  lightThreeColor = '#ECECEC',
  lightFourColor = '#F9F9F9',
  lightFiveColor = '#FFFFFF',
  greenOneColor = '#e0f5e5',
  greenTwoColor = '#93dba3',
  backgroundColor = '#FFFFFF',
  modalColor = 'rgba(0,0,0,0.3)',
  bgSuccessColor = '#E6FBF3',
  bgErrorColor = '#FF7777',
  transparent = 'transparent',
  black = '#000000',
  blueOne = '#5669FF',
}

enum Fonts {
  bold = 'Roboto-Bold',
  italic = 'Roboto-Italic',
  light = 'Roboto-Light',
  medium = 'Roboto-Medium',
  regular = 'Roboto-Regular',
}

enum Spacing {
  horizontalDefault = 20,
  verticalDefault = 25,
  blockButtonBottom = 8,
  blockButtonTop = 8,
}

type Theme = {
  colors: typeof Colors;
  fonts: typeof Fonts;
  spacing: typeof Spacing;
};

const theme: Theme = {
  colors: Colors,
  fonts: Fonts,
  spacing: Spacing,
};

export default theme;
