import Cargo from "../Cargo";
import Hierarquia from "../Hierarquia";
import Pessoa from "../Pessoa";

export default interface Posicoes {
    parent_position: string;
    hierarquia: Hierarquia;
    cargo: Cargo;
    pessoas: Array<Pessoa>;
}