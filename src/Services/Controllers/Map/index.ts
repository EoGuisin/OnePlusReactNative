import { AxiosResponse } from 'axios';
import { Object_ } from '../../Objects';
import Context from '../../node';

class Map {
    //? #region  GET Controller */
    /* Sobre esta função *//**
     * Lista todos os empreendimento
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"s
    @param {number | undefined} GrupoDeEmpresas: Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {string} Empresa: Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
     **/
    public async ListaDeEmpreendimentos(Token: string, GrupoDeEmpresas: number | undefined, Empresa: string): Promise<AxiosResponse<{empreendimentos: Array<{empresa: string, sigla: string, descricao: string}>}>> {
        return await Context.get(`/Mapa/Empreendimentos/${GrupoDeEmpresas}/${Empresa}`, {
            params: {
                GrupoDeEmpresas: GrupoDeEmpresas,
                Empresa: Empresa,
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista todos os usuarios por grupo de empresa
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas: Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {string} Empresa: Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string} CentroDeCusto: Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Empresa}"
     **/
    public async GeoMap(Token: string, GrupoDeEmpresas: number, Empresa: string, CentroDeCusto: string): Promise<AxiosResponse<Object_.Map>> {
        return await Context.get(`/Mapa/${GrupoDeEmpresas}/${Empresa}/${CentroDeCusto}`, {
            params: {
                GrupoDeEmpresas: GrupoDeEmpresas,
                Empresa: Empresa,
                CentroDeCusto: CentroDeCusto
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
}

export default new Map();