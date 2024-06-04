//#region React
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
//#endregion

//#region Icons
import {ArrowBack, Download, Signature} from '../../../Assets';
import {SvgCss} from 'react-native-svg';
//#endregion

//#region Styled
import * as Modals from '../../Modals'
import * as Styled from './styles';
import { Type } from '../../Modals/PaymentPlan/Modals/viewModel';
//#endregion

//#region Services
import * as Controllers from '../../../Services/Controllers';
import { Object_ } from '../../../Services/Objects';
//#endregion

//#region Externals Directorys
import RNShareFile from 'react-native-share-pdf';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { ToastMessage } from '../../../Components';
import ModalDrop from 'react-native-modalbox';
//#endregion

interface Props {
  visible: boolean;
  onPressClose(): void,
  getDocuments: Object_.Anexo[] | undefined;
  setDocuments: Dispatch<SetStateAction<Object_.Anexo[] | undefined>>;
  getProposta: Object_.PropostaDeVenda | undefined;
  getProspects: Object_.Prospect[];
  getTitulosDeEntrada: Type.ViewModel;
  getTitulosDeIntermediaria: Type.ViewModel;
  getTitulosDeSaldo: Type.ViewModel;
  getTitulosDeSinal: Type.ViewModel;
};

export const ContractDocuments = (props: Props) => {

  //#region Variables
  const [getShowToast, setShowToast] = useState<boolean>(false);
  const [getMessage1, setMessage1] = useState<string>("");
  const [getMessage2, setMessage2] = useState<string>("");
  const [getLoading, setLoading] = useState<boolean>(false);

  const [getVisiblePDF, setVisiblePDF] = useState<boolean>(false);

  const [getModalConfirm, setModalConfirm] = useState<boolean>(false);

  const [getDocument, setDocument] = useState<Object_.Anexo>({} as Object_.Anexo);

  const [getIndexDoDocumentoParaAssinatura, setIndexDoDocumentoParaAssinatura] = useState<number>();
  
  const DataLogin: Object_.SignIn = useSelector((state: any) => state.DataLogin);
  const SelectedCompany: Object_.GrupoDeEmpresas = useSelector((state: any) => state.SelectedCompany);
  //#endregion

  //#region Functions
  const ImprimirDocumento = async (DocumentoDoContrato: Object_.Anexo, ComprimirEmPDF: boolean): Promise<Object_.Anexo | undefined> => {
    setLoading(true);
    if (props.getProposta) {
      if (DocumentoDoContrato.descricao == '_Documentos unificados') {
        if (props.getDocuments && props.getDocuments.length > 0) {
          let Response = (await Controllers.Venda.NovosDocumentos(DataLogin?.token, SelectedCompany?.id ?? 0, props.getProposta.empresa.id, props.getProposta.centroDeCusto.sigla, props.getProposta.numero, [...props.getDocuments, ...props.getProspects.map((Registro) => Registro.documentoPessoal), ...props.getProspects.map((Registro) => Registro.documentoEndereco), props.getTitulosDeEntrada.anexo, props.getTitulosDeIntermediaria.anexo, props.getTitulosDeSaldo.anexo, props.getTitulosDeSinal.anexo].filter(Registro => Registro && Registro._file && Registro.arquivo && Registro.arquivo.length > 0).length > 0 ? [...props.getDocuments, ...props.getProspects.map((Registro) => Registro.documentoPessoal), ...props.getProspects.map((Registro) => Registro.documentoEndereco), props.getTitulosDeEntrada.anexo, props.getTitulosDeIntermediaria.anexo, props.getTitulosDeSaldo.anexo, props.getTitulosDeSinal.anexo].filter(Registro => Registro && Registro._file && Registro.arquivo && Registro.arquivo.length > 0).map(Registro => { return { Nome: `${Registro?.descricao}.${Registro?.extensao}`, Conteudo: Registro?._file } }) : []))
          console.log('NovosDocumentos', Response)
          if (Math.floor(Response.status / 100) == 2) {
            console.log('deu certo NovosDocumentos');
          } else {
            setLoading(false);
            setMessage1("Falha ao anexar os documentos inseridos na proposta de compra e venda"); setMessage2("Houve uma falha ao anexar algum documento a proposta de compra e venda, verifique se estes estão corretos (se não estão corrompidos ou com tamanho igual a 00 mb"); setShowToast(true);
            console.log('nao deu certo NovosDocumentos');
          }
        }
      }
      props.getProspects.map((Item, i) => { props.getProposta!.prospects[i].empresaRepresentada = Item.empresaRepresentada; });
      let Response = DocumentoDoContrato.descricao == '_Documentos unificados' ? await Controllers.Venda.NovoContrato(DataLogin?.token, SelectedCompany?.id ?? 0, undefined, false, true, props.getProposta, props.getDocuments) : await Controllers.Venda.NovoContrato(DataLogin.token, SelectedCompany?.id ?? 0, DocumentoDoContrato.descricao, false, ComprimirEmPDF, props.getProposta, [DocumentoDoContrato])
      if (Math.floor(Response.status / 100) == 2 && Response.data.length > 0) {
        DocumentoDoContrato.arquivo = Response.data[0].arquivo;
        DocumentoDoContrato.extensao = Response.data[0].extensao;
        console.log('Documento', Response.data[0]);
        setLoading(false);
        setDocument(DocumentoDoContrato);
        setVisiblePDF(true);
      } else {
        setLoading(false);
        console.log(Response);
      }
    }
    return DocumentoDoContrato;
  }




  const submeterAssinatura = async (Index: number) => {
    setLoading(true);
    if (props.getProposta) {
      try {
        let DocumentosDoContrato = [...props.getDocuments || []];
        DocumentosDoContrato[Index]._submetidoAAssinatura = false;
        props.setDocuments([...DocumentosDoContrato]);

        if (DocumentosDoContrato[Index].arquivo.length == 0) {
          let Response = DocumentosDoContrato[Index].descricao == '_Documentos unificados'
            ? await Controllers.Venda.NovoContrato(DataLogin?.token, SelectedCompany?.id ?? 0, undefined, false, true, props.getProposta, props.getDocuments)
            : await Controllers.Venda.NovoContrato(DataLogin?.token, SelectedCompany?.id ?? 0, DocumentosDoContrato[Index].descricao, false, true, props.getProposta, [DocumentosDoContrato[Index]]);
          if (Math.floor(Response.status / 100) == 2 && Response.data.length > 0) {
            DocumentosDoContrato[Index].arquivo = Response.data[0].arquivo;
            DocumentosDoContrato[Index].extensao = Response.data[0].extensao;
            setLoading(false);
            setMessage1(`O documento "${DocumentosDoContrato[Index].descricao == '_Documentos unificados' ? 'Documentos unificados' : DocumentosDoContrato[Index].descricao}" foi baixado com sucesso`); setMessage2(`Aguarde enquanto enviamos o seu documento para assinatura`); setShowToast(true);
          } else {
            setLoading(false);
            setMessage1(`Falha ao baixar o documento "${DocumentosDoContrato[Index].descricao}"`); setMessage2('Houve uma falha ao baixar o documento, entre em contato com a equipe de desenvolvimento'); setShowToast(true);
          }
        }

        if (
          DocumentosDoContrato[Index].arquivo.length > 0) {
          let Response = await Controllers.AssinaturaDigital.Post(DataLogin?.token, SelectedCompany?.id ?? 0, props.getProposta, (SelectedCompany?.id == 9 || SelectedCompany?.id == 27) ? props.getProposta.identificador.centroDeCusto.descricao : props.getProposta.salaDeVendaNome, DocumentosDoContrato[Index].descricao == '_Documentos unificados' ? undefined : DocumentosDoContrato[Index].descricao);
          if (Math.floor(Response.status / 100) == 2) {
            DocumentosDoContrato[Index]._submetidoAAssinatura = true;
            setLoading(false);
            setMessage1(`O documento "${DocumentosDoContrato[Index].descricao == '_Documentos unificados' ? 'Documentos unificados' : DocumentosDoContrato[Index].descricao}" foi enviado para assinatura`); setMessage2(`O mesmo está disponível no cofre "${(SelectedCompany?.id == 9 || SelectedCompany?.id == 27) ? props.getProposta.identificador.centroDeCusto.descricao : props.getProposta.salaDeVendaNome}"`); setShowToast(true);
          } else {
            DocumentosDoContrato[Index]._submetidoAAssinatura = undefined;
            setLoading(false);
            setMessage1(`Falha ao enviar o documento para assinatura`); setMessage2(typeof Response.data === 'string' ? Response.data : '😱 Houve uma falha ao enviar o documento para assinatura, entre em contato com a equipe de desenvolvimento'); setShowToast(true);
          }
        }
        DocumentosDoContrato = [...props.getDocuments || []];
        DocumentosDoContrato[Index]._submetidoAAssinatura = undefined;
        props.setDocuments([...DocumentosDoContrato]);
      } catch {
        let DocumentosDoContrato = [...props.getDocuments || []];
        DocumentosDoContrato[Index]._submetidoAAssinatura = undefined;
        props.setDocuments([...DocumentosDoContrato]);
      }
    }
    setLoading(false);
  }




  // `Deseja submeter o documento para assinatura?\nDocumento: "${getDocumentosDoContrato[getIndexDoDocumentoParaAssinatura ?? -1].descricao}"`




  function Toast() {
    setShowToast(false)
  }
  //#endregion

  // await RNShareFile(base64Data, documentFileName);

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <LinearGradient colors={['#26A77C', '#105B74']}>
        <Styled.Container>
        <View style={{top: 40}}>
          <ToastMessage
            showToast={getShowToast}
            hideToast={setShowToast}
            function={Toast}
            message1={getMessage1}
            message2={getMessage2}
          />
        </View>
          <Styled.ContainerHeader style={{marginTop: Platform.OS === 'ios' ? '15%' : '5%', opacity: getShowToast ? 0 : 1}}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressClose}>
              <SvgCss xml={ArrowBack} />
            </TouchableOpacity>
            <Styled.TextHeader>Documentos do contrato</Styled.TextHeader>
          </Styled.ContainerHeader>
          <Styled.SubContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
              {props.getDocuments && props.getDocuments?.map((item: Object_.Anexo, index: number) => 
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '10%', }}>
                <TouchableOpacity activeOpacity={0.9} onPress={async () => {
                  let DocumentosDoContrato = [...props.getDocuments || []];
                  let Index = props.getDocuments!?.findIndex((_Item) => `${_Item.descricao}` == `${item.descricao}`);
                  DocumentosDoContrato[Index].extensao = 'undefined';
                  props.setDocuments(DocumentosDoContrato);

                  await ImprimirDocumento(props.getDocuments![Index], true).then(() => {
                    DocumentosDoContrato = [...props.getDocuments || []];
                    DocumentosDoContrato[Index].extensao = 'docx';
                    props.setDocuments(DocumentosDoContrato);
                  })
                }}>
                  <SvgCss xml={Download} style={{marginRight: 10}} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} onPress={() => {
                  let Index = props.getDocuments!?.findIndex((_Item) => `${_Item.descricao}` == `${item.descricao}`);
                  setIndexDoDocumentoParaAssinatura(Index);
                  setModalConfirm(true);
                }}>
                  <SvgCss xml={Signature} style={{marginRight: 10}} />
                </TouchableOpacity>
                <Styled.InputContainer activeOpacity={0.9} onPress={async () => {
                  let DocumentosDoContrato = [...props.getDocuments || []];
                  let Index = props.getDocuments!?.findIndex((_Item) => `${_Item.descricao}` == `${item.descricao}`);
                  DocumentosDoContrato[Index].extensao = 'undefined';
                  props.setDocuments(DocumentosDoContrato);

                  await ImprimirDocumento(props.getDocuments![Index], true).then(() => {
                    DocumentosDoContrato = [...props.getDocuments || []];
                    DocumentosDoContrato[Index].extensao = 'docx';
                    props.setDocuments(DocumentosDoContrato);
                  })
                }}>
                  <Styled.TextInput>{item.descricao}</Styled.TextInput>
                </Styled.InputContainer>
              </View>
              )}
            </ScrollView>
          </Styled.SubContainer>
          <Modals.ModalLoading
            transparent={true}
            visible={getLoading}
          />
          <Modals.PdfViewer
            visible={getVisiblePDF}
            onPressClose={() => {setVisiblePDF(false)}}
            resource={getDocument?.arquivo}
            getDocument={getDocument}
          />
          <ModalDrop
            swipeToClose={false}
            style={{height: '20%', borderRadius: 40, backgroundColor: '#2A5B68', borderColor: '#FFFFFF', borderWidth: 1,}}
            position={"center"}
            isOpen={getModalConfirm}
            animationDuration={200}
            onClosed={() => {setModalConfirm(false)}}>
              <Styled.ConfirmModal>
                <Styled.ConfirmText>{`Deseja submeter o documento para assinatura?`}</Styled.ConfirmText>
                <Styled.TextInput>{`Documento: "${props.getDocuments![getIndexDoDocumentoParaAssinatura ?? -1]?.descricao}"`}</Styled.TextInput>
                <Styled.SubmitSignatureButton onPress={() => {
                  if (getIndexDoDocumentoParaAssinatura) submeterAssinatura(getIndexDoDocumentoParaAssinatura);
                  setModalConfirm(false);
                }} activeOpacity={0.8}>
                  <Styled.TextInput style={{textAlign: 'center'}}>Confirmar</Styled.TextInput>
                </Styled.SubmitSignatureButton>
              </Styled.ConfirmModal>
          </ModalDrop>
        </Styled.Container>
      </LinearGradient>
    </Modal>
  );
};