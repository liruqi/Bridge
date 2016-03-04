using Bridge;

namespace System
{
    [External]
    [Name("Convert")]
    public static class Convert
    {
        #region ToBoolean

        /// <summary>
        /// Converts the value of a specified object to an equivalent Boolean value.
        /// Note: Calling this method for <see cref="char"/> and <see cref="DateTime"/> values always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toBoolean({value})")]
        public static extern bool ToBoolean(object value);

        /// <summary>
        /// Converts the value of the specified object to an equivalent Boolean value, using the specified culture-specific formatting information.
        /// Note: Calling this method for <see cref="char"/> and <see cref="DateTime"/> values always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toBoolean({value}, {provider})")]
        public static extern bool ToBoolean(object value, IFormatProvider provider);

        #endregion ToBoolean

        #region ToChar

        /// <summary>
        /// Converts the value of the specified object to a Unicode character.
        /// Note: Calling this method for <see cref="bool"/>, <see cref="float"/>, <see cref="double"/>, <see cref="decimal"/> and <see cref="DateTime"/> values always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.Object + ")")]
        public static extern char ToChar(object value);

        /// <summary>
        /// Converts the value of the specified object to its equivalent Unicode character, using the specified culture-specific formatting information.
        /// Note: Calling this method for <see cref="bool"/>, <see cref="float"/>, <see cref="double"/>, <see cref="decimal"/> and <see cref="DateTime"/> values always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, {provider}, " + TypeCodeValues.Object + ")")]
        public static extern char ToChar(object value, IFormatProvider provider);

        /// <summary>
        /// Calling this method always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.Boolean + ")")]
        public static extern char ToChar(bool value);

        /// <summary>
        /// Returns the specified Unicode character value; no actual conversion is performed.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.Char + ")")]
        public static extern char ToChar(char value);

        /// <summary>
        /// Converts the value of the specified 8-bit signed integer to its equivalent Unicode character.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.SByte + ")")]
        public static extern char ToChar(sbyte value);

        /// <summary>
        /// Converts the value of the specified 8-bit unsigned integer to its equivalent Unicode character.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.Byte + ")")]
        public static extern char ToChar(byte value);

        /// <summary>
        /// Converts the value of the specified 16-bit signed integer to its equivalent Unicode character.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.Int16 + ")")]
        public static extern char ToChar(short value);

        /// <summary>
        /// Converts the value of the specified 16-bit unsigned integer to its equivalent Unicode character.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.UInt16 + ")")]
        public static extern char ToChar(ushort value);

        /// <summary>
        /// Converts the value of the specified 32-bit signed integer to its equivalent Unicode character.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.Int32 + ")")]
        public static extern char ToChar(int value);

        /// <summary>
        /// Converts the value of the specified 32-bit unsigned integer to its equivalent Unicode character.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.UInt32 + ")")]
        public static extern char ToChar(uint value);

        /// <summary>
        /// Converts the value of the specified 64-bit signed integer to its equivalent Unicode character.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.Int64 + ")")]
        public static extern char ToChar(long value);

        /// <summary>
        /// Converts the value of the specified 64-bit unsigned integer to its equivalent Unicode character.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.UInt64 + ")")]
        public static extern char ToChar(ulong value);

        /// <summary>
        /// Converts the value of the specified object to a Unicode character.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.String + ")")]
        public static extern char ToChar(string value);

        /// <summary>
        /// Converts the value of the specified object to its equivalent Unicode character, using the specified culture-specific formatting information.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, {provider}, " + TypeCodeValues.String + ")")]
        public static extern char ToChar(string value, IFormatProvider provider);

        /// <summary>
        /// Calling this method always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.Single + ")")]
        public static extern char ToChar(float value);

        /// <summary>
        /// Calling this method always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.Double + ")")]
        public static extern char ToChar(double value);

        /// <summary>
        /// Calling this method always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.Decimal + ")")]
        public static extern char ToChar(decimal value);

