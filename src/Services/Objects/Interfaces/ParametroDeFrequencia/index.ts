import Periodicidade from "../Periodicidade";

export default interface ParametroDeFrequencia {
    id: string;
    dataDeInicio: Date;
    periodicidade: Periodicidade;
    reincidencia: number;
}