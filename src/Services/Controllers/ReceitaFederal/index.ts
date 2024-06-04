import { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class ReceitaFederal {
    //? #region GET Controller  */
    /* Sobre esta função *//**
     * Consulta o CPF junto a receita federal do Brasil.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {string} CPF Informe o CPF (somente números)
    @param {Date} DataDeNascimento Informe a data de nascimento no formato: AAAA-MM-DD
     **/
    public async CPF(Token: string, CPF: string, DataDeNascimento: Date): Promise<AxiosResponse<Object_.Pessoa>> {
        return await Context.get(`/ReceitaFederal/${CPF}/${DataDeNascimento}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch(async (Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Consulta o CNPJ junto a receita federal do Brasil.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {string} CNPJ Informe o CNPJ (somente números)
     **/
    public async CNPJ(Token: string, CNPJ: string): Promise<AxiosResponse<Object_.Empresa>> {
        return await Context.get(`/ReceitaFederal/${CNPJ}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch(async (Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Consulta as classificações nacionais de atividades econômicas
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async CNAEs(Token: string): Promise<AxiosResponse<Array<Object_.CNAE>>> {
        return await Context.get(`/ReceitaFederal/CNAEs`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch(async (Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    //* #endregion */

    //! #region DELETE Controller  */
    //! #endregion */

    //TODO #region PUT Controller  */
    //TODO #endregion */
};

export default new ReceitaFederal();