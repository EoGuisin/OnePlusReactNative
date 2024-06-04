import axios, { AxiosResponse } from 'axios';
import { Object_ } from '../../Objects';

class NewsLetter {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Lista os estados civis existentes
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}
    @param {string} CPF Informe o CPF (somente números)
     **/
    public async Get(): Promise<AxiosResponse<Array<Object_.Newsletter>>> {
        return await axios.get('https://api.bing.microsoft.com/v7.0/news/search?q=mercado imobiliario', {
            headers: {
                "Ocp-Apim-Subscription-Key": "e5cb9cc214b34758939c5210fa3a25ef"
            }
        }).then((Response) => {
            var Registros = [] as Array<Object_.Newsletter>
            (Response.data.value as Array<any>).map((Item: any) => {
                Registros.push({
                    titulo: Item.name,
                    anexo: Item.image ? Item.image.thumbnail.contentUrl : "",
                    descricao: Item.description,
                    uRL: Item.url
                } as Object_.Newsletter);
            });
            Response.data = Registros;
            return Response;
        }).catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    //* #endregion */

    //! #region  DELETE Controller  */
    //! #endregion */

    //TODO #region  PUT Controller  */
    //TODO #endregion */
}

export default new NewsLetter();