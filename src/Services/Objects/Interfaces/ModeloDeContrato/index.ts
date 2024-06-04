import CentroDeCusto from "../CentroDeCusto";
import Empresa from "../Empresa";

export default interface ModeloDeContrato {
    respCadastro: number;
    dataCadastro: Date;
    respAlteracao: number;
    dataAlteracao: Date;
    empresa: Empresa;
    centroDeCusto: CentroDeCusto;
    numeroDoDocumento: string;
    arquivo: string;
    descricao: string;
    extensao: string;
}