import { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class Prioridade {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Lista de todas as prioridades
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async Get(Token: string): Promise<AxiosResponse<Array<Object_.Prioridade>>> {
        return await Context.get(`/Prioridade`, { headers: { "Authorization": `Bearer ${Token}` } })
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

export default new Prioridade();