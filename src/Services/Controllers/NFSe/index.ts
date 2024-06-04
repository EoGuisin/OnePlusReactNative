import { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

interface NivelDeVisualizacoes {
    id: string;
    descricao: string;
}
interface Arquivo {
    Nome: string;
    Conteudo: File | null | undefined;
}

class NFSe {
    //? #region  GET Controller  */
    /* Sobre esta função *//** 
     * Lista os anexos referente as notas geradas (PDF e XML)
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {string} CAE Informe o código da CAE (id). A lista das CAEs cadastradas poderá ser obtida ao executar a requisição "/CAE/{Token}"
    @param {string} NFSe Informe o "Id" que identifica a NFSe. A lista dos níveis de visualizações cadastradas poderá ser obtido ao executar a requisição "/NFSe/{Token}/{NivelDeVisualizacao}"
     **/
    public async Anexos(Token: string, CAE: string, NFSe: string): Promise<AxiosResponse<Array<Object_.Anexo>>> {
        return await Context.get(`/NFSe/Anexos/${CAE}/${NFSe}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//** 
     * Lista todos os borderos importados
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {string} NivelDeVisualizacao Informe o "Id" que identifica o nível de visualização. A lista dos níveis de visualizações cadastradas poderá ser obtido ao executar a requisição "/NFSe/NiveisDeVisualizacoes/{Token}"
    @param {string | undefined} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string | undefined} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
    @param {boolean} MinhasNFSe Informe se deseja apenas visualizar as NFSe emitidas pelo/a favor do usuário
     **/
    public async Bordero(Token: string, NivelDeVisualizacao: string, MinhasNFSe: boolean): Promise<AxiosResponse<Array<Object_.Bordero>>> {
        return await Context.get(`/NFSe/Bordero/${NivelDeVisualizacao}`, {
            params: {
                MinhasNFSe: MinhasNFSe
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//** 
     * Retorna os documentos CNDs atrelados ao token do usuário
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {string} CAE Informe o código da CAE (id). A lista das CAEs cadastradas poderá ser obtida ao executar a requisição "/CAE/{Token}"
     **/
    public async DocumentosCND(Token: string, CAE: string): Promise<AxiosResponse<Array<Object_.Anexo>>> {
        return await Context.get(`/NFSe/DocumentosCND/${CAE}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//** 
     * Retorna o faturamento atrelados ao token do usuário
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {string} CAE Informe o código da CAE (id). A lista das CAEs cadastradas poderá ser obtida ao executar a requisição "/CAE/{Token}"
    @param {boolean|undefined} AgruparFaturamento Informe se deseja agrupar o fatuamento pela data de emissão
     **/
    public async Faturamento(Token: string, CAE: string, AgruparFaturamento: boolean | undefined): Promise<AxiosResponse<Array<Object_.NFSe>>> {
        return await Context.get(`/NFSe/Faturamento/${CAE}?AgruparFaturamento=${AgruparFaturamento}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//** 
     * Retorna os níveis de visualização
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async NiveisDeVisualizacoes(Token: string): Promise<AxiosResponse<Array<NivelDeVisualizacoes>>> {
        return await Context.get(`/NFSe/NiveisDeVisualizacoes`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//** 
     * Retorna o faturamento atrelados ao token do usuário
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {string} CAE Informe o código da CAE (id). A lista das CAEs cadastradas poderá ser obtida ao executar a requisição "/CAE/{Token}"
    @param {boolean|undefined} AgruparFaturamento Informe se deseja agrupar o fatuamento pela data de emissão
     **/
    public async Tributos(Token: string, CAE: string, AgruparFaturamento: boolean | undefined): Promise<AxiosResponse<Array<Object_.Tributo>>> {
        return await Context.get(`/NFSe/Tributos/${CAE}?AgruparFaturamento=${AgruparFaturamento}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Cadastrar um novo borderô
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {string} Tipo Informe o código do tipo de borderô. A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Bordero/Tipos/{Token}"
    @param {Boolean|undefined} Definitivo Informe se as notas fiscais serão habilitadas para emissão ou apenas conferência prévia
    @param {Date|undefined} Validade Informe a data de validade destas notas (requisito obrigatório quando estas não forem definitivas)
    @param {Array<Object_.ItemDoBordero>} Bordero Informe um Object_ com os dados do bordero a ser importado
     **/
    public async NovoBordero(Token: string, GrupoDeEmpresas: number, Tipo: number, Definitivo: Boolean | undefined, Validade: Date | undefined, Bordero: any): Promise<AxiosResponse<any>> {
        return await Context.post(`/NFSe/NovoBordero`, Bordero, {
            params: {
                Definitivo: Definitivo,
                Validade: Validade
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception.response; });
    }
    /* Sobre esta função *//**
     * Cancelar nota(s) fiscal(is)
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {Array<Object_.NFSe>} NFS Informe as notas fiscais a serem geradas
     **/
    public async CancelarNFSe(Token: string, NFS: Array<Object_.NFSe>): Promise<AxiosResponse<Array<Object_.NFSe>>> {
        return await Context.post(`/NFSe/CancelarNFSe`, NFS, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Gera titulo para pagamento conforme as NFSe informadas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {Object_.NFSe} NFS Informe as notas fiscais a serem geradas
     **/
    public async EnviarParaTomador(Token: string, NFS: Array<Object_.NFSe>): Promise<AxiosResponse<Object_.NFSe>> {
        return await Context.post(`/NFSe/EnviarParaTomador`, NFS, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Gerar nota(s) fiscal(is)
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {Array<Object_.NFSe>} NFS Informe as notas fiscais a serem geradas
     **/
    public async GerarNFSe(Token: string, NFS: Array<Object_.NFSe>): Promise<AxiosResponse<Array<Object_.NFSe>>> {
        return await Context.post(`/NFSe/GerarNFSe`, NFS, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Gera titulo para pagamento conforme as NFSe informadas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
    @param {Array<Object_.NFSe>} NFS Informe as notas fiscais a serem geradas
     **/
    public async GerarPagamento(Token: string, Empresa: number, CentroDeCusto: string, NFS: Array<Object_.NFSe>): Promise<AxiosResponse<Array<Object_.NFSe>>> {
        return await Context.post(`/NFSe/GerarPagamento/${Empresa}/${CentroDeCusto}`, NFS, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception.response; });
    }
    /* Sobre esta função *//**
     * Gerar Object_ a partir da planilha importada (apenas sendo aceito o formato de arquivo xls de acordo com modelo específico)
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param { Nome: string, Conteudo: File | null | undefined } Arquivo Insira um Object_ com todos os dados da arquivo
     **/
    public async InterpretarPlanilha(Token: string, Arquivo: Arquivo): Promise<AxiosResponse<{ pdf: string, tabelaOrignal: Array<any>, nfs: Array<Object_.NFSe> }>> {
        let File = new FormData();
        File.append("Arquivo", new Blob([Arquivo.Conteudo || {} as File], { type: Arquivo.Conteudo?.type }), Arquivo.Nome);
        return await Context.post(`/NFSe/InterpretarPlanilha`, File, { headers: { "content-type": "multipart/form-data", "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region  DELETE Controller  */
    /* Sobre esta função *//**
     * Deletar nota(s) fiscal(is)
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} NFS Informe o código da NFS obtido ao executar a requisição "/NFSeController/{Empresa}/{CentroDeCusto}/{NivelDeVisualizacao}"
     **/
    public async Delete(Token: string, NFS: number): Promise<AxiosResponse<Array<Object_.NFSe>>> {
        return await Context.delete<Array<Object_.NFSe>>(`/NFSe/${NFS}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception.response; });
    }
    /* Sobre esta função *//**
     * Deletar o(s) borderô(s)
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {string} Bordero Informe o código da borderô obtido ao executar a requisição "/NFSeController/Bordero"
     **/
    public async DeletarBordero(Token: string, Bordero: string): Promise<AxiosResponse<Array<Object_.NFSe>>> {
        return await Context.delete<Array<Object_.NFSe>>(`/NFSe/DeletarBordero/${Bordero}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception.response; });
    }
    //! #endregion */

    //TODO #region  PUT Controller  */
    //TODO #endregion */
}

export default new NFSe();