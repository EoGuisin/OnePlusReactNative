import JuroContratual from "../JuroContratual";

export default interface GrupoDeJurosContratuaisDaVenda {
    grupo: number;
    descricao: string;
    jurosContratuais: Array<JuroContratual>;
}