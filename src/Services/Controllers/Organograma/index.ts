import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class Organograma {
    //? #region  GET Controller */
    /* Sobre esta função *//**
     * Retorna todos os cargos
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {boolean} VisaoSintetica Caso marcado como verdadeiro, o Object_ "Organograma" será retornado como  vazio, listando apenas os nomes, caso contrário será retornado o Object_ "Organograma"
     **/
    public async Get(Token: string, GrupoDeEmpresas: number, VisaoSintetica: boolean): Promise<AxiosResponse<Array<Object_.Organograma>>> {
        return await Context.get(`/Organograma/${GrupoDeEmpresas}/${VisaoSintetica}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Cadastra um novo organograma
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Organograma} Organograma Insira um Object_ com todos os dados do organograma
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, Organograma: Object_.Organograma): Promise<AxiosResponse<Object_.Organograma>> {
        return await Context.post(`/Organograma/${GrupoDeEmpresas}`, Organograma, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta o organograma
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Organograma} Organograma Insira um Object_ com todos os dados do organograma
     **/
    public async Delete(Token: string, GrupoDeEmpresas: number, Organograma: Object_.Organograma): Promise<AxiosResponse<Object_.Organograma>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Organograma/${GrupoDeEmpresas}`,
            data: Organograma,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera os dados do organograma
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Organograma} Organograma Insira um Object_ com todos os dados do organograma
     **/
    public async Put(Token: string, GrupoDeEmpresas: number, Organograma: Object_.Organograma): Promise<AxiosResponse<Object_.Organograma>> {
        return await Context.put(`/Organograma/${GrupoDeEmpresas}`, Organograma, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new Organograma();