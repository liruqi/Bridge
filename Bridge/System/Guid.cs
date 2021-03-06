using System.Runtime.CompilerServices;
using Bridge;

namespace System
{
	/// <summary>
	/// The Guid data type which is mapped to the string type in Javascript.
	/// </summary>
	[Name("Bridge.Guid")]
	[External]
	public struct Guid : IEquatable<Guid>, IComparable<Guid>, IFormattable
	{
        [Template("Bridge.Guid.empty")]
		private extern Guid(DummyTypeUsedToAddAttributeToDefaultValueTypeConstructor _);

        [Template("Bridge.Guid.parse({uuid})")]
		public extern Guid(string uuid);

        [Template("Bridge.Guid.fromBytes({b})")]
		public extern Guid(byte[] b);

        [Template("Bridge.Guid.fromBytes([({a} >> 24) & 0xff, ({a} >> 16) & 0xff, ({a} >> 8) & 0xff, {a} & 0xff, ({b} >> 8) & 0xff, {b} & 0xff, ({c} >> 8) & 0xff, {c} & 0xff].concat({d}))")]
		public extern Guid(int a, short b, short c, byte[] d);

        [Template("Bridge.Guid.fromBytes([({a} >> 24) & 0xff, ({a} >> 16) & 0xff, ({a} >> 8) & 0xff, {a} & 0xff, ({b} >> 8) & 0xff, {b} & 0xff, ({c} >> 8) & 0xff, {c} & 0xff, {d} & 0xff, {e} & 0xff, {f} & 0xff, {g} & 0xff, {h} & 0xff, {i} & 0xff, {j} & 0xff, {k} & 0xff])")]
		public extern Guid(int a, short b, short c, byte d, byte e, byte f, byte g, byte h, byte i, byte j, byte k);

        [Template("Bridge.Guid.fromBytes([({a} >> 24) & 0xff, ({a} >> 16) & 0xff, ({a} >> 8) & 0xff, {a} & 0xff, ({b} >> 8) & 0xff, {b} & 0xff, ({c} >> 8) & 0xff, {c} & 0xff, {d} & 0xff, {e} & 0xff, {f} & 0xff, {g} & 0xff, {h} & 0xff, {i} & 0xff, {j} & 0xff, {k} & 0xff])")]
		public extern Guid(uint a, ushort b, ushort c, byte d, byte e, byte f, byte g, byte h, byte i, byte j, byte k);

        [Template("Bridge.equalsT({this}, {other})")]
		public extern bool Equals(Guid other);

        [Template("Bridge.compare({this}, {other})")]
		public extern int CompareTo(Guid other);

        [Template("Bridge.Guid.format({this}, {format})")]
		public extern string ToString(string format);

        [Template("Bridge.Guid.getBytes({this})")]
		public extern byte[] ToByteArray();

		public static readonly Guid Empty = new Guid();

		public static extern Guid Parse(string input);

		[Name("parse")]
		public static extern Guid ParseExact(string input, string format);

        [Template("Bridge.Guid.tryParse({input}, null, {result})")]
		public static extern bool TryParse(string input, out Guid result);

		[Name("tryParse")]
		public static extern bool TryParseExact(string input, string format, out Guid result);

		public static extern Guid NewGuid();

		[Template("{a} === {b}")]
		public static extern bool operator==(Guid a, Guid b);

        [Template("{a} !== {b}")]
		public static extern bool operator!=(Guid a, Guid b);

        [Template("Bridge.Guid.format({this}, {format})")]
	    public extern string Format(string format, IFormatProvider formatProvider);
	}
}
