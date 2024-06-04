import Endereco from "../Endereco";
import Telefone from "../Telefone";

export default interface Fornecedor {
    id: number;
    cpfcnpj: string;
    nomeRazaoSocial: string;
    endereco: Endereco;
    telefones: Array<Telefone>;
    senha: string | undefined;
    
    _senhaConfirmada: string | undefined;
}