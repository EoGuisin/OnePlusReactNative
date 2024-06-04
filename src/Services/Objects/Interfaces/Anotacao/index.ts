import Funil from "../Funil";
import PosicaoDoFunil from "../PosicaoDoFunil";
import { Object_ } from '..';

export default interface Anotacao {
    dataDaAnotacao: string;
    numero: number;
    descricao: string;
    funil: any;
    posicaoDoFunil: PosicaoDoFunil | null;
    executor: any | null;
}