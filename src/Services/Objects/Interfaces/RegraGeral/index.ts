import CriterioDeComparacao from "../CriterioDeComparacao";

export default interface RegraGeral {
    campoFiltrado: string;
    criterioDeComparacao: CriterioDeComparacao;
    opcoes: Array<any>;
}