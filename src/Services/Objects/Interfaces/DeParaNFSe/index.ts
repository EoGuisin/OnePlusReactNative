import CentroDeCusto from "../CentroDeCusto";
import CentroDeCustoVinculado from "../CentroDeCustoVinculado";
import Empresa from "../Empresa";

export default interface DeParaNFSe {
    empresa: Empresa;
    centroDeCusto: CentroDeCusto;
    prestadorNumeroDeCadastro: string;
    centroDeCustoVinculado: CentroDeCustoVinculado;
}