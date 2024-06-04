import FaixaDaMetaDeComissao from "../FaixaDaMetaDeComissao";

export default interface MetaDeComissao {
    id: number;
    descricao: string;
    faixas: Array<FaixaDaMetaDeComissao>;
}