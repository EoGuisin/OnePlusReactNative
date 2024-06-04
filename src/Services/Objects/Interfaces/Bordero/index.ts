import CentroDeCusto from "../CentroDeCusto";
import Empresa from "../Empresa";
import NFSe from "../NFSe";

export default interface Boleto {
    id: string;
    descricao: string;
    nivelDeVisualizacao: string;
    definitivo: boolean | undefined;
    validade: Date | undefined;
    itensDoBordero: Array<NFSe> | undefined;
    colunas: Array<any>;
    registros: Array<any>;
}