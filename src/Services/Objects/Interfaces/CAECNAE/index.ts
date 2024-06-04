import CNAE from "../CNAE";

export default interface CAECNAE {
    cnae: CNAE;
    principal: boolean;
    cofins: Number;
    csll: Number;
    inss: Number;
    ir: Number;
    iss: Number;
    pis: Number;
}