export default interface TituloDeEntrada {
    id: number;
    vencimento: Date;
    valor: number;
    formaDePagamento: string | undefined;
    banco: string | undefined;
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
}