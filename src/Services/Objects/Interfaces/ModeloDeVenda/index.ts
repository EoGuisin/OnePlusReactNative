import CentroDeCusto from "../CentroDeCusto";
import Empresa from "../Empresa";
import GrupoDeJurosContratuaisDaVenda from "../GrupoDeJurosContratuaisDaVenda";
import GrupoIndexadorDaVenda from "../GrupoIndexadorDaVenda";
import SoftwareExterno from "../SoftwareExterno";

export default interface ModeloDeVenda {
    empresa: Empresa;
    centroDeCusto: CentroDeCusto;
    tabelaDeVenda: number;
    descricao: string;
    jurosDeTabela: number;
    amortizacaoDosJurosDeTabela: number;
    retroacao: number;
    frequenciaDeCorrecao: number;
    correcaoProRata: boolean;
    considerarCorrecaoNegativa: boolean;
    considerarCorrecaoCrescente: string;
    frequenciaDeJuros: number;
    jurosProRata: boolean;
    multa: number;
    jurosPorAtraso: number;
    carenciaJurosPorAtraso: number;
    jurosPorAtrasoProRata: boolean;
    carenciaCorrecaoPorAtraso: number;
    correcaoPorAtrasoProRata: boolean;
    cobrarTaxaDeBoleto: string;
    taxaDeBoleto: number;
    antecipacaoCorrigida: boolean;
    gruposIndexadores: Array<GrupoIndexadorDaVenda>;
    gruposDeJurosContratuais: Array<GrupoDeJurosContratuaisDaVenda>;
    softwareExterno: SoftwareExterno;
    modeloDeVendaExterno: string | undefined;
}