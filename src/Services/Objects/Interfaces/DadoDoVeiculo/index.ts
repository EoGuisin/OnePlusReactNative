import MarcaDoVeiculo from "../MarcaDoVeiculo";
import ModeloDoVeiculo from "../ModeloDoVeiculo";
import Veiculo  from "../Veiculo";

export default interface DadoDoVeiculo {
    quantidade: string;
    marca: MarcaDoVeiculo;
    veiculo: Veiculo;
    modelo: ModeloDoVeiculo;
}