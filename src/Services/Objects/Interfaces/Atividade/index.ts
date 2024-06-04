import ClassificacaoDaAtividade from "../ClassificacaoDaAtividade";
import PosicaoDoFunil from "../PosicaoDoFunil";
import Pessoa from "../Pessoa";
import SituacaoDaAtividade from "../SituacaoDaAtividade";

export default interface Atividade {
    classificacaoDaAtividade: ClassificacaoDaAtividade;
    posicaoDoFunil: PosicaoDoFunil;
    situacaoDaAtividade: SituacaoDaAtividade;
    executor: Pessoa;
    dataDoEvento: Date;
    descricao: string;
}