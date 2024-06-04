export default interface TituloDeParcela {
    id: number;
    vencimento: Date;
    valor: number;
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