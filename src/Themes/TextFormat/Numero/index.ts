class Numero {
    /* #region  Variáveis  */
    /* #endregion */

    /* #region  Funções  */
    /* Sobre esta função *//**
     * Formata um texto numérico no layout apropriado para número inteiro
     * @param {string} TextoNaoFormatado Informe o número
     **/
    public FormatarTextoParaInteiro(TextoNaoFormatado: number): string {
        if (TextoNaoFormatado == null)
        {
            return "";
        }
        else 
        {
            var TextoFormatado = Math.round(TextoNaoFormatado).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            
            return parseInt(TextoFormatado) > 9 ? "" + TextoFormatado: "0" + TextoFormatado;
        }
    };
    /* Sobre esta função *//**
     * Formata um texto numérico no layout apropriado para número decimal
     * @param {string} TextoNaoFormatado Informe o número
     **/
    public FormatarTextoParaDecimal(TextoNaoFormatado: number): string {
        if (TextoNaoFormatado === 0)
        {
            return "0,00";
        }
        else
        {
            if (!TextoNaoFormatado) return "";
            TextoNaoFormatado = TextoNaoFormatado * 100
            var Contador = -2;
            var NovoNumero = "";
            TextoNaoFormatado.toFixed(2).toString().replace(".", "").split("").reverse().forEach(Item =>
            {
                if (!isNaN(parseFloat(Item)))
                {
                    if (Contador === 0)
                    {
                        NovoNumero += "," + Item;
                    }
                    else
                    {
                        if (Contador === 3)
                        {
                            NovoNumero += '.' + Item;
                            Contador = 0;
                        }
                        else
                        {
                            NovoNumero += Item;
                        }
                        
                    }
                    Contador++;
                }
            })
            return NovoNumero.split("").reverse().join("");
        }
    };
    /* Sobre esta função *//**
     * Elimina o formato de texto do número inteiro
     * @param {string} TextoFormatado Informe o número inteiro formatado
     **/
    public DesformatarTextoParaInteiro(TextoFormatado: string): number {
        if (TextoFormatado == null)
        {
            return 0;
        }
        else
        {
            TextoFormatado = TextoFormatado.toString().replace( /^\D+/g, '').replace(".", "").replace(",", "");
            return parseInt(TextoFormatado) / 1;
        }
    };
    /* Sobre esta função *//**
     * Elimina o formato de texto do número decimal
     * @param {string} TextoFormatado Informe o número decimal formatado
     **/
    public DesformatarTextoParaDecimal(TextoFormatado: string): number {
        if (TextoFormatado == null)
        {
            return 0;
        }
        else
        {
            TextoFormatado = TextoFormatado.toString().replace( /^\D+/g, "").replace(",", "").replace(".", "");
            TextoFormatado = (TextoFormatado.length <= 4) ? (parseFloat(TextoFormatado) / 100).toFixed(2).toString().replace(".", "") : (TextoFormatado.substr(0, 2) === "00" ? TextoFormatado.replace("00", "") : TextoFormatado);

            var Contador = -2;
            var NovoNumero = "";

            
            TextoFormatado.replace(".", "").split("").reverse().forEach(Item =>
            {
                if (!isNaN(parseFloat(Item)))
                {
                    if (Contador === 0)
                    {
                        NovoNumero += "." + Item;
                    }
                    else
                    {
                        NovoNumero += Item;
                    }
                    Contador++;
                }
            })
            return parseFloat(NovoNumero.split("").reverse().join("")) / 100;
        }
    };
    /* #endregion */
};

export default new Numero();