import GrupoDeEmpresas from "../GrupoDeEmpresas"
import ModuloDeAcesso from "../ModuloDeAcesso"

export default interface GrupoDeEmpresasPermissaoDeAcesso {
    grupoDeEmpresas: GrupoDeEmpresas;
    modulosDeAcesso: Array<ModuloDeAcesso>;
}