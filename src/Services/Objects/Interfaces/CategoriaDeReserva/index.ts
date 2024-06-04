import CentroDeCusto from "../CentroDeCusto";
import Empresa from "../Empresa";

export default interface CategoriaDeReserva {
    empresa: Empresa;
    centroDeCusto: CentroDeCusto;
    sigla: string;
    descricao: string;
    tempo: number;
}