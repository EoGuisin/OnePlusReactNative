import Anexo from "../Anexo";
import DadoDoVeiculo from "../DadoDoVeiculo";
import Dependente from "../Dependente";
import Email from "../Email";
import Endereco from "../Endereco";
import Nacao from "../Nacao";
import Ocupacao from "../Ocupacao";
import Pessoa from "../Pessoa";
import RegistroGeral from "../RegistroGeral";
import Telefone from "../Telefone";

export default interface LeadKanban {
  id: number;
  cpf: string;
  nome: string;
  statusKanban: string;
  summary: string;
  tags: string;
  color: string;
  className: string;
  dataDeNascimento?: Date;
  idade?: number;
  nacionalidade?: Nacao;
  sexo?: number;
  emails: Array<Email>;
  fotoDoLead?: Anexo | null;
  documentoPessoal?: Anexo | null;
  rg?: RegistroGeral | null;
  estadoCivil?: number;
  documentoDeEstadoCivil?: Anexo | null;
  regimeDeBens?: number;
  ocupacao?: Ocupacao;
  renda?: number;
  dadosDosVeiculos?: DadoDoVeiculo;
  dependentes?: Array<Dependente> | null;
  endereco?: Endereco | null;
  documentoEndereco?: Anexo | null;
  telefones: Array<Telefone> | null;
  localDeCaptacao?: string;
  status?: number;
  alturadoItem?: number;
  responsavel?: Pessoa;
  observacoes?: Array<{ nome: string; data: Date; descricao: string; }>
  posicaoDoFunil?: { id: number, descricao: string };
  atividades?: Array<any>;
  tarefas?: Array<any>;
  anotacoes: Array<any>;
  listaEmails: Array<any>;
}