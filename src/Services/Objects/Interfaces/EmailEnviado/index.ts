import Funil from "../Funil";
import PosicaoDoFunil from "../PosicaoDoFunil";
import Pessoa from '../Pessoa'

export default interface EmailEnviado {
    numero: number;
    dataDoEmail: string;
    remetente: Pessoa;
    para: string;
    cc: string;
    assunto: string;
    descricao: string;
    funil: Funil | null;
    posicaoDoFunil: PosicaoDoFunil | null;
}