
import Area from "../Area";
import Cargo from "../Cargo";
import CentroDeCusto from "../CentroDeCusto";
import LocalDeCaptacao from "../LocalDeCaptacao";
import MetaDeComissao from "../MetaDeComissao";
import RegraGeralDeComissao from "../RegraGeralDeComissao";
import SalaDeVenda from "../SalaDeVenda";
import TipoDeComissao from "../TipoDeComissao";

export default interface Comissao {
    id: number;
    area?: Area;
    localDeCaptacao?: LocalDeCaptacao;
    salasDeVenda?: Array<SalaDeVenda>
    centrosDeCusto?: Array<CentroDeCusto>
    cargos?: Array<Cargo>
    descricao: string;
    indireto: boolean;
    parcelamento?: number | null;
    sobreRecebimento: boolean;
    valor: number;
    tipo: TipoDeComissao;
    regraGeral: Array<RegraGeralDeComissao>;
    meta?: MetaDeComissao | undefined;
}