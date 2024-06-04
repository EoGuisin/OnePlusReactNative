import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class Brinde {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Lista o estoque (quantitativo, validade, valor, etc)
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async Almoxarifado(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.ItemDoAlmoxarifadoDeBrinde>>> {
        return await Context.get(`/Brinde/Almoxarifado/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista os brindes a utilizar e utilizados contra o fornecedor que esteja consultando esta requisição
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async ExtratoDoFornecedor(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<{ periodo: Date, movimentacoes: Array<{ id: number, titulo: string, descricao: string, valor: number, periodo: Date, credito: boolean }> }>>> {
        return await Context.get(`/Brinde/ExtratoDoFornecedor/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista todos os brindes
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async Get(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.Brinde>>> {
        return await Context.get(`/Brinde/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista todos os tipos
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async TiposDeBrinde(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.TipoDeBrinde>>> {
        return await Context.get(`/Brinde/TiposDeBrinde/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Cadastra um novo item no almoxarifado
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.ItemDoAlmoxarifadoDeBrinde} ItemDoAlmoxarifado Insira um Object_ com todos os dados do item do almoxarifado
     **/
    public async NovoItemNoAlmoxarifado(Token: string, GrupoDeEmpresas: number, ItemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde): Promise<AxiosResponse<Object_.ItemDoAlmoxarifadoDeBrinde>> {
        return await Context.post(`/Brinde/NovoItemNoAlmoxarifado/${GrupoDeEmpresas}`, ItemDoAlmoxarifado, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastra um novo tipo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.TipoDeBrinde} Tipo Insira um Object_ com todos os dados do tipo de brinde
     **/
    public async NovoTipoDeBrinde(Token: string, GrupoDeEmpresas: number, Tipo: Object_.TipoDeBrinde): Promise<AxiosResponse<Object_.TipoDeBrinde>> {
        return await Context.post(`/Brinde/NovoTipoDeBrinde/${GrupoDeEmpresas}`, Tipo, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }

    /* Sobre esta função *//**
     * Cadastra um novo tipo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async MotivosDeCancelamento(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Object_.CancelamentoBrinde[]>> {
        return await Context.get(`/Brinde/MotivosDeCancelamento/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }

    /* Sobre esta função *//**
     * Cadastra um novo brinde
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Brinde} Brinde Insira um Object_ com todos os dados do brinde
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, Brinde: Object_.Brinde): Promise<AxiosResponse<Object_.Brinde>> {
        return await Context.post(`/Brinde/${GrupoDeEmpresas}`, Brinde, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Valida o brinde, definindo-o como utilizado
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {string} QRCode Informe o texto presente no QRCode
     **/
    public async ValidarBrinde(Token: string, GrupoDeEmpresas: number, QRCode: string): Promise<AxiosResponse<{ periodo: Date, movimentacoes: Array<{ id: number, titulo: string, descricao: string, valor: number, periodo: Date, credito: boolean }> }>> {
        return await Context.post(`/Brinde/ValidarBrinde/${GrupoDeEmpresas}/${QRCode}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Insira um Object_ com todos os dados do item do almoxarifado
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.ItemDoAlmoxarifadoDeBrinde} ItemDoAlmoxarifado Insira um Object_ com todos os dados do item do almoxarifado
     **/
    public async DeletarItemDoAlmoxarifado(Token: string, GrupoDeEmpresas: number, ItemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde): Promise<AxiosResponse<Object_.ItemDoAlmoxarifadoDeBrinde>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Brinde/DeletarItemDoAlmoxarifado/${GrupoDeEmpresas}`,
            data: ItemDoAlmoxarifado,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Deleta o tipo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.TipoDeBrinde} Tipo Insira um Object_ com todos os dados do tipo de brinde
     **/
    public async DeletarTipoDeBrinde(Token: string, GrupoDeEmpresas: number, Tipo: Object_.TipoDeBrinde): Promise<AxiosResponse<Object_.TipoDeBrinde>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Brinde/DeletarTipoDeBrinde/${GrupoDeEmpresas}`,
            data: Tipo,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera os dados do brinde
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Brinde} Brinde Insira um Object_ com todos os dados do brinde
     **/
    public async Put(Token: string, GrupoDeEmpresas: number, Brinde: Object_.Brinde): Promise<AxiosResponse<Object_.Brinde>> {
        return await Context.put(`/Brinde/${GrupoDeEmpresas}`, Brinde, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Altera os dados do tem do almoxarifado
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.ItemDoAlmoxarifadoDeBrinde} ItemDoAlmoxarifado Insira um Object_ com todos os dados do item do almoxarifado
     **/
    public async AlterarItemDoAlmoxarifado(Token: string, GrupoDeEmpresas: number, ItemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde): Promise<AxiosResponse<Object_.ItemDoAlmoxarifadoDeBrinde>> {
        return await Context.put(`/Brinde/AlterarItemDoAlmoxarifado/${GrupoDeEmpresas}`, ItemDoAlmoxarifado, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Altera os dados do tipo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.TipoDeBrinde} Tipo Insira um Object_ com todos os dados do tipo de brinde
     **/
    public async AlterarTipoDeBrinde(Token: string, GrupoDeEmpresas: number, Tipo: Object_.TipoDeBrinde): Promise<AxiosResponse<Object_.TipoDeBrinde>> {
        return await Context.put(`/Brinde/AlterarTipoDeBrinde/${GrupoDeEmpresas}`, Tipo, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new Brinde();