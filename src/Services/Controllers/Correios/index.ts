import { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class Correios {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Consulta o CEP junto aos Correios
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {string} CEP Informe o CEP (somente números)
     **/
    public async Get(Token: string, CEP: string): Promise<AxiosResponse<Object_.EnderecoIBGE>> {
        return await Context.get(`/Correios/${CEP}`, { headers: { "Authorization": `Bearer ${Token}` } })
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

export default new Correios();