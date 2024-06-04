import SoftwareExterno from "../SoftwareExterno";

export default interface VendaVinculada {
    softwareExterno: SoftwareExterno;
    empresaVinculada: string;
    centroDeCustoVinculado: string;
    numeroVinculada: string;
}