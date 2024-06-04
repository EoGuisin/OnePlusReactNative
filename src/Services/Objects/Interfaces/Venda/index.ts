import Anexo from "../Anexo";
import ParticipanteDoContrato from "../ParticipanteDoContrato";
import PropostaDeVenda from "../PropostaDeVenda";

export default interface Venda {
    propostaDeVenda: PropostaDeVenda;
    participantesDoContrato: Array<ParticipanteDoContrato>;
    anexos: Array<Anexo>;
}