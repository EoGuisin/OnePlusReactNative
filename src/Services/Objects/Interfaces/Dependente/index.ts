import Anexo from "../Anexo";
import CNH from "../CNH";
import Nacao from "../Nacao";
import Naturalidade from "../Naturalidade";
import Ocupacao from "../Ocupacao";
import RegistroGeral from "../RegistroGeral";
import Telefone from "../Telefone";

export default interface Dependente {
    classificacao?: number;
    cpf?: string;
    nome?: string;
    dataDeNascimento?: string | undefined;
    idade?: number | undefined;
    nacionalidade?: Nacao | undefined;
    naturalidade?: Naturalidade | undefined;
    sexo?: number | undefined;
    rg?: RegistroGeral | undefined;
    cnh?: CNH | undefined;
    filiacao01?: string | undefined; //! Nome do Pai
    filiacao02?: string | undefined; //! Nome da Mãe
    ocupacao?: Ocupacao;
    renda?: number | undefined;
    email?: string | undefined;
    telefones?: Array<Telefone> | undefined;
    documentoPessoal?: Anexo | undefined;
    fotoDoDependente?: Anexo | undefined;
}