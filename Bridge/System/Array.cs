using Bridge;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace System
{
    [External]
    [Name("Array")]
    public sealed class Array : IEnumerable, ICloneable
    {
        public readonly int Length = 0;

        private Array()
        {
        }

        public object this[int index]
        {
            [External]
            get
            {
                return null;
            }
            [External]
            set
            {
            }
        }

        [Template("new Bridge.ReadOnlyCollection$1({T})({array})")]
        public extern static ReadOnlyCollection<T> AsReadOnly<T>(T[] array);

        [Template("Bridge.Array.convertAll({array}, {converter})")]
        public extern static TOutput[] ConvertAll<TInput, TOutput>(TInput[] array, Converter<TInput, TOutput> converter);

        [Template("(Bridge.Array.findIndex({array}, {match}) !== -1)")]
        public extern static bool Exists<T>(T[] array, Predicate<T> match);

        [Template("Bridge.Array.find({T}, {array}, {match})")]
        public extern static T Find<T>(T[] array, Predicate<T> match);

        [Template("Bridge.Array.findAll({array}, {match})")]
        public extern static T[] FindAll<T>(T[] array, Predicate<T> match);

        [Template("Bridge.Array.findIndex({array}, {match})")]
        public extern static int FindIndex<T>(T[] array, Predicate<T> match);

        [Template("Bridge.Array.findIndex({array}, {startIndex}, {match})")]
        public extern static int FindIndex<T>(T[] array, int startIndex, Predicate<T> match);

        [Template("Bridge.Array.findIndex({array}, {startIndex}, {count}, {match})")]
        public extern static int FindIndex<T>(T[] array, int startIndex, int count, Predicate<T> match);

        [Template("Bridge.Array.findLast({T}, {array}, {match})")]
        public extern static T FindLast<T>(T[] array, Predicate<T> match);

        [Template("Bridge.Array.findLastIndex({array}, {match})")]
        public extern static int FindLastIndex<T>(T[] array, Predicate<T> match);

        [Template("Bridge.Array.findLastIndex({array}, {startIndex}, {match})")]
        public extern static int FindLastIndex<T>(T[] array, int startIndex, Predicate<T> match);

        [Template("Bridge.Array.findLastIndex({array}, {startIndex}, {count}, {match})")]
        public extern static int FindLastIndex<T>(T[] array, int startIndex, int count, Predicate<T> match);

        [Template("Bridge.Array.forEach({array}, {action})")]
        public extern static void ForEach<T>(T[] array, Action<T> action);

        [Template("Bridge.Array.indexOfT({array}, {value})")]
        public extern static int IndexOf(Array array, Object value);

        [Template("Bridge.Array.indexOfT({array}, {value}, {startIndex})")]
        public extern static int IndexOf(Array array, Object value, int startIndex);

        [Template("Bridge.Array.indexOfT({array}, {value}, {startIndex}, {count})")]
        public extern static int IndexOf(Array array, Object value, int startIndex, int count);

        [Template("Bridge.Array.indexOfT({array}, {value})")]
        public extern static int IndexOf<T>(T[] array, T value);

        [Template("Bridge.Array.indexOfT({array}, {value}, {startIndex})")]
        public extern static int IndexOf<T>(T[] array, T value, int startIndex);

        [Template("Bridge.Array.indexOfT({array}, {value}, {startIndex}, {count})")]
        public static extern int IndexOf<T>(T[] array, T value, int startIndex, int count);

        [Template("Bridge.Array.lastIndexOfT({array}, {value})")]
        public extern static int LastIndexOf(Array array, Object value);

        [Template("Bridge.Array.lastIndexOfT({array}, {value}, {startIndex})")]
        public extern static int LastIndexOf(Array array, Object value, int startIndex);

        [Template("Bridge.Array.lastIndexOfT({array}, {value}, {startIndex}, {count})")]
        public extern static int LastIndexOf(Array array, Object value, int startIndex, int count);

        [Template("Bridge.Array.lastIndexOfT({array}, {value})")]
        public extern static int LastIndexOf<T>(T[] array, T value);

        [Template("Bridge.Array.lastIndexOfT({array}, {value}, {startIndex})")]
        public extern static int LastIndexOf<T>(T[] array, T value, int startIndex);

        [Template("Bridge.Array.lastIndexOfT({array}, {value}, {startIndex}, {count})")]
        public static extern int LastIndexOf<T>(T[] array, T value, int startIndex, int count);

        [Template("Bridge.Array.trueForAll({array}, {match})")]
        public extern static bool TrueForAll<T>(T[] array, Predicate<T> match);

        public extern Array Concat(params object[] items);

        /// <summary>
        /// The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
        /// </summary>
        /// <param name="searchElement"></param>
        /// <returns></returns>
        public extern int IndexOf(string searchElement);

        /// <summary>
        /// The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
        /// </summary>
        /// <param name="searchElement"></param>
        /// <param name="fromIndex"></param>
        /// <returns></returns>
        public extern int IndexOf(string searchElement, int fromIndex);

        /// <summary>
        /// The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
        /// </summary>
        /// <param name="searchString"></param>
        /// <returns></returns>
        public extern int LastIndexOf(string searchString);

        /// <summary>
        /// The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
        /// </summary>
        /// <param name="searchString"></param>
        /// <param name="fromIndex"></param>
        /// <returns></returns>
        public extern int LastIndexOf(string searchString, int fromIndex);

        public extern string Join();

        public extern string Join(string separator);

        public extern object Pop();

        public extern void Reverse();

        public extern object Shift();

        public extern Array Slice(int start);

        public extern Array Slice(int start, int end);

        [Name("sort")]
        public extern void JsSort();

        [Name("sort")]
        public extern void JsSort(Func<object, object, int> compareFunction);

        public extern Array Splice(int start, int deleteCount, params object[] newItems);

        public extern void Unshift(params object[] items);

        [Template("Bridge.getEnumerator({this})")]
        public extern IEnumerator GetEnumerator();

        [Template("Bridge.Array.get({this}, {indices})")]
        public extern object GetValue(params int[] indices);

        [Template("Bridge.Array.set({this}, {value}, {indices})")]
        public extern void SetValue(object value, params int[] indices);

        [Template("Bridge.Array.getLength({this}, {dimension})")]
        public extern int GetLength(int dimension);

        public int Rank
        {
            [Template("Bridge.Array.getRank({this})")]
            get
            {
                return 0;
            }
        }

        [Template("Bridge.Array.getLower({this}, {dimension})")]
        public extern int GetLowerBound(int dimension);

        [Template("(Bridge.Array.getLength({this}, {dimension}) - 1)")]
        public extern int GetUpperBound(int dimension);

        [Template("Bridge.Array.toEnumerable({this})")]
        public extern IEnumerable ToEnumerable();

        [Template("Bridge.Array.toEnumerable({this})")]
        public extern IEnumerable<T> ToEnumerable<T>();

        [Template("Bridge.Array.toEnumerator({this})")]
        public extern IEnumerator ToEnumerator();

        [Template("Bridge.Array.toEnumerator({this})")]
        public extern IEnumerator<T> ToEnumerator<T>();

        [Template("Bridge.Array.clone({this})")]
        public extern object Clone();

        [Template("Bridge.Array.init({count}, {value})")]
        public static extern T[] Repeat<T>(T value, int count);

        [Template("Bridge.Array.fill({dst}, {T:defaultFn}, {index}, {count})")]
        public static extern void Clear<T>(T[] dst, int index, int count);

        [Template("Bridge.Array.copy({src}, {spos}, {dst}, {dpos}, {len})")]
        public static extern void Copy(Array src, int spos, Array dst, int dpos, int len);

        [Template("Bridge.Array.copy({src}, 0, {dst}, 0, {len})")]
        public static extern void Copy(Array src, Array dst, int len);

        [Template("Bridge.Array.copy({this}, 0, {array}, {index}, {this}.length)")]
        public extern void CopyTo(Array array, int index);

        [Template("Bridge.Array.copy({this}, 0, {array}, {index}.toNumber(), {this}.length)")]
        public extern void CopyTo(Array array, long index);

        [Template("Bridge.Array.resize({array}, {newSize}, {T:defaultFn})")]
        public static extern void Resize<T>(ref T[] array, int newSize);

        [Template("Bridge.Array.reverse({array})")]
        public static extern void Reverse(Array array);

        [Template("Bridge.Array.reverse({array}, {index}, {length})")]
        public static extern void Reverse(Array array, int index, int length);

        [Template("Bridge.Array.binarySearch({array}, 0, {array}.length, {value})")]
        public static extern int BinarySearch<T>(T[] array, T value);

        [Template("Bridge.Array.binarySearch({array}, {index}, {length}, {value})")]
        public static extern int BinarySearch<T>(T[] array, int index, int length, T value);

        [Template("Bridge.Array.binarySearch({array}, 0, {array}.length, {value}, {comparer})")]
        public static extern int BinarySearch<T>(T[] array, T value, IComparer<T> comparer);

        [Template("Bridge.Array.binarySearch({array}, {index}, {length}, {value}, {comparer})")]
        public static extern int BinarySearch<T>(T[] array, int index, int length, T value, IComparer<T> comparer);

        [Template("Bridge.Array.sort({array}, {index}, {length}, {comparer})")]
        public static extern void Sort<T>(T[] array, int index, int length, IComparer<T> comparer);

        [Template("Bridge.Array.sort({array}, {index}, {length})")]
        public static extern void Sort<T>(T[] array, int index, int length);

        [Template("Bridge.Array.sort({array})")]
        public static extern void Sort<T>(T[] array);

        [Template("Bridge.Array.sort({array}, {comparer})")]
        public static extern void Sort<T>(T[] array, IComparer<T> comparer);
    }

    [External]
    public static class ArrayExtensions
    {
        [Template("{source}.push({*values})")]
        public extern static void Push<T>(this T[] source, params T[] values);
    }
}