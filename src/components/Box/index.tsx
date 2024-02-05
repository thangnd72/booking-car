import { SIZE } from '@/helpers/size';
import React from 'react';
import { StyleProp, ViewProps, View, ViewStyle, FlexAlignType } from 'react-native';

export interface IBoxProps extends ViewProps {
  flex?: any;
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
  borderTopColor?: string;
  borderTopWidth?: number;
  borderBottomColor?: string;
  borderBottomWidth?: number;
  centered?: boolean;
  between?: boolean;
  middle?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
  direction?: string;
  children?: any;
  justifyContent?: string;
  alignSelf?: FlexAlignType;
  borderRadius?: number;
  shadow?: boolean;
  horizontal?: boolean;
  flexGrow?: number;
  gap?: number;
  wrap?: boolean;
}

export const Box = (props: IBoxProps) => {
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
    borderTopColor,
    borderTopWidth,
    borderBottomColor,
    borderBottomWidth,
    centered,
    between,
    middle,
    color,
    style,
    direction,
    justifyContent,
    alignSelf,
    borderRadius,
    shadow,
    children,
    horizontal,
    flexGrow,
    gap,
    wrap,
    ...rest
  } = props;
  const styleComponent = [
    flex && { flex },
    flexGrow && { flexGrow: flexGrow },
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
    borderTopWidth && { borderTopWidth },
    borderTopColor && { borderTopColor },
    borderBottomColor && { borderBottomColor },
    borderBottomWidth && { borderBottomWidth },
    color && { backgroundColor: color },
    centered && { justifyContent: 'center' },
    between && { justifyContent: 'space-between' },
    justifyContent && { justifyContent },
    alignSelf && { alignSelf },
    direction && { flexDirection: direction },
    middle && { alignItems: 'center' },
    borderRadius && { borderRadius },
    horizontal && { flexDirection: 'row' },
    wrap && { flexWrap: 'wrap' },
    gap && { gap },
    shadow && {
      shadowOpacity: 0.22,
      shadowRadius: 15,
      shadowColor: 'gray',
      shadowOffset: { height: 0, width: 0 },
      elevation: 5,
    },
    style,
  ];
  return (
    <View {...rest} style={[styleComponent]}>
      {children}
    </View>
  );
};
