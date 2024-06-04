import CentroDeCusto from "../CentroDeCusto";
import Empresa from "../Empresa";
import SoftwareIntegrado from "../SoftwareIntegrado";

export default interface SoftwareExterno {
    empresa: Empresa,
    centroDeCusto: CentroDeCusto
    token: string;
    ip: string;
    usuario: string;
    senha: string;
    bancoDeDados: string;
    softwareIntegrado: SoftwareIntegrado;
    urlAPI: string;
    tokenAPI: string;
}