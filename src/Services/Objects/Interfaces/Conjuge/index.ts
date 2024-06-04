import Anexo from "../Anexo";
import CRECI from "../CRECI";
import Email from "../Email";
import Nacao from "../Nacao";
import Ocupacao from "../Ocupacao";
import RegistroGeral from "../RegistroGeral";
import Telefone from "../Telefone";

export default interface Conjuge {
    id: number | undefined;
    cpf: string;
    nome: string;
    natureza: number;
    dataDeNascimento: Date | undefined;
    nacionalidade: Nacao | undefined;
    emails: Array<Email>;
    documentopessoal: Anexo | null;
    rg: RegistroGeral;
    creci: CRECI;
    ocupacao: Ocupacao;
    telefones: Array<Telefone>;
    observacao: string;
}