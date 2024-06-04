import CNAE from "../CNAE";
import MeioDePagamento from "../MeioDePagamento";
import RetencoesFederais from "../RetencoesFederais";
import NFSeVinculada from "../NFSeVinculada";
import CAE from "../CAE";
import Tomador from "../Tomador";

export default interface NFSe {
    id: string;
    idVinculado: string;
    nfSeVinculada: NFSeVinculada | undefined;
    prestador: CAE;
    tomador: Tomador;
    descricao: string;
    observacao: string;
    cnaEs: Array<CNAE>;
    retencoesFederais: RetencoesFederais;
    valorDoServico: number;
    meioDePagamento: MeioDePagamento | undefined;
    dataDeEmissao: Date;
    dataDeCancelamento: Date | undefined;
    servicoInternacional: boolean;
    cidadeDoServico: string;
    ufServico: string;
    competencia: Date;
    vencimento: Date;
}