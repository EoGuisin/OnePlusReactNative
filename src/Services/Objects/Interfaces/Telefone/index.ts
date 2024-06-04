export default interface Telefone {
    classificacao: number;
    ddi: string;
    ddd: string | undefined;
    numero: string;
    observacao: string;
}