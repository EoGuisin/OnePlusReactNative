import Cargo from "../Cargo";

export default interface PosicaoDoFunil {
    id: number;
    descricao: string;
    cargosVinculados?: Array<Cargo> | undefined;
}