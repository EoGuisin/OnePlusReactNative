import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class LocalDeCaptacao {
    //? #region  GET Controller */
    /* Sobre esta função *//**
     * Lista todos os local de captação
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async Get(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.LocalDeCaptacao>>> {
        return await Context.get(`/LocalDeCaptacao/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Cadastra um novo local de captação
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.LocalDeCaptacao} LocalDeCaptacao Insira um Object_ com todos os dados do local de captação
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, LocalDeCaptacao: Object_.LocalDeCaptacao): Promise<AxiosResponse<Object_.LocalDeCaptacao>> {
        return await Context.post(`/LocalDeCaptacao/${GrupoDeEmpresas}`, LocalDeCaptacao, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta a local de captação
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.LocalDeCaptacao} LocalDeCaptacao Insira um Object_ com todos os dados da local de captação
     **/
    public async Delete(Token: string, GrupoDeEmpresas: number, LocalDeCaptacao: Object_.LocalDeCaptacao): Promise<AxiosResponse<Object_.LocalDeCaptacao>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/LocalDeCaptacao/${GrupoDeEmpresas}`,
            data: LocalDeCaptacao,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera os dados da local de captação
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.LocalDeCaptacao} LocalDeCaptacao Insira um Object_ com todos os dados do local de captação
     **/
    public async Put(Token: string, GrupoDeEmpresas: number, LocalDeCaptacao: Object_.LocalDeCaptacao): Promise<AxiosResponse<Object_.LocalDeCaptacao>> {
        return await Context.put(`/LocalDeCaptacao/${GrupoDeEmpresas}`, LocalDeCaptacao, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new LocalDeCaptacao();