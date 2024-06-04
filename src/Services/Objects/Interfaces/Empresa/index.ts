import Email from "../Email";
import Endereco from "../Endereco";
import Telefone from "../Telefone";
import JuntaComercial from "../JuntaComercial";
import EmpresaCNAE from "../EmpresaCNAE";
import Anexo from "../Anexo";

export default interface Empresa {
    id: number;
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    juntaComercial: JuntaComercial | undefined;
    ie: string;
    im: string;
    enquadramentoTributario: number | undefined;
    endereco: Endereco;
    cep?: string | undefined;
    logradouro?: string | undefined;
    numero?: string | undefined;
    complemento?: string | undefined;
    bairro?: string | undefined;
    cidade?: string | undefined;
    uf?: string | undefined;
    telefones: Array<Telefone>;
    emails: Array<Email>;
    cNAEs: Array<EmpresaCNAE>;
    fichaCadastral?: Anexo | undefined;
    certidaoDaJuntaComercial?: Anexo | undefined;
    cartaoCNPJ?: Anexo | undefined;
    documentoEndereco?: Anexo | undefined;
    nire?: string | undefined;
    dataArqAtoConst?: Date | undefined;
    numeroCertidaoSimplificada?: string | undefined;
    nomeCertidaoSimplificada?: string | undefined;
}