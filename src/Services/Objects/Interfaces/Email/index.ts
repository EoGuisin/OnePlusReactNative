export default interface Email {
    classificacao: number;
    descricao: string | undefined;
    host?: string | undefined;
    porta?: string | undefined;
    usuario?: string | undefined;
    senha?: string | undefined;
    habilitarSSL?: boolean | undefined;
}