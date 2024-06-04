export default interface Endereco {
    classificacao?: number;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    uf?: string | undefined;
    cep?: string;
}