        /// <summary>
        /// Calling this method always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toChar({value}, null, " + TypeCodeValues.DateTime + ")")]
        public static extern char ToChar(DateTime value);

        #endregion ToChar

        #region ToSByte

        /// <summary>
        /// Converts the value of the specified object to an 8-bit signed integer.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toSByte({value})")]
        public static extern sbyte ToSByte(object value);

        /// <summary>
        /// Converts the value of the specified object to an 8-bit signed integer, using the specified culture-specific formatting information.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toSByte({value}, {provider})")]
        public static extern sbyte ToSByte(object value, IFormatProvider provider);

        /// <summary>
        /// Converts the value of the specified object to an 8-bit signed integer.
        /// </summary>
        [Template("Bridge.Convert.toSByte({value}, null, " + TypeCodeValues.String + ")")]
        public static extern sbyte ToSByte(string value);

        /// <summary>
        /// Converts the value of the specified object to an 8-bit signed integer, using the specified culture-specific formatting information.
        /// </summary>
        [Template("Bridge.Convert.toSByte({value}, {provider}, " + TypeCodeValues.String + ")")]
        public static extern sbyte ToSByte(string value, IFormatProvider provider);

        #endregion ToSByte

        #region ToByte

        /// <summary>
        /// Converts the value of the specified object to an 8-bit unsigned integer.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toByte({value})")]
        public static extern byte ToByte(object value);

        /// <summary>
        /// Converts the value of the specified object to an 8-bit unsigned integer, using the specified culture-specific formatting information.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toByte({value}, {provider})")]
        public static extern byte ToByte(object value, IFormatProvider provider);

        #endregion ToByte

        #region ToInt16

        /// <summary>
        /// Converts the value of the specified object to a 16-bit signed integer.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toInt16({value})")]
        public static extern short ToInt16(object value);

        /// <summary>
        /// Converts the value of the specified object to a 16-bit signed integer, using the specified culture-specific formatting information.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toInt16({value}, {provider})")]
        public static extern short ToInt16(object value, IFormatProvider provider);

        #endregion ToInt16

        #region ToUInt16

        /// <summary>
        /// Converts the value of the specified object to a 16-bit unsigned integer.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toUInt16({value})")]
        public static extern ushort ToUInt16(object value);

        /// <summary>
        /// Converts the value of the specified object to a 16-bit unsigned integer, using the specified culture-specific formatting information.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toUInt16({value}, {provider})")]
        public static extern ushort ToUInt16(object value, IFormatProvider provider);

        #endregion ToUInt16

        #region ToInt32

        /// <summary>
        /// Converts the value of the specified object to a 32-bit signed integer.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toInt32({value})")]
        public static extern int ToInt32(object value);

        /// <summary>
        /// Converts the value of the specified object to a 32-bit signed integer, using the specified culture-specific formatting information.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toInt32({value}, {provider})")]
        public static extern int ToInt32(object value, IFormatProvider provider);

        #endregion ToInt32

        #region ToUInt32

        /// <summary>
        /// Converts the value of the specified object to a 32-bit unsigned integer.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toUInt32({value})")]
        public static extern uint ToUInt32(object value);

        /// <summary>
        /// Converts the value of the specified object to a 32-bit unsigned integer, using the specified culture-specific formatting information.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toUInt32({value}, {provider})")]
        public static extern uint ToUInt32(object value, IFormatProvider provider);

        #endregion ToUInt32

        #region ToInt64

        /// <summary>
        /// Converts the value of the specified object to a 64-bit signed integer.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toInt64({value})")]
        public static extern long ToInt64(object value);

        /// <summary>
        /// Converts the value of the specified object to a 64-bit signed integer, using the specified culture-specific formatting information.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toInt64({value}, {provider})")]
        public static extern long ToInt64(object value, IFormatProvider provider);

        #endregion ToInt64

        #region ToUInt64

        /// <summary>
        /// Converts the value of the specified object to a 64-bit unsigned integer.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toUInt64({value})")]
        public static extern ulong ToUInt64(object value);

