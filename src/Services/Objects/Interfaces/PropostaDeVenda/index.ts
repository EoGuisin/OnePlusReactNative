import CentroDeCusto from "../CentroDeCusto";
import Comissionado from "../Comissionado";
import Empresa from "../Empresa";
import Identificador from "../Identificador";
import ModeloDeVenda from "../ModeloDeVenda";
import Prospect from "../Prospect";
import SalaDeVenda from "../SalaDeVenda";
import Status from "../Status";
import Titulo from "../Titulo";
import TituloDeCorretagem from "../TituloDeCorretagem";
import TituloDeEntrada from "../TituloDeEntrada";
import TituloDeFinanciamento from "../TituloDeFinanciamento";
import TituloDeIntermediacao from "../TituloDeIntermediacao";
import TituloDeIntermediaria from "../TituloDeIntermediaria";
import TituloDeParcela from "../TituloDeParcela";
import TituloDeParcelaObra from "../TituloDeParcelaObra";
import TituloDeSinal from "../TituloDeSinal";
import VendaVinculada from "../VendaVinculada";


export default interface PropostaDeVenda {
    dataCadastro: string | undefined;
    respCadastroId: number | undefined;
    respCadastroNome: string;
    empresa: Empresa;
    centroDeCusto: CentroDeCusto;
    numero: number;
    status?: Status | undefined;
    vendaVinculada: VendaVinculada | undefined;
    contratoCEF?: string | undefined;
    dataDaVenda: string;
    finalidadeDaCompra: number | undefined;
    canalDeDivulgacao: number | undefined;
    prospects: Array<Prospect>;
    modeloDeVenda: ModeloDeVenda;
    identificador: Identificador;
    taxaDeDesconto: number | undefined;
    titulosDeCorretagem: Array<TituloDeCorretagem>;
    titulosDeIntermediacao: Array<TituloDeIntermediacao>;
    titulosDeFinanciamento: Array<TituloDeFinanciamento>;
    titulosDeEntrada: Array<TituloDeEntrada>;
    titulosDeSinal: Array<TituloDeSinal>;
    titulosDeParcela: Array<TituloDeParcela>;
    titulosDeParcelaObra: Array<TituloDeParcelaObra>;
    titulosDeIntermediaria: Array<TituloDeIntermediaria>;
    titulosConsolidados: Array<Titulo>;
    salaDeVenda: string;
    salaDeVendaNome: string;
    salaDeVendaObjeto?: SalaDeVenda | undefined;
    estruturaDeComissao: Array<Comissionado>;

    _VendaGerada?: boolean|undefined;
    _VendaCancelada?: boolean|undefined;
    _ContratoImpresso?: boolean|undefined;
}