import CentroDeCusto from "../CentroDeCusto";
import ClassificacaoDoTituloDeVenda from "../ClassificacaoDoTituloDeVenda";
import Empresa from "../Empresa";

export default interface CondicaoDaTabelaDeVenda {
    empresa: Empresa;
    centroDeCusto: CentroDeCusto;
    tabelaDeVenda: number;
    classificacao: ClassificacaoDoTituloDeVenda;
    descricao: string;
    status: boolean;
    sistemaDeAmortizacao: number | undefined;
    sistemaDeAmortizacaoDescricao: string | undefined;
    qtdeDeTitulos: number;
    primeiroVencimento: Date | undefined;
    principal: number;
    jurosDeTabela: number;
    valorTotal: number;
}