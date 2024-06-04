import Cargo from "../Cargo";
import CentroDeCusto from "../CentroDeCusto";
import ControleDeSala from "../ControleDeSala";
import Email from "../Email";
import Empresa from "../Empresa";
import Funil from "../Funil";
import Status from "../Status";
import Permissao from "../Permissao";

export default interface Usuario {
    id: number;
    status: Status;
    nome: string;
    cargos: Array<Cargo>;
    cpf: string;
    emails: Array<Email>;
    senha: string;
    tokenDeNotificacao: string;
    empresasPermitidas: Array<Empresa>;
    centrosDeCustoPermitidos: Array<CentroDeCusto>;
    controlesDeSalaPermitidos: Array<ControleDeSala>;
    funisPermitidos: Array<Funil>;
    permissoes: Permissao[] | []
}