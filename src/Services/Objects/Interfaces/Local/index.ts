import CentroDeCusto from "../CentroDeCusto";
import Empresa from "../Empresa";

export default interface Local {
    empresa: Empresa;
    centroDeCusto: CentroDeCusto;
    id: number;
    descricao: string;
}