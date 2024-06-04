import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

interface PermissaoDeAcesso {
    usuario: {
        id: number;
        nome: string;
        cargo: Object_.Cargo | undefined;
        email: Object_.Email | undefined;
    };
    empresa: Object_.Empresa;
}

class FunilDeVenda {
    //? #region GET Controller  */
    /* Sobre esta função *//**
     * Consulta o(s) funil(s) vinculado(s) ao grupo de empresa informado.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number|undefined} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number|undefined} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas de vendas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/GruposDeEmpresas/{Token}"
    @param {number|undefined} Area Informe o código da área (id). A lista de áreas cadastradas poderá ser obtida ao executar a requisição "/Area/GruposDeEmpresas/{Token}""
     **/
    public async Get(Token: string, GrupoDeEmpresas: number | undefined, SalaDeVenda: number | undefined, Area: number | undefined, MeusFunis: boolean | undefined): Promise<AxiosResponse<Array<Object_.Funil>>> {
        return await Context.get(`/FunilDeVenda/${GrupoDeEmpresas}`, {
            params: {
                SalaDeVenda: SalaDeVenda,
                Area: Area,
                MeusFunis: MeusFunis ?? true
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Retorna as informações da pessoa tenha permissão de acesso ao funil de vendas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} IdFunil Informe o código da área (id). A lista de áreas cadastradas poderá ser obtida ao executar a requisição "/FunilDeVenda/GruposDeEmpresas"
    **/
    public async PermissaoDeAcesso(Token: string, GrupoDeEmpresas: number, IdFunil: number): Promise<AxiosResponse<PermissaoDeAcesso>> {
        return await Context.get(`/FunilDeVenda/PermissaoDeAcesso/${GrupoDeEmpresas}/${IdFunil}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region POST Controller  */
    /* Sobre esta função *//**
     * Autoriza a pessoa, atrelada ao usuário, o acesso ao funil de vendas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas de vendas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/GruposDeEmpresas/{Token}"
    @param {number} Area Informe o código da área (id). A lista de áreas cadastradas poderá ser obtida ao executar a requisição "/Area/GruposDeEmpresas/{Token}"
    @param {number} FunilDeVenda Informe o código do funil de vendas (id). A lista de funis cadastrads poderá ser obtida ao executar a requisição "/FunilDeVenda/GruposDeEmpresas/{Token}"
    @param {number} Pessoa Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema!
    **/
    public async AutorizarPermissaoDeAcesso(Token: string, GrupoDeEmpresas: number, SalaDeVenda: number, Area: number, FunilDeVenda: number, Pessoa: number): Promise<AxiosResponse<PermissaoDeAcesso>> {
        return await Context.post(`/FunilDeVenda/AutorizarPermissaoDeAcesso/${GrupoDeEmpresas}/${SalaDeVenda}/${Area}/${FunilDeVenda}/${Pessoa}`, undefined, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastrar um novo funil de venda.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Funil} Funil Insira um Object_ com todos os dados do funil
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, Funil: Object_.Funil): Promise<AxiosResponse<Object_.Funil>> {
        return await Context.post(`/FunilDeVenda/${GrupoDeEmpresas}`, Funil, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta o funil de venda a partir da empresa informada
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Funil} Funil Insira um Object_ com todos os dados do funil
     **/
    public async Delete(Token: string, GrupoDeEmpresas: number, Funil: Object_.Funil): Promise<AxiosResponse<Object_.Funil>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/FunilDeVenda/${GrupoDeEmpresas}`,
            data: Funil,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Desautoriza a pessoa, atrelada ao usuário, o acesso ao funil de vendas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas de vendas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/GruposDeEmpresas/{Token}"
    @param {number} Area Informe o código da área (id). A lista de áreas cadastradas poderá ser obtida ao executar a requisição "/Area/GruposDeEmpresas/{Token}"
    @param {number} FunilDeVenda Informe o código do funil de vendas (id). A lista de funis cadastrads poderá ser obtida ao executar a requisição "/FunilDeVenda/GruposDeEmpresas/{Token}"
    @param {number} Pessoa Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema!
     **/
    public async RemoverPermissaoDeAcesso(Token: string, GrupoDeEmpresas: number, SalaDeVenda: number, Area: number, FunilDeVenda: number, Pessoa: number): Promise<AxiosResponse<any>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/FunilDeVenda/RemoverPermissaoDeAcesso/${GrupoDeEmpresas}/${SalaDeVenda}/${Area}/${FunilDeVenda}/${Pessoa}`,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera o funil de vendas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
]   @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Funil} Funil Insira um Object_ com todos os dados do funil
     **/
    public async Put(Token: string, GrupoDeEmpresas: number, Funil: Object_.Funil): Promise<AxiosResponse<Object_.Funil>> {
        return await Context.put(`/FunilDeVenda/${GrupoDeEmpresas}`, Funil, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new FunilDeVenda();