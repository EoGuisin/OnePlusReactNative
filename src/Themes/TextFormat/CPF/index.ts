class CPF {
    /* #region  Variáveis  */
    /* #endregion */

    /* #region  Funções  */
    /* Sobre esta função *//**
     * Verifica se o CPF digitado é valido
     * @param {string} Texto Informe o CPF (somente números ou com o texto formatado)
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
     * Formata um texto numerico no layout apropriado para CPF
     * @param {string | undefined} TextoNaoFormatado Informe o CPF (somente números)
     **/
    public FormatarTexto(TextoNaoFormatado: string | undefined): string {
        if (!TextoNaoFormatado) return "";
        TextoNaoFormatado = TextoNaoFormatado.replace(/^\D+/g, "")
            .replace(",", "").replace(".", "")
            .replace(".", "").replace("-", "")
            .replace("/", "");

        switch (TextoNaoFormatado.length) {
            case 1:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{1})/, '$1');
                break;
            case 2:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})/, '$1');
                break;
            case 3:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{3})/, '$1');
                break;
            case 4:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{3})(\d{1})/, '$1.$2');
                break;
            case 5:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{3})(\d{2})/, '$1.$2');
                break;
            case 6:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{3})(\d{3})/, '$1.$2');
                break;
            case 7:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{3})(\d{3})(\d{1})/, '$1.$2.$3');
                break;
            case 8:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{3})(\d{3})(\d{2})/, '$1.$2.$3');
                break;
            case 9:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
                break;
            case 10:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
                break;
            case 11:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                break;
            case 12:
                TextoNaoFormatado = TextoNaoFormatado.substring(0, 11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                break;
        }

        return TextoNaoFormatado;
    };
    /* Sobre esta função *//**
     * Elimina o formato de texto do CPF, retornando apenas os números
     * @param {string} TextoFormatado Informe o CPF (texto formatado)
     **/
    public DesformatarTexto(TextoFormatado: string | undefined): string {
        TextoFormatado = TextoFormatado!?.replace(/^\D+/g, "")
            .replace(",", "").replace(".", "")
            .replace(".", "").replace("-", "")
            .replace("/", "");

        return TextoFormatado;
    };
    /* #endregion */
};

export default new CPF();