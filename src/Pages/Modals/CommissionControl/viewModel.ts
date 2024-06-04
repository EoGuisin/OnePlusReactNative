import { Object_ } from '../../../Services/Objects';

export namespace Type {
    export interface SalaDeVendas {
        id: number;
        descricao: string;
        cidadeUF: string;
    }
    export interface Comissionado {
        cargo: string;
        pessoa: Object_.Pessoa | undefined;
        valorBase: number | undefined;
        percentual: number | undefined;
        valorFinal: number| undefined;
        pessoas: Array<Object_.Pessoa>;
    }
    export interface viewModel {
        LeadId: number | undefined;
        Identificador: Object_.IdentificadorSintetico | undefined;
        controleDeComissao: { salaDeVendas: Object_.SalaDeVenda | undefined, comissionados: Array<Object_.Comissionado> };
        EstruturaConsultada: boolean;
    }
}