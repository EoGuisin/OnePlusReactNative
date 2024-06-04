import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class ControleDeSala {

    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Lista as ações que poderão ser executadas em cada etapa do fluxo de sala
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async Acoes(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.ControleDeSala>>> {
        return await Context.get(`/ControleDeSala/Acao/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista todos os controles de sala
     @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     @param {boolean} MeuControleDeSala Defina se deverá ser retornado apenas os controles de sala que o usuário possua permissão
     @param {number} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas de vendas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/{GruposDeEmpresas}/{Token}"
     **/
    public async Get(Token: string, GrupoDeEmpresas: number, MeuControleDeSala: boolean, SalaDeVenda: number|undefined): Promise<AxiosResponse<Array<Object_.ControleDeSala>>> {
        return await Context.get(`/ControleDeSala/${GrupoDeEmpresas}`, {
            params: {
                MeuControleDeSala: MeuControleDeSala,
                SalaDeVenda: SalaDeVenda
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Autorizar a pessoa informada, o acesso ao controle de sala.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas de vendas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/{GruposDeEmpresas}/{Token}"
    @param {number} ControleDeSala Informe o código do funil de vendas (id). A lista de funis cadastrads poderá ser obtida ao executar a requisição "/ControleDeSala/{GruposDeEmpresas}/{Token}"
    @param {number} Pessoa Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema!
     **/
    public async AutorizarPermissaoDeAcesso(Token: string, GrupoDeEmpresas: number, SalaDeVenda: number, ControleDeSala: number, Pessoa: number): Promise<AxiosResponse<any>> {
        return await Context.post(`/ControleDeSala/AutorizarPermissaoDeAcesso/${GrupoDeEmpresas}/${SalaDeVenda}/${ControleDeSala}/${Pessoa}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastrar um novo controle de sala
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.ControleDeSala} ControleDeSala Insira um Object_ com todos os dados do controle de sala
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, ControleDeSala: Object_.ControleDeSala): Promise<AxiosResponse<Object_.ControleDeSala>> {
        return await Context.post(`/ControleDeSala/${GrupoDeEmpresas}`, ControleDeSala, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta o controle de sala
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.ControleDeSala} ControleDeSala Insira um Object_ com todos os dados do controle de sala
     **/
    public async Delete(Token: string, GrupoDeEmpresas: number, ControleDeSala: Object_.ControleDeSala): Promise<AxiosResponse<Object_.ControleDeSala>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/ControleDeSala/${Token}/${GrupoDeEmpresas}`,
            data: ControleDeSala,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Desautoriza a pessoa o acesso ao controle de sala
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas de vendas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/{GruposDeEmpresas}/{Token}"
    @param {number} ControleDeSala Informe o código do funil de vendas (id). A lista de funis cadastrads poderá ser obtida ao executar a requisição "/ControleDeSala/{GruposDeEmpresas}/{Token}"
    @param {number} Pessoa Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema!
     **/
    public async RemoverPermissaoDeAcesso(Token: string, GrupoDeEmpresas: number, SalaDeVenda: number, ControleDeSala: number, Pessoa: number): Promise<AxiosResponse<any>> {
        return await Context.delete(`/ControleDeSala/RemoverPermissaoDeAcesso/${GrupoDeEmpresas}/${SalaDeVenda}/${ControleDeSala}/${Pessoa}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera os dados do controle de sala
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.ControleDeSala} ControleDeSala Insira um Object_ com todos os dados do controle de sala
     **/
    public async Put(Token: string, GrupoDeEmpresas: number, ControleDeSala: Object_.ControleDeSala): Promise<AxiosResponse<Object_.ControleDeSala>> {
        return await Context.put(`/ControleDeSala/${GrupoDeEmpresas}`, ControleDeSala, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new ControleDeSala();