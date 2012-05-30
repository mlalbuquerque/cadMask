(function( $ ) {
    
    String.prototype.relativeLength = function (relativeChar) {
        return this.match(new RegExp(relativeChar, 'g')).length;
    };
    
    $.fn.cadMask = function(options) {
        var settings = $.extend({
            cpfMask: "___.___.___-__",       // Mask for CPF
            cnpjMask: "__.___.___/____-__",  // Mask for CNPJ
            hasRawField: false,               // Set if has raw field to send
            rawName: 'raw',                   // If has raw field, what's his name
            rawId: 'raw_id',                  // If has raw field, what's his id
            showError: false,                 // Set if notify error
            errorStyle: null,                 // Set the error style
            cpfCallback: function () {        // Callbak to check for CPF format
                return true;
            },
            cnpjCallback: function () {       // Callbak to check for CNPJ format
                return true;
            }
        }, options);
        
        // Default error style and currentDigits global variables
        var myDefaultStyle = "background-color: #FFC9C9; border: 1px solid red; color: red;",
            currentDigit,
            cpfMaskChar = settings.cpfMask.charAt(0),
            cnpjMaskChar = settings.cnpjMask.charAt(0);

        return this.each(function () {
            var $this = $(this);
            
            if (settings.hasRawField) {
                var raw_element = $("<input/>").attr('type', 'hidden')
                                               .attr('name', settings.rawName)
                                               .attr('id', settings.rawId);
                $this.after(raw_element);
            }

            $this.data('value', new Array()); // Placeholder for value

            // Check if input has already a value
            if ($this.val().length > 0) {
                var value = $this.val().split("");
                for (var i=0; i<value.length; i++)
                    _pushChar(value[i], $this);
            }
            
            // Event handlers (focus in, focus out and keydown)
            $this.focusin(function () {
                if ($(this).data('value').length == 0) {
                    $(this).val(settings.cpfMask);
                } else if (settings.showError) {
                    _unsetErrorStyle($(this), settings.errorStyle);
                }
            }).focusout(function () {
                if ($(this).data('value').length == 0) {
                    $(this).val("");
                } else if (settings.showError) {
                    var maskChar = ($(this).data('value').length > 11) ? 
                        cnpjMaskChar : cpfMaskChar;
                    if ($(this).val().match(new RegExp(maskChar)) || _testCallbacks($(this)))
                        _setErrorStyle($(this), settings.errorStyle);
                }
            }).keypress(function (event) {
                var digit = event.which;
                event.preventDefault();
                event.stopPropagation();
                if (event.which == 8) $(this).data('value').pop();
                currentDigit = ((digit >= 48 && digit <= 57) || (digit >= 96 && digit <= 105)) ? digit : '';
                var currentChar = _getDigit(currentDigit);
                _pushChar(currentChar, $(this));
            });
        });
        
        function _pushChar (digit, element) {
            if (digit.match(/[0-9]/g) && element.data('value').length < _biggestLength())
                element.data('value').push(digit);
            var value = element.data('value').join(""), text = "";
            text = (element.data('value').length <= settings.cpfMask.relativeLength(cpfMaskChar)) ? 
                _prepareValue(value, settings.cpfMask) :
                _prepareValue(value, settings.cnpjMask);
            element.val(text);
            if (settings.hasRawField)
                $("#"+settings.rawId).val(value);
        }
        
        function _getDigit(code) {
            return String.fromCharCode((code > 57) ? (code - 48) : code);
        }
        
        function _prepareValue(value, mask) {
            var i = 0, j = 0, text = "";
            for (; i < value.length; i++, j++) {
                if (mask.charAt(j) == mask.charAt(0))
                    text += value.charAt(i);
                else
                    text += mask.charAt(j++) + value.charAt(i);
            }
            text += mask.substr(j);
            return text;
        }
        
        function _setErrorStyle(element, styleClass) {
            if (styleClass == null)
                element.attr('style', myDefaultStyle);
            else
                element.addClass(styleClass);
        }
        
        function _biggestLength() {
            return Math.max(settings.cpfMask.relativeLength(cpfMaskChar), settings.cnpjMask.relativeLength(cnpjMaskChar));
        }
        
        function _unsetErrorStyle(element, styleClass) {
            if (styleClass == null)
                element.attr('style', '');
            else
                element.removeClass(styleClass);
        }
        
        function _testCallbacks(element) {
            return (element.data('value').length < 12) ? 
                !settings.cpfCallback(element) :
                !settings.cnpjCallback(element);
        }
        
    };
    
})(jQuery);