using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bridge.Html5;
using Bridge.Test;

namespace Bridge.ClientTest.BridgeIssues
{
    public class Bridge1003<T>
    {
        public IEnumerable<T> Test1(IEnumerable<T> list)
        {
            return list.Select(item => item.Cast<T>()).ToArray();
        }

        public IEnumerable<T1> Test2<T1>(IEnumerable<T1> list)
        {
            return list.Select(item => item.Cast<T1>()).ToArray();
        }
    }

    // Bridge[#1003]
    [Category(Constants.MODULE_ISSUES)]
    [TestFixture(TestNameFormat = "#1003 - {0}")]
    public class Bridge1003
    {
        [Test(ExpectedCount = 3)]
        public static void TestGenericLambdasToLifting()
        {
            var test = new Bridge1003<int>();

            dynamic scope = Script.Get("$_.Bridge.ClientTest.BridgeIssues.Bridge1003$1");
            Assert.Null(scope);
            Assert.AreEqual(test.Test1(new[] { 1, 2, 3 }), new[] { 1, 2, 3 });
            Assert.AreEqual(test.Test2<string>(new[] { "1", "2", "3" }), new[] { "1", "2", "3" });
        }
    }
}