import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class D4sign {
    //? #region  GET Controller */
    //? #endregion */

    /* Sobre esta função *//**
     *  Cadastra o contrato de compra e venda e o encaminha para as devidas asssinaturas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Objeto.PropostaDeVenda} PropostaDeVenda Insira um objeto com todos os dados da venda
    @param {string} Cofre Informe o nome do cofre
    @param {string} Documento Caso deseje apenas um documento em específico, informe o seu nome
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, PropostaDeVenda: Object_.PropostaDeVenda, Cofre: string, Documento: string | undefined): Promise<AxiosResponse> {
        return await axios({
            method: 'POST',
            baseURL: `${Context.defaults.baseURL}/AssinaturaDigital/${GrupoDeEmpresas}`,
            data: PropostaDeVenda,
            params: {
                cofre: Cofre,
                Documento: Documento
            },
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
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