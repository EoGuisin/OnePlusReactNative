import ClassificacaoDoTributo from "../ClassificacaoDoTributo";

export default interface Tributo {
    classificacao: ClassificacaoDoTributo;
    numeroDoDocumento: string;
    periodoDeApuracao: Date;
    dataDeColeta: Date;
    vencimento: Date;
    principal: number;
    multa: number;
    juros: number;
    pago: boolean;
    totalPago: number;
}