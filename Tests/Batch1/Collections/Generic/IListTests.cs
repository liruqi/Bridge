﻿using System;
using System.Collections;
using System.Collections.Generic;
using Bridge.Test;
using Bridge.ClientTest;

namespace Bridge.ClientTest.Collections.Generic
{
    [Category(Constants.MODULE_ILIST)]
    [TestFixture(TestNameFormat = "IList - {0}")]
    public class IListTests
    {
        private class MyList : IList<string>
        {
            public MyList(string[] items)
            {
                Items = new List<string>(items);
            }

            IEnumerator IEnumerable.GetEnumerator() { return GetEnumerator(); }
            public List<string> Items { get; private set; }

            public IEnumerator<string> GetEnumerator() { return Items.GetEnumerator(); }
            public int Count { get { return Items.Count; } }
            public void Add(string item) { Items.Add(item); }
            public void Clear() { Items.Clear(); }
            public bool Contains(string item) { return Items.Contains(item); }
            public bool Remove(string item) { return Items.Remove(item); }

            public string this[int index] { get { return Items[index]; } set { Items[index] = value; } }
            public int IndexOf(string item) { return Items.IndexOf(item); }
            public void Insert(int index, string item) { Items.Insert(index, item); }
            public void RemoveAt(int index) { Items.RemoveAt(index); }
        }

        private class C
        {
            private readonly int _i;

            public C(int i)
            {
                _i = i;
            }

            public override bool Equals(object o)
            {
                return o is C && _i == ((C)o)._i;
            }
            public override int GetHashCode()
            {
                return _i;
            }
        }

        [Test]
        public void TypePropertiesAreCorrect()
        {
            Assert.AreEqual("Bridge.IList$1$Object", typeof(IList<object>).GetClassName(), "FullName should be correct");

            IList<object> iList = new List<object>();

            Assert.True(iList is IEnumerable<object>, "Interfaces should contain IEnumerable");
            Assert.True(iList is ICollection<object>, "Interfaces should contain ICollection");
        }

        [Test]
        public void ArrayImplementsIList()
        {
            Assert.True((object)new int[1] is IList<int>);
        }

        [Test]
        public void CustomClassThatShouldImplementIListDoesSo()
        {
            Assert.True((object)new MyList(new string[0]) is IList<string>);
        }

        [Test]
        public void ArrayCastToIListGetItemWorks()
        {
            IList<string> l = new[] { "x", "y", "z" };
            Assert.AreEqual("y", l[1]);
        }

        [Test]
        public void ClassImplementingIListGetItemWorks()
        {
            MyList l = new MyList(new[] { "x", "y", "z" });
            Assert.AreEqual("y", l[1]);
        }

        [Test]
        public void ClassImplementingIListCastToIListGetItemWorks()
        {
            IList<string> l = new MyList(new[] { "x", "y", "z" });
            Assert.AreEqual("y", l[1]);
        }

        [Test]
        public void ArrayCastToIListSetItemWorks()
        {
            IList<string> l = new[] { "x", "y", "z" };
            l[1] = "a";
            Assert.AreEqual("a", l[1]);
        }

        [Test]
        public void ClassImplementingIListSetItemWorks()
        {
            MyList l = new MyList(new[] { "x", "y", "z" });
            l[1] = "a";
            Assert.AreEqual("a", l[1]);
        }


        [Test]
        public void ClassImplementingIListCastToIListSetItemWorks()
        {
            IList<string> l = new MyList(new[] { "x", "y", "z" });
            l[1] = "a";
            Assert.AreEqual("a", l[1]);
        }

        [Test]
        public void ArrayCastToIListIndexOfWorks()
        {
            IList<C> arr = new[] { new C(1), new C(2), new C(3) };
            Assert.AreEqual(1, arr.IndexOf(new C(2)));
            Assert.AreEqual(-1, arr.IndexOf(new C(4)));
        }

        [Test]
        public void ClassImplementingIListIndexOfWorks()
        {
            MyList c = new MyList(new[] { "x", "y" });
            Assert.AreEqual(1, c.IndexOf("y"));
            Assert.AreEqual(-1, c.IndexOf("z"));
        }

        [Test]
        public void ClassImplementingIListCastToIListIndexOfWorks()
        {
            IList<string> l = new MyList(new[] { "x", "y" });
            Assert.AreEqual(1, l.IndexOf("y"));
            Assert.AreEqual(-1, l.IndexOf("z"));
        }

        [Test]
        public void ClassImplementingIListInsertWorks()
        {
            MyList l = new MyList(new[] { "x", "y" });
            l.Insert(1, "z");
            Assert.AreDeepEqual(new[] { "x", "z", "y" }, l.Items.ToArray());
        }

        [Test]
        public void ClassImplementingIListCastToIListInsertWorks()
        {
            IList<string> l = new MyList(new[] { "x", "y" });
            l.Insert(1, "z");
            Assert.AreDeepEqual(new[] { "x", "z", "y" }, ((MyList)l).Items.ToArray());
        }

        [Test]
        public void ClassImplementingIListRemoveAtWorks()
        {
            MyList l = new MyList(new[] { "x", "y", "z" });
            l.RemoveAt(1);
            Assert.AreDeepEqual(new[] { "x", "z" }, l.Items.ToArray());
        }

        [Test]
        public void ClassImplementingIListCastToIListRemoveAtWorks()
        {
            IList<string> l = new MyList(new[] { "x", "y", "z" });
            l.RemoveAt(1);
            Assert.AreDeepEqual(new[] { "x", "z" }, ((MyList)l).Items.ToArray());
        }
    }
}
