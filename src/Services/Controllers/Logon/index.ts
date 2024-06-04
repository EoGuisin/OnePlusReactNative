import axios, { AxiosResponse } from 'axios';
import { Object_ } from '../../Objects';
import Context from '../../context';

interface SolicitacaoNovaSenha{
    remetente: string,
    destinatario: string
}

class Logon {
    //? #region  GET Controller */
    /* Sobre esta função *//**
     * Valida o usuário e gerar o token de acesso para o mesmo
    @param {string} CPF Informe o CPF do usuário
    @param {string} Senha Informe a senha do usuário
     **/
    public async Get(CPF: string, Senha: string): Promise<AxiosResponse<Object_.SignIn>> {
        return await Context.get<{Token: string, Pessoa: any}>(`/Logon/${CPF}/${Senha}`)
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; })
    }
    /* Sobre esta função *//**
     * Lista todos os usuarios por grupo de empresa
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number|undefined} Pessoa Informe o código da pessoa (Id)
    @param {number|undefined} Cargo Informe o código do cargo (Id) obtido ao executar a requisição "/Cargo/{Token}/{GrupoDeEmpresa}"
    @param {number|undefined} Cargo Informe o código do cargo (Id) obtido ao executar a requisição "/Cargo/{Token}/{GrupoDeEmpresa}"
     **/
    public async Usuarios(Token: string, GrupoDeEmpresas: number, Pessoa: number | undefined, Cargo: number | string | undefined, SalaDeVenda: number | undefined): Promise<AxiosResponse<Array<Object_.Usuario>>> {
        return await Context.get(`/Logon/Usuarios/${GrupoDeEmpresas}`, {
            params: {
                Pessoa: Pessoa,
                Cargo: Cargo,
                SalaDeVenda: SalaDeVenda
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista todos os usuários por controle de sala
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number|undefined} CAE Informe o código da CAE (id). A lista das CAEs cadastradas poderá ser obtida ao executar a requisição "/CAE/{Token}"
    @param {number|undefined} Pessoa Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema!
     **/
    public async PermissaoDeAcessoPorCAE(Token: string, CAE: number | undefined, Pessoa: number | undefined): Promise<AxiosResponse<Array<Object_.Usuario>>> {
        return await Context.get(`/Logon/PermissaoDeAcessoPorCAE/?CAE=${CAE}&Pessoa=${Pessoa}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista todos os usuários por centro de custo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number|undefined} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string|undefined} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
    @param {number|undefined} Pessoa Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema!
     **/
    public async PermissaoDeAcessoPorCentroDeCusto(Token: string, GrupoDeEmpresas: number, Empresa: number | undefined, CentroDeCusto: string | undefined, Pessoa: number | undefined): Promise<AxiosResponse<Array<Object_.Usuario>>> {
        return await Context.get(`/Logon/PermissaoDeAcessoPorCentroDeCusto/${GrupoDeEmpresas}`, {
            params: {
                Empresa: Empresa,
                CentroDeCusto: CentroDeCusto,
                Pessoa: Pessoa
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista todos os usuários por controle de sala
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number|undefined} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas de vendas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/{GruposDeEmpresas}/{Token}"
    @param {number|undefined} ControleDeSala Informe o código do controle de sala (id). A lista de áreas cadastradas poderá ser obtida ao executar a requisição "/ControleDeSala/{Token}/{GruposDeEmpresas}"
     **/
    public async PermissaoDeAcessoPorControleDeSala(Token: string, GrupoDeEmpresas: number, SalaDeVenda: number | undefined, ControleDeSala: number | undefined, Pessoa?: number | undefined): Promise<AxiosResponse<Array<{
        salaDeVenda: Object_.SalaDeVenda,
        controleDeSala: Object_.ControleDeSala,
        usuario: Object_.Usuario
    }>>> {
        return await Context.get(`/Logon/PermissaoDeAcessoPorControleDeSala/${GrupoDeEmpresas}`, {
            params: {
                SalaDeVenda: SalaDeVenda,
                ControleDeSala: ControleDeSala,
                Pessoa: Pessoa
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista todos os usuários por empresa
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number|undefined} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {number|undefined} Pessoa Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema!
     **/
    public async PermissaoDeAcessoPorEmpresa(Token: string, GrupoDeEmpresas: number, Empresa: number | undefined, Pessoa: number | undefined): Promise<AxiosResponse<Array<Object_.Usuario>>> {
        return await Context.get(`/Logon/PermissaoDeAcessoPorEmpresa/${GrupoDeEmpresas}`, {
            params: {
                Empresa: Empresa,
                Pessoa: Pessoa
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista todos os usuários por funil de venda
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number|undefined} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas de vendas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/GruposDeEmpresas/{Token}"
    @param {number|undefined} Area Informe o código da área (id). A lista de áreas cadastradas poderá ser obtida ao executar a requisição "/Area/GruposDeEmpresas/{Token}"
    @param {number|undefined} FunilDeVendaInforme o código do funil de vendas (id). A lista de funis cadastrads poderá ser obtida ao executar a requisição "/FunilDeVenda/GruposDeEmpresas/{Token}"
     **/
    public async PermissaoDeAcessoPorFunilDeVenda(Token: string, GrupoDeEmpresas: number, SalaDeVenda: number | undefined, Area: number | undefined, FunilDeVenda: number | undefined, Pessoa?: number | undefined): Promise<AxiosResponse<Array<{ usuario : {id: number, nome: string, cargo: {id: number, nome: string}, email: {classificacao: number, descricao: string}}, salaDeVenda: {id: number, descricao: string}, area: {id: number, descricao: string}, funil: Object_.Funil }>>> {
        return await Context.get(`/Logon/PermissaoDeAcessoPorFunilDeVenda/${GrupoDeEmpresas}`, {
            params: {
                SalaDeVenda: SalaDeVenda,
                Area: Area,
                FunilDeVenda: FunilDeVenda,
                Pessoa: Pessoa
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista todos os usuários por software externo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}".
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number|undefined} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"<
    @param {string|undefined} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
    @param {number|undefined} Pessoa Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema!
     **/
    public async PermissaoDeAcessoPorSoftwareExterno(Token: string, GrupoDeEmpresas: number, Empresa: number | undefined, CentroDeCusto: string | undefined, Pessoa: number | undefined): Promise<AxiosResponse<Array<Object_.Usuario>>> {
        return await Context.get(`/Logon/PermissaoDeAcessoPorSoftwareExterno/${GrupoDeEmpresas}`, {
            params: {
                Empresa: Empresa,
                CentroDeCusto: CentroDeCusto,
                Pessoa: Pessoa
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista os status do logon
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}".
     **/
    public async StatusDoLogon(Token: string): Promise<AxiosResponse<Array<Object_.Status>>> {
        return await Context.get(`/Logon/StatusDoLogon`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller */
    /* Sobre esta função *//**
     * Cadastra um novo usuário
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number | undefined} GrupoDeEmpresa Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {string} Usuario Informe os dados do usuário
     **/
    public async Post(Token: string, GrupoDeEmpresa: number | undefined, Usuario: Object_.Usuario): Promise<AxiosResponse<Object_.SignIn>> {
        return await Context.post(`/Logon/${GrupoDeEmpresa}`, Usuario, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception.response; });
    }
    /* Sobre esta função *//**
     * Solicitar a alteração da senha atual
    @param {string} Login Informe o CPF ou email do usuário
    @param {string} Token Informe o CPF ou email do usuário
     **/
    public async NovaSenha(Login: string, Token: string): Promise<AxiosResponse<SolicitacaoNovaSenha>> {
        return await Context.post(`/Logon/NovaSenha/${Login}`, {
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Vincular usuário ao cargo já cadastrado.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresa Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {string} Pessoa Informe o código da pessoa (Id) obtido ao executar a requisição "/Usuarios/{Token}/{GrupoDeEmpresa}
    @param {string} Cargo Informe o código do cargo (Id) obtido ao executar a requisição "/Cargo/{Token}/{GrupoDeEmpresa}"
     **/
    public async VincularUsuarioAoCargo(Token: string, GrupoDeEmpresa:number, Pessoa: number, Cargo: number): Promise<AxiosResponse<Object_.Usuario>> {
        return await Context.post(`/Logon/VincularUsuarioAoCargo/${GrupoDeEmpresa}/${Pessoa}/${Cargo}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller */
    /* Sobre esta função *//**
     * Deletar o usuário.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {string} Pessoa Informe o código da pessoa (Id) obtido ao executar a requisição "/Usuarios/{Token}/{GrupoDeEmpresa}
     **/
    public async Delete(Token: string, Pessoa: number): Promise<AxiosResponse<Object_.SignIn>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Logon/${Pessoa}`,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Desvincular usuário do cargo.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {string} Pessoa Informe o código da pessoa (Id)
    @param {string} Cargo Informe o código do cargo (Id)
     **/
    public async DesvincularUsuarioDoCargo(Token: string, GrupoDeEmpresas: number, Pessoa: number, Cargo: number): Promise<AxiosResponse<Object_.Usuario>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Logon/DesvincularUsuarioDoCargo/${GrupoDeEmpresas}/${Pessoa}/${Cargo}`,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller */
    /* Sobre esta função *//**
     * Alterar cargo vinculado ao usuário.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {string} Pessoa Informe o código da pessoa (Id) obtido ao executar a requisição "/Usuarios/{Token}/{GrupoDeEmpresa}
    @param {string} Cargo Informe o código do cargo (Id) obtido ao executar a requisição "/Cargo/{Token}/{GrupoDeEmpresa}"
     **/
    public async AlterarCargoDoUsuario(Token: string, GrupoDeEmpresas: number, Pessoa: number, Cargo: number): Promise<AxiosResponse<Object_.Usuario>> {
        return await Context.put(`/Logon/AlterarCargoDoUsuario/${GrupoDeEmpresas}/${Pessoa}/${Cargo}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Altera o token de notificação do usuário
     * @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     * @param {number} Pessoa Informe o código da pessoa (Id) obtido ao executar a requisição "/Usuarios/{Token}/{GrupoDeEmpresa}
     * @param {string} TokenDeNotificacao Informe o token e notificação do usuário
     **/
    public async AtualizacaoDoTokenDeNotificacao(Token: string, Pessoa: number, TokenDeNotificacao: string) {
        return await Context.put(`/Logon/AtualizacaoDoTokenDeNotificacao/${Pessoa}/${TokenDeNotificacao}`, undefined, { 
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Altera a senha atual do usuário
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {string} NovaSenha Informe a nova senha do usuário
    @param {string} NovaSenhaConfirmada Informe a senha atual do usuário
     **/
    public async Put(Token: string, NovaSenha: string, NovaSenhaConfirmada: string): Promise<AxiosResponse<Object_.SignIn>> {
        return await Context.put(`/Logon/${NovaSenha}/${NovaSenhaConfirmada}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Altera a senha atual do usuário
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async Put2(Token: string, Usuario: Object_.Usuario): Promise<AxiosResponse<Object_.SignIn>> {
        return await Context.put(`/Logon`, Usuario, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new Logon();