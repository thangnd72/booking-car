enum Colors {
  primary = '#31AA52',
  secondary = '#E83E33',
  textColor = '#181F2D',
  backgroundColor = '#FFFFFF',
  white = '#FFFFFF',
  transparent = 'transparent',
  black = '#000000',
  bgSuccessColor = '#f6fffc',
  bgErrorColor = '#fef1f4',
  modalColor = 'rgba(0,0,0,0.2)',
  errorColor = '#E24F2F',
  successColor = '#6ec05e',
  darkOneColor = '#333333',
  darkTwoColor = '#595F6A',
  darkThreeColor = '#c6c6c6',
  darkFourColor = '#AFB0B8',
  darkFiveColor = '#8A8A8A',
  lightOneColor = '#D3D3D3',
  lightTwoColor = '#E0E0E0',
  lightThreeColor = '#ECECEC',
  lightFourColor = '#F9F9F9',
  lightFiveColor = '#FFFFFF',
  lightSixColor = '#F2F2F2',
  lightSevenColor = '#F4F4F4',
  greenOneColor = '#e0f5e5',
  greenTwoColor = '#93dba3',
}

enum Fonts {
  bold = 'Inter-Bold',
  light = 'Inter-Light',
  medium = 'Inter-Medium',
  regular = 'Inter-Regular',
  semiBold = 'Inter-SemiBold',
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
