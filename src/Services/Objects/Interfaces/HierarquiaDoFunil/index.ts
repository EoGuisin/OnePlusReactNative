import Area from "../Area";
import SalaDeVenda from "../SalaDeVenda";

export default interface HierarquiaDoFunil {
    salaDeVenda: SalaDeVenda;
    areas: Array<Area>;
}