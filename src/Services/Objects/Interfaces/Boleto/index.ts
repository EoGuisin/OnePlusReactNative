import CentroDeCusto from "../CentroDeCusto";
import Cedente from "../Cedente";
import Empresa from "../Empresa";
import IdentificadorVinculado from "../IdentificadorVinculado";
import Local from "../Local";
import Sacado from "../Sacado";
import SubLocal from "../SubLocal";
import SubLocal02 from "../SubLocal02";
import SubLocal03 from "../SubLocal03";
import TituloDoBoleto from "../TituloDoBoleto";


export default interface Boleto {
    empresa: Empresa;
    centroDeCusto: CentroDeCusto;
    local: Local;
    subLocal: SubLocal;
    subLocal02: SubLocal02;
    subLocal03: SubLocal03;
    identificadorVinculado: IdentificadorVinculado;
    codigoDeBarras: string;
    dataDeVencimento: Date;
    valor: number;
    banco: number;
    carteira: string;
    nossoNumero: string;
    numeroDoDocumento: string;
    cedente: Cedente;
    sacado: Sacado;
    titulosDoBoleto: Array<TituloDoBoleto>;
    mensagem: string;
    pdf: string;
}