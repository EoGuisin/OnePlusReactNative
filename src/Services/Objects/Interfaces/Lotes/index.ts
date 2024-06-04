interface DadosUau {
    status: number,
    area: number,
    valorAVista: number,
    descricao: string,
    FRACAO_IDEAL: null,
    Categoria_de_preco: string,
    statusDaInadimplencia: string,
    valorInadimplente: number,
    valorAdimplente: number,
    qtDeParcelasInadimplente: number,
    statusDaVistoria: string,
    colorInadimplencia: string,
    CentroDeCustoVinculado: string,
    EmpresaVinculada: string,
    KEY_CDEMP_CDOBR_PROD_PER_BD: string,
    LocalVinculado: string,
    SublocalVinculado: string,
}

interface LatLong {
    latitude: number,
    longitude: number
}

export default interface Lotes {
    lote: string,
    coordinates: LatLong[],
    center: LatLong,
    dadosUau: DadosUau,
}