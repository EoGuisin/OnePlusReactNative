import HierarquiaDeComissao from '../HierarquiaDeComissao';
import SalaDeVenda from '../SalaDeVenda';
import CentroDeCusto from '../CentroDeCusto';

export default interface Organograma {
    id: number,
    salaDeVenda: SalaDeVenda | undefined,
    centroDeCusto: CentroDeCusto | undefined,
    descricao: string,
    posicoes: Array<HierarquiaDeComissao>
}