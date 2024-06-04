import Area from "../Area";
import Brinde from "../Brinde";
import Fornecedor from "../Fornecedor";
import SalaDeVenda from "../SalaDeVenda";
import Status from "../Status";
import TipoDeBrinde from "../TipoDeBrinde";

export default interface ItemDoAlmoxarifadoDeBrinde {
    brinde: Brinde;
    tipo: TipoDeBrinde;
    fornecedor: Fornecedor;
    validadeInicial: Date;
    validadeFinal: Date;
    dataCadastro: string;
    dataEmissao: Date | undefined;
    dataCancelamento: Date | undefined;
    dataConfirmacao: Date | undefined;
    dataFaturamento: Date | undefined;
    tempoParaExpiracao?: number | undefined;
    quantidade: number;
    valorUnitario: number;
    ativo: boolean;
    status: Status | undefined;
    dataAlteracao?: Date | undefined,
    motivoDeCancelamentoDoBrinde?: {
        id: number | undefined,
        descricao: string | undefined,
    },
    salaDeVenda?: SalaDeVenda | undefined;
    area?: Area | undefined;
    logs?: string | undefined;
}