import CentroDeCusto from "../CentroDeCusto";
import ClassificacaoDoTituloDaTabelaDeVenda  from "../ClassificacaoDoTituloDaTabelaDeVenda";
import Empresa from "../Empresa";
import Identificador from "../Identificador";
import ModeloDeVenda from "../ModeloDeVenda";

export default interface TabelaDeVenda {
    empresa: Empresa;
    centroDeCusto: CentroDeCusto;
    numero: number;
    descricao: string;
    modeloDeVenda: ModeloDeVenda;
    classificacoesDosTitulosDaTabelaDeVenda: Array<ClassificacaoDoTituloDaTabelaDeVenda>;
    identificador: Identificador;
}