using Bridge.Test;

namespace Bridge.ClientTest.BridgeIssues
{
    // Bridge[#968]
    [Category(Constants.MODULE_ISSUES)]
    [TestFixture(TestNameFormat = "#975 - {0}")]
    public class Bridge975
    {
        [Test(ExpectedCount = 1)]
        public static void TestCastToLongWorksForBigNumberInIE()
        {
            var i = (long)9007199254740991;

            Assert.AreEqual("9007199254740991", i.ToString());
        }
    }
}