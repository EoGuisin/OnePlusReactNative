import Empresa from "../Empresa";

export default interface GrupoDeEmpresas {
    id: number;
    descricao: string;
    empresas: Array<Empresa>;
    icone: string;
}