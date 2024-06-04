import Indexador from "../Indexador";

export default interface GrupoIndexadorDoPagamento {
    grupo: number;
    descricao: string;
    indexadores: Array<Indexador>;
}