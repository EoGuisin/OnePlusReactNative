import Empresa from "../Empresa";
import CentroDeCusto from "../CentroDeCusto";
import ClassificacaoDoTituloDeVenda from "../ClassificacaoDoTituloDeVenda";
import CondicaoDaTabelaDeVenda from "../CondicaoDaTabelaDeVenda";

export default interface ClassificacaoDoTituloDaTabelaDeVenda {
    empresa: Empresa;
    centroDeCusto: CentroDeCusto;
    tabelaDeVenda: number;
    jurosDeTabela: number;
    classificacao: ClassificacaoDoTituloDeVenda;
    condicoesDaTabelaDeVenda: Array<CondicaoDaTabelaDeVenda>;
}