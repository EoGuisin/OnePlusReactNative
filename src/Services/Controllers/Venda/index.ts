import axios, { AxiosResponse } from "axios";
import moment from "moment";

import Context from "../../context";
import { Object_ } from "../../Objects";
import SalaDeVendas from "../SalaDeVendas";
type BlobPart = BufferSource | Blob | string;
type BufferSource = ArrayBufferView | ArrayBuffer;
type EndingType = "native" | "transparent";
interface SalaDeVendas {
  descricao: string;
  cidade: string;
  promotores: Array<{ descricao: string, cpf: string }> | undefined;
  promotor: { descricao: string, cpf: string } | undefined;
  assessoresTlmkt: Array<{ descricao: string, cpf: string }> | undefined;
  assessorTlmkt: { descricao: string, cpf: string } | undefined;
  liners: Array<{ descricao: string, cpf: string }> | undefined;
  liner: { descricao: string, cpf: string } | undefined;
  closers: Array<{ descricao: string, cpf: string }> | undefined;
  closer: { descricao: string, cpf: string } | undefined;
  peps: Array<{ descricao: string, cpf: string }> | undefined;
  pep: { descricao: string, cpf: string } | undefined;
  subGerentesDeSala: Array<{ descricao: string, cpf: string }> | undefined;
  subGerenteDeSala: { descricao: string, cpf: string } | undefined;
  gerentesDeSala: Array<{ descricao: string, cpf: string }> | undefined;
  gerenteDeSala: { descricao: string, cpf: string } | undefined;
}

interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
  readonly webkitRelativePath: string;
}

