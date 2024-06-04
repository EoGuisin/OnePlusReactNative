import MapOthers from '../MapOthers';
import Lotes from '../Lotes'

interface TiposInadimplencia {
    descricao: string,
    cor: string,
}

interface LatLong {
    latitude: number,
    longitude: number
}

interface LatLong {
    latitude: number,
    longitude: number
}

interface Lista {
    quadra: string,
    center: LatLong,
    lotes: Lotes[],
}

export default interface Map {
    center: number[],
    lista: Lista[],
    others: MapOthers,
    tiposInadimplencia: TiposInadimplencia[],
}