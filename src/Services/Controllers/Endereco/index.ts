import { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class Endereco {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Lista os tipos de endereço
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async Endereco(Token: string): Promise<AxiosResponse<any>> {
        return await Context.get<any>(`/Endereco`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista as unidades federativas (UFs) cadastradas na base de dados do IBGE
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async UFIBGE(Token: string): Promise<AxiosResponse<Array<Object_.UFIBGE>>> {
        return await Context.get<any>(`/Endereco/UFIBGE`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista os municípios cadastradas na base de dados do IBGE
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {string} UFIBGE Informe o código da UF (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Endereco/UFIBGE/{Token}"
     **/
    public async CidadeIBGE(Token: string, UFIBGE: number): Promise<AxiosResponse<Array<Object_.CidadeIBGE>>> {
        return await Context.get<any>(`/Endereco/CidadeIBGE/${UFIBGE}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    //* #endregion */

    //! #region DELETE Controller  */
    //! #endregion */

    //TODO #region PUT Controller  */
    //TODO #endregion */
}

export default new Endereco();