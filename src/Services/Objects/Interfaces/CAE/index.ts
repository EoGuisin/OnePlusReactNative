import CertificadoDigital from "../CertificadoDigital";
import CNAE from "../CNAE";
import Email from "../Email";
import EnderecoIBGE from "../EnderecoIBGE";
import EnquadramentoTributario from "../EnquadramentoTributario";
import RegimeEspecialDeTributacao from "../RegimeEspecialDeTributacao";
import Telefone from "../Telefone";

export default interface CAE {
    id: string;
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    ie: string;
    im: string;
    enquadramentoTributario: EnquadramentoTributario | undefined;
    regimeEspecialDeTributacao: RegimeEspecialDeTributacao | undefined;
    incentivadorCultural: boolean;
    Endereco: EnderecoIBGE;
    telefones: Array<Telefone>;
    emails: Array<Email>;
    cnaEs: Array<CNAE>;
    certificadoDigital: CertificadoDigital | null;
}