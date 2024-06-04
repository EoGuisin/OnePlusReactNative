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
    empresa: Object_.Empresa
}

class Empresa {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     * Consulta os CNAEs definidos pelo IBGE
     **/
    public async CNAEsIBGE(Token: string): Promise<AxiosResponse<Array<Object_.CNAE>>> {
        return await Context.get(`/Empresa/CNAEsIBGE`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Consulta todas as empresa
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {boolean} MinhasEmpresas Informe se deseja apenas visualizar as empresas cujo o usuário possua permissão
    @param {number|undefined} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number|undefined} Id Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
     **/
    public async Get(Token: string, MinhasEmpresas: boolean, GrupoDeEmpresas: number | undefined, Id: number | undefined): Promise<AxiosResponse<Array<Object_.Empresa>>> {
        return await Context.get(`/Empresa`,
            {
                params: {
                    MinhasEmpresas: MinhasEmpresas,
                    GrupoDeEmpresas: GrupoDeEmpresas,
                    Empresa: Id
                },
                headers: { "Authorization": `Bearer ${Token}` }
            })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Consulta os grupos de empresas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {boolean} MeusGrupos Defina se deverá ser exibido todas as empresas ou apenas as empresas ao qual o usuario possui permissão de visualização (pos padrão será exibido todas as empresas)
    @param {number|undefined} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async GruposDeEmpresas(Token: string, MeusGrupos: boolean, GrupoDeEmpresas: number | undefined): Promise<AxiosResponse<Array<Object_.GrupoDeEmpresas>>> {
        return await Context.get(`/Empresa/GruposDeEmpresas`,
            {
                params: {
                    MeusGrupos: MeusGrupos,
                    GrupoDeEmpresas: GrupoDeEmpresas
                },
                headers: { "Authorization": `Bearer ${Token}` }
            })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Autoriza a pessoa o acesso a empresa informada
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {number} Pessoa Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema!
     **/
    public async AutorizarPermissaoDeAcesso(Token: string, GrupoDeEmpresas: number, Id: number, Pessoa: number): Promise<AxiosResponse<PermissaoDeAcesso>> {
        return await Context.post(`/Empresa/AutorizarPermissaoDeAcesso/${GrupoDeEmpresas}/${Id}/${Pessoa}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastra uma nova empresa
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number|undefined} GrupoDeEmpresas Informe o código do grupo (id). A lista de grupo de empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {Object_.Empresa} Empresa Insira um Object_ com todos os dados da empresa
     **/
    public async Post(Token: string, GrupoDeEmpresas: number | undefined, Empresa: Object_.Empresa): Promise<AxiosResponse<Object_.Empresa>> {
        return await Context.post(`/Empresa`, Empresa,
            {
                params: {
                    GrupoDeEmpresas: GrupoDeEmpresas
                },
                headers: { "Authorization": `Bearer ${Token}` }
            })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta a empresa
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} Id Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    **/
    public async Delete(Token: string, Id: number): Promise<AxiosResponse<Object_.Empresa>> {
        return await Context.delete(`/Empresa/${Id}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Remover a pessoa, atrelada ao usuário, o acesso a uma determinada empresa.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o grupo de empresas (Grupo). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {number} Pessoa Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema!
     **/
    public async RemoverPermissaoDeAcesso(Token: string, GrupoDeEmpresas: number, Id: number, Pessoa: number): Promise<AxiosResponse<PermissaoDeAcesso>> {
        return await Context.delete(`/Empresa/RemoverPermissaoDeAcesso/${GrupoDeEmpresas}/${Id}/${Pessoa}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera os dados da empresa
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {Object_.Empresa} Empresa Insira um Object_ com todos os dados da empresa
     **/
    public async Put(Token: string, Empresa: Object_.Empresa): Promise<AxiosResponse<Object_.Empresa>> {
        return await Context.put(`/Empresa`, Empresa, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new Empresa();