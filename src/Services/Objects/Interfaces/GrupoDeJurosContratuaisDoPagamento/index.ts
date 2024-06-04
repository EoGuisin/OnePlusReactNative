import JuroContratual from "../JuroContratual";

export default interface GrupoDeJurosContratuaisDoPagamento {
    grupo: number;
    descricao: string;
    jurosContratuais: Array<JuroContratual>;
}