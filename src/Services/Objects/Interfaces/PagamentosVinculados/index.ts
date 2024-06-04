import SoftwareExterno from "../SoftwareExterno";

export default interface PagamentosVinculados {
    softwareExterno: SoftwareExterno;
    empresaVinculada: string;
    centroDeCustoVinculado: string;
    numeroVinculado: string;
}