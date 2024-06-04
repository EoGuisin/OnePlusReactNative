//#region Native
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
//#endregion

//#region Component
import * as Styled from './styles';
import { CancelAnnex, Camera, Cloud, Picture, pdf } from '../../Assets';
//#endregion

import { SvgCss } from 'react-native-svg';

interface Props {
  title: string,
  uri: string | undefined,
  cancelTouch(): void,
  library(): void,
  pdf(): void,
  camera(): void,
  viewImage(): void,
  viewPDF(): void,
  PDForIMAGE: number | undefined,
  height?: string | undefined,
  base64: boolean,
  heightImage: string | number,
  widthImage: string | number,
  heightPdf: string | number,
  widthPdf: string | number,
};

export const Annex = (props: Props) => {
  //PDForIMAGE = 0 = image
  //PDForIMAGE = 1 = pdf
  return (
    <Styled.Container style={{height: props.height}}>
      <Styled.WrapperTitle>
        {props.uri == "" || props.uri == undefined ? <Styled.Title>{props.title}</Styled.Title> : <Styled.Title>Visualizar documento anexado:</Styled.Title>}
        <TouchableOpacity onPress={props.cancelTouch}>
          <SvgCss xml={CancelAnnex} />
        </TouchableOpacity>
      </Styled.WrapperTitle>
      <Styled.Wrapper>
        <Styled.WrapperLeft>
          <TouchableOpacity onPress={props.library}>
            <SvgCss xml={Cloud} />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.pdf}>
            <SvgCss xml={pdf} />  
          </TouchableOpacity>
        </Styled.WrapperLeft>
        {props.PDForIMAGE == 0 && props.uri && props.uri!?.length > 0 ?
        <Styled.ImageTouch onPress={props.viewImage}>
          {props.base64 == true ?
          <Image style={{height: props.heightImage, width: props.widthImage, borderRadius: 18, borderWidth: 1, borderColor: '#FFFFFF', top: 5}} resizeMode={"cover"} source={{uri: `data:image/jpg;base64,${props.uri}`}} /> :
          <Image style={{height: props.heightImage, width: props.widthImage, borderRadius: 18, borderWidth: 1, borderColor: '#FFFFFF'}} resizeMode={"cover"} source={{uri: props.uri}} />}
        </Styled.ImageTouch>
        : props.PDForIMAGE == 1 && props.uri!?.length > 0 ?
        <Styled.ViewPDF style={{height: props.heightPdf, width: props.widthPdf}} onPress={props.viewPDF}>
          <Styled.TextPDF>Visualizar PDF</Styled.TextPDF>
        </Styled.ViewPDF>
        : <SvgCss xml={Picture} /> }
            <TouchableOpacity onPress={props.camera}>
          <SvgCss xml={Camera} />
        </TouchableOpacity>
      </Styled.Wrapper>
    </Styled.Container>
  );
};
