export default interface SalaDeVenda {
    id: number;
    descricao: string;
    observacao?: string | undefined;
    logradouro?: string | undefined;
    numero?: string | undefined;
    complemento?: string | undefined;
    bairro?: string | undefined;
    cidade?: string | undefined;
    uf?: string | undefined;
    cep?: string | undefined;
}