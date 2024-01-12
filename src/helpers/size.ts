import { Dimensions, PixelRatio } from 'react-native';
import { DESIGN_HEIGHT, DESIGN_WIDTH } from './constants';

const { width, height } = Dimensions.get('window');

const widthBaseScale = width / DESIGN_WIDTH;
const heightBaseScale = height / DESIGN_HEIGHT;
const [shortDimension] = width < height ? [width, height] : [height, width];

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;

type BaseType = 'width' | 'height';

function normalize(size: number, based: BaseType = 'width') {
  const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

//for width  pixel
const scaleW = (size: number) => {
  return normalize(size, 'width');
};
//for height  pixel
const scaleH = (size: number) => {
  return normalize(size, 'height');
};

//for font  pixel
const fontPixel = (size: number) => {
  return scaleH(size);
};

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;

export const sizeScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

const fontSizes = {
  header: {
    fontSize: 20,
    lineHeight: 24,
  },
  large: {
    fontSize: 16,
    lineHeight: 24,
  },
  normal: {
    fontSize: 14,
    lineHeight: 21,
  },
  small: {
    fontSize: 12,
    lineHeight: 19,
  },
};

export const SIZE = {
  WIDTH: width,
  HEIGHT: height,
  FONT_SIZES: fontSizes,
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  scaleW,
  scaleH,
  fontPixel,
  sizeScale,
};
