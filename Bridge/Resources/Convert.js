    // @source Convert.js

    var scope = {};

    scope.convert = {
        typeCodes: {
            Empty: 0,
            Object: 1,
            DBNull: 2,
            Boolean: 3,
            Char: 4,
            SByte: 5,
            Byte: 6,
            Int16: 7,
            UInt16: 8,
            Int32: 9,
            UInt32: 10,
            Int64: 11,
            UInt64: 12,
            Single: 13,
            Double: 14,
            Decimal: 15,
            DateTime: 16,
            String: 18
        },

        toBoolean: function (value, formatProvider) {
            switch (typeof (value)) {
                case "boolean":
                    return value;

                case "number":
                    return value !== 0; // non-zero int/float value is always converted to True;

                case "string":
                    var lowCaseVal = value.toLowerCase().trim();

                    if (lowCaseVal === "true") {
                        return true;
                    } else if (lowCaseVal === "false") {
                        return false;
                    } else {
                        throw new Bridge.FormatException("String was not recognized as a valid Boolean.");
                    }

                case "object":
                    if (value == null) {
                        return false;
                    }

                    if (value instanceof Bridge.Decimal) {
                        return !value.isZero();
                    }

                    break;
            }

            // TODO: #822 When IConvertible is implemented, try it before throwing InvalidCastEx
            var typeCode = scope.internal.suggestTypeCode(value);
            scope.internal.throwInvalidCastEx(typeCode, scope.convert.typeCodes.Boolean);

            // try converting using IConvertible
            return scope.convert.convertToType(scope.convert.typeCodes.Boolean, value, formatProvider || null);
        },

        toChar: function (value, formatProvider, valueTypeCode) {
            var typeCodes = scope.convert.typeCodes;

            if (value instanceof Bridge.Decimal) {
                value = value.toFloat();
            }

            var type = typeof (value);
            valueTypeCode = valueTypeCode || scope.internal.suggestTypeCode(value);

            if (valueTypeCode === typeCodes.String && value == null) {
                type = "string";
            }

            if (valueTypeCode !== typeCodes.Object) {
                switch (type) {
                    case "boolean":
                        scope.internal.throwInvalidCastEx(typeCodes.Boolean, typeCodes.Char);

                    case "number":
                        var isFloatingType = scope.internal.isFloatingType(valueTypeCode);

                        if (isFloatingType || value % 1 !== 0) {
                            scope.internal.throwInvalidCastEx(valueTypeCode, typeCodes.Char);
                        }

                        scope.internal.validateNumberRange(value, typeCodes.Char, true);

                        return value;

                    case "string":
                        if (value == null) {
                            throw new Bridge.ArgumentNullException("value");
                        }

                        if (value.length !== 1) {
                            throw new Bridge.FormatException("String must be exactly one character long.");
                        }

                        return value.charCodeAt(0);
                }
            }

            if (valueTypeCode === typeCodes.Object || type === "object") {
                if (value == null) {
                    return 0;
                }

                if (Bridge.isDate(value)) {
                    scope.internal.throwInvalidCastEx(typeCodes.DateTime, typeCodes.Char);
                }
            }

            // TODO: #822 When IConvertible is implemented, try it before throwing InvalidCastEx
            scope.internal.throwInvalidCastEx(valueTypeCode, scope.convert.typeCodes.Char);

            // try converting using IConvertible
            return scope.convert.convertToType(typeCodes.Char, value, formatProvider || null);
        },

        toSByte: function (value, formatProvider, valueTypeCode) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.SByte, valueTypeCode || null);
        },

        toByte: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.Byte);
        },

        toInt16: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.Int16);
        },

        toUInt16: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.UInt16);
        },

        toInt32: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.Int32);
        },

        toUInt32: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.UInt32);
        },

        toInt64: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.Int64);
        },

        toUInt64: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.UInt64);
        },

        toSingle: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.Single);
        },

        toDouble: function (value, formatProvider) {
            return scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.Double);
        },

        toDecimal: function (value, formatProvider) {
            if (value instanceof Bridge.Decimal) {
                return value;
            }

            return new Bridge.Decimal(scope.internal.toNumber(value, formatProvider || null, scope.convert.typeCodes.Decimal));
        },

        toDateTime: function (value, formatProvider) {
            var typeCodes = scope.convert.typeCodes;

            switch (typeof (value)) {
                case "boolean":
                    scope.internal.throwInvalidCastEx(typeCodes.Boolean, typeCodes.DateTime);

                case "number":
                    var fromType = scope.internal.suggestTypeCode(value);
                    scope.internal.throwInvalidCastEx(fromType, typeCodes.DateTime);

                case "string":
                    value = Bridge.Date.parse(value, formatProvider || null);

                    return value;

                case "object":
                    if (value == null) {
                        return scope.internal.getMinValue(typeCodes.DateTime);
                    }

                    if (Bridge.isDate(value)) {
                        return value;
                    }

                    if (value instanceof Bridge.Decimal) {
                        scope.internal.throwInvalidCastEx(typeCodes.Decimal, typeCodes.DateTime);
                    }

                    break;
            }

            // TODO: #822 When IConvertible is implemented, try it before throwing InvalidCastEx
            var valueTypeCode = scope.internal.suggestTypeCode(value);
            scope.internal.throwInvalidCastEx(valueTypeCode, scope.convert.typeCodes.DateTime);

            // try converting using IConvertible
            return scope.convert.convertToType(typeCodes.DateTime, value, formatProvider || null);
        },

        toString: function (value, formatProvider, valueTypeCode) {
            var typeCodes = scope.convert.typeCodes;
            var type = typeof (value);

            switch (type) {
                case "boolean":
                    return value ? "True" : "False";

                case "number":
                    if ((valueTypeCode || null) === typeCodes.Char) {
                        return String.fromCharCode(value);
                    }

                    if (isNaN(value)) {
                        return "NaN";
                    }

                    if (value % 1 !== 0) {
                        value = parseFloat(value.toPrecision(15));
                    }

                    return value.toString();

                case "string":
                    return value;

                case "object":
                    if (value == null) {
                        return "";
                    }

                    if (Bridge.isDate(value)) {
                        return Bridge.Date.format(value, null, formatProvider || null);
                    }

                    if (value instanceof Bridge.Decimal) {
                        if (value.isInteger()) {
                            return value.toFixed(0, 4);
                        }
                        return value.toPrecision(value.precision());
                    }

                    if (value.format) {
                        return value.format(null, formatProvider || null);
                    }

                    var typeName = Bridge.getTypeName(value);

                    return typeName;
            }

            // try converting using IConvertible
            return scope.convert.convertToType(scope.convert.typeCodes.String, value, formatProvider || null);
        },

        toNumberInBase: function (str, fromBase, typeCode) {
            if (fromBase !== 2 && fromBase !== 8 && fromBase !== 10 && fromBase !== 16) {
                throw new Bridge.ArgumentException("Invalid Base.");
            }

            if (str == null) {
                return 0;
            }

            if (str.length === 0) {
                throw new Bridge.ArgumentOutOfRangeException("Index was out of range. Must be non-negative and less than the size of the collection.");
            }

            // Let's process the string in lower case.
            str = str.toLowerCase();

            var minValue = scope.internal.getMinValue(typeCode);
            var maxValue = scope.internal.getMaxValue(typeCode);

            // Calculate offset (start index)
            var isNegative = false;
            var startIndex = 0;

            if (str[startIndex] === "-") {
                if (fromBase !== 10) {
                    throw new Bridge.ArgumentException("String cannot contain a minus sign if the base is not 10.");
                }

                if (minValue >= 0) {
                    throw new Bridge.OverflowException("The string was being parsed as an unsigned number and could not have a negative sign.");
                }

                isNegative = true;
                ++startIndex;
            } else if (str[startIndex] === "+") {
                ++startIndex;
            }

            if (fromBase === 16 && str.length >= 2 && str[startIndex] === "0" && str[startIndex + 1] === "x") {
                startIndex += 2;
            }

            // Fill allowed codes for the specified base:
            var allowedCodes;

            if (fromBase === 2) {
                allowedCodes = scope.internal.charsToCodes("01");
            } else if (fromBase === 8) {
                allowedCodes = scope.internal.charsToCodes("01234567");
            } else if (fromBase === 10) {
                allowedCodes = scope.internal.charsToCodes("0123456789");
            } else if (fromBase === 16) {
                allowedCodes = scope.internal.charsToCodes("0123456789abcdef");
            } else {
                throw new Bridge.ArgumentException("Invalid Base.");
            }

            // Create charCode-to-Value map
            var codeValues = {};

            for (var i = 0; i < allowedCodes.length; i++) {
                var allowedCode = allowedCodes[i];
                codeValues[allowedCode] = i;
            }

            var firstAllowed = allowedCodes[0];
            var lastAllowed = allowedCodes[allowedCodes.length - 1];

            // Parse the number:
            var res = 0;
            var totalMax = maxValue - minValue + 1;

            for (var j = startIndex; j < str.length; j++) {
                var code = str[j].charCodeAt(0);

                if (code >= firstAllowed && code <= lastAllowed) {
                    res *= fromBase;
                    res += codeValues[code];

                    if (res > scope.internal.typeRanges.Int64_MaxValue_Safe) {
                        throw new Bridge.OverflowException("Value was either too large or too small. Long values are not supported.");
                    }

                } else {
                    if (j === startIndex) {
                        throw new Bridge.FormatException("Could not find any recognizable digits.");
                    } else {
                        throw new Bridge.FormatException("Additional non-parsable characters are at the end of the string.");
                    }
                }
            }

            if (isNegative) {
                res *= -1;
            }

            if (res > maxValue && fromBase !== 10 && minValue < 0) {
                // Assume that the value is negative, transform it:
                res = res - totalMax;
            }

            if (res < minValue || res > maxValue) {
                throw new Bridge.OverflowException("Value was either too large or too small.");
            }

            return res;
        },

        toStringInBase: function (value, toBase, typeCode) {
            var typeCodes = scope.convert.typeCodes;

            if (toBase !== 2 && toBase !== 8 && toBase !== 10 && toBase !== 16) {
                throw new Bridge.ArgumentException("Invalid Base.");
            }

            var minValue = scope.internal.getMinValue(typeCode);
            var maxValue = scope.internal.getMaxValue(typeCode);

            // TODO: #778 Remove this temp solution when (U)Int64 is fully supported
            if (toBase !== 10) {
                if (typeCode === typeCodes.Int64) {
                    minValue = scope.internal.getMinValue(typeCodes.Int32);
                    maxValue = scope.internal.getMaxValue(typeCodes.Int32);
                } else if (typeCode === typeCodes.UInt64) {
                    minValue = scope.internal.getMinValue(typeCodes.UInt32);
                    maxValue = scope.internal.getMaxValue(typeCodes.UInt32);
                }
            }

            if (value < minValue || value > maxValue) {
                throw new Bridge.OverflowException("Value was either too large or too small for an unsigned byte.");
            }

            // Handle negative numbers:
            var isNegative = false;

            if (value < 0) {
                if (toBase === 10) {
                    isNegative = true;
                    value *= -1;
                } else {
                    value = (maxValue + 1 - minValue) + value;
                }
            }

            // Fill allowed codes for the specified base:
            var allowedChars;

            if (toBase === 2) {
                allowedChars = "01";
            } else if (toBase === 8) {
                allowedChars = "01234567";
            } else if (toBase === 10) {
                allowedChars = "0123456789";
            } else if (toBase === 16) {
                allowedChars = "0123456789abcdef";
            } else {
                throw new Bridge.ArgumentException("Invalid Base.");
            }

            // Fill Value-To-Char map:
            var charByValues = {};
            var allowedCharArr = allowedChars.split("");

            for (var i = 0; i < allowedCharArr.length; i++) {
                var allowedChar = allowedCharArr[i];
                charByValues[i] = allowedChar;
            }

            // Parse the number:
            var res = "";

            if (value === 0) {
                res = "0";
            } else {
                while (value > 0) {
                    var mod = value % toBase;
                    value = (value - mod) / toBase;

                    var char = charByValues[mod];
                    res += char;
                }
            }

            if (isNegative) {
                res += "-";
            }

            res = res.split("").reverse().join("");

            return res;
        },

        toBase64String: function (inArray, offset, length, options) {
            if (inArray == null) {
                throw new Bridge.ArgumentNullException("inArray");
            }

            offset = offset || 0;
            length = length != null ? length : inArray.length;
            options = options || 0; // 0 - means "None", 1 - stands for "InsertLineBreaks"

            if (length < 0) {
                throw new Bridge.ArgumentOutOfRangeException("length", "Index was out of range. Must be non-negative and less than the size of the collection.");
            }

            if (offset < 0) {
                throw new Bridge.ArgumentOutOfRangeException("offset", "Value must be positive.");
            }

            if (options < 0 || options > 1) {
                throw new Bridge.ArgumentException("Illegal enum value.");
            }

            var inArrayLength = inArray.length;

            if (offset > (inArrayLength - length)) {
                throw new Bridge.ArgumentOutOfRangeException("offset", "Offset and length must refer to a position in the string.");
            }

            if (inArrayLength === 0) {
                return "";
            }

            var insertLineBreaks = (options === 1);
            var strArrayLen = scope.internal.toBase64_CalculateAndValidateOutputLength(length, insertLineBreaks);

            var strArray = [];
            strArray.length = strArrayLen;

            scope.internal.convertToBase64Array(strArray, inArray, offset, length, insertLineBreaks);

            var str = strArray.join("");

            return str;
        },

        toBase64CharArray: function (inArray, offsetIn, length, outArray, offsetOut, options) {
            if (inArray == null) {
                throw new Bridge.ArgumentNullException("inArray");
            }

            if (outArray == null) {
                throw new Bridge.ArgumentNullException("outArray");
            }

            if (length < 0) {
                throw new Bridge.ArgumentOutOfRangeException("length", "Index was out of range. Must be non-negative and less than the size of the collection.");
            }

            if (offsetIn < 0) {
                throw new Bridge.ArgumentOutOfRangeException("offsetIn", "Value must be positive.");
            }

            if (offsetOut < 0) {
                throw new Bridge.ArgumentOutOfRangeException("offsetOut", "Value must be positive.");
            }

            options = options || 0;     // 0 - means "None", 1 - stands for "InsertLineBreaks"

            if (options < 0 || options > 1) {
                throw new Bridge.ArgumentException("Illegal enum value.");
            }
            var inArrayLength = inArray.length;

            if (offsetIn > inArrayLength - length) {
                throw new Bridge.ArgumentOutOfRangeException("offsetIn", "Offset and length must refer to a position in the string.");
            }

            if (inArrayLength === 0) {
                return 0;
            }

            var insertLineBreaks = options === 1;
            var outArrayLength = outArray.length;   //This is the maximally required length that must be available in the char array

            // Length of the char buffer required
            var numElementsToCopy = scope.internal.toBase64_CalculateAndValidateOutputLength(length, insertLineBreaks);

            if (offsetOut > (outArrayLength - numElementsToCopy)) {
                throw new Bridge.ArgumentOutOfRangeException("offsetOut", "Either offset did not refer to a position in the string, or there is an insufficient length of destination character array.");
            }

            var charsArr = [];
            var charsArrLength = scope.internal.convertToBase64Array(charsArr, inArray, offsetIn, length, insertLineBreaks);

            scope.internal.charsToCodes(charsArr, outArray, offsetOut);

            return charsArrLength;
        },

        fromBase64String: function (s) {
            // "s" is an unfortunate parameter name, but we need to keep it for backward compat.

            if (s == null) {
                throw new Bridge.ArgumentNullException("s");
            }

            var sChars = s.split("");
            var bytes = scope.internal.fromBase64CharPtr(sChars, 0, sChars.length);

            return bytes;
        },

        fromBase64CharArray: function (inArray, offset, length) {
            if (inArray == null) {
                throw new Bridge.ArgumentNullException("inArray");
            }

            if (length < 0) {
                throw new Bridge.ArgumentOutOfRangeException("length", "Index was out of range. Must be non-negative and less than the size of the collection.");
            }

            if (offset < 0) {
                throw new Bridge.ArgumentOutOfRangeException("offset", "Value must be positive.");
            }

            if (offset > (inArray.length - length)) {
                throw new Bridge.ArgumentOutOfRangeException("offset", "Offset and length must refer to a position in the string.");
            }

            var chars = scope.internal.codesToChars(inArray);
            var bytes = scope.internal.fromBase64CharPtr(chars, offset, length);

            return bytes;
        },

        convertToType: function (typeCode, value, formatProvider) {
            //TODO: #822 IConvertible 
            throw new Bridge.NotSupportedException("IConvertible interface is not supported.");
        }
    };

    scope.internal = {
        base64Table: [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
            "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d",
            "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
            "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7",
            "8", "9", "+", "/", "="
        ],

        typeRanges: {
            Char_MinValue: 0,
            Char_MaxValue: 65535,

            Byte_MinValue: 0,
            Byte_MaxValue: 255,

            SByte_MinValue: -128,
            SByte_MaxValue: 127,

            Int16_MinValue: -32768,
            Int16_MaxValue: 32767,

            UInt16_MinValue: 0,
            UInt16_MaxValue: 65535,

            Int32_MinValue: -2147483648,
            Int32_MaxValue: 2147483647,

            UInt32_MinValue: 0,
            UInt32_MaxValue: 4294967295,

            Int64_MinValue_Safe: -9007199254740991,
            Int64_MaxValue_Safe: 9007199254740991,

            UInt64_MinValue_Safe: 0,
            UInt64_MaxValue_Safe: 9007199254740991,

            Single_MinValue: -3.40282347e+38,
            Single_MaxValue: 3.40282347e+38,

            Double_MinValue: -1.7976931348623157e+308,
            Double_MaxValue: 1.7976931348623157e+308,

            Decimal_MinValue: -79228162514264337593543950335,
            Decimal_MaxValue: 79228162514264337593543950335
        },

        base64LineBreakPosition: 76,

        getTypeCodeName: function (typeCode) {
            var typeCodes = scope.convert.typeCodes;

            if (scope.internal.typeCodeNames == null) {
                var names = {};

                for (var codeName in typeCodes) {
                    if (!typeCodes.hasOwnProperty(codeName)) {
                        continue;
                    }

                    var codeValue = typeCodes[codeName];

                    names[codeValue] = codeName;
                }
                scope.internal.typeCodeNames = names;
            }

            var name = scope.internal.typeCodeNames[typeCode];

            if (name == null) {
                throw Bridge.ArgumentOutOfRangeException("typeCode", "The specified typeCode is undefined.");
            }

            return name;
        },

        suggestTypeCode: function (value) {
            var typeCodes = scope.convert.typeCodes;
            var type = typeof (value);

            switch (type) {
                case "boolean":
                    return typeCodes.Boolean;

                case "number":
                    if (value % 1 !== 0)
                        return typeCodes.Double;

                    return typeCodes.Int32;

                case "string":
                    return typeCodes.String;

                case "object":
                    if (Bridge.isDate(value)) {
                        return typeCodes.DateTime;
                    }

                    if (value != null) {
                        return typeCodes.Object;
                    }

                    break;
            }
            return null;
        },

        getMinValue: function (typeCode) {
            var typeCodes = scope.convert.typeCodes;

            switch (typeCode) {
                case typeCodes.Char:
                    return scope.internal.typeRanges.Char_MinValue;
                case typeCodes.SByte:
                    return scope.internal.typeRanges.SByte_MinValue;
                case typeCodes.Byte:
                    return scope.internal.typeRanges.Byte_MinValue;
                case typeCodes.Int16:
                    return scope.internal.typeRanges.Int16_MinValue;
                case typeCodes.UInt16:
                    return scope.internal.typeRanges.UInt16_MinValue;
                case typeCodes.Int32:
                    return scope.internal.typeRanges.Int32_MinValue;
                case typeCodes.UInt32:
                    return scope.internal.typeRanges.UInt32_MinValue;
                case typeCodes.Int64:
                    return scope.internal.typeRanges.Int64_MinValue_Safe;
                case typeCodes.UInt64:
                    return scope.internal.typeRanges.UInt64_MinValue_Safe;
                case typeCodes.Single:
                    return scope.internal.typeRanges.Single_MinValue;
                case typeCodes.Double:
                    return scope.internal.typeRanges.Double_MinValue;
                case typeCodes.Decimal:
                    return scope.internal.typeRanges.Decimal_MinValue;
                case typeCodes.DateTime:
                    var date = new Date(0);
                    date.setFullYear(1);
                    return date;

                default:
                    return null;
            }
        },

        getMaxValue: function (typeCode) {
            var typeCodes = scope.convert.typeCodes;

            switch (typeCode) {
                case typeCodes.Char:
                    return scope.internal.typeRanges.Char_MaxValue;
                case typeCodes.SByte:
                    return scope.internal.typeRanges.SByte_MaxValue;
                case typeCodes.Byte:
                    return scope.internal.typeRanges.Byte_MaxValue;
                case typeCodes.Int16:
                    return scope.internal.typeRanges.Int16_MaxValue;
                case typeCodes.UInt16:
                    return scope.internal.typeRanges.UInt16_MaxValue;
                case typeCodes.Int32:
                    return scope.internal.typeRanges.Int32_MaxValue;
                case typeCodes.UInt32:
                    return scope.internal.typeRanges.UInt32_MaxValue;
                case typeCodes.Int64:
                    return scope.internal.typeRanges.Int64_MaxValue_Safe;
                case typeCodes.UInt64:
                    return scope.internal.typeRanges.UInt64_MaxValue_Safe;
                case typeCodes.Single:
                    return scope.internal.typeRanges.Single_MaxValue;
                case typeCodes.Double:
                    return scope.internal.typeRanges.Double_MaxValue;
                case typeCodes.Decimal:
                    return scope.internal.typeRanges.Decimal_MaxValue;
                default:
                    throw new Bridge.ArgumentOutOfRangeException("typeCode", "The specified typeCode is undefined.");
            }
        },

        isFloatingType: function (typeCode) {
            var typeCodes = scope.convert.typeCodes;
            var isFloatingType =
                typeCode === typeCodes.Single ||
                typeCode === typeCodes.Double ||
                typeCode === typeCodes.Decimal;

            return isFloatingType;
        },

        toNumber: function (value, formatProvider, typeCode, valueTypeCode) {
            var typeCodes = scope.convert.typeCodes;

            if (value instanceof Bridge.Decimal) {
                value = value.toFloat();
            }

            var type = typeof (value);
            var isFloating = scope.internal.isFloatingType(typeCode);

            if (valueTypeCode === typeCodes.String) {
                type = "string";
            }

            switch (type) {
                case "boolean":
                    return value ? 1 : 0;

                case "number":
                    if (typeCode === typeCodes.Decimal) {
                        scope.internal.validateNumberRange(value, typeCode, true);

                        return new Bridge.Decimal(value, formatProvider);
                    }

                    if (!isFloating && (value % 1 !== 0)) {
                        value = scope.internal.roundToInt(value, typeCode);
                    }

                    if (isFloating) {
                        var minValue = scope.internal.getMinValue(typeCode);
                        var maxValue = scope.internal.getMaxValue(typeCode);

                        if (value > maxValue) {
                            value = Infinity;
                        } else if (value < minValue) {
                            value = -Infinity;
                        }
                    }

                    scope.internal.validateNumberRange(value, typeCode, false);
                    return value;

                case "string":
                    if (value == null) {
                        if (formatProvider != null) {
                            throw new Bridge.ArgumentNullException("String", "Value cannot be null.");
                        }

                        return 0;
                    }

                    if (isFloating) {
                        if (typeCode === typeCodes.Decimal) {
                            if (!/^[+-]?[0-9]+[.,]?[0-9]$/.test(value)) {
                                if (!/^[+-]?[0-9]+$/.test(value)) {
                                    throw new Bridge.FormatException("Input string was not in a correct format.");
                                }
                            }

                            value = Bridge.Decimal(value, formatProvider);
                        } else {
                            if (!/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(value)) {
                                throw new Bridge.FormatException("Input string was not in a correct format.");
                            }

                            value = parseFloat(value);
                        }
                    } else {
                        if (!/^[+-]?[0-9]+$/.test(value)) {
                            throw new Bridge.FormatException("Input string was not in a correct format.");
                        }

                        value = parseInt(value, 10);
                    }

                    if (isNaN(value)) {
                        throw new Bridge.FormatException("Input string was not in a correct format.");
                    }

                    scope.internal.validateNumberRange(value, typeCode, true);

                    return value;

                case "object":
                    if (value == null) {
                        return 0;
                    }

                    if (Bridge.isDate(value)) {
                        scope.internal.throwInvalidCastEx(scope.convert.typeCodes.DateTime, typeCode);
                    }

                    break;
            }

            // TODO: #822 When IConvertible is implemented, try it before throwing InvalidCastEx
            valueTypeCode = valueTypeCode || scope.internal.suggestTypeCode(value);
            scope.internal.throwInvalidCastEx(valueTypeCode, typeCode);

            // try converting using IConvertible
            return scope.convert.convertToType(typeCode, value, formatProvider);
        },

        validateNumberRange: function (value, typeCode, denyInfinity) {
            var typeCodes = scope.convert.typeCodes;
            var minValue = scope.internal.getMinValue(typeCode);
            var maxValue = scope.internal.getMaxValue(typeCode);
            var typeName = scope.internal.getTypeCodeName(typeCode);

            if (typeCode === typeCodes.Single ||
                typeCode === typeCodes.Double) {

                if (!denyInfinity && (value === Infinity || value === -Infinity)) {
                    return;
                }
            }

            if (value < minValue || value > maxValue) {
                throw new Bridge.OverflowException("Value was either too large or too small for '" + typeName + "'.");
            }
        },

        roundToInt: function (value, typeCode) {
            if (value % 1 === 0) {
                return value;
            }

            var intPart;

            if (value >= 0) {
                intPart = Math.floor(value);
            } else {
                intPart = -1 * Math.floor(-value);
            }

            var floatPart = value - intPart;

            var minValue = scope.internal.getMinValue(typeCode);
            var maxValue = scope.internal.getMaxValue(typeCode);

            if (value >= 0.0) {
                if (value < (maxValue + 0.5)) {
                    if (floatPart > 0.5 || floatPart === 0.5 && (intPart & 1) !== 0) {
                        ++intPart;
                    }

                    return intPart;
                }
            } else if (value >= (minValue - 0.5)) {
                if (floatPart < -0.5 || floatPart === -0.5 && (intPart & 1) !== 0) {
                    --intPart;
                }

                return intPart;
            }

            var typeName = scope.internal.getTypeCodeName(typeCode);

            throw new Bridge.OverflowException("Value was either too large or too small for an '" + typeName + "'.");
        },

        toBase64_CalculateAndValidateOutputLength: function (inputLength, insertLineBreaks) {
            var base64LineBreakPosition = scope.internal.base64LineBreakPosition;

            var outlen = ~~(inputLength / 3) * 4;           // the base length - we want integer division here. 
            outlen += ((inputLength % 3) !== 0) ? 4 : 0;    // at most 4 more chars for the remainder

            if (outlen === 0) {
                return 0;
            }

            if (insertLineBreaks) {
                var newLines = ~~(outlen / base64LineBreakPosition);

                if ((outlen % base64LineBreakPosition) === 0) {
                    --newLines;
                }

                outlen += newLines * 2;                     // the number of line break chars we'll add, "\r\n"
            }

            // If we overflow an int then we cannot allocate enough
            // memory to output the value so throw
            if (outlen > 2147483647) {
                throw new Bridge.OutOfMemoryException();
            }

            return outlen;
        },

        convertToBase64Array: function (outChars, inData, offset, length, insertLineBreaks) {
            var base64Table = scope.internal.base64Table;
            var base64LineBreakPosition = scope.internal.base64LineBreakPosition;
            var lengthmod3 = length % 3;
            var calcLength = offset + (length - lengthmod3);
            var charCount = 0;
            var j = 0;

            // Convert three bytes at a time to base64 notation.  This will consume 4 chars.
            var i;

            for (i = offset; i < calcLength; i += 3) {
                if (insertLineBreaks) {
                    if (charCount === base64LineBreakPosition) {
                        outChars[j++] = "\r";
                        outChars[j++] = "\n";
                        charCount = 0;
                    }

                    charCount += 4;
                }

                outChars[j] = base64Table[(inData[i] & 0xfc) >> 2];
                outChars[j + 1] = base64Table[((inData[i] & 0x03) << 4) | ((inData[i + 1] & 0xf0) >> 4)];
                outChars[j + 2] = base64Table[((inData[i + 1] & 0x0f) << 2) | ((inData[i + 2] & 0xc0) >> 6)];
                outChars[j + 3] = base64Table[(inData[i + 2] & 0x3f)];
                j += 4;
            }

            //Where we left off before
            i = calcLength;

            if (insertLineBreaks && (lengthmod3 !== 0) && (charCount === scope.internal.base64LineBreakPosition)) {
                outChars[j++] = "\r";
                outChars[j++] = "\n";
            }

            switch (lengthmod3) {
                case 2: //One character padding needed
                    outChars[j] = base64Table[(inData[i] & 0xfc) >> 2];
                    outChars[j + 1] = base64Table[((inData[i] & 0x03) << 4) | ((inData[i + 1] & 0xf0) >> 4)];
                    outChars[j + 2] = base64Table[(inData[i + 1] & 0x0f) << 2];
                    outChars[j + 3] = base64Table[64]; //Pad
                    j += 4;
                    break;

                case 1: // Two character padding needed
                    outChars[j] = base64Table[(inData[i] & 0xfc) >> 2];
                    outChars[j + 1] = base64Table[(inData[i] & 0x03) << 4];
                    outChars[j + 2] = base64Table[64]; //Pad
                    outChars[j + 3] = base64Table[64]; //Pad
                    j += 4;
                    break;
            }

            return j;
        },

        fromBase64CharPtr: function (input, offset, inputLength) {
            if (inputLength < 0) {
                throw new Bridge.ArgumentOutOfRangeException("inputLength", "Index was out of range. Must be non-negative and less than the size of the collection.");
            }

            if (offset < 0) {
                throw new Bridge.ArgumentOutOfRangeException("offset", "Value must be positive.");
            }

            // We need to get rid of any trailing white spaces.
            // Otherwise we would be rejecting input such as "abc= ":
            while (inputLength > 0) {
                var lastChar = input[offset + inputLength - 1];

                if (lastChar !== " " && lastChar !== "\n" && lastChar !== "\r" && lastChar !== "\t") {
                    break;
                }

                inputLength--;
            }

            // Compute the output length:
            var resultLength = scope.internal.fromBase64_ComputeResultLength(input, offset, inputLength);

            if (0 > resultLength) {
                throw new Bridge.InvalidOperationException("Contract voilation: 0 <= resultLength.");
            }

            // resultLength can be zero. We will still enter FromBase64_Decode and process the input.
            // It may either simply write no bytes (e.g. input = " ") or throw (e.g. input = "ab").

            // Create result byte blob:
            var decodedBytes = [];
            decodedBytes.length = resultLength;

            // Convert Base64 chars into bytes:
            scope.internal.fromBase64_Decode(input, offset, inputLength, decodedBytes, 0, resultLength);

            // We are done:
            return decodedBytes;
        },

        fromBase64_Decode: function (input, inputIndex, inputLength, dest, destIndex, destLength) {
            var startDestIndex = destIndex;

            // You may find this method weird to look at. Its written for performance, not aesthetics.
            // You will find unrolled loops label jumps and bit manipulations.

            var intA = "A".charCodeAt(0);
            var inta = "a".charCodeAt(0);
            var int0 = "0".charCodeAt(0);
            var intEq = "=".charCodeAt(0);
            var intPlus = "+".charCodeAt(0);
            var intSlash = "/".charCodeAt(0);
            var intSpace = " ".charCodeAt(0);
            var intTab = "\t".charCodeAt(0);
            var intNLn = "\n".charCodeAt(0);
            var intCRt = "\r".charCodeAt(0);
            var intAtoZ = ("Z".charCodeAt(0) - "A".charCodeAt(0));  // = ('z' - 'a')
            var int0To9 = ("9".charCodeAt(0) - "0".charCodeAt(0));

            var endInputIndex = inputIndex + inputLength;
            var endDestIndex = destIndex + destLength;

            // Current char code/value:
            var currCode;

            // This 4-byte integer will contain the 4 codes of the current 4-char group.
            // Eeach char codes for 6 bits = 24 bits.
            // The remaining byte will be FF, we use it as a marker when 4 chars have been processed.            
            var currBlockCodes = 0x000000FF;

            var allInputConsumed = false;
            var equalityCharEncountered = false;

            while (true) {
                // break when done:
                if (inputIndex >= endInputIndex) {
                    allInputConsumed = true;
                    break;
                }

                // Get current char:
                currCode = input[inputIndex].charCodeAt(0);
                inputIndex++;

                // Determine current char code (unsigned Int comparison):
                if (((currCode - intA) >>> 0) <= intAtoZ) {
                    currCode -= intA;
                } else if (((currCode - inta) >>> 0) <= intAtoZ) {
                    currCode -= (inta - 26);
                } else if (((currCode - int0) >>> 0) <= int0To9) {
                    currCode -= (int0 - 52);
                } else {
                    // Use the slower switch for less common cases:
                    switch (currCode) {
                        // Significant chars:
                        case intPlus:
                            currCode = 62;
                            break;

                        case intSlash:
                            currCode = 63;
                            break;

                            // Legal no-value chars (we ignore these):
                        case intCRt:
                        case intNLn:
                        case intSpace:
                        case intTab:
                            continue;

                            // The equality char is only legal at the end of the input.
                            // Jump after the loop to make it easier for the JIT register predictor to do a good job for the loop itself:
                        case intEq:
                            equalityCharEncountered = true;
                            break;

                            // Other chars are illegal:
                        default:
                            throw new Bridge.FormatException("The input is not a valid Base-64 string as it contains a non-base 64 character, more than two padding characters, or an illegal character among the padding characters.");
                    }
                }

                if (equalityCharEncountered) {
                    break;
                }

                // Ok, we got the code. Save it:
                currBlockCodes = (currBlockCodes << 6) | currCode;

                // Last bit in currBlockCodes will be on after in shifted right 4 times:
                if ((currBlockCodes & 0x80000000) !== 0) {

                    if ((endDestIndex - destIndex) < 3) {
                        return -1;
                    }

                    dest[destIndex] = 0xFF & (currBlockCodes >> 16);
                    dest[destIndex + 1] = 0xFF & (currBlockCodes >> 8);
                    dest[destIndex + 2] = 0xFF & (currBlockCodes);
                    destIndex += 3;

                    currBlockCodes = 0x000000FF;
                }

            } // end of while

            if (!allInputConsumed && !equalityCharEncountered) {
                throw new Bridge.InvalidOperationException("Contract violation: should never get here.");
            }

            if (equalityCharEncountered) {
                if (currCode !== intEq) {
                    throw new Bridge.InvalidOperationException("Contract violation: currCode == intEq.");
                }

                // Recall that inputIndex is now one position past where '=' was read.
                // '=' can only be at the last input pos:
                if (inputIndex === endInputIndex) {

                    // Code is zero for trailing '=':
                    currBlockCodes <<= 6;

                    // The '=' did not complete a 4-group. The input must be bad:
                    if ((currBlockCodes & 0x80000000) === 0) {
                        throw new Bridge.FormatException("Invalid length for a Base-64 char array or string.");
                    }

                    if ((endDestIndex - destIndex) < 2) {
                        // Autch! We underestimated the output length!
                        return -1;
                    }

                    // We are good, store bytes form this past group. We had a single "=", so we take two bytes:
                    dest[destIndex] = 0xFF & (currBlockCodes >> 16);
                    dest[destIndex + 1] = 0xFF & (currBlockCodes >> 8);
                    destIndex += 2;

                    currBlockCodes = 0x000000FF;

                } else { // '=' can also be at the pre-last position iff the last is also a '=' excluding the white spaces:

                    // We need to get rid of any intermediate white spaces.
                    // Otherwise we would be rejecting input such as "abc= =":
                    while (inputIndex < (endInputIndex - 1)) {
                        var lastChar = input[inputIndex];

                        if (lastChar !== " " && lastChar !== "\n" && lastChar !== "\r" && lastChar !== "\t") {
                            break;
                        }

                        inputIndex++;
                    }

                    if (inputIndex === (endInputIndex - 1) && input[inputIndex] === "=") {
                        // Code is zero for each of the two '=':
                        currBlockCodes <<= 12;

                        // The '=' did not complete a 4-group. The input must be bad:
                        if ((currBlockCodes & 0x80000000) === 0) {
                            throw new Bridge.FormatException("Invalid length for a Base-64 char array or string.");
                        }

                        if ((endDestIndex - destIndex) < 1) {
                            // Autch! We underestimated the output length!
                            return -1;
                        }

                        // We are good, store bytes form this past group. We had a "==", so we take only one byte:
                        dest[destIndex] = 0xFF & (currBlockCodes >> 16);
                        destIndex++;

                        currBlockCodes = 0x000000FF;

                    } else {
                        // '=' is not ok at places other than the end:
                        throw new Bridge.FormatException("The input is not a valid Base-64 string as it contains a non-base 64 character, more than two padding characters, or an illegal character among the padding characters.");
                    }
                }

            }

            // We get here either from above or by jumping out of the loop:
            // The last block of chars has less than 4 items
            if (currBlockCodes !== 0x000000FF) {
                throw new Bridge.FormatException("Invalid length for a Base-64 char array or string.");
            }

            // Return how many bytes were actually recovered:
            return (destIndex - startDestIndex);

        },

        fromBase64_ComputeResultLength: function (input, startIndex, inputLength) {
            var intEq = "=";
            var intSpace = " ";

            if (inputLength < 0) {
                throw new Bridge.ArgumentOutOfRangeException("inputLength", "Index was out of range. Must be non-negative and less than the size of the collection.");
            }

            var endIndex = startIndex + inputLength;
            var usefulInputLength = inputLength;
            var padding = 0;

            while (startIndex < endIndex) {

                var c = input[startIndex];
                startIndex++;

                // We want to be as fast as possible and filter out spaces with as few comparisons as possible.
                // We end up accepting a number of illegal chars as legal white-space chars.
                // This is ok: as soon as we hit them during actual decode we will recognise them as illegal and throw.
                if (c <= intSpace) {
                    usefulInputLength--;
                } else if (c === intEq) {
                    usefulInputLength--;
                    padding++;
                }
            }

            if (0 > usefulInputLength) {
                throw new Bridge.InvalidOperationException("Contract violation: 0 <= usefulInputLength.");
            }

            if (0 > padding) {
                // For legal input, we can assume that 0 <= padding < 3. But it may be more for illegal input.
                // We will notice it at decode when we see a '=' at the wrong place.
                throw new Bridge.InvalidOperationException("Contract violation: 0 <= padding.");
            }

            // Perf: reuse the variable that stored the number of '=' to store the number of bytes encoded by the
            // last group that contains the '=':
            if (padding !== 0) {
                if (padding === 1) {
                    padding = 2;
                } else if (padding === 2) {
                    padding = 1;
                } else {
                    throw new Bridge.FormatException("The input is not a valid Base-64 string as it contains a non-base 64 character, more than two padding characters, or an illegal character among the padding characters.");
                }
            }

            // Done:
            return ~~(usefulInputLength / 4) * 3 + padding;
        },

        charsToCodes: function (chars, codes, codesOffset) {
            if (chars == null) {
                return null;
            }

            codesOffset = codesOffset || 0;

            if (codes == null) {
                codes = [];
                codes.length = chars.length;
            }

            for (var i = 0; i < chars.length; i++) {
                codes[i + codesOffset] = chars[i].charCodeAt(0);
            }

            return codes;
        },

        codesToChars: function (codes, chars) {
            if (codes == null) {
                return null;
            }

            chars = chars || [];

            for (var i = 0; i < codes.length; i++) {
                var code = codes[i];

                chars[i] = String.fromCharCode(code);
            }

            return chars;
        },

        throwInvalidCastEx: function (fromTypeCode, toTypeCode) {
            var fromType = scope.internal.getTypeCodeName(fromTypeCode);
            var toType = scope.internal.getTypeCodeName(toTypeCode);

            throw new Bridge.InvalidCastException("Invalid cast from '" + fromType + "' to '" + toType + "'.");
        }
    };

    Bridge.Convert = scope.convert;