declare var File: {
  prototype: File;
  new(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
}

interface BlobPropertyBag {
  endings?: EndingType;
  type?: string;
}

interface FilePropertyBag extends BlobPropertyBag {
  lastModified?: number;
}

class Venda {
  //? #region  GET Controller  */
  /* Sobre esta função */ /**
   * Lista os canais de divulgação do empreendimento
  @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
  @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
   **/
  public async CanalDeDivulgacao(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.CanalDeDivulgacao>>> {
    return await Context.get<Array<Object_.CanalDeDivulgacao>>(`/Venda/CanalDeDivulgacao/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
      .then((Response) => { return Response; })
      .catch((Exception) => { return Exception; });
  }
  /* Sobre esta função */ /**
   * Exibir o contrato referente a empresa, centro de custo e venda informada
  @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
  @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
  @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
  @param {string} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
  @param {number} Numero Informe o número da venda
  @param {string} Documento Caso deseje apenas um documento em específico, informe o seu nome
  @param {boolean} Compactar IInforme se deseja compactar os arquivos (true) ou unificar os PDF (false)
  @param {boolean} EfetuarDownload Informe se deseja receber os resultados como resposta da requisição ou prefere fazer o download da resposta (por padrão o resultado será enviado como resposta da requisição)
   **/
  public async Contrato(Token: string, GrupoDeEmpresas: number, Empresa: number | undefined, CentroDeCusto: string | undefined, Numero: number | undefined, Documento: string | undefined, Compactar: boolean | undefined, EfetuarDownload: boolean | undefined): Promise<AxiosResponse<Object_.Anexo>> {
    return await Context.get<Array<Object_.Anexo>>(`/Venda/Contrato/${GrupoDeEmpresas}/${Empresa}/${CentroDeCusto}/${Numero}`, {
      params: {
        Documento: Documento,
        Compactar: Compactar,
        EfetuarDownload: EfetuarDownload
      },
      headers: { "Authorization": `Bearer ${Token}` }
    })
      .then((Response) => { return Response; })
      .catch((Exception) => { return Exception; });
  }
  /* Sobre esta função */ /**
   * Lista os canais de divulgação do empreendimento
  @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
  @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
   **/
  public async FinalidadesDeCompra(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.FinalidadesDeCompra>>> {
    return await Context.get<Array<Object_.FinalidadesDeCompra>>(`/Venda/FinalidadesDeCompra/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
      .then((Response) => { return Response; })
      .catch((Exception) => { return Exception; });
  }
  /* Sobre esta função */ /**
   * Consulta as venda realizadas com base no período, número da venda ou status da proposta no software externo
  @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
  @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
  @param {number | undefined} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
  @param {string | undefined} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
  @param {number} Numero Informe o número da venda
  @param {Date} PeriodoInicial Informe o período inicial de referência da data da venda no formato: AAAA-MM-DD
  @param {Date} PeriodoFinal Informe o período final de referência da data da venda no formato: AAAA-MM-DD
  @param {string} StatusDasPropostas Informe o(s) statu(s) da proposta a serem exibidos
  @param {boolean} EfetuarDownload Informe se deseja receber os resultados como resposta da requisição ou prefere fazer o download (por padrão o resultado será enviado como resposta da requisição)
   **/
  public async Get(Token: string, GrupoDeEmpresas: number, Empresa: number | undefined, CentroDeCusto: string | undefined, Numero: number | undefined, PeriodoInicial: Date, PeriodoFinal: Date, StatusDasPropostas: string, EfetuarDownload: boolean): Promise<AxiosResponse<Array<Object_.PropostaDeVenda>>> {
    return await Context.get<Array<Object_.PropostaDeVenda>>(`/Venda/${GrupoDeEmpresas}?${Empresa ? `Empresa=${Empresa}&` : ""}${CentroDeCusto ? `CentroDeCusto=${CentroDeCusto}&` : ""}${PeriodoInicial ? `PeriodoInicial=${moment(PeriodoInicial).format("yyyy-MM-DD")}&` : ""}${PeriodoFinal ? `PeriodoFinal=${moment(PeriodoFinal).format("yyyy-MM-DD")}&` : ""}${StatusDasPropostas ? `StatusDasPropostas=${StatusDasPropostas}&` : ""}${EfetuarDownload ? `EfetuarDownload=${EfetuarDownload}` : ""}`, { headers: { "Authorization": `Bearer ${Token}` } })
      .then((Response) => { return Response; })
      .catch((Exception) => { return Exception; });
  }
  /* Sobre esta função */ /**
   * Exibir o contrato referente a empresa, centro de custo e venda informada
  @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
  @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
  @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
  @param {string} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
  @param {number|undefined} Numero Informe o número da venda
  @param {boolean} EfetuarDownload Informe se deseja receber os resultados como resposta da requisição ou prefere fazer o download da resposta (por padrão o resultado será enviado como resposta da requisição)
   **/
  public async ModelosDeContrato(Token: string, GrupoDeEmpresas: number, Empresa: number | undefined, CentroDeCusto: string | undefined, Numero: number | undefined, EfetuarDownload: boolean | undefined): Promise<AxiosResponse<Array<Object_.Anexo>>> {
    return await Context.get<Array<Object_.Anexo>>(`/Venda/ModelosDeContrato/${GrupoDeEmpresas}/${Empresa}/${CentroDeCusto}`, {
      params: {
        Numero: Numero,
        EfetuarDownload: EfetuarDownload
      },
      headers: { "Authorization": `Bearer ${Token}` }
    })
      .then((Response) => { return Response; })
      .catch((Exception) => { return Exception.response; });
  }
  /* Sobre esta função */ /**
   * Consulta as salas de vendas
  @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
  @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
  @param {number} IdCasal Informe o código do casal (id)
   **/
  public async GavComissao(Token: string, GrupoDeEmpresas: number, IdCasal: string | undefined): Promise<AxiosResponse<Array<SalaDeVendas>>> {
    let SalasDeVenda = await axios.create({ baseURL: "https://vendadigital.gavresorts.com.br:4443" }).get<Array<{
      descricao: string;
      cidade: string;
      closer: Array<{ descricao: string, cpf: string }> | undefined;
      promotor: Array<{ descricao: string, cpf: string }> | undefined;
      assessorTlmkt: Array<{ descricao: string, cpf: string }> | undefined;
      liner: Array<{ descricao: string, cpf: string }> | undefined;
      pep: Array<{ descricao: string, cpf: string }> | undefined;
      subGerenteDeSala: Array<{ descricao: string, cpf: string }> | undefined;
      gerenteDeSala: Array<{ descricao: string, cpf: string }> | undefined;
    }>>("/Identificador/VisaoGAV02/NzAyNjEyMzExNDZjMjl6Skc1bGRETXk%3D");

    if (IdCasal) {
      let Casal = await axios.create({
        baseURL: "https://test.api.oneplus.dev.br"
    }).get<SalaDeVendas>(`/Venda/Casal/${GrupoDeEmpresas}/${IdCasal}`, { headers: { "Authorization": `Bearer ${Token}` } })
        .then((Response) => {
          Response.data.promotores = SalasDeVenda.data.find((Item) => Item.descricao == Response.data.descricao && Item.cidade == Response.data.cidade)?.promotor;
          Response.data.assessoresTlmkt = SalasDeVenda.data.find((Item) => Item.descricao == Response.data.descricao && Item.cidade == Response.data.cidade)?.assessorTlmkt;
          Response.data.liners = SalasDeVenda.data.find((Item) => Item.descricao == Response.data.descricao && Item.cidade == Response.data.cidade)?.liner;
          Response.data.closers = SalasDeVenda.data.find((Item) => Item.descricao == Response.data.descricao && Item.cidade == Response.data.cidade)?.closer;
          Response.data.peps = SalasDeVenda.data.find((Item) => Item.descricao == Response.data.descricao && Item.cidade == Response.data.cidade)?.pep;
          Response.data.subGerentesDeSala = SalasDeVenda.data.find((Item) => Item.descricao == Response.data.descricao && Item.cidade == Response.data.cidade)?.subGerenteDeSala;
          Response.data.gerentesDeSala = SalasDeVenda.data.find((Item) => Item.descricao == Response.data.descricao && Item.cidade == Response.data.cidade)?.gerenteDeSala;
          return Response;
        })
        .catch((Exception) => { return Exception; });
      if (Casal as AxiosResponse<SalaDeVendas>) {
        return {
          status: (Casal as AxiosResponse<SalaDeVendas>).status,
          statusText: (Casal as AxiosResponse<SalaDeVendas>).statusText,
          headers: (Casal as AxiosResponse<SalaDeVendas>).headers,
          config: (Casal as AxiosResponse<SalaDeVendas>).config,
          data: [(Casal as AxiosResponse<SalaDeVendas>).data]
        };
      }
      else {
        return Casal as any
      }
    }
    else {
      return {
        status: 200,
        statusText: "Ok",
        headers: {},
        config: {} as any,
        data: SalasDeVenda.data.map((Item) => {
          return {
            descricao: Item.descricao,
            cidade: Item.cidade,
            promotores: Item.promotor,
            promotor: undefined,
            assessoresTlmkt: Item.assessorTlmkt,
            assessorTlmkt: undefined,
            liners: Item.liner,
            liner: undefined,
            closers: Item.closer,
            closer: undefined,
            peps: Item.pep,
            pep: undefined,
            subGerentesDeSala: Item.subGerenteDeSala,
            subGerenteDeSala: undefined,
            gerentesDeSala: Item.gerenteDeSala,
            gerenteDeSala: undefined
          }
        })
      }
    }
  }
  //? #endregion */

  //* #region  POST Controller  */
  /* Sobre esta função */ /**
   * Aprova a proposta de venda já cadastrada e ainda pendente
  @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
  @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
  @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
  @param {string} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
  @param {number} Numero Informe o número da venda
   **/
  public async AprovarProposta(Token: string, GrupoDeEmpresas: number, Empresa: number, CentroDeCusto: string, Numero: number): Promise<AxiosResponse<any>> {
    return await Context.post<any>(`/Venda/AprovarProposta/${GrupoDeEmpresas}/${Empresa}/${CentroDeCusto}/${Numero}`, { headers: { "Authorization": `Bearer ${Token}` } })
      .then((Response) => { return Response; })
      .catch((Exception) => { return Exception; });
  }
  /* Sobre esta função */ /**
   * Desaprova a proposta de venda já cadastrada e ainda pendente
  @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
  @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
  @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
  @param {string} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
  @param {number} Numero Informe o número da venda
   **/
  public async DesaprovarProposta(Token: string, GrupoDeEmpresas: number, Empresa: number, CentroDeCusto: string, Numero: number): Promise<AxiosResponse<any>> {
    return await Context.post<any>(`/Venda/DesaprovarProposta/${Empresa}/${CentroDeCusto}/${Numero}`, { headers: { "Authorization": `Bearer ${Token}` } })
      .then((Response) => { return Response; })
      .catch((Exception) => { return Exception; });
  }
  /* Sobre esta função */ /**
   * Gera o parâmetros do contrato de compra e venda
  @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
  @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
  @param {Object_.PropostaDeVenda} PropostaDeVenda Insira um Object_ com todos os dados da venda
   **/
  public async GerarParametrosDoContrato(Token: string, GrupoDeEmpresas: number, PropostaDeVenda: Object_.PropostaDeVenda): Promise<AxiosResponse<any>> {
    return await Context.post<any>(`/Venda/GerarParametrosDoContrato/${GrupoDeEmpresas}`, PropostaDeVenda, { headers: { "Authorization": `Bearer ${Token}` } })
      .then((Response) => { return Response; })
      .catch((Exception) => { return Exception; });
  }
  /* Sobre esta função */ /**
   * Gera o contrato de compra e venda
  @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
  @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
  @param {string | undefined} DescricaoDoDocumento Informe o nome a ser atribuido ao documento no download
  @param {boolean | undefined} EfetuarDownload Informe se deseja receber os resultados como resposta da requisição ou prefere fazer o download da resposta (por padrão o resultado será enviado como resposta da requisição) 
  @param {boolean | undefined} ComprimirEmPDF Informe se receber o documento em formato PDF ou DOCX (por padrão o resultado será enviado como PDF) 
  @param {Object_.PropostaDeVenda} PropostaDeVenda Insira um Object_ com todos os dados da venda
   **/
  public async NovoContrato(Token: string, GrupoDeEmpresas: number, DescricaoDoDocumento: string | undefined, EfetuarDownload: boolean | undefined, ComprimirEmPDF: boolean | undefined, PropostaDeVenda: Object_.PropostaDeVenda, Anexos: Array<Object_.Anexo> | undefined): Promise<AxiosResponse<Array<Object_.Anexo>>> {
    if (!Anexos || Anexos.length == 0) {
      return await axios({
        method: 'POST',
        baseURL: `${Context.defaults.baseURL}/Venda/NovoContrato/${GrupoDeEmpresas}`,
        data: PropostaDeVenda,
        params: {
          DescricaoDoDocumento: DescricaoDoDocumento,
          EfetuarDownload: EfetuarDownload,
          ComprimirEmPDF: ComprimirEmPDF
        },
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Authorization": `Bearer ${Token}`
        },
      })
        .then((Response) => { return Response; })
        .catch((Exception) => { return Exception; });;
    }
    else {
      let ParametrosDoContrato = (await this.GerarParametrosDoContrato(Token, GrupoDeEmpresas, PropostaDeVenda)).data;
      return await axios({
        method: 'POST',
        baseURL: `http://localhost:3000/API/Contrato`,
        data: Anexos?.map((Anexo) => {
          return {
            ComprimirEmPDF: true,
            Descricao: Anexo.descricao,
            ArquivoBase64: Anexo.arquivo,
            ChaveValor: ParametrosDoContrato
          }
        }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((Response) => { return Response; })
        .catch(async (Exception) => {
          return await axios({
            method: 'POST',
            baseURL: `${Context.defaults.baseURL}/Venda/NovoContrato/${GrupoDeEmpresas}`,
            data: PropostaDeVenda,
            params: {
              DescricaoDoDocumento: DescricaoDoDocumento,
              EfetuarDownload: EfetuarDownload,
              ComprimirEmPDF: ComprimirEmPDF
            },
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` }
          })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
        });
    }
  }
  /* Sobre esta função */ /**
   * Adiciona novos documentos ao contrato de comrpa e venda
  @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
  @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
  @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
  @param {string} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
  @param {number} Numero Informe o número da venda
  @param {Array<{ Nome: string; Conteudo: File | null | undefined }>} Arquivos Insira um objeto com todos os dados dos arquivos
   **/
  public async NovosDocumentos(Token: string, GrupoDeEmpresas: number, Empresa: number, CentroDeCusto: string, Numero: number, Arquivos: Array<{ Nome: string; Conteudo: File | null | undefined }>): Promise<AxiosResponse<any>> {
    let File = new FormData();
    Arquivos.map((Item) => {
      File.append("Arquivos", new Blob([Item.Conteudo || ({} as File)], { type: Item.Conteudo?.type }), Item.Nome);
    });
    return await Context.post<any>(`/Venda/NovosDocumentos/${GrupoDeEmpresas}/${Empresa}/${CentroDeCusto}/${Numero}`, File, { headers: { "content-type": "multipart/form-data", "Authorization": `Bearer ${Token}` } })
      .then((Response) => { return Response; })
      .catch((Exception) => { return Exception.response; });
  }
  /* Sobre esta função */ /**
   * Cadastra uma nova proposta de venda
  @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
  @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
  @param {Object_.PropostaDeVenda} PropostaDeVenda Insira um Object_ com todos os dados da venda
   **/
  public async Post(Token: string, GrupoDeEmpresas: number, PropostaDeVenda: Object_.PropostaDeVenda): Promise<AxiosResponse<Object_.PropostaDeVenda>> {
    return await Context.post<Object_.PropostaDeVenda>(`/Venda/${GrupoDeEmpresas}`, PropostaDeVenda, { headers: { "Authorization": `Bearer ${Token}` } })
      .then((Response) => { return Response; })
      .catch((Exception) => { return Exception.response; });
  }
  //* #endregion */

  //! #region DELETE Controller  */
  //! #endregion */

  //TODO #region PUT Controller  */
  //TODO #endregion */
}

export default new Venda();