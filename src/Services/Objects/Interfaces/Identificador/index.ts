import Anexo from "../Anexo";
import CentroDeCusto from "../CentroDeCusto";
import CoordenadaGeografica from "../CoordenadaGeografica";
import Empresa from "../Empresa";
import IdentificadorVinculado from "../IdentificadorVinculado";
import Local from "../Local";
import ReservaVinculada from "../ReservaVinculada";
import SubLocal from "../SubLocal";
import SubLocal02 from "../SubLocal02";
import SubLocal03 from "../SubLocal03";
import Informacoes from "../Informacoes"
export default interface Identificador {
    indice: number;
    empresa: Empresa;
    centroDeCusto: CentroDeCusto;
    local: Local;
    subLocal: SubLocal;
    subLocal02: SubLocal02;
    subLocal03: SubLocal03;
    identificadorVinculado: IdentificadorVinculado;
    status: number;
    area: number;
    valorAVista: number;
    dataDeExpiracao: string;
    dataDeCadastro: string;
    intermediacao: number;
    centro: CoordenadaGeografica;
    coordinates: Array<CoordenadaGeografica>;
    informacoesGerais: Informacoes;
    observacoes: Array<string>;
    reservaVinculada: ReservaVinculada;
    anexos: Array<Anexo>;

    _ReservandoUnidade: boolean|undefined;
    _DeletandoReserva: boolean|undefined;
}