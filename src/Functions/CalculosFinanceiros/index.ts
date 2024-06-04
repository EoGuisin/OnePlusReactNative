class CalculosFinanceiros {
    /* Sobre esta função *//**
     * Retorna o valor presente
    @param {number} I Informe a taxa a ser aplicada
    @param {number} NPER Informe o período
    @param {number} PMT Informe o valor da parcela (com o juros)
     **/
    public PV(I: number, NPER: number, PMT: number) {
        return -(PMT * (Math.pow(1 + I, NPER) - 1) / (I * Math.pow(1 + I, NPER)));
    }
    /* Sobre esta função *//**
     * Retorna o valor presente
    @param {number} I Informe a taxa a ser aplicada
    @param {number} PMT Informe o valor da parcela (com o juros)
    @param {number} PV Informe o valor presente do débito
     **/
    public NPER(I: number, PMT: number, PV: number) {
        var BeginEnd = 0;
        var FV = 0;
        return Math.round(Math.log((PMT * (1 + I * BeginEnd) - FV * I) / (PV * I + PMT * (1 + I * BeginEnd))) / Math.log(1 + I));
    }
    public PMT(I: number, NPER: number, PV: number, FV: number, BeginEnd: number) {
        var PMT;
        FV || (FV = 0);
        BeginEnd || (BeginEnd = 0);
        if (I === 0) {
            return -(PV + FV) / NPER;
        }
        PMT = -I * (PV * Math.pow(1 + I, NPER) + FV) / (Math.pow(1 + I, NPER) - 1);
        if (BeginEnd === 1) {
            PMT /= (1 + I);
        }
        return PMT;
    }
}

export default new CalculosFinanceiros();