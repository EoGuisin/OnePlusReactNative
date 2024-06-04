import { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class Prospect {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Lista todos os prospects cadastrados
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number | undefined} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async Get(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.Prospect>>> {
        return await Context.get(`/Prospect/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Cadastra um novo prospect
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number | undefined} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Lead} Lead Informe os dados do lead
    @param {boolean | undefined} AtualizarDadosDoLead Quando marcado como "false", os dados do lead são preservados e apenas é convertido ao status de prospect, caso contrario seus dados serão atualizados
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, Lead: Object_.Lead, AtualizarDadosDoLead?: boolean | undefined): Promise<AxiosResponse<Object_.Prospect>> {
        return await Context.post(`/Prospect/${GrupoDeEmpresas}`, Lead, {
            params: {
                AtualizarDadosDoLead: AtualizarDadosDoLead
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region  DELETE Controller  */
    //! #endregion */

    //TODO #region  PUT Controller  */
    //TODO #endregion */
}

export default new Prospect();