import SalaDeVenda from "../SalaDeVenda";
import FluxoDeSala from "../FluxoDeSala";

export default interface ControleDeSala {
    id: number;
    descricao: string;
    fluxoDeSala: Array<FluxoDeSala>;
    salasDeVenda: Array<SalaDeVenda>;
}