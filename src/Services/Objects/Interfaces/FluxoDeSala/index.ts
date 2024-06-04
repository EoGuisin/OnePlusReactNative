import AcaoDoControleDeSala from "../AcaoDoControleDeSala";
import Cargo from "../Cargo";

export default interface FluxoDeSala {
    etapa: number;
    descricao: string;
    acao: AcaoDoControleDeSala;
    cargosVinculados: Array<Cargo>;
}