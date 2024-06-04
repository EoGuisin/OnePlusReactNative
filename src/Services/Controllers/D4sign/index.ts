import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class D4sign {
    //? #region  GET Controller */
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     *  Cadastra o contrato de compra e venda e o encaminha para as devidas asssinaturas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.PropostaDeVenda} PropostaDeVenda Insira um Object_ com todos os dados da venda
    @param {string} Cofre Informe o nome do cofre
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, PropostaDeVenda: Object_.PropostaDeVenda, Cofre: string): Promise<AxiosResponse> {
        console.log(11)
        // return await ((JSON.stringify(PropostaDeVenda).includes("")) ? CamelCase(Context) : Context)
        return await axios({
            method: 'POST',
            baseURL: `${Context.defaults.baseURL}/D4sign/${GrupoDeEmpresas}`,
            data: PropostaDeVenda,
            params: {
                cofre: Cofre
            },
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     *  Cadastra a NFSe e a encaminha para as devidas asssinaturas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {{ AssistenteFinanceiroEmail: string, GerenteFinanceiroEmail: string, Anexo: Object_.Anexo }} Parametros um Object_ com todos os dados parametros do D4sign
    @param {string} Cofre Informe o nome do cofre
     **/
    public async SubmeterNFSe(Token: string, GrupoDeEmpresas: number, Parametros: { AssistenteFinanceiroEmail: string, GerenteFinanceiroEmail: string, Anexo: Object_.Anexo }, Cofre: string): Promise<AxiosResponse> {
        return await Context.post(`/D4sign/SubmeterNFSe/${GrupoDeEmpresas}?Cofre=${Cofre}`, Parametros, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception.response; });
    }
    //* #endregion */

    //* #region  POST Controller  */
    //* #endregion */

    //! #region DELETE Controller  */
    //! #endregion */

    //TODO #region PUT Controller  */
    //TODO #endregion */
}

export default new D4sign();