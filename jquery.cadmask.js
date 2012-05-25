(function( $ ) {
    
    String.prototype.relativeLength = function (relativeChar) {
        return this.match(new RegExp(relativeChar, 'g')).length;
    }
    
    $.fn.cadMask = function(options) {
        var settings = $.extend({
            cpfMask: "___.___.___-__",
            cnpjMask: "___.___.___/____-__",
            hasRawField: false,
            rawName: 'raw',
            rawId: 'raw_id',
            showError: false,
            errorStyle: null,
            cpfCallback: function () {
                return true;
            },
            cnpjCallback: function () {
                return true;
            }
        }, options);
        
        var values = new Array(),
            myDefaultStyle = "background-color: #FFC9C9; border: 1px solid red; color: red;",
            currentDigit;
            
        return this.each(function () {
            var $this = $(this);
            
            if (settings.hasRawField) {
                var raw_element = $("<input/>").attr('type', 'hidden')
                                               .attr('name', settings.rawName)
                                               .attr('id', settings.rawId);
                $this.after(raw_element);
            }
            
            if ($this.val().length > 0) {
                values = $this.val().split("");
                if ($this.val().length <= settings.cpfMask.relativeLength("_"))
                    $this.val(_prepareValue($this.val(), settings.cpfMask));
                else
                    $this.val(_prepareValue($this.val(), settings.cnpjMask));
            }
            
            $this.focusin(function () {
                if (values.length == 0) {
                    $(this).val(settings.cpfMask);
                } else if (settings.showError) {
                    _unsetErrorStyle($(this), settings.errorStyle);
                }
            }).focusout(function () {
                if (values.length == 0) {
                    $(this).val("");
                } else if (settings.showError) {
                    if ($(this).val().match(/_/) || _testCallbacks($(this)))
                        _setErrorStyle($(this), settings.errorStyle);
                }
            }).keydown(function (event) {
                var digit = event.which;
                if (digit != 116)
                    event.preventDefault();
                event.stopPropagation();
                if (event.which == 8) values.pop();
                if ((digit >= 48 && digit <= 57) || (digit >= 96 && digit <= 105)) {
                    currentDigit = digit;
                } else {
                    currentDigit = '';
                }
                _pushChar(currentDigit, $(this));
            });
        });
        
        function _pushChar (current_digit, element) {
            var digit = _getDigit(current_digit);
            console.log(digit);
            //event.preventDefault();
            if (/[0-9]/g.test(digit)) {
                if (values.length < _biggestLength())
                    values.push(digit);
                var value = values.join(""), text = "";
                if (values.length <= settings.cpfMask.relativeLength("_"))
                    text = _prepareValue(value, settings.cpfMask);
                else
                    text = _prepareValue(value, settings.cnpjMask);
                element.val(text);
                $("#"+settings.rawId).val(value);
            }
        }
        
        function _getDigit(code) {
            return String.fromCharCode((code > 57) ? (code - 48) : code);
        }
        
        function _prepareValue(value, mask) {
            var i = 0, j = 0, text = "";
            for (; i < value.length; i++, j++) {
                if (mask.charAt(j) == "_")
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
            return Math.max(settings.cpfMask.relativeLength('_'), settings.cnpjMask.relativeLength('_'));
        }
        
        function _unsetErrorStyle(element, styleClass) {
            if (styleClass == null)
                element.attr('style', '');
            else
                element.removeClass(styleClass);
        }
        
        function _testCallbacks(element) {
            return (values.length < 12) ? 
                !settings.cpfCallback(element) :
                !settings.cnpjCallback(element);
        }
        
    };
    
})(jQuery);