import Perguntas from "../Perguntas"

export default interface Formulario {
    id: number;
    descricao: string;
    perguntas: Array<Perguntas>;
}