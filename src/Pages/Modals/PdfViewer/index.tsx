//#region React
import React from 'react';
import {Modal, TouchableOpacity, Platform} from 'react-native';
//#endregion

//#region Icons
import {ArrowBack, Download, Share} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Styled
import * as Styled from './styles';
//#endregion

//#region Externals Directorys
import PDFView from 'react-native-view-pdf';
import LinearGradient from 'react-native-linear-gradient';
import RNShareFile from 'react-native-share-pdf';
import { Object_ } from '../../../Services/Objects';
//#endregion

interface Props {
  visible: boolean,
  onPressClose(): void,
  resource: string | undefined,
  getDocument?: Object_.Anexo,
}

export const PdfViewer = (props: Props) => {

  async function sharePDF(DocumentoDoContrato: Object_.Anexo | undefined) {
    await RNShareFile(DocumentoDoContrato!?.arquivo, (DocumentoDoContrato?.descricao == '_Documentos unificados' ? 'Documentos unificados' : DocumentoDoContrato?.descricao) + '.' + DocumentoDoContrato?.extensao);
  };

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%'}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Visualização do PDF</Styled.TextHeader>
            {props.getDocument!?.arquivo!?.length > 0 &&
            <TouchableOpacity activeOpacity={0.9} onPress={() => sharePDF(props.getDocument)}>
              <SvgCss xml={Share} />
            </TouchableOpacity>}
          </Styled.ContainerHeader>
          <Styled.ImageContainer>
            <PDFView
              fadeInDuration={1}
              style={{flex: 1, margin: '5%'}}
              resource={props.resource ? props.resource : ""}
              resourceType={'base64'}
            />
          </Styled.ImageContainer>
          <Styled.Base>

          </Styled.Base>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};