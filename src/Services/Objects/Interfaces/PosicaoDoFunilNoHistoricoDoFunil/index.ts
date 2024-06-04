import Pessoa from "../Pessoa";

export default interface PosicaoDoFunilNoHistoricoDoFunil {
    id: number;
    descricao: string;
    pessoa?: Pessoa | undefined;
}