        /// <summary>
        /// Converts the value of the specified object to a 64-bit unsigned integer, using the specified culture-specific formatting information.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toUInt64({value}, {provider})")]
        public static extern ulong ToUInt64(object value, IFormatProvider provider);

        #endregion ToUInt64

        #region ToSingle

        /// <summary>
        /// Converts the value of the specified object to a single-precision floating-point number.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toSingle({value})")]
        public static extern float ToSingle(object value);

        /// <summary>
        /// Converts the value of the specified object to an single-precision floating-point number, using the specified culture-specific formatting information.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toSingle({value}, {provider})")]
        public static extern float ToSingle(object value, IFormatProvider provider);

        #endregion ToSingle

        #region ToDouble

        /// <summary>
        /// Converts the value of the specified object to a double-precision floating-point number.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toDouble({value})")]
        public static extern double ToDouble(object value);

        /// <summary>
        /// Converts the value of the specified object to an double-precision floating-point number, using the specified culture-specific formatting information.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toDouble({value}, {provider})")]
        public static extern double ToDouble(object value, IFormatProvider provider);

        #endregion ToDouble

        #region ToDecimal

        /// <summary>
        /// Converts the value of the specified object to an equivalent decimal number.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toDecimal({value})")]
        public static extern decimal ToDecimal(object value);

        /// <summary>
        /// Converts the value of the specified object to an equivalent decimal number, using the specified culture-specific formatting information.
        /// Note: Calling this method for <see cref="DateTime"/> value always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toDecimal({value}, {provider})")]
        public static extern decimal ToDecimal(object value, IFormatProvider provider);

        #endregion ToDecimal

        #region ToDateTime

        /// <summary>
        /// Converts the value of the specified object to a <see cref="T:System.DateTime"/> object.
        /// Note: Calling this method for built-in types (except <see cref="DateTime"/>, <see cref="string"/>) always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toDateTime({value})")]
        public static extern DateTime ToDateTime(object value);

        /// <summary>
        /// Converts the value of the specified object to a <see cref="T:System.DateTime"/> object, using the specified culture-specific formatting information.
        /// Note: Calling this method for built-in types (except <see cref="DateTime"/>, <see cref="string"/>) always throws <see cref="T:System.InvalidCastException"/>.
        /// </summary>
        [Template("Bridge.Convert.toDateTime({value}, {provider})")]
        public static extern DateTime ToDateTime(object value, IFormatProvider provider);

        #endregion ToDateTime

        #region ToString

        /// <summary>
        /// Converts the value of the specified object to its equivalent string representation.
        /// </summary>
        [Template("Bridge.Convert.toString({value})")]
        public static extern string ToString(object value);

        /// <summary>
        /// Converts the value of the specified object to its equivalent string representation using the specified culture-specific formatting information.
        /// </summary>
        [Template("Bridge.Convert.toString({value}, {provider})")]
        public static extern string ToString(object value, IFormatProvider provider);

        /// <summary>
        /// Converts the value of the specified object to its equivalent string representation.
        /// </summary>
        [Template("Bridge.Convert.toString({value}, null, " + TypeCodeValues.Char + ")")]
        public static extern string ToString(char value);

        /// <summary>
        /// Converts the value of the specified object to its equivalent string representation using the specified culture-specific formatting information.
        /// </summary>
        [Template("Bridge.Convert.toString({value}, {provider}, " + TypeCodeValues.Char + ")")]
        public static extern string ToString(char value, IFormatProvider provider);

        #endregion ToString

        #region ToNumberFromBase

        /// <summary>
        /// Converts the string representation of a number in a specified base to an equivalent 8-bit unsigned integer.
        /// </summary>
        [Template("Bridge.Convert.toNumberInBase({value}, {fromBase}, " + TypeCodeValues.Byte + ")")]
        public static extern byte ToByte(string value, int fromBase);

