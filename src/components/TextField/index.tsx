import { SIZE } from '@/helpers/size';
import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

export interface ITextProps extends TextProps {
  flex?: boolean;
  m?: number;
  mv?: number;
  mh?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  p?: number;
  ph?: number;
  pv?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  w?: number;
  h?: number;
  border?: boolean;
  borderWidth?: number;
  borderColor?: string;
  centered?: boolean;
  color?: string;
  bgColor?: string;
  upper?: boolean;
  capital?: boolean;
  size?: number;
  fontFamily?: string;
  style?: StyleProp<TextStyle>;
  children?: any;
  borderRadius?: number;
  numberOfLines?: number;
  transparent?: any;
}

export const TextField = (props: ITextProps) => {
  const {
    flex,
    m,
    mv,
    mh,
    mt,
    mb,
    ml,
    mr,
    p,
    ph,
    pv,
    pt,
    pb,
    pl,
    pr,
    w,
    h,
    border,
    borderWidth,
    borderColor,
    centered,
    color,
    bgColor,
    upper,
    capital,
    size,
    fontFamily,
    style,
    borderRadius,
    children,
    transparent,
    numberOfLines,
    ...rest
  } = props;
  const styleComponent = [
    flex && { flex: 1 },
    m && { margin: SIZE.scaleH(m) },
    mv && { marginVertical: SIZE.scaleH(mv) },
    mh && { marginHorizontal: SIZE.scaleW(mh) },
    mt && { marginTop: SIZE.scaleH(mt) },
    mb && { marginBottom: SIZE.scaleH(mb) },
    ml && { marginLeft: SIZE.scaleW(ml) },
    mr && { marginRight: SIZE.scaleW(mr) },
    p && { padding: SIZE.scaleH(p) },
    pv && { paddingVertical: SIZE.scaleH(pv) },
    ph && { paddingHorizontal: SIZE.scaleW(ph) },
    pt && { paddingTop: SIZE.scaleH(pt) },
    pb && { paddingBottom: pb },
    pl && { paddingLeft: pl },
    pr && { paddingRight: pr },
    w && { width: w },
    h && { height: h },
    border && { borderWidth: 1, borderColor: 'gray' },
    borderWidth && { borderWidth },
    borderColor && { borderColor },
    color && { color: color },
    bgColor && { backgroundColor: bgColor },
    borderRadius && { borderRadius },
    size && { fontSize: size },
    fontFamily && { fontFamily },
    centered && { textAlign: 'center' },
    upper && { textTransform: 'uppercase' },
    capital && { textTransform: 'capitalize' },
    style,
    numberOfLines && { numberOfLines: numberOfLines },
    transparent && { backgroundColor: 'transparent' },
  ];
  return (
    <Text allowFontScaling={false} {...rest} style={[styleComponent]}>
      {children}
    </Text>
  );
};
