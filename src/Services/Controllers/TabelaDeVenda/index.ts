import { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';
class TabelaDeVenda {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Obter a tabela de venda da unidade
    @param {string} Token Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
    @param {number} Local Informe o código do local (id)
    @param {number} Sublocal Informe o código do sublocal (id)
    @param {number} ValorBase Informe o valor base. Não sendo informado, será usado o valor a vista do sublocal informado
     **/
    public async Get(Token: string, GrupoDeEmpresas: number, Empresa: number, CentroDeCusto: string, Local: number, Sublocal: number, ValorBase?: number | undefined): Promise<AxiosResponse<Object_.TabelaDeVenda>> {
        return await Context.get<Object_.TabelaDeVenda>(`/TabelaDeVenda/${GrupoDeEmpresas}/${Empresa}/${CentroDeCusto}/${Local}/${Sublocal}`, {
            headers: { "Authorization": `Bearer ${Token}` },
            params: { ValorBase: ValorBase }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception.response; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    //* #endregion */

    //! #region DELETE Controller  */
    //! #endregion */

    //TODO #region PUT Controller  */
    //TODO #endregion */
}

export default new TabelaDeVenda();