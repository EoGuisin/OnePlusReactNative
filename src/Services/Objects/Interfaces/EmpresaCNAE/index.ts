import CNAE from "../CNAE";

export default interface EmpresaCNAE {
    CNAE: CNAE;
    principal: boolean;
    cOFINS: number;
    cSLL: number;
    iNSS: number;
    iR: number;
    iSS: number;
    pIS: number;
}