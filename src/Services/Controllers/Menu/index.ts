import { AxiosResponse } from 'axios';
import Context from '../../context';
import { Object_ } from '../../../Services/Objects';

class Menu {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Informa por meio de um JSON um resumo de algumas das ativdades exercidas pelo usuário
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o grupo de empresas (Grupo). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async QuadroResumo(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.QuadroResumo>>> {
        return await Context.get<Array<Object_.QuadroResumo>>(`/Menu/QuadroResumo/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    
    /* Sobre esta função *//**
     * Informa por meio de um JSON um resumo de algumas das ativdades exercidas pelo usuário
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {boolean} MeusModulosDeAcesso Defina se deverá ser exibido todos os módulos ou apenas os módulos ao qual o usuario possui permissão de visualização (pos padrão será exibido apenas os permitidos para o usuário)
     **/
    public async ModuloDeAcesso(Token: string, MeusModulosDeAcesso: boolean): Promise<AxiosResponse<Array<Object_.ModuloDeAcesso>>> {
        return await Context.get<Array<Object>>(`/Menu/ModuloDeAcesso`,
        {   params: { MeusModulosDeAcesso: MeusModulosDeAcesso},
            headers: { "Authorization": `Bearer ${Token}` } 
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    //* #region  POST Controller  */
    //* #endregion */

    //! #region  DELETE Controller  */
    //! #endregion */

    //TODO #region  PUT Controller  */
    //TODO #endregion */
}

export default new Menu();