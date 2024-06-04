import Empresa from "../Empresa";

export default interface PlanejamentoDeVendas {
    empresa: Empresa | undefined;
    empresaVinculada: string;
    centroDeCusto: string;
    centroDeCustoVinculado: string;
    numero: number;
    periodoInicial: Date;
    periodoFinal: Date;
    qtdEsperada: number;
    qtdRelizada: number;
    qtdResultante: number;
    valorEsperado: number;
    valorRealizado: number;
    valorResultante: number;
}