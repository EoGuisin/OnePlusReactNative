import axios, { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../Objects';

class RDStation {
    //? #region  GET Controller */
    /* Sobre esta função *//**
     * Retorna todos os cargos
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async Get(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<{
        empresa: Object_.Empresa,
        centroDeCusto: Object_.CentroDeCusto,
        campanha: string,
        salaDeVenda: Object_.SalaDeVenda,
        funil: { id: number, descricao: string, posicaoDoFunil: Object_.PosicaoDoFunil, hierarquiaDoFunil: Object_.HierarquiaDoFunil }
    }>>> {
        return await Context.get(`/RDStation/Campanhas/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
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

export default new RDStation();