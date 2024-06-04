import Pessoa from "../Pessoa";
import SalaDeVenda from "../SalaDeVenda";

export default interface Comissionado {
    desabilitarSelecao?: boolean | undefined;
    cpf: string;
    nome: string;
    cargo: string;
    pessoa: Pessoa | null;
    pessoas: Array<Pessoa>;
    valorBase: number | undefined;
    percentual: number | undefined;
    valorFinal: number | undefined;
    indireto: boolean;
    sobreRecebimento: boolean;
    parcelamento: number | undefined;
    tipo: number;
    salaDeVendas: SalaDeVenda | undefined;
    regraGeral: string | undefined;
}