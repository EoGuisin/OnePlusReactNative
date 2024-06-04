import Informacoes from "../Informacoes"
export default interface IdentificadorSintetico {
    empresaId: number;
    nomeFantasia: string;
    centroDeCustoSigla: string;
    centroDeCustoDescricao: string;
    localId: number;
    localDescricao: string;
    subLocalId: number;
    subLocalDescricao: string;
    area: number;
    valorAVista: number;
    status: number;
    intermediacao: number;
    reservaVinculadaProspectId: number;
    reservaVinculadaProspectNome: string;
    reservaVinculadaProspectVinculado: string;
    reservaVinculadaVendedorId: number;
    reservaVinculadaVendedorNome: string;
    reservaVinculadaVendedorVinculado: string;
    informacoesGerais: Informacoes;
    observacoes: Array<string>;

    _ReservandoUnidade: boolean|undefined;
    _DeletandoReserva: boolean|undefined;
}