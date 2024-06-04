import ClassificacaoDaPergunta from "../ClassificacaoDaPergunta";

export default interface Perguntas {
    id: number;
    titulo: string;
    classificacao: ClassificacaoDaPergunta;
    obrigatorio: boolean;
    resposta: any;
}