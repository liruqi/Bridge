using Bridge.Test;

namespace Bridge.ClientTest.BridgeIssues
{
    // Bridge[#898]
    [Category(Constants.MODULE_ISSUES)]
    [TestFixture(TestNameFormat = "#898 - {0}")]
    public class Bridge898
    {
        [Test(ExpectedCount = 2)]
        public static void TestDecimalConversion()
        {
            bool check = true;
            decimal test = check ? 1 : 2;

            Assert.True(test == 1, "One True");
            Assert.AreEqual("Bridge.Decimal", test.GetClassName(), "Is decimal");
        }

        [Test(ExpectedCount = 2)]
        public static void TestDoubleConversion()
        {
            bool check = true;
            double test = check ? 1 : 2;

            Assert.True(test == 1, "One True");
            Assert.AreEqual("Number", test.GetClassName(), "Is number");
        }
    }
}