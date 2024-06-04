export default interface ItemDoBordero {
    EmpresaVinculada: number | null;
    CentroDeCustoVinculado: string | null;
    ComissionadoNomeRazaoSocial: string | null;
    ComissionadoNumeroDeCadastro: string | null;
    ClienteNomeRazaoSocial: string | null;
    ClienteNomeFantasia: string | null;
    ClienteNumeroDeCadastro: string | null;
    ClienteEnderecoLogradouro: string | null;
    ClienteEnderecoNumero: string | null;
    ClienteEnderecoComplemento: string | null;
    ClienteEnderecoBairro: string | null;
    ClienteEnderecoCidade: string | null;
    ClienteEnderecoUF: string | null;
    ClienteEnderecoCEP: string | null;
    ClienteTelefoneDDD: string | null;
    ClienteTelefoneNumero: string | null;
    ClienteEmail: string | null;
    ValorDoServico: number | null;
    PrevisaoDePagamento: Date | null;
}