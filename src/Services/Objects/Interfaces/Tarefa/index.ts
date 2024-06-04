import Funil from "../Funil";
import PosicaoDoFunil from "../PosicaoDoFunil";
import Prioridade from "../Prioridade";
import Usuario from "../Usuario";


export default interface Tarefa {
    numero: number | undefined;
    prioridade: Prioridade | undefined;
    solicitante: Usuario | undefined;
    executor: Usuario | undefined;
    assunto: string | undefined;
    descricao: string | undefined;
    previsaoDeInicio: string /*Date*/ | undefined;
    previsaoDeTermino: string /*Date*/ | undefined;
    DataDeTermino: string /*Date*/ | undefined;
    DataDoCancelamento: string /*Date*/ | undefined;
    funil: Funil | undefined;
    posicaoDoFunil: PosicaoDoFunil | undefined;
}