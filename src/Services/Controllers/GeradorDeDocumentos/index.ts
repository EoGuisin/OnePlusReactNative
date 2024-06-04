import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

interface Campos {
    id: string;
    descricao: string;
    tipoDeDado: string | undefined;
    formatacao: string | undefined;
    subCampo: Array<Campos> | undefined;
};

class GeradorDeDocumentos {    
    //? #region  GET Controller */
    /* Sobre esta função *//**
     * Lista todos os possiveis campos de uso para serem usados na geração do documento
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
     **/
    public async Get(Token: string, GrupoDeEmpresas: number, Empresa: number, CentroDeCusto: string): Promise<AxiosResponse<Array<Campos>>> {
        return await Context.get(`/GeradorDeDocumentos/${GrupoDeEmpresas}/${Empresa}/${CentroDeCusto}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    //* #endregion */

    //! #region DELETE Controller  */
    //! #endregion */

    //TODO #region PUT Controller  */
    //TODO #endregion */
}

export default new GeradorDeDocumentos();