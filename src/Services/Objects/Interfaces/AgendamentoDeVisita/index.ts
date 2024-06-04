import SalaDeVenda from "../SalaDeVenda";

export default interface AcaoDoControleDeSala {
    salaDeVenda: SalaDeVenda | undefined;
    dataDaVisita: string;
    visitaRealizada: boolean;
}