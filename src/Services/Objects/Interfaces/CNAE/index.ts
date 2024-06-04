import ClasseCNAE from "../ClasseCNAE";
import DivisaoCNAE from "../DivisaoCNAE";
import GrupoCNAE from "../GrupoCNAE";
import SecaoCNAE from "../SecaoCNAE";

export default interface CNAE {
    secao: SecaoCNAE;
    divisao: DivisaoCNAE;
    grupo: GrupoCNAE;
    classe: ClasseCNAE
    id: string;
    descricao: string;
    observacao: string;
}