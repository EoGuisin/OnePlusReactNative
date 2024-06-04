class CEP {
    /* #region  Variáveis  */
    /* #endregion */

    /* #region  Funções  */
    /* Sobre esta função *//**
     * Formata um texto numerico no layout apropriado para Telefone
     * @param {string | undefined} TextoNaoFormatado Informe o Telefone (somente números)
     **/
    public FormatarTexto(TextoNaoFormatado: string | undefined): string {
        if (!TextoNaoFormatado) return "";
        TextoNaoFormatado = TextoNaoFormatado.toString().replace( /^\D+/g, "").replace(",", "").replace(".", "").toString().replace(".", "").replace("-", "");
        switch (TextoNaoFormatado.length) {
            case 1:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{1})/, '$1');
                break;
            case 2:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})/, '$1');
                break;
            case 3:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{1})/, '$1.$2');
                break;
            case 4:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{2})/, '$1.$2');
                break;
            case 5:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{3})/, '$1.$2');
                break;
            case 6:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{3})(\d{1})/, '$1.$2-$3');
                break;
            case 7:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{3})(\d{2})/, '$1.$2-$3');
                break;
            case 8:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
                break;
            case 9:
                TextoNaoFormatado = TextoNaoFormatado.substring(0, 8).replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
                break;
        }

        return TextoNaoFormatado;
    };
    /* Sobre esta função *//**
     * Elimina o formato de texto do Telefone, retornando apenas os números
     * @param {string} TextoFormatado Informe o Telefone (texto formatado)
     **/
    public DesformatarTexto(TextoFormatado: string | undefined): string {
        if (TextoFormatado == null) {
            return "";
        }
        else {
            return TextoFormatado.toString().replace( /^\D+/g, "").replace(",", "").replace(".", "").toString().replace(".", "").replace("-", "").replace("/", "");
        }
    };
    /* #endregion */
};

export default new CEP();