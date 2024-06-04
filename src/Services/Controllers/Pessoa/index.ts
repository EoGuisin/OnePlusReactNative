import { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class Pessoa {
    /* #region  GET Controller  */
    /* Localiza a pessoa através do CPF *//**
     * Lista os estados civis existentes
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async EstadoCivil(Token: string): Promise<AxiosResponse<Array<Object_.EstadoCivil>>> {
        return await Context.get(`/Pessoa/EstadoCivil`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista os estados civis existentes
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}
    @param {number | undefined} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {string | undefined} CPF Informe o CPF (somente números)
    @param {number | undefined} Id Informe o código da pessoa (id)
    @param {number | undefined} Cargo Informe o código do Cargo (id)
    @param {number | undefined} SalaDeVenda Informe o código da Sala de Venda (id)
     **/
    public async Get(Token: string, GrupoDeEmpresas: number | undefined, CPF: string | undefined, Id: number | undefined, Cargo: number | undefined, SalaDeVenda: number | undefined): Promise<AxiosResponse<Array<Object_.Pessoa>>> {
        return await Context.get(`/Pessoa`,
            {
                params: {
                    GrupoDeEmpresas: GrupoDeEmpresas,
                    CPF: CPF,
                    Id: Id,
                    Cargo: Cargo,
                    SalaDeVenda: SalaDeVenda
                },
                headers: { "Authorization": `Bearer ${Token}` }
            })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* #endregion */
    /* Sobre esta função *//**
     * Lista os estados civis existentes
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}
    @param {string} IdPessoa Informe o id da pessoa
    @param {string} CPF Informe o CPF (somente números)
     **/
    public async BuscaPersonalizada(Token: string, IdPessoa: number, CPF: string): Promise<AxiosResponse<Object_.Pessoa>> {
        return await Context.get(`/Pessoa?Id=${IdPessoa}&CPF=${CPF}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Localiza a pessoa através do CPF *//**
     * Lista os regimes de bens
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async RegimeDeBens(Token: string): Promise<AxiosResponse<Array<Object_.RegimeDeBens>>> {
        return await Context.get(`/Pessoa/RegimeDeBens`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* #endregion */

    /* #region  POST Controller  */
    /* Sobre esta função *//**
     * Lista os estados civis existentes
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async Post(Token: string, Pessoa: Object_.Pessoa): Promise<AxiosResponse<Object_.Pessoa>> {
        return await Context.post(`/Pessoa`, Pessoa, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* #endregion */

    /* #region  DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta a pessoa
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} Pessoa Informe o código da pessoa (id)
     **/
    public async Delete(Token: string, Pessoa: number): Promise<AxiosResponse<Object_.Pessoa>> {
        return await Context.delete(`/Pessoa/${Pessoa}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* #endregion */

    /* #region  PUT Controller  */
    /* Sobre esta função *//**
     * Alterar os dados de uma pessoa
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async Put(Token: string, Pessoa: Object_.Pessoa): Promise<AxiosResponse<Object_.Pessoa>> {
        return await Context.put(`/Pessoa`, Pessoa, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* #endregion */
}

export default new Pessoa();