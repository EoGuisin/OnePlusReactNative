import axios, { AxiosResponse } from 'axios';
import moment from 'moment';
import Context from '../../context';
import { Object_ } from '../../Objects';

class Lead {
    static = {
        source: axios.CancelToken.source()
    }

    //? #region  GET Controller  */
    /* Sobre esta função *//**
     * Lista todos os tipos de dependentes
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    **/
    public async AgendamentosDeVisitas(Token: string, GrupoDeEmpresas: number, PeriodoInicial: Date, PeriodoFinal: Date): Promise<AxiosResponse<Array<Object_.Lead>>> {
        return await Context.get(`/Lead/AgendamentosDeVisitas/${GrupoDeEmpresas}/${moment(PeriodoInicial, true).format("YYYY-MM-DD")}/${moment(PeriodoFinal, true).format("YYYY-MM-DD")}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista todos os brindes cadastrados
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param { Date | undefined} PeriodoInicial Informe o período inicial de cadastro no formato: AAAA-MM-DD
    @param { Date | undefined} PeriodoFinal Informe o período final de cadastro no formato: AAAA-MM-DD
    @param {Array<Object_.Status> | undefined} Status Informe o(s) statu(s) do(s) brinde(s) a serem exibido(s)
    @param { number | undefined} Fornecedor Informe o código do fornecedor (id). A lista de fornecedores cadastrados poderá ser obtida ao executar a requisição "/Fornecedor/{Token}/{GrupoDeEmpresa}"
    @param { number | undefined} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/{Token}/{GrupoDeEmpresa}"
    **/
    public async BrindesGerados(Token: string, GrupoDeEmpresas: number | undefined, PeriodoInicial: Date | undefined, PeriodoFinal: Date | undefined, Status: Array<Object_.Status> | undefined, Fornecedor: number | undefined, SalaDeVenda: number | undefined): Promise<AxiosResponse<Array<{
        leadId: number,
        leadNome: string,
        codigoDeValidacao: string,
        itemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde,
        numeroDaNF: number,
        nf: Object_.Anexo
    }>>> {
        return await Context.get(`/Lead/BrindesGerados/${GrupoDeEmpresas}`, {
            params: {
                PeriodoInicial: PeriodoInicial,
                PeriodoFinal: PeriodoFinal,
                Status: Status ? Status.join(",") : undefined,
                Fornecedor: Fornecedor,
                SalaDeVenda: SalaDeVenda
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista todos os tipos de dependentes
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    **/
    public async ClassificacaoDoDependente(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.Lead>>> {
        return await Context.get(`/Lead/ClassificacaoDoDependente/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    public async Cancel() {
        this.static.source.cancel();
        this.static.source = axios.CancelToken.source();
    }
    /* Sobre esta função *//**
     * Lista os estados civis existentes
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async EstadoCivil(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.EstadoCivil>>> {
        return await Context.get(`/Lead/EstadoCivil/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista todos os leads cadastrados no formato Kanban
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {boolean} VisaoKanban Informe se o Object_ de retorno deverá estar na estrutura de dados do Kanban ou na estrutura de dados convencional
    @param {number|undefined} Id Informe o Id do lead
    @param {string|undefined} Nome Informe o nome do lead
    @param {string|undefined} Telefone Informe o telefone do lead
    @param {string|undefined} Email Informe o email do lead
    @param {number|undefined} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/{Token}/{GrupoDeEmpresa}"
    @param {number|undefined} Area Informe a área (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/Area/{Token}/{GrupoDeEmpresa}"
    @param {number|undefined} FunilDeVenda Informe o código do funil de vendas (id). A lista de funis cadastrads poderá ser obtida ao executar a requisição "/FunilDeVenda/GruposDeEmpresas/{Token}"
    @param {boolean|undefined} Prospectado Informe o código do funil de vendas (id). A lista de funis cadastrads poderá ser obtida ao executar a requisição "/FunilDeVenda/GruposDeEmpresas/{Token}"
    @param {boolean} MeusLeads informe se o trará apenas o seus Leads"
     **/
    public async Get(Token: string, GrupoDeEmpresas: number, VisaoKanban: boolean, EmSala: boolean | undefined, Id: number | string | undefined, Nome: string | undefined, Telefone: string | undefined, Email: string | undefined, SalaDeVenda: number | string | undefined, Area: number | string | undefined, Prospectado: boolean | undefined, FunilDeVenda?: number | undefined, PeriodoInicial?: Date | undefined, PeriodoFinal?: Date | undefined, MeusLeads?: boolean): Promise<AxiosResponse<Array<Object_.Lead | any>>> {
        return await Context.get(`/Lead/${GrupoDeEmpresas}`, {
            params: {
                VisaoKanban: VisaoKanban,
                EmSala: EmSala,
                Id: Id,
                Nome: Nome,
                Telefone: Telefone,
                Email: Email,
                SalaDeVenda: SalaDeVenda,
                Area: Area,
                FunilDeVenda: FunilDeVenda,
                PeriodoInicial: PeriodoInicial,
                PeriodoFinal: PeriodoFinal,
                Prospectado: Prospectado,
                MeusLeads: MeusLeads
            },
            headers: { "Authorization": `Bearer ${Token}` },
            cancelToken: this.static.source.token
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista todos os tipos de locais de captação
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
     **/
    public async LocaisDeCaptacao(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<{ empresa: Object_.Empresa, locaisDeCaptacao: Array<Object> }>>> {
        return await Context.get(`/Lead/LocaisDeCaptacao/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Lista os regimes de bens
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    **/
    public async RegimeDeBens(Token: string, GrupoDeEmpresas: number): Promise<AxiosResponse<Array<Object_.RegimeDeBens>>> {
        return await Context.get(`/Lead/RegimeDeBens/${GrupoDeEmpresas}`, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //? #endregion */

    /* Sobre esta função *//**
     * Socket destinado a transmissão de informações entre os dispositivos a respeito da alteração do status de uma determinada unidade, notificando-os a respeito de reservas realizadas, unidades disponibilizadas, etc.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
     **/
    public Socket(Token: string): WebSocket {
        return new WebSocket(`ws://local.service.oneplus.dev.br/Lead/Socket?access_token=${Token}`);
    }
    //? #endregion */

    //* #region  POST Controller  */
    /* Sobre esta função *//**
     * Cancela o brinde
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código do lead (id)
    @param {boolean} EfetuarDownload Informe se deseja receber os resultados como resposta da requisição ou prefere fazer o download da resposta (por padrão o resultado será enviado como resposta da requisição)
    @param {Object_.ItemDoAlmoxarifadoDeBrinde} ItemDoAlmoxarifado Insira um Object_ com todos os dados do item do almoxarifado
     **/
    public async CancelarBrinde(Token: string, GrupoDeEmpresas: number, Id: number, ItemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde, EfetuarDownload: boolean): Promise<AxiosResponse<Object_.Status>> {
        return await Context.post(`/Lead/CancelarBrinde/${GrupoDeEmpresas}/${Id}`, ItemDoAlmoxarifado, {
            params: {
                EfetuarDownload: EfetuarDownload
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Confirmar o brinde
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código do lead (id)
    @param {boolean} EfetuarDownload Informe se deseja receber os resultados como resposta da requisição ou prefere fazer o download da resposta (por padrão o resultado será enviado como resposta da requisição)
    @param {Object_.ItemDoAlmoxarifadoDeBrinde} ItemDoAlmoxarifado Insira um Object_ com todos os dados do item do almoxarifado
     **/
    public async ConfirmarBrinde(Token: string, GrupoDeEmpresas: number, Id: number, ItemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde, EfetuarDownload: boolean): Promise<AxiosResponse<Object_.Status>> {
        return await Context.post(`/Lead/ConfirmarBrinde/${GrupoDeEmpresas}/${Id}`, ItemDoAlmoxarifado, {
            params: {
                EfetuarDownload: EfetuarDownload
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
     /* Sobre esta função *//**
     * Fatura uma lista de brindes
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código do lead (id)
    @param {boolean} EfetuarDownload Informe se deseja receber os resultados como resposta da requisição ou prefere fazer o download da resposta (por padrão o resultado será enviado como resposta da requisição)
    @param {Array<{
        leadId: number,
        leadNome: string,
        codigoDeValidacao: string,
        itemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde
    }>} BrindesGerado Insira um Object_ com todos os dados dos brindes gerados
     **/
    public async FaturarBrindes(Token: string, GrupoDeEmpresas: number, BrindesGerado: Array<{
        leadId: number,
        leadNome: string,
        codigoDeValidacao: string,
        itemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde
    }>): Promise<AxiosResponse<Array<{
        leadId: number,
        leadNome: string,
        codigoDeValidacao: string,
        itemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde
    }>>> {
        return await Context.post(`/Lead/FaturarBrindes/${GrupoDeEmpresas}`, BrindesGerado, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Retorno um comprovante em PDF do brinde
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código do lead (id)
    @param {boolean} EfetuarDownload Informe se deseja receber os resultados como resposta da requisição ou prefere fazer o download da resposta (por padrão o resultado será enviado como resposta da requisição)
    @param {Object_.ItemDoAlmoxarifadoDeBrinde} ItemDoAlmoxarifado Insira um Object_ com todos os dados do item do almoxarifado
     **/
    public async EmitirBrinde(Token: string, GrupoDeEmpresas: number, Id: number, ItemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde, EfetuarDownload: boolean): Promise<AxiosResponse<Object_.Anexo>> {
        return await Context.post(`/Lead/EmitirBrinde/${GrupoDeEmpresas}/${Id}`, ItemDoAlmoxarifado, {
            params: {
                EfetuarDownload: EfetuarDownload
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Retorno a ficha de atendimento do lead (arquivo)
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código do lead (id)
    @param {number} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/{Token}/{GrupoDeEmpresa}"
    @param {string | undefined} Formulario Caso deseje um formulário em específico, digite o seu nome
    @param {boolean} EfetuarDownload Informe se deseja receber os resultados como resposta da requisição ou prefere fazer o download da resposta (por padrão o resultado será enviado como resposta da requisição)
     **/
    public async EmitirFichaDeAtendimento(Token: string, GrupoDeEmpresas: number, Id: number, SalaDeVenda: number, Formulario: string | undefined, EfetuarDownload: boolean): Promise<AxiosResponse<Object_.Anexo>> {
        return await Context.post(`/Lead/EmitirFichaDeAtendimento/${GrupoDeEmpresas}/${Id}`, undefined, {
            params: {
                SalaDeVenda: SalaDeVenda,
                Formulario: Formulario,
                EfetuarDownload: EfetuarDownload
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastra varios leads ao mesmo tempo e os vinculam a uma sala e área
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Array<Object_.Lead>} Leads Informe uma lista com os dados dos leads
    @param {number|undefined} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/{Token}/{GrupoDeEmpresa}"
    @param {number|undefined} Area Informe a área (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/Area/{Token}/{GrupoDeEmpresa}"
    @param {number|undefined} FunilDeVenda Informe o código do funil de vendas (id). A lista de funis cadastrads poderá ser obtida ao executar a requisição "/FunilDeVenda/GruposDeEmpresas/{Token}"
    @param {number|undefined} PosicaoDoFunil Informe a posição do funil de vendas (id). A lista de posições cadastrads poderá ser obtida ao executar a requisição "/FunilDeVenda/GruposDeEmpresas/{Token}"
     **/
    public async ImportacaoEmMassa(Token: string, GrupoDeEmpresas: number, SalaDeVenda: number | string | undefined, Area: number | string | undefined, Leads: Array<Object_.Lead>, FunilDeVenda?: number|undefined, PosicaoDoFunil?: number|undefined): Promise<AxiosResponse<Array<Object_.Lead>>> {
        return await axios({
            method: 'POST',
            baseURL: `${Context.defaults.baseURL}/Lead/ImportacaoEmMassa/${GrupoDeEmpresas}`,
            data: Leads,
            params: {
                SalaDeVenda: SalaDeVenda,
                Area: Area,
                FunilDeVenda: FunilDeVenda,
                PosicaoDoFunil: PosicaoDoFunil
            },
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastra o agendamento de visita vinculado ao lead
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código do lead (id)
    @param {Object_.AgendamentoDeVisita} AgendamentoDeVisita Informe um Object_ com os dados do agendamento da visita a serem cadastrados
     **/
    public async NovoAgendamentoDeVisita(Token: string, GrupoDeEmpresas: number, Id: number, AgendamentoDeVisita: Object_.AgendamentoDeVisita): Promise<AxiosResponse<Object_.AgendamentoDeVisita>> {
        return await Context.post(`/Lead/NovoAgendamentoDeVisita/${GrupoDeEmpresas}/${Id}`, AgendamentoDeVisita, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastra um novo brinde para o lead
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o Id do lead
    @param {object} Brinde Informe os dados do brinde
     **/
    public async NovoBrinde(Token: string, GrupoDeEmpresas: number, Id: number, Brinde: any): Promise<AxiosResponse<Object_.ItemDoAlmoxarifadoDeBrinde>> {
        return await Context.post(`/Lead/NovoBrinde/${GrupoDeEmpresas}/${Id}`, Brinde, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastra uma nova anotação
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.NovasAnotacoes} Anotacoes Informe uma lista com os dados das anotações a serem cadastradas
    @param {number} Id Informe o código do lead (id)
    @param {number} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/{Token}/{GrupoDeEmpresa}"
    @param {number} Area Informe a área (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/Area/{Token}/{GrupoDeEmpresa}"
     **/
    public async NovasAnotacoes(Token: string, GrupoDeEmpresas: number, SalaDeVenda: number, Area: number, Id: number, Anotacoes: Array<Object_.Anotacao>): Promise<AxiosResponse<Array<Object_.Anotacao>>> {
        return await Context.post(`/Lead/NovasAnotacoes/${GrupoDeEmpresas}/${SalaDeVenda}/${Area}/${Id}`, Anotacoes, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastra um novo email.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}".
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.EmailEnviado} EmailsEnviados Informe os dados dos emails enviados.
    @param {number} Id Informe o id do lead.
    @param {number} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/{Token}/{GrupoDeEmpresa}"
    @param {number} Area Informe a área (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/Area/{Token}/{GrupoDeEmpresa}"
     **/
    public async NovosEmailsEnviados(Token: string, GrupoDeEmpresas: number, SalaDeVenda: number, Area: number, Id: number, EmailsEnviados: Array<Object_.EmailEnviado>): Promise<AxiosResponse<Array<Object_.EmailEnviado>>> {
        return await Context.post(`/Lead/NovosEmailsEnviados/${GrupoDeEmpresas}/${SalaDeVenda}/${Area}/${Id}`, EmailsEnviados, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastra um novo integrante no controle de sala
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o Id do lead
    @param {object} ControleDeSala Insira um Object_ com todos os dados do integrante do controle de sala
    **/
    public async NovoIntegranteDoControleDeSala(Token: string, GrupoDeEmpresas: number, Id: number, ControleDeSala: Object_.ControleDeSala): Promise<AxiosResponse<Object_.ControleDeSala>> {
        return await Context.post(`/Lead/NovoIntegranteDoControleDeSala/${GrupoDeEmpresas}/${Id}`, ControleDeSala, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastrar uma nova movimentação do lead no funil de vendas.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}".
    @param {number} GrupoDeEmpresa Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.HistoricoDoFunil} HistoricoDoFunil Insira um objeto com todos os dados da nova posição do funil a ser assumida
    @param {number} Id Informe o código do lead (id)
    @param {number} Responsavel Informe o código da pessoa (Id). Esta pessoa deverá estar cadastrada como um usuário do sistema!
     **/
    public async NovaMovimentacaoNoFunil(Token: string, GrupoDeEmpresas: number, Id: number, HistoricoDoFunil: Object_.HistoricoDoFunil, Responsavel?: number | undefined): Promise<AxiosResponse<Object_.HistoricoDoFunil>> {
        return await Context.post(`/Lead/NovaMovimentacaoNoFunil/${GrupoDeEmpresas}/${Id}`, HistoricoDoFunil, {
            params: {
                Responsavel: Responsavel
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastrar uma nova movimentação do lead no funil de vendas.
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}".
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Array<{ leadId: number, historicoDoFunil: Object_.HistoricoDoFunil }>} MovimentacoesDoFunil Insira um Object_ com todos os dados das movimentacoes do funil
     **/
    public async NovasMovimentacoesEmMassaNoFunil(Token: string, GrupoDeEmpresas: number, MovimentacoesDoFunil: Array<{ leadId: number, historicoDoFunil: Object_.HistoricoDoFunil }>): Promise<AxiosResponse<Array<{ leadId: number, historicoDoFunil: Object_.HistoricoDoFunil }>>> {
        return await Context.post(`/Lead/NovasMovimentacoesEmMassaNoFunil/${GrupoDeEmpresas}`, MovimentacoesDoFunil, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastra uma nova tarefa
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/{Token}/{GrupoDeEmpresa}"
    @param {number} Area Informe a área (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/Area/{Token}/{GrupoDeEmpresa}"
    @param {Object_.NovasTarefas} Tarefas Informe os dados das tarefas
     **/
    public async NovasTarefas(Token: string, GrupoDeEmpresas: number, SalaDeVenda: number, Area: number, Id: number, Tarefas: Array<Object_.Tarefa>): Promise<AxiosResponse<Array<Object_.Tarefa>>> {
        return await Context.post(`/Lead/NovasTarefas/${GrupoDeEmpresas}/${SalaDeVenda}/${Area}/${Id}`, Tarefas, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Cadastra um novo lead
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Lead} Lead Informe os dados do lead
    @param {number|undefined} SalaDeVenda Informe o código da sala de vendas (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/SalaDeVenda/{Token}/{GrupoDeEmpresa}"
    @param {number|undefined} Area Informe a área (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/Area/{Token}/{GrupoDeEmpresa}"
    @param {number|undefined} FunilDeVenda Informe o código do funil de vendas (id). A lista de funis cadastrads poderá ser obtida ao executar a requisição "/FunilDeVenda/GruposDeEmpresas/{Token}"
    @param {number|undefined} PosicaoDoFunil Informe a posição do funil de vendas (id). A lista de posições cadastrads poderá ser obtida ao executar a requisição "/FunilDeVenda/GruposDeEmpresas/{Token}"
     **/
    public async Post(Token: string, GrupoDeEmpresas: number, SalaDeVenda: number | string | undefined, Area: number | string | undefined, Lead: Object_.Lead, FunilDeVenda?: number | undefined, PosicaoDoFunil?: number | undefined): Promise<AxiosResponse<Object_.Lead>> {
        return await Context.post(`/Lead/${GrupoDeEmpresas}`, Lead, {
            params: {
                SalaDeVenda: SalaDeVenda,
                Area: Area,
                FunilDeVenda: FunilDeVenda,
                PosicaoDoFunil: PosicaoDoFunil
            },
            headers: { "Authorization": `Bearer ${Token}` }
        })
        .then((Response) => { return Response; })
        .catch((Exception) => { return Exception; });
    }
    //* #endregion */  

    //! #region  DELETE Controller  */
    /* Sobre esta função *//**
     * Deleta o agendamento de visita atrelado ao lead
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código do lead (id)
    @param {Object_.AgendamentoDeVisita} AgendamentoDeVisita Informe um Object_ com os dados do agendamento da visita a serem cadastrados
     **/
    public async DeletarAnotacoes(Token: string, GrupoDeEmpresas: number, Id: number, Anotacoes: Array<Object_.Anotacao>): Promise<AxiosResponse<Object_.Anotacao>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Lead/DeletarAnotacoes/${GrupoDeEmpresas}/${Id}`,
            data: Anotacoes,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Deletar as anotações atreladas ao lead
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Anotacao} Anotacoes Informe uma lista com os dados das anotações a serem deletadas
    @param {number} Id Informe o id do lead
     **/
    public async DeletarAgendamentoDeVisita(Token: string, GrupoDeEmpresas: number, Id: number, AgendamentoDeVisita: Object_.AgendamentoDeVisita): Promise<AxiosResponse<Object_.AgendamentoDeVisita>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Lead/DeletarAgendamentoDeVisita/${GrupoDeEmpresas}/${Id}`,
            data: AgendamentoDeVisita,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Deletar o brinde atrelado ao lead
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Brinde} Brinde Insira um Object_ com todos os dados do item do almoxarifado
    @param {number} Id Informe o id do lead
     **/
    public async DeletarBrinde(Token: string, GrupoDeEmpresas: number, Id: number, ItemDoAlmoxarifado: Object_.ItemDoAlmoxarifadoDeBrinde): Promise<AxiosResponse<Object_.ItemDoAlmoxarifadoDeBrinde>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Lead/DeletarBrinde/${GrupoDeEmpresas}/${Id}`,
            data: ItemDoAlmoxarifado,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Deletar os emails atrelados ao lead
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.EmailEnviado} EmailsEnviados Informe uma lista com os dados das tarefas a serem deletadas
    @param {number} Id Informe o id do lead
     **/
    public async DeletarEmailsEnviados(Token: string, GrupoDeEmpresas: number, Id: number, EmailsEnviados: Array<Object_.EmailEnviado>): Promise<AxiosResponse<Array<Object_.EmailEnviado>>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Lead/DeletarEmailsEnviados/${GrupoDeEmpresas}/${Id}`,
            data: EmailsEnviados,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Deletar o integrante do controle de sala
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Infome o id do lead
    @param {Object_.NovasAnotacoes} IntegrateControleDeSala Insira um Object_ com todos os dados do integrante do controle de sala
     **/
    public async DeletarIntegranteDoControleDeSala(Token: string, GrupoDeEmpresas: number, Id: number, IntegrateControleDeSala: Object_.HistoricoDoControleDeSala): Promise<AxiosResponse<Object_.HistoricoDoControleDeSala>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Lead/DeletarIntegranteDoControleDeSala/${GrupoDeEmpresas}/${Id}`,
            data: IntegrateControleDeSala,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Deletar as tarefas atreladas ao lead
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Tarefa} Tarefas Informe uma lista com os dados das tarefas a serem deletadas
    @param {number} Id Informe o id lead
     **/
    public async DeletarTarefas(Token: string, GrupoDeEmpresas: number, Id: number, Tarefas: Array<Object_.Tarefa>): Promise<AxiosResponse<Object_.Tarefa>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Lead/DeletarTarefas/${GrupoDeEmpresas}/${Id}`,
            data: Tarefas,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Deletar o lead
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Leads Informe uma lista com os dados dos leads
     **/
    public async DeletarEmMassa(Token: string, GrupoDeEmpresas: number, Leads: Array<Object_.Lead> | undefined): Promise<AxiosResponse<Array<Object_.Lead>>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Lead/DeletarEmMassa/${GrupoDeEmpresas}`,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
            data: Leads
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Deletar o lead
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código do lead (id)
     **/
    public async Delete(Token: string, GrupoDeEmpresas: number, Id: number): Promise<AxiosResponse<Array<Object_.Lead>>> {
        return axios({
            method: 'DELETE',
            baseURL: `${Context.defaults.baseURL}/Lead/${GrupoDeEmpresas}/${Id}`,
            headers: { 'Content-Type': 'application/json; charset=utf-8', "Authorization": `Bearer ${Token}` },
        })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //! #endregion */

    //TODO #region PUT Controller  */
    /* Sobre esta função *//**
     * Altera as anotações atreladas ao lead
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código do lead (id)
    @param {Object_.NovasAnotacoes} Anotacoes Informe uma lista com os dados das anotações a serem cadastradas
     **/
    public async AlterarAnotacoes(Token: string, GrupoDeEmpresas: number, Id: number, Anotacoes: Array<Object_.Anotacao>): Promise<AxiosResponse<Array<Object_.Anotacao>>> {
        return await Context.put(`/Lead/AlterarAnotacoes/${GrupoDeEmpresas}/${Id}`, Anotacoes, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Altera aos emails enviados atrelados ao lead
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código do lead (id)
    @param {Object_.EmailEnviado} EmailsEnviados Informe uma lista com os dados dos emails enviados a serem alterados
     **/
    public async AlterarEmailsEnviados(Token: string, GrupoDeEmpresas: number, Id: number, EmailsEnviados: Array<Object_.EmailEnviado>): Promise<AxiosResponse<Array<Object_.EmailEnviado>>> {
        return await Context.put(`/Lead/AlterarEmailsEnviados/${GrupoDeEmpresas}/${Id}`, EmailsEnviados, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Altera o integrante do controle de sala
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código do lead (id)
    @param {object} ControleDeSala Insira um Object_ com todos os dados do integrante do controle de sala
     **/
    public async AlterarIntegranteDoControleDeSala(Token: string, GrupoDeEmpresas: number, Id: number, ControleDeSala: Object_.HistoricoDoControleDeSala): Promise<AxiosResponse<Object_.HistoricoDoControleDeSala>> {
        return await Context.put(`/Lead/AlterarIntegranteDoControleDeSala/${GrupoDeEmpresas}/${Id}`, ControleDeSala, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Altera status do lead (ativo ou inativo)
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código do lead (id)
    @param {boolean} Ativo Informe se o status será ativo ou inativo
     **/
    public async AlterarStatus(Token: string, GrupoDeEmpresas: number, Id: number, Ativo: boolean): Promise<AxiosResponse<Object_.Lead>> {
        return await Context.put(`/Lead/AlterarStatus/${GrupoDeEmpresas}/${Id}/${Ativo}`, undefined, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Altera as tarefas atreladas ao lead
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {number} Id Informe o código do lead (id)
    @param {Object_.Tarefa} Tarefas Informe uma lista com os dados das tarefas a serem cadastradas
     **/
    public async AlterarTarefas(Token: string, GrupoDeEmpresas: number, Id: number, Tarefas: Array<Object_.Tarefa>): Promise<AxiosResponse<Array<Object_.Tarefa>>> {
        return await Context.put(`/Lead/AlterarTarefas/${GrupoDeEmpresas}/${Id}`, Tarefas, { headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    /* Sobre esta função *//**
     * Altera os dados do lead
    @param {string} Token Informe o token de acesso do usuário obtido ao executar a requisição "/Logon/{CPF}/{Senha}"
    @param {number} GrupoDeEmpresas Informe o código do grupo de empresas (id). A lista de grupos cadastrados poderá ser obtida ao executar a requisição "/Empresa/GruposDeEmpresas/{Token}"
    @param {Object_.Lead} Lead Informe os dados do lead
    @param {number|undefined} Area Informe a área (id). A lista de salas cadastradas poderá ser obtida ao executar a requisição "/Area/{Token}/{GrupoDeEmpresa}"
     **/
    public async Put(Token: string, GrupoDeEmpresas: number, Lead: Object_.Lead): Promise<AxiosResponse<Object_.Lead>> {
        return await Context.put(`/Lead/${GrupoDeEmpresas}`, Lead, {
            headers: { "Authorization": `Bearer ${Token}` } })
            .then((Response) => { return Response; })
            .catch((Exception) => { return Exception; });
    }
    //TODO #endregion */
}

export default new Lead();