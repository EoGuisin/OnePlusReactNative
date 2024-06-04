import Empresa from "../Empresa";

export default interface CentroDeCusto {
    empresa: Empresa;
    sigla: string;
    descricao: string;
}