import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class Area {
    //? #region  GET Controller */
    /* Sobre esta função *//**
     * Lista todas as áreas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async Get(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.SalaDeVenda>>> {
        return await Context.get(`/Area/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Cadastra uma nova área
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Area} Area Insira um Object_ com todos os dados da área
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, Area: Object_.Area): Promise<AxiosResponse<Object_.Area>> {
        return await Context.post(`/Area/${GrupoDeEmpresas}`, Area, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta a área
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Area} Area Insira um Object_ com todos os dados da área
     **/
    public async Delete(Token: string, GrupoDeEmpresas: number, Area: Object_.Area): Promise<AxiosResponse<Object_.Area>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Area/${GrupoDeEmpresas}`,
            data: Area,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera os dados da área
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Area} Area Insira um Object_ com todos os dados da área
     **/
    public async Put(Token: string, GrupoDeEmpresas: number, Area: Object_.Area): Promise<AxiosResponse<Object_.Area>> {
        return await Context.put(`/Area/${GrupoDeEmpresas}`, Area, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new Area();