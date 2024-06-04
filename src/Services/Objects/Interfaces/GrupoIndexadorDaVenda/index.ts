import Indexador from "../Indexador";

export default interface GrupoIndexadorDaVenda {
    grupo: number;
    descricao: string;
    indexadores: Array<Indexador>;
}