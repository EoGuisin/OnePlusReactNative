import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class SalaDeVenda {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Lista todas as salas de venda
    @param {string} Token Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async Get(Token: string, GrupoDeEmpresas: number, DesejaEnviarUmaProposta: boolean | undefined, Empresa: number | undefined, CentroDeCusto: string | undefined): Promise<AxiosResponse<Array<Object_.SalaDeVenda>>> {
        return await Context.get(`/SalaDeVenda/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` }, params: {
            DesejaEnviarUmaProposta: DesejaEnviarUmaProposta,
            Empresa: Empresa,
            CentroDeCusto: CentroDeCusto
        } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Cadastra uma nova sala de vendas
    @param {string} Token Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.SalaDeVenda} SalaDeVenda Insira um Object_ com todos os dados da sala de vendas
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, SalaDeVenda: Object_.SalaDeVenda): Promise<AxiosResponse<Object_.SalaDeVenda>> {
        return await Context.post(`/SalaDeVenda/${GrupoDeEmpresas}`, SalaDeVenda, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta a sala de vendas
    @param {string} Token Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.SalaDeVenda} SalaDeVenda Insira um Object_ com todos os dados da sala de vendas
     **/
    public async Delete(Token: string, GrupoDeEmpresas: number, SalaDeVenda: Object_.SalaDeVenda): Promise<AxiosResponse<Object_.SalaDeVenda>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/SalaDeVenda/${GrupoDeEmpresas}`,
            data: SalaDeVenda,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera os dados da sala de vendas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.SalaDeVenda} SalaDeVenda Insira um Object_ com todos os dados da sala de vendas
     **/
    public async Put(Token: string, GrupoDeEmpresas: number, SalaDeVenda: Object_.SalaDeVenda): Promise<AxiosResponse<Object_.SalaDeVenda>> {
        return await Context.put(`/SalaDeVenda/${GrupoDeEmpresas}`, SalaDeVenda, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new SalaDeVenda();