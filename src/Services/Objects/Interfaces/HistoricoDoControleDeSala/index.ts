import AreaNoHistoricoDoFunil from "../AreaNoHistoricoDoFunil";
import SalaDeVendaNoHistoricoDoFunil from "../SalaDeVendaNoHistoricoDoFunil";
import FunilNoHistoricoDoFunil from "../FunilNoHistoricoDoFunil";
import PosicaoDoFunilNoHistoricoDoFunil from "../PosicaoDoFunilNoHistoricoDoFunil";

export default interface HistoricoDoControleDeSala {
    salaDeVenda: SalaDeVendaNoHistoricoDoFunil;
    area: AreaNoHistoricoDoFunil;
    funil: FunilNoHistoricoDoFunil;
    posicaoDoFunil: PosicaoDoFunilNoHistoricoDoFunil;
    datasDeAlteracoes: Array<Date>;
}