import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class Cargo {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Retorna todos os cargos
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async Get(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.Cargo>>> {
        return await Context.get(`/Cargo/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Retorna todas as ocupações
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async Ocupacao(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.Ocupacao>>> {
        return await Context.get(`/Cargo/Ocupacao/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region POST Controller  */
    /* Sobre esta função *//**
     * Cadastra um novo cargo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Cargo} Cargo Insira um Object_ com todos os dados do cargo
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, Cargo: Object_.Cargo): Promise<AxiosResponse<Object_.Cargo>> {
        return await Context.post(`/Cargo/${GrupoDeEmpresas}`, Cargo, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta o cargo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Cargo} Cargo Insira um Object_ com todos os dados do cargo
     **/
    public async Delete(Token: string, GrupoDeEmpresas: number, Cargo: Object_.Cargo): Promise<AxiosResponse<Object_.Cargo>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Cargo/${GrupoDeEmpresas}`,
            data: Cargo,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera os dados do cargo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Cargo} Cargo Insira um Object_ com todos os dados do cargo
     **/
    public async Put(Token: string, GrupoDeEmpresas: number, Cargo: Object_.Cargo): Promise<AxiosResponse<Object_.Cargo>> {
        return await Context.put(`/Cargo/${GrupoDeEmpresas}`, Cargo, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new Cargo();