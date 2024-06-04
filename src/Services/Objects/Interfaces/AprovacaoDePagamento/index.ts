import CentroDeCusto from "../CentroDeCusto";
import ClassificacaoDoTituloDoPagamento from "../ClassificacaoDoTituloDoPagamento";
import Empresa from "../Empresa";
import PagamentoVinculado from "../PagamentosVinculados";
import Pessoa from "../Pessoa";
import TipoDeAprovacao from "../TipoDeAprovacao";


export default interface AprovacaoDePagamento {
    empresa: Empresa;
    centroDeCusto: CentroDeCusto;
    pagamento: number;
    pagamentoVinculado: PagamentoVinculado;
    classificao: ClassificacaoDoTituloDoPagamento;
    numero: number;
    numeroDeGeracao: number;
    Responsavel: Pessoa;
    tipoDeAprovacao: TipoDeAprovacao;
    decisao: boolean;
}