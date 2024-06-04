import {Object_} from '../../../../Services/Objects';
export namespace Type {
  export interface Bank {
    key: string;
    value: string;
  }
  export interface Title {
    quantidade: number;
    valor: number;
    valorJuros: number;
    valorTotal: number;
    valorTotalJuros: number;
    juros: number;
    periodicidadeDosJuros: number;
    sistemaDeAmortizacao: number;
    exibirCalendarioVencimento: boolean;
    vencimento: Date;
    meioDePagamento: string | undefined;
    detalharMeioDePagamento: boolean;
    banco: Bank | undefined;
    agencia: string | undefined;
    conta: string | undefined;
    digitoDaConta: string | undefined;
    titular: string | undefined;
    numeroCheque: string | undefined;
    maquina: string | undefined;
    bandeira: string | undefined;
    digitoCartao: string | undefined;
    operacao: string | undefined;
    nsu: string | undefined;
    numeroDaOperacao: string | undefined;
    indexUnificado?: number | undefined;
    teveAjuste?: boolean | undefined;
    valorUltimaParcela?: number | undefined;
    dataDeAdiçãoALista?: Date | undefined;
  }
  export interface ViewModel {
    ajustarSaldoAoValorAVista: boolean;
    valorAVista: number | undefined;
    percentualDoTotal: number | undefined;
    exibirComponente: boolean;
    totalEsperado: number | undefined;
    totalEsperadoJuros?: number | undefined;
    totalEsperadoBase?: number | undefined;
    totalEsperadoBaseJuros?: number | undefined;
    titulo: string;
    anexo: Object_.Anexo | undefined;
    pv: number | undefined;
    jurosDeTabela: number | undefined;
    menorVencimento: Date;
    maiorVencimento: Date;
    menorQuantidade: number | undefined;
    maiorQuantidade: number | undefined;
    titulos: Array<Title>;
    descontoDoModeloDeVenda?: number;
  }
}
