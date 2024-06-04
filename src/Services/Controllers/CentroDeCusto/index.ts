import { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

interface PermissaoDeAcesso {
    usuario: {
        id: number,
        nome: string,
        cargo: Object_.Cargo | undefined,
        email: Object_.Email | undefined
    },
    centroDeCusto: Object_.CentroDeCusto
}

class CentroDeCusto {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Consulta todos os centros de custos
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number|undefined} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string} Sigla Informe a sigla que identifica o centro de custo
     **/
    public async Get(Token: string, GrupoDeEmpresas: number | undefined, Empresa: number | undefined, Sigla: string | undefined): Promise<AxiosResponse<Array<Object_.CentroDeCusto>>> {
        return await Context.get(`/CentroDeCusto/${GrupoDeEmpresas}`,
            {
                params: {
                    Empresa: Empresa,
                    Sigla: Sigla
                },
                headers: { "Authorization": `Bearer ${Token}` }
            })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region POST Controller  */
    /* Sobre esta função *//**
     * Autoriza a pessoa o acesso ao centro de custo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string} Sigla Informe a sigla que identifica o centro de custo
    @param {number} Pessoa Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema!
    **/
    public async AutorizarPermissaoDeAcesso(Token: string, GrupoDeEmpresas: number, Empresa: number, Sigla: string, Pessoa: number): Promise<AxiosResponse<PermissaoDeAcesso>> {
        return await Context.post(`/CentroDeCusto/AutorizarPermissaoDeAcesso/${GrupoDeEmpresas}/${Empresa}/${Sigla}/${Pessoa}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastra um novo centro de custo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo (id). A lista de grupo de empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {Object_.CentroDeCusto} CentroDeCusto Insira um Object_ com todos os dados do centro de custo
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, CentroDeCusto: Object_.CentroDeCusto): Promise<AxiosResponse<Object_.CentroDeCusto>> {
        return await Context.post(`/CentroDeCusto/${GrupoDeEmpresas}`, CentroDeCusto, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta o centro de custo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string} Sigla Informe a sigla que identifica o centro de custo
     **/
    public async Delete(Token: string, Empresa: number, Sigla: string): Promise<AxiosResponse<Object_.CentroDeCusto>> {
        return await Context.delete(`/CentroDeCusto/${Empresa}/${Sigla}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Desautoriza a pessoa o acesso ao centro de custo informado
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string} Sigla Informe a sigla que identifica o centro de custo
    @param {number} Pessoa Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema! 
    **/
    public async RemoverPermissaoDeAcesso(Token: string, GrupoDeEmpresas: number, Empresa: number, Sigla: string, Pessoa: number): Promise<AxiosResponse<PermissaoDeAcesso>> {
        return await Context.delete(`/CentroDeCusto/RemoverPermissaoDeAcesso/${GrupoDeEmpresas}/${Empresa}/${Sigla}/${Pessoa}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera os dados do centro de custo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo (id). A lista de grupo de empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {Object_.CentroDeCusto} CentroDeCusto Insira um Object_ com todos os dados do centro de custo
     **/
    public async Put(Token: string, GrupoDeEmpresas: number, CentroDeCusto: Object_.CentroDeCusto): Promise<AxiosResponse<Object_.CentroDeCusto>> {
        return await Context.put(`/CentroDeCusto/${GrupoDeEmpresas}`, CentroDeCusto, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new CentroDeCusto();