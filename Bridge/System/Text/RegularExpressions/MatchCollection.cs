﻿using System.Collections;
using Bridge;

namespace System.Text.RegularExpressions
{
    /// <summary>
    /// Represents the set of successful matches found by iteratively applying a regular expression pattern to the input string.
    /// </summary>
    [Namespace("Bridge.Text.RegularExpressions")]
    [External]
    public class MatchCollection : ICollection
    {
        internal MatchCollection(Regex regex, string input, int beginning, int length, int startat)
        {
        }

        /// <summary>
        /// Gets the number of matches.
        /// </summary>
        public extern int Count { get; }

        /// <summary>
        /// Gets an object that can be used to synchronize access to the collection.
        /// </summary>
        public extern object SyncRoot { get; }

        /// <summary>
        /// Gets a value indicating whether access to the collection is synchronized (thread-safe).
        /// </summary>
        public extern bool IsSynchronized { get; }

        /// <summary>
        /// Gets a value that indicates whether the collection is read only.
        /// </summary>
        public extern bool IsReadOnly { get; }

        /// <summary>
        /// Gets an individual member of the collection.
        /// </summary>
        public extern virtual Match this[int i]
        {
            [Template("get({0})")]
            get;
        }

        /// <summary>
        /// Copies all the elements of the collection to the given array starting at the given index.
        /// </summary>
        public extern void CopyTo(Array array, int arrayIndex);

        /// <summary>
        /// Provides an enumerator that iterates through the collection.
        /// </summary>
        public extern IEnumerator GetEnumerator();
    }
}