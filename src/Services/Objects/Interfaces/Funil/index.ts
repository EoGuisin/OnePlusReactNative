import HierarquiaDoFunil from "../HierarquiaDoFunil";
import PosicaoDoFunil from "../PosicaoDoFunil";

export default interface Funil {
    id: number;
    posicoesDoFunil: Array<PosicaoDoFunil>;
    descricao: string;
    hierarquiaDoFunil: Array<HierarquiaDoFunil>;
}