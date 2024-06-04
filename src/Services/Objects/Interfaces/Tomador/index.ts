import Email from "../Email";
import Endereco from "../Endereco";
import Telefone from "../Telefone";

export default interface Tomador {
    nomeRazaoSocial: string;
    nomeFantasia: string;
    numeroDeCadastro: string;
    ie: string;
    im: string;
    endereco: Endereco;
    telefones: Array<Telefone>;
    emails: Array<Email>;
}