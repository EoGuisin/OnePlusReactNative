import ClassificacaoDoTituloDeVenda from "../ClassificacaoDoTituloDeVenda";

export default interface Titulo {
    classificacao: ClassificacaoDoTituloDeVenda;
    numero: number;
    numeroDeGeracao: number;
    dataDeVencimento: Date;
    grupo: number | undefined;
    principal: number;
    juros: number;
    correcao: number;
    multa: number;
    jurosPorAtraso: number;
    correcaoPorAtraso: number;
    acrescimoAvulso: number;
    descontoAvulso: number;
    descontoDeAntecipacao: number;
    descontoDePontualidade: number;
    formaDePagamento: string;
    banco: string;
    agencia: string;
    conta: string;
    digitoDaConta: string;
    titular: string;
    numeroCheque: string;
    maquina: string;
    bandeira: string;
    digitoCartao: string;
    operacao: string;
    nsu: string;
    numeroDaOperacao: string;
}