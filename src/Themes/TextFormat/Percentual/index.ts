class Percentual {
    /* #region  Variáveis  */
    /* #endregion */

    /* #region  Funções  */
    /* Sobre esta função *//**
     * Formata um texto numerico no layout apropriado para percentual
     * @param {string} TextoNaoFormatado Informe o número (somente números)
     **/
    public FormatarTexto(TextoNaoFormatado: number): string {
        if (TextoNaoFormatado === 0)
        {
            return "0,00%"
        }
        else
        {
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
            return NovoNumero.split("").reverse().join("") + "%";
        }
    };
    /* Sobre esta função *//**
     * Elimina o formato de texto da percentual, retornando apenas os números
     * @param {string} TextoFormatado Informe o Telefone (texto formatado)
     **/
    public DesformatarTexto(TextoFormatado: string): number {
        
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
            return parseFloat(NovoNumero.split("").reverse().join(""));
        }
    };
    /* #endregion */
};

export default new Percentual();