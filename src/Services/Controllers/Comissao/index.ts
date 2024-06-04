import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class Comissao {
    //? #region  GET Controller */
    /* Sobre esta função *//**
     * Retorna todas as comissões geradas e apuradas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number | undefined} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string | undefined} CentroDeCusto Informe a sigla que identifica o centro de custo. A lista dos centros de custos cadastrados poderá ser obtido ao executar a requisição "/CentroDeCusto/{Token}/{Empresa}"
    @param {number | undefined} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/{Token}/{GrupoDeEmpresa}"
    @param {number | undefined} Cargo Informe o código do cargo. A lista de cargos cadastrados poderá ser obtida ao executar a requisição "/Cargo/GruposDeEmpresas/{Token}"
    @param {number|undefined} Pessoa Informe o código da pessoa (Id).
    @param {boolean | undefined} VisaoSintetica Caso marcado como verdadeiro, o Object_ retornado será modificado afim de reduzir ao máximo o volume de dados
     **/
    public async ApuracaoDaComissão(Token: string, GrupoDeEmpresas: number, Empresa: number | undefined, CentroDeCusto: string | undefined, SalaDeVenda: number | undefined, Cargo: number | undefined, Pessoa: number | undefined, DataInicial: Date | undefined, DataFinal: Date | undefined, VisaoSintetica: boolean | undefined): Promise<AxiosResponse<Array<Object_.ControleDeComissaoSintetico>>> {
        return await Context.get(`/Comissao/ApuracaoDaComissao/${GrupoDeEmpresas}`, {
            params: {
                Empresa: Empresa,
                CentroDeCusto: CentroDeCusto,
                SalaDeVenda: SalaDeVenda,
                Cargo: Cargo,
                Pessoa: Pessoa,
                DataInicial: DataInicial,
                DataFinal: DataFinal,
                VisaoSintetica: VisaoSintetica ?? true
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }


    /* Sobre esta função *//**
     * Retorna a estrutura de comissão aplicada a empresa, centro de custo e sala informados, considerando os paramentros do local e sublocal
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
    @param {string} CentroDeCusto Informe o código do centro de custo (sigla)
    @param {number} Local Informe o código do local (id)
    @param {number} Sublocal Informe o código do sublocal (id)
    @param {number} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/{Token}/{GrupoDeEmpresa}"
    @param {number} ValorBase Informe o valor base de calculo da comissão. Não sendo informado, será usado o valor a vista da unidade informada
    @param {number} Organograma Informe o código do organograma (id)
     **/
    public async EstruturaDeComissao(Token: string, GrupoDeEmpresas: number, Empresa: number, CentroDeCusto: string, Local: number, Sublocal: number, SalaDeVenda: number, Lead: number | undefined, ValorBase?: number | undefined, Organograma?: number | undefined): Promise<AxiosResponse<{ SalaDeVendas: Object_.SalaDeVenda, comissionados: Array<Object_.Comissionado> }>> {
        return await Context.get(`/Comissao/EstruturaDeComissao/${GrupoDeEmpresas}/${Empresa}/${CentroDeCusto}/${Local}/${Sublocal}/${SalaDeVenda}`, {
            params: {
                Lead: Lead,
                ValorBase: ValorBase,
                Organograma: Organograma
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception.response; });
    }
    /* Sobre esta função *//**
     * Retorna todos as comissões
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Empresa Informe o código da empresa (id)
    @param {number} CentroDeCusto Informe a sigla da empresa (sigla)
    @param {number} SalaDeVenda Informe o código da sala de venda (id)
    @param {number} Cargo Informe o código do cargo (id)
     **/
    public async Get(Token: string, GrupoDeEmpresas: number, Empresa?: number | undefined, CentroDeCusto?: string | undefined, SalaDeVenda?: number | undefined, Cargo?: number | undefined): Promise<AxiosResponse<Array<Object_.Comissao>>> {
        return await Context.get(`/Comissao/${GrupoDeEmpresas}`, {
            params: {
                Empresa: Empresa,
                CentroDeCusto: CentroDeCusto,
                SalaDeVenda: SalaDeVenda,
                Cargo: Cargo
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Retorna todos os tipos de comissões
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async TiposDeComissao(Token: string): Promise<AxiosResponse<Array<Object_.TipoDeComissao>>> {
        return await Context.get(`/Comissao/TiposDeComissao`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Retorna todos os tipos de metas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async TiposDeMeta(Token: string): Promise<AxiosResponse<Array<Object_.TipoDeMetaDeComissao>>> {
        return await Context.get(`/Comissao/TiposDeMeta`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Retorna todos os parametros da comissão
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async ParametrosDaComissao(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.TipoDeMetaDeComissao>>> {
        return await Context.get(`/Comissao/ParametrosDaComissao/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Cadastra um nova comissão
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Comissao} Comissao Insira um Object_ com todos os dados da comissão
     **/
    public async ApurarComissao(Token: string, GrupoDeEmpresas: number, Empresa: number, CentroDeCusto: string, SalaDeVenda: number, DataInicial: Date | undefined, DataFinal: Date | undefined, VisaoSintetica: boolean | undefined): Promise<AxiosResponse<Array<Object_.ControleDeComissaoSintetico>>> {
        return await Context.post(`/Comissao/ApurarComissao/${GrupoDeEmpresas}/${Empresa}/${CentroDeCusto}/${SalaDeVenda}`, undefined, {
            params: {
                SalaDeVenda: SalaDeVenda,
                DataInicial: DataInicial,
                DataFinal: DataFinal,
                VisaoSintetica: VisaoSintetica
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastra um nova comissão
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Comissao} Comissao Insira um Object_ com todos os dados da comissão
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, Comissao: Object_.Comissao): Promise<AxiosResponse<Object_.Comissao>> {
        return await Context.post(`/Comissao/${GrupoDeEmpresas}`, Comissao, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //* #endregion */

    //! #region DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta a comissão
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Comissao} Comissao Insira um Object_ com todos os dados da comissão
     **/
    public async Delete(Token: string, GrupoDeEmpresas: number, Comissao: Object_.Comissao): Promise<AxiosResponse<Object_.Comissao>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Comissao/${GrupoDeEmpresas}`,
            data: Comissao,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera os dados da comissão
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Comissao} Comissao Insira um Object_ com todos os dados da comissão
     **/
    public async Put(Token: string, GrupoDeEmpresas: number, Comissao: Object_.Comissao): Promise<AxiosResponse<Object_.Comissao>> {
        return await Context.put(`/Comissao/${GrupoDeEmpresas}`, Comissao, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new Comissao();