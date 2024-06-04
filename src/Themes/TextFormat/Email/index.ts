class Email {
    /* #region  Variáveis  */
    /* #endregion */

    /* #region  Funções  */
    /* Sobre esta função *//**
     * Verifica se o email digitado é valido
     * @param {string} Texto Informe o email (somente números ou com o texto formatado)
     **/
    public TextoValido(Texto: string): Boolean {
        var Usuario = Texto.substring(0, Texto.indexOf("@"));
        var Dominio = Texto.substring(Texto.indexOf("@") + 1, Texto.length);

        return ((Usuario.length >= 1) &&
            (Dominio.length >= 3) &&
            (Usuario.search("@") === -1) &&
            (Dominio.search("@") === -1) &&
            (Usuario.search(" ") === -1) &&
            (Dominio.search(" ") === -1) &&
            (Dominio.search(".") !== -1) &&
            (Dominio.indexOf(".") >= 1) &&
            (Dominio.lastIndexOf(".") < Dominio.length - 1));
    }
    /* #endregion */
};

export default new Email();