import Cidade from "../CidadeIBGE";
import UF from "../UFIBGE";

export default interface EnderecoIBGE {
    logradouro: string;
    complemento: string;
    bairro: string;
    cidade: Cidade | undefined;
    uf: UF | undefined;
    cep: string;
}