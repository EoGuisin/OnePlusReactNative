export interface Kanban {
    dataDeCadastro: string,
    dataDaVisita: string,
    dataAlteracao: string,
    id: number,
    nome: string,
    salaDeVenda: number,
    salaDeVendaDescricao: string,
    area: number,
    areaDescricao: string,
    funil: number,
    funilDescricao: string,
    posicaoDoFunil: number,
    posicaoDoFunilDescricao: string,
    localDeCaptacaoCadastrado: string,
    localDeCaptacao: string,
    qualificado: boolean,
    statusDaTarefa: string,
    motivoDeDesqualificacao: any,
    email: [
        {
            classificacao: number,
            descricao: string,
            host: any,
            porta: any,
            usuario: any,
            senha: any,
            habilitarSSL: any
        }
    ],
    telefone: [
        {
            classificacao: number,
            ddi: string,
            ddd: string,
            numero: string,
            observacao: string
        }
    ],
    emSala: boolean,
    corDoCard: string,
    keyField: number,
    responsavel: string,
}