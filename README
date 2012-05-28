# cadMask

### The CPF/CNPJ Plugin

(pt_BR) Este plugin ativa a máscara de um input to tipo text que aceita CPF e CNPJ ao mesmo tempo.
Exibe a máscara pertinente no momento (caso tenha menos que 12 caracteres, exibe máscara de CPF).
Não aceita nenhum caractere que não seja um dígito numérico.

### Opções

* **cpfMask**: formato da máscara do CPF. Use o caracter "_" como substituto do dígito. (padrão: ___.___.___-__)
* **cnpjMask**: formato da máscara do CNPJ. Use o caracter "_" como substituto do dígito. (padrão: ___.___.___\____-__)
* **hasRawField**: configura se o campo envia o valor no formato cru, sem os pontos e traços (ex.: 111.111.111-11 => raw: 11111111111). (padrão: false)
* **rawName**: o nome do campo cru a ser enviado (ver **hasRawField**). (padrão: "raw")
* **rawId**: o id do campo cru a ser enviado (ver **hasRawField**). (padrão: "raw_id")
* **showError**: configura se o campo irá denotar um error do CPF. (padrão: false)
* **errorStyle**: configura a classe CSS para ser usada quando tiver um erro no campo.
* **cpfCallback**: especifica a função para validar o CPF.
                   Por padrão, o plugin já verifica se o campo tem 11 ou 15 caracteres (CPF ou CNPJ, respectivamente).
                   A função deve retornar verdadeiro para passar. (padrão: function () { return true; })
* **cnpjCallback**: especifica a função para validar o CNPJ (ver **cpfCallback**).

(en) This plugin enables an input textfield mask that accepts CPF and CNPJ at the same time. 