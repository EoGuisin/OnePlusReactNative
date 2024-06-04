import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class CancelamentoBrinde {
    //? #region  GET Controller */
    /* Sobre esta função *//**
     * Lista todas as áreas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async Get(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.CancelamentoBrinde>>> {
        return await Context.get(`/Brinde/MotivosDeCancelamento/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Cadastra uma nova área
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.CancelamentoBrinde} CancelamentoBrinde Insira um Object_ com todos os dados da área
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, CancelamentoBrinde: Object_.CancelamentoBrinde): Promise<AxiosResponse<Object_.CancelamentoBrinde>> {
        return await Context.post(`/Brinde/NovoMotivoDeCancelamento/${GrupoDeEmpresas}`, CancelamentoBrinde, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta a área
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.CancelamentoBrinde} CancelamentoBrinde Insira um Object_ com todos os dados da área
     **/
    public async Delete(Token: string, GrupoDeEmpresas: number, CancelamentoBrinde: Object_.CancelamentoBrinde): Promise<AxiosResponse<Object_.CancelamentoBrinde>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Brinde/DeletarMotivoDeCancelamento/${GrupoDeEmpresas}`,
            data: CancelamentoBrinde,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera os dados da área
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.CancelamentoBrinde} CancelamentoBrinde Insira um Object_ com todos os dados da área
     **/
    public async Put(Token: string, GrupoDeEmpresas: number, CancelamentoBrinde: Object_.CancelamentoBrinde): Promise<AxiosResponse<Object_.CancelamentoBrinde>> {
        return await Context.put(`/Brinde/AlterarMotivoDeCancelamento/${GrupoDeEmpresas}`, CancelamentoBrinde, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new CancelamentoBrinde();