import axios, { AxiosResponse } from 'axios';

import Context from '../../context';
import { Object_ } from '../../Objects';
class Identificador {
    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Lista as unidades
     * @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     * @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     * @param {string | undefined} StatusDasUnidades Informe o(s) statu(s) da unidade a serem exibidos
     * @param {string | undefined} VisaoSintetica Informe se deseja receber o Object_ padrão de identificador ou um Object_ sitético do mesmo
     * @param {number | undefined} Empresa Informe o código da empresa (id). A lista das empresas cadastradas poderá ser obtida ao executar a requisição "/Empresa/{Token}"
     * @param {string | undefined} CentroDeCusto Informe o código do centro de custo (sigla)
     * @param {number | undefined} Local Informe o código do local (id)
     * @param {number | undefined} Sublocal Informe o código do sublocal (id)
     * @param {boolean | undefined} ExibirMapaDoLoteamento Informe se deseja receber os dados do Imagem do loteamento ou apenas a lista de unidades (por padão o mapa não será exibido)
     * @param {boolean | undefined} EfetuarDownload Informe se deseja receber os resultados como resposta da requisição ou prefere fazer o download da resposta (por padrão o resultado será enviado como resposta da requisição)
     * @param {string | undefined} EmpresaVinculada Informe se deseja receber os resultados como resposta da requisição ou prefere fazer o download da resposta (por padrão o resultado será enviado como resposta da requisição)
     * @param {string | undefined} CentroDeCustoVinculado Informe se deseja receber os resultados como resposta da requisição ou prefere fazer o download da resposta (por padrão o resultado será enviado como resposta da requisição)
     * @param {string | undefined} LocalVinculado Informe se deseja receber os resultados como resposta da requisição ou prefere fazer o download da resposta (por padrão o resultado será enviado como resposta da requisição)
     * @param {string | undefined} SublocalVinculado Informe se deseja receber os resultados como resposta da requisição ou prefere fazer o download da resposta (por padrão o resultado será enviado como resposta da requisição)
     **/
    public async Get(Token: string, GrupoDeEmpresas: number, StatusDasUnidades: string | undefined, VisaoSintetica: boolean | undefined, Empresa: number | undefined, CentroDeCusto: string | undefined, Local: number | undefined, Sublocal: number | undefined, ExibirMapaDoLoteamento: boolean | undefined, EfetuarDownload: boolean | undefined, EmpresaVinculada: string | undefined, CentroDeCustoVinculado: string | undefined, LocalVinculado: string | undefined, SublocalVinculado: string | undefined): Promise<AxiosResponse<Array<Object_.Identificador>>> {
        return await Context.get(`/Identificador/${GrupoDeEmpresas}`, {
            params: {
                StatusDasUnidades: StatusDasUnidades,
                VisaoSintetica: VisaoSintetica,
                Empresa: Empresa,
                CentroDeCusto: CentroDeCusto,
                Local: Local,
                Sublocal: Sublocal,
                ExibirMapaDoLoteamento: ExibirMapaDoLoteamento,
                EfetuarDownload: EfetuarDownload,
                EmpresaVinculada: EmpresaVinculada,
                CentroDeCustoVinculado: CentroDeCustoVinculado,
                LocalVinculado: LocalVinculado,
                SublocalVinculado: SublocalVinculado,
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Socket destinado a transmissão de informações entre os dispositivos a respeito da alteração do status de uma determinada unidade, notificando-os a respeito de reservas realizadas, unidades disponibilizadas, etc.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public Socket(Token: string): WebSocket {
        return new WebSocket(`ws://local.service.oneplus.dev.br/Identificador/Socket?access_token=${Token}`);
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Cadastra um novo usuário
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {GrupoDeEmpresas} GrupoDeEmpresas: Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number | undefined} Prospect Informe o código do prospect (id)
    @param {number | undefined} TempoDeReserva Informe o tempo de reserva (em minutos)
    @param {Array<Object_.Identificador>} Identificadores Informe uma lista com os dados do Identificadores
     **/
    public async ReservarUnidades(Token: string, GrupoDeEmpresas: number, Prospect: number | undefined, TempoDeReserva: number | undefined, Identificadores: Array<Object_.Identificador>): Promise<AxiosResponse<Array<Object_.Identificador>>> {
        return await Context.post(`/Identificador/ReservarUnidades/${GrupoDeEmpresas}`, Identificadores, {
            params: {
                GrupoDeEmpresas: GrupoDeEmpresas,
                Prospect: Prospect,
                TempoDeReserva: TempoDeReserva,
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception.response; });
    }
    //* #endregion */

    //! #region  DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta a reserva das unidades informada
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {GrupoDeEmpresas} GrupoDeEmpresas: Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Array<Object_.Identificador>} Identificadores Informe uma lista com os dados do Identificadores
     **/
    public async DeletarReservas(Token: string, GrupoDeEmpresas: number, Identificadores: Array<Object_.Identificador>): Promise<AxiosResponse<Array<Object_.Identificador>>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Identificador/DeletarReservas/${GrupoDeEmpresas}`,
            params: GrupoDeEmpresas,
            data: Identificadores,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch(Exception => { console.log(Exception); return Exception});
    }
    //! #endregion */

    //TODO #region  PUT Controller  */
    //TODO #endregion */
}

export default new Identificador();