        /// <summary>
        /// Converts the string representation of a number in a specified base to an equivalent 8-bit signed integer.
        /// </summary>
        [Template("Bridge.Convert.toNumberInBase({value}, {fromBase}, " + TypeCodeValues.SByte + ")")]
        public static extern sbyte ToSByte(string value, int fromBase);

        /// <summary>
        /// Converts the string representation of a number in a specified base to an equivalent 16-bit signed integer.
        /// </summary>
        [Template("Bridge.Convert.toNumberInBase({value}, {fromBase}, " + TypeCodeValues.Int16 + ")")]
        public static extern short ToInt16(string value, int fromBase);

        /// <summary>
        /// Converts the string representation of a number in a specified base to an equivalent 16-bit unsigned integer.
        /// </summary>
        [Template("Bridge.Convert.toNumberInBase({value}, {fromBase}, " + TypeCodeValues.UInt16 + ")")]
        public static extern ushort ToUInt16(string value, int fromBase);

        /// <summary>
        /// Converts the string representation of a number in a specified base to an equivalent 32-bit signed integer.
        /// </summary>
        [Template("Bridge.Convert.toNumberInBase({value}, {fromBase}, " + TypeCodeValues.Int32 + ")")]
        public static extern int ToInt32(string value, int fromBase);

        /// <summary>
        /// Converts the string representation of a number in a specified base to an equivalent 32-bit unsigned integer.
        /// </summary>
        [Template("Bridge.Convert.toNumberInBase({value}, {fromBase}, " + TypeCodeValues.UInt32 + ")")]
        public static extern uint ToUInt32(string value, int fromBase);

        /// <summary>
        /// Converts the string representation of a number in a specified base to an equivalent 64-bit signed integer.
        /// </summary>
        [Template("Bridge.Convert.toNumberInBase({value}, {fromBase}, " + TypeCodeValues.Int64 + ")")]
        public static extern long ToInt64(string value, int fromBase);

        /// <summary>
        /// Converts the string representation of a number in a specified base to an equivalent 64-bit unsigned integer.
        /// </summary>
        [Template("Bridge.Convert.toNumberInBase({value}, {fromBase}, " + TypeCodeValues.UInt64 + ")")]
        public static extern ulong ToUInt64(string value, int fromBase);

        #endregion ToNumberFromBase

        #region ToStringInBase

        /// <summary>
        /// Converts the value of an 8-bit unsigned integer to its equivalent string representation in a specified base.
        /// </summary>
        [Template("Bridge.Convert.toStringInBase({value}, {toBase}, " + TypeCodeValues.Byte + ")")]
        public static extern string ToString(byte value, int toBase);

        /// <summary>
        /// Converts the value of a 16-bit signed integer to its equivalent string representation in a specified base.
        /// </summary>
        [Template("Bridge.Convert.toStringInBase({value}, {toBase}, " + TypeCodeValues.Int16 + ")")]
        public static extern string ToString(short value, int toBase);

        /// <summary>
        /// Converts the value of a 32-bit signed integer to its equivalent string representation in a specified base.
        /// </summary>
        [Template("Bridge.Convert.toStringInBase({value}, {toBase}, " + TypeCodeValues.Int32 + ")")]
        public static extern string ToString(int value, int toBase);

        /// <summary>
        /// Converts the value of a 64-bit signed integer to its equivalent string representation in a specified base.
        /// </summary>
        [Template("Bridge.Convert.toStringInBase({value}, {toBase}, " + TypeCodeValues.Int64 + ")")]
        public static extern string ToString(long value, int toBase);

        #endregion ToStringInBase

        #region ToBase64String

        /// <summary>
        /// Converts an array of 8-bit unsigned integers to its equivalent string representation that is encoded with base-64 digits.
        /// </summary>
        [Template("Bridge.Convert.toBase64String({inArray}, null, null, null)")]
        public static extern string ToBase64String(byte[] inArray);

