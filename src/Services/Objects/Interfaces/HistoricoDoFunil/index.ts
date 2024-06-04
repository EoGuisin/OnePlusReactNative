import AreaNoHistoricoDoFunil from "../AreaNoHistoricoDoFunil";
import FunilNoHistoricoDoFunil from "../FunilNoHistoricoDoFunil";
import PosicaoDoFunilNoHistoricoDoFunil from "../PosicaoDoFunilNoHistoricoDoFunil";
import SalaDeVendaNoHistoricoDoFunil from "../SalaDeVendaNoHistoricoDoFunil";

export default interface HistoricoDoFunil {
    salaDeVenda: SalaDeVendaNoHistoricoDoFunil;
    area: AreaNoHistoricoDoFunil;
    funil: FunilNoHistoricoDoFunil;
    posicaoDoFunil: PosicaoDoFunilNoHistoricoDoFunil;
    datasDeAlteracoes: Array<string>;
    historicoDeResponsaveis: Array<string | undefined>;
}