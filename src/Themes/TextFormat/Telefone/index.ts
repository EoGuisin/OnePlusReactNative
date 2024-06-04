class Telefone {
    /* #region  Variáveis  */
    /* #endregion */

    /* #region  Funções  */
    /* Sobre esta função *//**
     * Verifica se o telefone digitado é valido
     * @param {string} Texto Informe o telefone (somente números ou com o texto formatado)
     **/
    public TextoValido(Texto: string): Boolean {
        Texto = Texto.toString().replace(/^\D+/g, "").replace("+", "").replace("(", "").replace(")", "").replace(" ", "").replace("-", "").toString().replace("+", "").replace("(", "").replace(")", "").replace(" ", "").replace("-", "");
        return Texto.length > 0;
    }
    /* Sobre esta função *//**
     * Formata um texto numerico no layout apropriado para Telefone
     * @param {string} TextoNaoFormatado Informe o Telefone (somente números)
     **/
    public FormatarTexto(TextoNaoFormatado: string): string {
        TextoNaoFormatado = TextoNaoFormatado.toString().replace(/^\D+/g, "").replace("+", "").replace("(", "").replace(")", "").replace(" ", "").replace("-", "").toString().replace("+", "").replace("(", "").replace(")", "").replace(" ", "").replace("-", "");
        switch (TextoNaoFormatado.length) {
            case 1:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{1})/, '$1');
                break;
            case 2:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})/, '$1');
                break;
            case 3:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{1})/, '($1) $2');
                break;
            case 4:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{2})/, '($1) $2');
                break;
            case 5:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{3})/, '($1) $2');
                break;
            case 6:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{4})/, '($1) $2');
                break;
            case 7:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{5})/, '($1) $2');
                break;
            case 8:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{5})(\d{1})/, '($1) $2 $3');
                break;
            case 9:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{5})(\d{1})/, '($1) $2 $3');
                break;
            case 10:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{5})(\d{1})/, '($1) $2 $3');
                break;
            case 11:
                TextoNaoFormatado = TextoNaoFormatado.replace(/(\d{2})(\d{5})(\d{1})/, '($1) $2 $3');
                break;
            case 12:
                TextoNaoFormatado = TextoNaoFormatado.substring(0, 11).replace(/(\d{2})(\d{5})(\d{1})/, '($1) $2 $3');
                break;
        }

        return TextoNaoFormatado;
    };
    /* Sobre esta função *//**
     * Elimina o formato de texto do Telefone, retornando apenas os números
     * @param {string} TextoFormatado Informe o Telefone (texto formatado)
     **/
    public DesformatarTexto(TextoFormatado: string): string {
        if (TextoFormatado == null) {
            return "";
        }
        else {
            return TextoFormatado.toString().replace(/^\D+/g, "").replace("+", "").replace("(", "").replace(")", "").replace(" ", "").replace("-", "").toString().replace("+", "").replace("(", "").replace(")", "").replace(" ", "").replace("-", "");
        }
    };


    /* Sobre esta função *//**
     * Retorna o DDD presente no texto
     * @param {string} TextoFormatado Informe o Telefone (texto formatado)
     **/
    public ObterDDD(TextoFormatado: string): string {
        var TextoNaoFormatado = this.DesformatarTexto(TextoFormatado);
        if (TextoNaoFormatado.length > 2) {
            return TextoNaoFormatado.substr(0, 2);
        }
        else {
            return "";
        }
    };
    /* Sobre esta função *//**
     * Retorna o número do telefone presente no texto
     * @param {string} TextoFormatado Informe o Telefone (texto formatado)
     **/
    public ObterNumero(TextoFormatado: string): string {
        var TextoNaoFormatado = this.DesformatarTexto(TextoFormatado);
        if (TextoNaoFormatado.length > 2) {
            return TextoNaoFormatado.substr(2, TextoNaoFormatado.length - 2);
        }
        else {
            return "";
        }
    };
    /* #endregion */
};

export default new Telefone();