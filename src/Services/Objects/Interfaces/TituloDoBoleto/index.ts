import CentroDeCusto from "../CentroDeCusto";
import ClassificacaoDoTituloDeBoleto from "../ClassificacaoDoTituloDeBoleto";
import Empresa from "../Empresa";
import IdentificadorVinculado from "../IdentificadorVinculado";
import Local from "../Local";
import SubLocal from "../SubLocal";
import SubLocal02 from "../SubLocal02";
import SubLocal03 from "../SubLocal03";
import VendaVinculada from "../VendaVinculada";

export default interface TituloDoBoleto {
    empresa: Empresa;
    centroDeCusto: CentroDeCusto;
    local: Local;
    subLocal: SubLocal;
    subLocal02: SubLocal02;
    subLocal03: SubLocal03;
    identificadorVinculado: IdentificadorVinculado;
    venda: number | undefined;
    vendaVinculada: VendaVinculada;
    classificacao: ClassificacaoDoTituloDeBoleto;
    numero: number;
    numeroDeGeracao: number;
    dataDeVencimento: Date;
    dataDeProrrogacao: Date;
    principal: number;
    juros: number;
    correcao: number;
    multa: number;
    jurosPorAtraso: number;
    correcaoPorAtraso: number;
    acrescimoAvulso: number;
    descontoAvulso: number;
    descontoDeAntecipacao: number;
    descontoDePontualidade: number;
}