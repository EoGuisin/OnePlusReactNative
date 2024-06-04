import Brinde from "../Brinde";
import Fornecedor from "../Fornecedor";
import TipoDeBrinde from "../TipoDeBrinde";

export default interface AlmoxarifadoDeBrinde {
    brinde: Brinde;
    tipo: TipoDeBrinde;
    fornecedor: Fornecedor;
    validadeInicial: Date;
    validadeFinal: Date;
    dataCadastro: Date;
    tempoParaExpiracao: number;
    quantidade: number;
    valor: number;
}