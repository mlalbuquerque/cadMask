# cadMask

[Português brasileiro](https://github.com/mlalbuquerque/cadMask#pt_BR) |
[English](https://github.com/mlalbuquerque/cadMask#en)

### The CPF/CNPJ Plugin

<a name="pt_BR">(**pt_BR**)</a> Este plugin ativa a máscara de um input to tipo text que aceita CPF e CNPJ ao mesmo tempo.
Exibe a máscara pertinente no momento (caso tenha menos que 12 caracteres, exibe máscara de CPF).
Não aceita nenhum caractere que não seja um dígito numérico.

### Opções

* **cpfMask**: formato da máscara do CPF. Use o caracter "\_" como substituto do dígito. (padrão: \_\_\_.\_\_\_.\_\_\_-\_\_)
* **cnpjMask**: formato da máscara do CNPJ. Use o caracter "\_" como substituto do dígito. (padrão: \_\_\_.\_\_\_.\_\_\_\\\_\_\_\_-\_\_)
* **hasRawField**: configura se o campo envia o valor no formato cru, sem os pontos e traços (ex.: 111.111.111-11 => raw: 11111111111). (padrão: false)
* **rawName**: o nome do campo cru a ser enviado (ver **hasRawField**). (padrão: "raw")
* **rawId**: o id do campo cru a ser enviado (ver **hasRawField**). (padrão: "raw_id")
* **showError**: configura se o campo irá denotar um erro mudando seu estilo CSS. (padrão: false)
* **errorStyle**: configura a classe CSS para ser usada quando tiver um erro no campo. (padrão: null)
* **cpfCallback**: especifica a função para validar o CPF.
                   Por padrão, o plugin já verifica se o campo tem 11 ou 15 caracteres (CPF ou CNPJ, respectivamente).
                   A função deve retornar verdadeiro para passar.
                   A funcão recebe o próprio elemento DOM onde é aplicado a máscara como parâmetro no formato jQuery.
                   (padrão: function () { return true; })
* **cnpjCallback**: especifica a função para validar o CNPJ (ver **cpfCallback**).

### Exemplo de Uso

Abaixo, o exemplo mais simples (padrão).

    // uso simples
    $('#ID').cadMask();

Abaixo, mostra como aparece o campo quando ganha foco.

![cadMask com foco](https://github.com/mlalbuquerque/cadMask/raw/master/mask.png)

Enquanto tiver com menos de 12 caracteres, sempre mostra a máscara do CPF:

![cadMask com máscara de CPF](https://github.com/mlalbuquerque/cadMask/raw/master/mask-filled.png)

Quando tiver 12 ou mais caracteres, mostra a máscara do CNPJ:

![cadMask com máscara de CNPJ](https://github.com/mlalbuquerque/cadMask/raw/master/mask-filled-cnpj.png)

Abaixo, mostra como funciona a configuração de exibição do erro. Para ligar,
basta usar `showError: true`:

    <html>
        ...
        <script>
            // uso mais complexo
            $('#ID').cadMask({
                showError: true
            });
        </script>
    </html>

Já existe um padrão de estilo de erro, mostrado abaixo:

![cadMask com erro](https://github.com/mlalbuquerque/cadMask/raw/master/mask-filled-error.png)

Para mudar o estilo, basta usar `errorStyle`, como abaixo:

    <html>
        ...
        <style>
            .minha_classe {
                background-color: black;
                border: 0;
                color: yellow;
            }
        </style>
        <script>
            // uso mais complexo
            $('#ID').cadMask({
                showError: true,
                errorStyle: 'minha_classe'
            });
        </script>
    </html>

Vai aparecer assim:

![cadMask com erro e estilo](https://github.com/mlalbuquerque/cadMask/raw/master/mask-filled-error-styled.png)

Por último, o plugin só valida o tamanho do CPF e CNPJ.
Para usar funções mais avançadas para validar o CPF e CNPJ de modo correto,
basta usar `cpfCallback` e `cnpjCallback`, como mostrado abaixo:

    <html>
        ...
        <script>
            // uso mais complexo
            $('#ID').cadMask({
                showError: true,
                cpfCallback: function (elemento) {
                    var value = false;
                    // SÓ PASSA se CPF for igual a 111.111.111-11
                    if (elemento.val() == '111.111.111-11')
                        value = true;
                    return value;
                },
                cnpjCallback: function (elemento) {
                    var value = false;
                    // SÓ PASSA se CNPJ for igual a 111.111.111/1111-11
                    if (elemento.val() == '111.111.111/1111-11')
                        value = true;
                    return value;
                }
            });
        </script>
    </html>

Então, continua dando erro se o seu tamanho ainda é o errado...

![cadMask com erro](https://github.com/mlalbuquerque/cadMask/raw/master/mask-filled-error.png)

MAS, agora, mostra o erro se não é o CPF e/ou CNPJ correto (111.111.111-11 or 111.111.111/1111-11).

![cadMask com erro e estilo](https://github.com/mlalbuquerque/cadMask/raw/master/mask-filled-error-callback.png)

-----------------------------------------

<a name="en">(**en**)</a> This plugin enables an input textfield mask that accepts CPF and CNPJ at the same time.
Shows the relevant mask at the moment (less than 12 characters, shows CPF).
Accpets only numerical digit character.

### Options

* **cpfMask**: CPF mask format. Use "\_" character as digit substitute. (default: \_\_\_.\_\_\_.\_\_\_-\_\_)
* **cnpjMask**: CNPJ mask format. Use "\_" as digit substitute. (default: \_\_\_.\_\_\_.\_\_\_\\\_\_\_\_-\_\_)
* **hasRawField**: set if the field sends raw value, without dots and dashes (ex.: 111.111.111-11 => raw: 11111111111). (default: false)
* **rawName**: raw field's name to be sent (see **hasRawField**). (default: "raw")
* **rawId**: raw field's id to be sent (see **hasRawField**). (default: "raw_id")
* **showError**: sets if the field will notify an error changing his CSS style. (default: false)
* **errorStyle**: sets the CSS class to be used when error occurs in the field. (default: null)
* **cpfCallback**: specifies CPF validation function.
                   The plugin already verifies if the field has 11 or 15 characters (CPF or CNPJ, respectively).
                   The function must return true to pass validation.
                   The plugin passes the DOM element who receives the mask as a parameter in jQuery format.
                   (default: function () { return true; })
* **cnpjCallback**: specifies CNPJ validation function (see **cpfCallback**).

### Usage Examples

This is the simplest way to use cadMask (default).

    $('#ID').cadMask();

This is how it appears in browser when get focus.

![cadMask with focus](https://github.com/mlalbuquerque/cadMask/raw/master/mask.png)

While less than 12 characters, always using CPF mask:

![cadMask with CPF mask](https://github.com/mlalbuquerque/cadMask/raw/master/mask-filled.png)

When has 12 or more characters, shows the CNPJ mask:

![cadMask with CNPJ mask](https://github.com/mlalbuquerque/cadMask/raw/master/mask-filled-cnpj.png)

Below, shows how to set error exhibition. To turn on, use `showError: true`:

    <html>
        ...
        <script>
            $('#ID').cadMask({
                showError: true
            });
        </script>
    </html>

Already has an default error style, displayed below:

![cadMask with error](https://github.com/mlalbuquerque/cadMask/raw/master/mask-filled-error.png)

To change the style, use `errorStyle`, as below:

    <html>
        ...
        <style>
            .my_class {
                background-color: black;
                border: 0;
                color: yellow;
            }
        </style>
        <script>
            $('#ID').cadMask({
                showError: true,
                errorStyle: 'my_class'
            });
        </script>
    </html>

It will look like this:

![cadMask with error and style](https://github.com/mlalbuquerque/cadMask/raw/master/mask-filled-error-styled.png)

Last but no least, the plugin only validates the CPF or CNPJ size.
If you want to use more advanced, real functions to validate CPF and CNPJ,
use and set `cpfCallback` and/or `cnpjCallback`, as showed below:

    <html>
        ...
        <script>
            $('#ID').cadMask({
                showError: true,
                cpfCallback: function (element) {
                    var value = false;
                    // passes ONLY if CPF equals 111.111.111-11
                    if (element.val() == '111.111.111-11')
                        value = true;
                    return value;
                },
                cnpjCallback: function (element) {
                    var value = false;
                     // passes ONLY if CNPJ equals 111.111.111/1111-11
                    if (element.val() == '111.111.111/1111-11')
                        value = true;
                    return value;
                }
            });
        </script>
    </html>

So, it continues to err if its length is still wrong...

![cadMask with error](https://github.com/mlalbuquerque/cadMask/raw/master/mask-filled-error.png)

BUT, now, it errs if it's not the right CPF and/or CPNJ (111.111.111-11 or 111.111.111/1111-11).

![cadMask with error callback](https://github.com/mlalbuquerque/cadMask/raw/master/mask-filled-error-callback.png)