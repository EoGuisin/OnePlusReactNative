import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class Fornecedor {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Lista todos os fornecedores que o usuário possua permissão de acesso
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {string|undefined} CPFCNPJ Informe o CPF ou CNPJ do fornecedor (somente números)
     **/
    public async Get(Token: string, GrupoDeEmpresas: number, CPFCNPJ:string | undefined): Promise<AxiosResponse<Array<Object_.Fornecedor>>> {
        return await Context.get(`/Fornecedor/${GrupoDeEmpresas}`, {
            params: {
                CPFCNPJ: CPFCNPJ
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Cadastra novo fornecedor
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Fornecedor} Fornecedor Informe os dados do fornecedor
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, Fornecedor: Object_.Fornecedor): Promise<AxiosResponse<Object_.Fornecedor>> {
        return await Context.post(`/Fornecedor/${GrupoDeEmpresas}`, Fornecedor, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Deletar o documento
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number|undefined} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Fornecedor Informe o código da fornecedor (id)
     **/
    public async Delete(Token: string, GrupoDeEmpresas: number | undefined, Fornecedor: number): Promise<AxiosResponse<Object_.Fornecedor>> {
        return axios({
            method: 'DELETE',
            baseURL:`${Context.defaults.baseURL}/Fornecedor/${Fornecedor}`,
            params: {
                GrupoDeEmpresas: GrupoDeEmpresas
            },
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera os dados da Fornecedor
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number|undefined} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Fornecedor} Fornecedor Informe os dados da Fornecedor
     **/
    public async Put(Token: string, GrupoDeEmpresas: number | undefined, Fornecedor: Object_.Fornecedor): Promise<AxiosResponse<Object_.Fornecedor>> {
        return await Context.put(`/Fornecedor?GrupoDeEmpresa=${GrupoDeEmpresas}`, Fornecedor, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new Fornecedor();