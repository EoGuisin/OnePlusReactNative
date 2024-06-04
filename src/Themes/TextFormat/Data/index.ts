import moment from "moment";

class Data {
    /* #region  Variáveis  */
    /* #endregion */

    /* #region  Funções  */
    /* Sobre esta função *//**
     * Verifica se a data digitado é valido
     * @param {string} Texto Informe a data (somente números ou com o texto formatado)
     **/
    public TextoValido(Texto: string): Boolean {
        var Soma = 0;
        var Resto = 0;
        Texto = Texto.replace(/^\D+/g, "")
            .replace(",", "").replace(".", "")
            .replace(".", "").replace("-", "")
            .replace("/", "");

        if (Texto === "00000000000") {
            return false;
        }
        for (let i = 1; i <= 9; i++) {
            Soma = Soma + parseInt(Texto.substring(i - 1, i)) * (11 - i);
        }
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) {
            Resto = 0;
        }
        if (Resto !== parseInt(Texto.substring(9, 10))) {
            return false;
        }

        Soma = 0;
        for (let i = 1; i <= 10; i++) {
            Soma = Soma + parseInt(Texto.substring(i - 1, i)) * (12 - i);
        }
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) {
            Resto = 0;
        }
        if (Resto !== parseInt(Texto.substring(10, 11))) {
            return false;
        }
        return true;
    }
    /* Sobre esta função *//**
     * Formata um texto numerico no layout apropriado para data
     * @param {string} TextoNaoFormatado Informe o data (somente números)
     **/
    public FormatarTexto(TextoNaoFormatado: string | undefined): string {
        if (TextoNaoFormatado == null) {

            return "";

        }
        else {

            TextoNaoFormatado = (TextoNaoFormatado.toString().replace(/^\D+/g, "").replace(",", "").replace(".", "")
                .toString().replace(".", "").replace("-", "").replace("/", "")).toString().replace("/", "");

            switch (TextoNaoFormatado.length) {
                case 1:
                    TextoNaoFormatado = TextoNaoFormatado.substring(0, 1);
                    break;
                case 2:
                    TextoNaoFormatado = TextoNaoFormatado.substring(0, 2);
                    break;
                case 3:
                    TextoNaoFormatado = TextoNaoFormatado.substring(0, 2) + "/" + TextoNaoFormatado.substring(2, 3);
                    break;
                case 4:
                    TextoNaoFormatado = TextoNaoFormatado.substring(0, 2) + "/" + TextoNaoFormatado.substring(2, 4);
                    break;
                case 5:
                    TextoNaoFormatado = TextoNaoFormatado.substring(0, 2) + "/" + TextoNaoFormatado.substring(2, 4) + "/" + TextoNaoFormatado.substring(4, 5);
                    break;
                case 6:
                    TextoNaoFormatado = TextoNaoFormatado.substring(0, 2) + "/" + TextoNaoFormatado.substring(2, 4) + "/" + TextoNaoFormatado.substring(4, 6);
                    break;
                case 7:
                    TextoNaoFormatado = TextoNaoFormatado.substring(0, 2) + "/" + TextoNaoFormatado.substring(2, 4) + "/" + TextoNaoFormatado.substring(4, 7);
                    break;
                case 8:
                    TextoNaoFormatado = TextoNaoFormatado.substring(0, 2) + "/" + TextoNaoFormatado.substring(2, 4) + "/" + TextoNaoFormatado.substring(4, 8);
                    break
                case 9:
                    TextoNaoFormatado = TextoNaoFormatado.substring(0, 2) + "/" + TextoNaoFormatado.substring(2, 4) + "/" + TextoNaoFormatado.substring(4, 8);
                    break
            }
        }
        return TextoNaoFormatado;
    };
    /* Sobre esta função *//**
     * Elimina o formato de texto data, retornando apenas os números
     * @param {string} TextoFormatado Informe a data (texto formatado)
     **/
    public DesformatarTexto(TextoFormatado: Date): Date | null {
        if(TextoFormatado == null)
        {
            return null;
        }
        else 
        {
            return moment(TextoFormatado, 'DD/MM/YYYY', true).toDate()
        }
    };
    /* #endregion */
};

export default new Data();