        /// <summary>
        /// Converts an array of 8-bit unsigned integers to its equivalent string representation that is encoded with base-64 digits. A parameter specifies whether to insert line breaks in the return value.
        /// </summary>
        /// <param name="inArray">An array of 8-bit unsigned integers. </param><param name="options"><see cref="F:System.Base64FormattingOptions.InsertLineBreaks"/> to insert a line break every 76 characters, or <see cref="F:System.Base64FormattingOptions.None"/> to not insert line breaks.</param><exception cref="T:System.ArgumentNullException"><paramref name="inArray"/> is null. </exception><exception cref="T:System.ArgumentException"><paramref name="options"/> is not a valid <see cref="T:System.Base64FormattingOptions"/> value. </exception><filterpriority>1</filterpriority>
        [Template("Bridge.Convert.toBase64String({inArray}, null, null, {options})")]
        public static extern string ToBase64String(byte[] inArray, Base64FormattingOptions options);

        /// <summary>
        /// Converts a subset of an array of 8-bit unsigned integers to its equivalent string representation that is encoded with base-64 digits. Parameters specify the subset as an offset in the input array, and the number of elements in the array to convert.
        /// </summary>
        [Template("Bridge.Convert.toBase64String({inArray}, {offset}, {length}, null)")]
        public static extern string ToBase64String(byte[] inArray, int offset, int length);

        /// <summary>
        /// Converts a subset of an array of 8-bit unsigned integers to its equivalent string representation that is encoded with base-64 digits. Parameters specify the subset as an offset in the input array, the number of elements in the array to convert, and whether to insert line breaks in the return value.
        /// </summary>
        [Template("Bridge.Convert.toBase64String({inArray}, {offset}, {length}, {options})")]
        public static extern string ToBase64String(byte[] inArray, int offset, int length, Base64FormattingOptions options);

        #endregion ToBase64String

        #region ToBase64CharArray

        /// <summary>
        /// Converts a subset of an 8-bit unsigned integer array to an equivalent subset of a Unicode character array encoded with base-64 digits. Parameters specify the subsets as offsets in the input and output arrays, and the number of elements in the input array to convert.
        /// </summary>
        ///
        /// <returns>
        /// A 32-bit signed integer containing the number of bytes in <paramref name="outArray"/>.
        /// </returns>
        [Template("Bridge.Convert.toBase64CharArray({inArray}, {offsetIn}, {length}, {outArray}, {offsetOut}, null)")]
        public static extern int ToBase64CharArray(byte[] inArray, int offsetIn, int length, char[] outArray, int offsetOut);

        /// <summary>
        /// Converts a subset of an 8-bit unsigned integer array to an equivalent subset of a Unicode character array encoded with base-64 digits. Parameters specify the subsets as offsets in the input and output arrays, the number of elements in the input array to convert, and whether line breaks are inserted in the output array.
        /// </summary>
        ///
        /// <returns>
        /// A 32-bit signed integer containing the number of bytes in <paramref name="outArray"/>.
        /// </returns>
        [Template("Bridge.Convert.toBase64CharArray({inArray}, {offsetIn}, {length}, {outArray}, {offsetOut}, {options})")]
        public static extern int ToBase64CharArray(byte[] inArray, int offsetIn, int length, char[] outArray, int offsetOut, Base64FormattingOptions options);

        #endregion ToBase64CharArray

        #region FromBase64String

        /// <summary>
        /// Converts the specified string, which encodes binary data as base-64 digits, to an equivalent 8-bit unsigned integer array.
        /// </summary>
        [Template("Bridge.Convert.fromBase64String({s})")]
        public static extern byte[] FromBase64String(string s);

        #endregion FromBase64String

        #region FromBase64CharArray

        /// <summary>
        /// Converts a subset of a Unicode character array, which encodes binary data as base-64 digits, to an equivalent 8-bit unsigned integer array. Parameters specify the subset in the input array and the number of elements to convert.
        /// </summary>
        [Template("Bridge.Convert.fromBase64CharArray({inArray}, {offset}, {length})")]
        public static extern byte[] FromBase64CharArray(char[] inArray, int offset, int length);

        #endregion FromBase64CharArray
    }
}