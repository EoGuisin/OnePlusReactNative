import SoftwareExterno from "../SoftwareExterno";

export default interface NFSeVinculada {
  softwareExterno: SoftwareExterno;
  empresaVinculada: string;
  centroDeCustoVinculado: string;
  prestadorVinculado: string;
  tomadorVinculado: string;
  pagamentoVinculado: string;
}