import { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object } from '../../Objects';

class Nacao {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Lista as nações
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public async Get(Token: string): Promise<AxiosResponse<Array<Object.Nacao>>> {
        return await Context.get(`/Nacao`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */
}

export default new Nacao();