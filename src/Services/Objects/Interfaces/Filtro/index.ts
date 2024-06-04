import RegraGeral  from '../RegraGeral';
import TipoDeFiltro from '../TipoDeFiltro';

export default interface Filtro {
    nome: string;
    tipo: TipoDeFiltro;
    RegraGeral: RegraGeral;
}