import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class Formulario {
    //? #region GET Controller  */
    /* Sobre esta função *//**
     * Consulta as classificações (tipos) das perguntas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async ClassificacoesDasPerguntas(Token: string): Promise<AxiosResponse<Array<Object_.Formulario>>> {
        return await Context.get(`/Formulario/ClassificacoesDasPerguntas`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Consulta o(s) formulário(s) vinculado(s) ao grupo de empresas informado
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} FunilDeVenda Informe o código do funil de vendas (id). A lista de funis cadastrads poderá ser obtida ao executar a requisição "/FunilDeVenda/GruposDeEmpresas/{Token}"
    **/
    public async Get(Token: string, GrupoDeEmpresas: number, FunilDeVenda: number): Promise<AxiosResponse<Array<Object_.Formulario>>> {
        return await Context.get(`/Formulario/${GrupoDeEmpresas}/${FunilDeVenda}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region POST Controller  */
    /* Sobre esta função *//**
     * Cadastra um novo formulário
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} FunilDeVenda Informe o código do funil de vendas (id). A lista de funis cadastrads poderá ser obtida ao executar a requisição "/FunilDeVenda/GruposDeEmpresas/{Token}"
    @param {Object_.Formulario} Formulario Insira um Object_ com todos os dados do formulário
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, FunilDeVenda: number, Formulario: Object_.Formulario): Promise<AxiosResponse<Object_.Formulario>> {
        return await Context.post(`/Formulario/${GrupoDeEmpresas}/${FunilDeVenda}`, Formulario, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Deletar o formulário
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} FunilDeVenda Informe o código do funil de vendas (id). A lista de funis cadastrads poderá ser obtida ao executar a requisição "/FunilDeVenda/GruposDeEmpresas/{Token}"
    @param {Object_.Formulario} Formulario Insira um Object_ com todos os dados do formulário
     **/
    public async Delete(Token: string, GrupoDeEmpresas: number, FunilDeVenda: number, Formulario: Object_.Formulario): Promise<Object_.Formulario> {
        return axios({
            method: 'DELETE',
            baseURL:`${Context.defaults.baseURL}/Formulario/${GrupoDeEmpresas}/${FunilDeVenda}`,
            data: Formulario,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera os dados do formulário
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} FunilDeVenda Informe o código do funil de vendas (id). A lista de funis cadastrads poderá ser obtida ao executar a requisição "/FunilDeVenda/GruposDeEmpresas/{Token}"
    @param {Object_.Formulario} Formulario Insira um Object_ com todos os dados do formulário
     **/
    public async Put(Token: string, GrupoDeEmpresas: number, FunilDeVenda: number, Formulario: Object_.Formulario): Promise<AxiosResponse<Object_.Formulario>> {
        return await Context.put(`/Formulario/${GrupoDeEmpresas}/${FunilDeVenda}`, Formulario, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new Formulario();