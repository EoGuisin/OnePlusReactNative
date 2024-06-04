import Area from "../Area";
import Cargo from "../Cargo";
import Funil from "../Funil";
import GrupoDeEmpresas from "../GrupoDeEmpresas";
import Pessoa from "../Pessoa";
import SalaDeVenda from "../SalaDeVenda";
import Permissao from "../Permissao";
import GrupoDeEmpresasPermissaoDeAcesso from "../GrupoDeEmpresasPermissaoDeAcesso";
export default interface SignIn {
    token: string;
    pessoa: Pessoa | undefined;
    grupoDeEmpresasComPermissaoDeAcesso: Array<GrupoDeEmpresasPermissaoDeAcesso>;
    ultimoGrupoDeEmpresasAcessado: GrupoDeEmpresas | undefined;
    cargosPorGrupoDeEmpresa: Array<{cargo: Cargo, grupoDeEmpresas: GrupoDeEmpresas}> | undefined;
    primeiroAcesso: boolean | undefined;
    tokenDeNotificacao: string | undefined;
    permissoes: {
        id: number,
        registro: Permissao
    }[],
    funil: Array<{ funil: Funil; salaDeVenda: SalaDeVenda; area: Area }> | undefined;
}