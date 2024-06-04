import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

interface PermissaoDeAcesso {
    usuario: {
        id: number,
        nome: string,
        cargo: Object_.Cargo | undefined,
        email: Object_.Email | undefined
    },
    centroDeCusto: Object_.CentroDeCusto,
    softwareExterno: Object_.SoftwareExterno
}

class SoftwareExterno {
    //? #region GET Controller  */
    /* Sobre esta função *//**
     * Lista os centros de custos vinculados
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number|undefined} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string|undefined} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
    @param {string|undefined} TokenSoftwareExterno Informe o token do software externo (token). A lista das tokens cadastrados poderá ser obtida ao executar a requisição "/SoftwareExterno/OnePlus/{Token}"
    @param {string|undefined} EmpresaVinculada Informe o código da empresa no software externo
    @param {string|undefined} CentroDeCustoVinculado Informe o código do centro de custo no software externo
     **/
    public async CentroDeCustoVinculado(Token: string, GrupoDeEmpresas: number, Empresa: number|undefined, CentroDeCusto: string|undefined, TokenSoftwareExterno: string|undefined, EmpresaVinculada: string|undefined, CentroDeCustoVinculado: string|undefined): Promise<AxiosResponse<Array<SoftwareExterno>>> {
        return await Context.get(`/SoftwareExterno/CentroDeCustoVinculado/${GrupoDeEmpresas}?Empresa=${Empresa}&CentroDeCusto=${CentroDeCusto}&TokenSoftwareExterno=${TokenSoftwareExterno}&EmpresaVinculada=${EmpresaVinculada}&CentroDeCustoVinculado=${CentroDeCustoVinculado}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista os software externos cadastrados
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number|undefined} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string|undefined} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
     **/
    public async Get(Token: string, GrupoDeEmpresas: number, Empresa: number|undefined, CentroDeCusto: string|undefined): Promise<AxiosResponse<Array<Object_.SoftwareExterno>>> {
        return await Context.get(`/SoftwareExterno/${GrupoDeEmpresas}`, {
            params: {
                Empresa: Empresa,
                CentroDeCusto: CentroDeCusto
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista os software ao qual a solução tem integração habilitada
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async SoftwaresIntegrados(Token: string): Promise<AxiosResponse<Array<Object_.SoftwareIntegrado>>> {
        return await Context.get(`/SoftwareExterno/SoftwaresIntegrados`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Autoriza a pessoa o acesso ao software externo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
    @param {string} TokenSoftwareExterno Informe o token do software externo (token). A lista das tokens cadastrados poderá ser obtida ao executar a requisição "/SoftwareExterno/{Token}/{GrupoDeEmpresas}
    @param {number} Pessoa Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema!
    @param {string} PessoaVinculada Informe o código da pessoa no software externo
     **/
    public async AutorizarPermissaoDeAcesso(Token: string, GrupoDeEmpresas: number, Empresa: number, CentroDeCusto: string, TokenSoftwareExterno: string, Pessoa: number, PessoaVinculada: string): Promise<AxiosResponse<PermissaoDeAcesso>> {
        return await Context.post(`/SoftwareExterno/AutorizarPermissaoDeAcesso/${GrupoDeEmpresas}/${Empresa}/${CentroDeCusto}/${TokenSoftwareExterno}/${Pessoa}/${PessoaVinculada}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Importa os identificadores presentes no software externo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
    @param {string} TokenSoftwareExterno Informe o token do software externo (token). A lista das tokens cadastrados poderá ser obtida ao executar a requisição "/SoftwareExterno/{Token}/{GrupoDeEmpresas}
     **/
    public async ImportarIdentificadoresVinculados(Token: string, GrupoDeEmpresas: number, Empresa: number, CentroDeCusto: string, TokenSoftwareExterno: string): Promise<AxiosResponse<any>> {
        return await Context.post(`/SoftwareExterno/ImportarIdentificadoresVinculados/${GrupoDeEmpresas}/${Empresa}/${CentroDeCusto}/${TokenSoftwareExterno}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastra um novo centro de custo vinculado
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
    @param {string} TokenSoftwareExterno Informe o token do software externo (token). A lista das tokens cadastrados poderá ser obtida ao executar a requisição "/SoftwareExterno/OnePlus/{Token}"
    @param {string} EmpresaVinculada Informe o código da empresa no software externo
    @param {string} CentroDeCustoVinculado Informe o código do centro de custo no software externo
     **/
    public async NovoCentroDeCustoVinculado(Token: string, GrupoDeEmpresas: number, Empresa: number, CentroDeCusto: string, TokenSoftwareExterno: string, EmpresaVinculada: string, CentroDeCustoVinculado: string): Promise<AxiosResponse<any>> {
        return await Context.post(`/SoftwareExterno/NovoCentroDeCustoVinculado/${GrupoDeEmpresas}/${Empresa}/${CentroDeCusto}/${TokenSoftwareExterno}/${EmpresaVinculada}/${CentroDeCustoVinculado}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastrar um novo software externo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.SoftwareExterno} SoftwareExterno Insira um Object_ com todos os dados do software externo
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, SoftwareExterno: Object_.SoftwareExterno): Promise<AxiosResponse<Object_.SoftwareExterno>> {
        return await Context.post(`/SoftwareExterno/${GrupoDeEmpresas}`, SoftwareExterno, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta o software externo
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.SoftwareExterno} SoftwareExterno Insira um Object_ com todos os dados do software externo
     **/
    public async Delete(Token: string, GrupoDeEmpresas: number, SoftwareExterno: Object_.SoftwareExterno): Promise<AxiosResponse<Object_.SoftwareExterno>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/SoftwareExterno/${GrupoDeEmpresas}`,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
            data: SoftwareExterno
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Remove o centro de custo vinculado
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
    @param {string} TokenSoftwareExterno Informe o token do software externo (token). A lista das tokens cadastrados poderá ser obtida ao executar a requisição "/SoftwareExterno/OnePlus/{Token}"
    @param {string} EmpresaVinculada Informe o código da empresa no software externo
    @param {string} CentroDeCustoVinculado Informe o código do centro de custo no software externo
     **/
    public async RemoverCentroDeCustoVinculado(Token: string, GrupoDeEmpresas: number, Empresa: number, CentroDeCusto: string, TokenSoftwareExterno: string, EmpresaVinculada: string, CentroDeCustoVinculado: string): Promise<AxiosResponse<any>> {
        return await Context.delete(`/SoftwareExterno/RemoverCentroDeCustoVinculado/${GrupoDeEmpresas}/${Empresa}/${CentroDeCusto}/${TokenSoftwareExterno}/${EmpresaVinculada}/${CentroDeCustoVinculado}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Desautoriza a pessoa o acesso ao software externo informado
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
    @param {string} TokenSoftwareExterno Informe o token do software externo (token). A lista das tokens cadastrados poderá ser obtida ao executar a requisição "/SoftwareExterno/{Token}/{GrupoDeEmpresas}
    @param {number} Pessoa Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema!
     **/
    public async RemoverPermissaoDeAcesso(Token: string, GrupoDeEmpresas: number, Empresa: number, CentroDeCusto: string, TokenSoftwareExterno: string, Pessoa: number): Promise<AxiosResponse<any>> {
        return await Context.delete(`/SoftwareExterno/RemoverPermissaoDeAcesso/${GrupoDeEmpresas}/${Empresa}/${CentroDeCusto}/${TokenSoftwareExterno}/${Pessoa}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */
    
    //TODO #region PUT Controller  */
    //TODO #endregion */
}

export default new SoftwareExterno();