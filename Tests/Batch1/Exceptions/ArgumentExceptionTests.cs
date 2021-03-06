﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Runtime.CompilerServices;
using Bridge.Test;
using Bridge.ClientTest;

namespace Bridge.ClientTest.Exceptions
{
    [Category(Constants.MODULE_ARGUMENTEXCEPTION)]
    [TestFixture(TestNameFormat = "ArgumentException - {0}")]
    public class ArgumentExceptionTests
    {
        private const string DefaultMessage = "Value does not fall within the expected range.";

        [Test]
        public void TypePropertiesAreCorrect()
        {
            Assert.AreEqual("Bridge.ArgumentException", typeof(ArgumentException).GetClassName(), "Name");
            object d = new ArgumentException();
            Assert.True(d is ArgumentException);
            Assert.True(d is Exception);
        }

        [Test]
        public void DefaultConstructorWorks()
        {
            var ex = new ArgumentException();
            Assert.True((object)ex is ArgumentException, "is ArgumentException");
            Assert.AreEqual(null, ex.ParamName, "ParamName");
            Assert.AreEqual(null, ex.InnerException, "InnerException");
            Assert.AreEqual(DefaultMessage, ex.Message);
        }

        [Test]
        public void ConstructorWithMessageWorks()
        {
            var ex = new ArgumentException("The message");
            Assert.True((object)ex is ArgumentException, "is ArgumentException");
            Assert.AreEqual(null, ex.ParamName, "ParamName");
            Assert.AreEqual(null, ex.InnerException, "InnerException");
            Assert.AreEqual("The message", ex.Message);
        }

        [Test]
        public void ConstructorWithMessageAndInnerExceptionWorks()
        {
            var inner = new Exception("a");
            var ex = new ArgumentException("The message", inner);
            Assert.True((object)ex is ArgumentException, "is ArgumentException");
            Assert.AreEqual(null, ex.ParamName, "ParamName");
            Assert.AreEqual(inner, ex.InnerException, "InnerException");
            Assert.AreEqual("The message", ex.Message);
        }

        [Test]
        public void ConstructorWithMessageAndParamNameWorks()
        {
            var ex = new ArgumentException("The message", "someParam");
            Assert.True((object)ex is ArgumentException, "is ArgumentException");
            Assert.AreEqual("someParam", ex.ParamName, "ParamName");
            Assert.AreEqual(null, ex.InnerException, "InnerException");
            Assert.AreEqual("The message", ex.Message);
        }

        [Test]
        public void ConstructorWithMessageAndParamNameAndInnerExceptionWorks()
        {
            var inner = new Exception("a");
            var ex = new ArgumentException("The message", "someParam", inner);
            Assert.True((object)ex is ArgumentException, "is ArgumentException");
            Assert.AreEqual("someParam", ex.ParamName, "ParamName");
            Assert.True(ReferenceEquals(ex.InnerException, inner), "InnerException");
            Assert.AreEqual(inner, ex.InnerException, "InnerException");
            Assert.AreEqual("The message", ex.Message);
        }
    }
}
