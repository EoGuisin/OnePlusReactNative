import Anotacao from "../Anotacao";
import Atividade from "../Atividade";
import Anexo from "../Anexo";
import CertidaoDeCasamento from "../CertidaoDeCasamento";
import CNH from "../CNH";
import DadoDoVeiculo from "../DadoDoVeiculo";
import Dependente from "../Dependente";
import Email from "../Email";
import EmailEnviado from "../EmailEnviado";
import Empresa from "../Empresa";
import Formulario from "../Formulario";
import Endereco from "../Endereco";
import HistoricoDoControleDeSala from "../HistoricoDoControleDeSala";
import HistoricoDoFunil from "../HistoricoDoFunil";
import LocalDeCaptacao from "../LocalDeCaptacao";
import ItemDoAlmoxarifadoDeBrinde from "../ItemDoAlmoxarifadoDeBrinde";
import Nacao from "../Nacao";
import Naturalidade from "../Naturalidade";
import Ocupacao from "../Ocupacao";
import RegimeDeBens from "../RegimeDeBens";
import RegistroGeral from "../RegistroGeral";
import Tarefa from "../Tarefa";
import Telefone from "../Telefone";

export default interface Prospect {
    dataDeCadastro: string;
    id: number;
    cpf: string | undefined;
    nome: string | undefined;
    dataDeNascimento: string | undefined;
    idade: number | undefined;
    naturalidade: Naturalidade | undefined;
    nacionalidade: Nacao | undefined;
    sexo: number | undefined;
    emails: Array<Email> | undefined;
    fotoDoProspect: Anexo | undefined;
    documentoPessoal: Anexo | undefined;
    rg: RegistroGeral | undefined;
    cnh: CNH | undefined;
    filiacao01: string; //! Nome do Pai
    filiacao02: string; //! Nome da Mãe
    estadoCivil: number | undefined;
    certidaoDeCasamento: CertidaoDeCasamento | undefined;
    regimeDeCasamento: RegimeDeBens | undefined;
    regimeDeBens: number | undefined; //* Tirar
    numeroDeCertidao: string | undefined;
    dataDeCasamento: string | undefined;
    documentoDeEstadoCivil: Anexo | undefined;
    ocupacao: Ocupacao | undefined;
    renda: number;
    dadosDosVeiculos: Array<DadoDoVeiculo> | undefined;
    dadosdosveiculos?: Array<DadoDoVeiculo> | undefined;
    dependentes: Array<Dependente> | undefined;
    endereco: Endereco | undefined;
    documentoEndereco: Anexo | undefined;
    telefones: Array<Telefone> | undefined;
    localDeCaptacao?: LocalDeCaptacao | undefined;
    status: number | undefined;
    alturadoItem: number | undefined;
    historicoDoFunil: Array<HistoricoDoFunil>;
    atividades: Array<Atividade>;
    anotacoes: Array<Anotacao>;
    emailsEnviados: Array<EmailEnviado>;
    tarefas: Array<Tarefa>;
    formularios: Array<Formulario>;
    brindesOfertados: Array<ItemDoAlmoxarifadoDeBrinde>;
    historicoDoControleDeSala: Array<HistoricoDoControleDeSala>;
    emSala: boolean;
    keyField: string;
    empresaRepresentada?: Empresa | undefined;
    pjVinculado?: Empresa | undefined;
}