class CNPJ {
    /* #region  Variáveis  */
    /* #endregion */

    /* #region  Funções  */

    /* Sobre esta função *//**
     * Verifica se o CNPJ digitado é valido
     * @param {string} Texto Informe o CNPJ (somente números ou com o texto formatado)
     **/
    public TextoValido(Texto: string): Boolean {
        Texto = Texto.replace(/[^\d]+/g, '');

        if (Texto === '') {
            return false;
        }

        if (Texto.length !== 14) {
            return false;
        }

        if (Texto === "00000000000000" ||
            Texto === "11111111111111" ||
            Texto === "22222222222222" ||
            Texto === "33333333333333" ||
            Texto === "44444444444444" ||
            Texto === "55555555555555" ||
            Texto === "66666666666666" ||
            Texto === "77777777777777" ||
            Texto === "88888888888888" ||
            Texto === "99999999999999") {
            return false;
        }

        var tamanho = Texto.length - 2;
        var numeros = Texto.substring(0, tamanho);
        var digitos = Texto.substring(tamanho);
        var soma = 0;
        var pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(0))) {
            return false;
        }

        tamanho = tamanho + 1;
        numeros = Texto.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(1))) {
            return false;
        }
        return true;
    }

    /* Sobre esta função *//**
     * Formata um texto numerico no layout apropriado para CNPJ
     * @param {string} TextoNaoFormatado Informe o CNPJ (somente números)
     **/
    public FormatarTexto(TextoNaoFormatado: string | undefined) {
        TextoNaoFormatado = TextoNaoFormatado?.replace(/^\D+/g, "")
            .replace(",", "").replace(".", "")
            .replace(".", "").replace("-", "")
            .replace("/", "");

        switch (TextoNaoFormatado?.length) {
            case 1:
                TextoNaoFormatado = TextoNaoFormatado?.replace(/(\d{1})/, '$1');
                break;
            case 2:
                TextoNaoFormatado = TextoNaoFormatado?.replace(/(\d{2})/, '$1');
                break;
            case 3:
                TextoNaoFormatado = TextoNaoFormatado?.replace(/(\d{2})(\d{1})/, '$1.$2');
                break;
            case 4:
                TextoNaoFormatado = TextoNaoFormatado?.replace(/(\d{2})(\d{2})/, '$1.$2');
                break;
            case 5:
                TextoNaoFormatado = TextoNaoFormatado?.replace(/(\d{2})(\d{3})/, '$1.$2');
                break;
            case 6:
                TextoNaoFormatado = TextoNaoFormatado?.replace(/(\d{2})(\d{3})(\d{1})/, '$1.$2.$3');
                break;
            case 7:
                TextoNaoFormatado = TextoNaoFormatado?.replace(/(\d{2})(\d{3})(\d{2})/, '$1.$2.$3');
                break;
            case 8:
                TextoNaoFormatado = TextoNaoFormatado?.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
                break;
            case 9:
                TextoNaoFormatado = TextoNaoFormatado?.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3/$4");
                break;
            case 10:
                TextoNaoFormatado = TextoNaoFormatado?.replace(/(\d{2})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3/$4");
                break;
            case 11:
                TextoNaoFormatado = TextoNaoFormatado?.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, "$1.$2.$3/$4");
                break;
            case 12:
                TextoNaoFormatado = TextoNaoFormatado?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1.$2.$3/$4");
                break;
            case 13:
                TextoNaoFormatado = TextoNaoFormatado?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1})/, "$1.$2.$3/$4-$5");
                break;
            case 14:
                TextoNaoFormatado = TextoNaoFormatado?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
                break;
            case 15:
                TextoNaoFormatado = TextoNaoFormatado?.substring(1, 15).replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
                break;
        }

        return TextoNaoFormatado;
    };
    /* Sobre esta função *//**
     * Elimina o formato de texto do CNPJ, retornando apenas os números
     * @param {string} TextoFormatado Informe o CNPJ (texto formatado)
     **/
    public DesformatarTexto(TextoFormatado: string | undefined): string | undefined {
        TextoFormatado = TextoFormatado?.replace(/^\D+/g, "")
            .replace(",", "").replace(".", "")
            .replace(".", "").replace("-", "")
            .replace("/", "");

        return TextoFormatado;
    };
    /* #endregion */
};

export default new CNPJ();