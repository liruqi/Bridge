(function (globals) {
    "use strict";

    Bridge.define('TestIssue921Nested.Issue921NestedOuter', {
        useAField1: function () {
            var n = new TestIssue921Nested.Issue921NestedOuter.Issue921Nested(100);
    
            var t = Bridge.Linq.Enumerable.from(n.getName()).select($_.TestIssue921Nested.Issue921NestedOuter.f1);
        },
        useAField2: function () {
            var n = new TestIssue921Nested.Issue921NestedOuter.Issue921Nested(200);
    
            var t = Bridge.Linq.Enumerable.from(n.getName()).select($_.TestIssue921Nested.Issue921NestedOuter.f1);
        },
        useNestedFunOneInt: function () {
            var n = new TestIssue921Nested.Issue921NestedOuter.Issue921Nested(300);
    
            Bridge.Linq.Enumerable.from([1, 2, 3]).select(function (x) {
                return n.computeNumber(x);
            });
        },
        useNestedFuncTwoInts: function () {
            var n = new TestIssue921Nested.Issue921NestedOuter.Issue921Nested(400);
    
            Bridge.Linq.Enumerable.from([1, 2, 3]).select(function (x, i) {
                return n.computeTwoNumbers(x, i);
            });
        },
        useNestedActionTwoInts: function () {
            var $t;
            var n = new TestIssue921Nested.Issue921NestedOuter.Issue921Nested(400);
    
            $t = Bridge.getEnumerator([1, 2, 3]);
            while ($t.moveNext()) {
                var item = $t.getCurrent();
                n.doWithNumbers(item, item, item);
            }
        },
        useNestedFunOneIntStatic: function () {
            var n = new TestIssue921Nested.Issue921NestedOuter.Issue921Nested(500);
    
            Bridge.Linq.Enumerable.from([1, 2, 3]).select($_.TestIssue921Nested.Issue921NestedOuter.f2);
        }
    });
    
    var $_ = {};
    
    Bridge.ns("TestIssue921Nested.Issue921NestedOuter", $_)
    
    Bridge.apply($_.TestIssue921Nested.Issue921NestedOuter, {
        f1: function (x) {
            return x;
        },
        f2: function (x) {
            return Bridge.get(TestIssue921Nested.Issue921NestedOuter.Issue921Nested).computeNumberStatic(x);
        }
    });
    
    Bridge.define('TestIssue921Nested.Issue921NestedOuter.Issue921Nested', {
        statics: {
            computeNumberStatic: null,
            config: {
                properties: {
                    NameStatic: null,
                    IntStatic: 0
                },
                init: function () {
                    this.computeNumberStatic = $_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f1;
                }
            }
        },
        _offset: 0,
        computeNumber: null,
        computeTwoNumbers: null,
        doWithNumbers: null,
        config: {
            properties: {
                Name: null
            },
            init: function () {
                this.computeNumber = $_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f2;
                this.computeTwoNumbers = $_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f3;
                this.doWithNumbers = $_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f4;
            }
        },
        constructor: function (offset) {
            this._offset = offset;
            Bridge.get(TestIssue921Nested.Issue921NestedOuter.Issue921Nested).setNameStatic("Static");
        },
        computeValue: function (d) {
            return d.add(Bridge.Decimal(10));
        },
        lambaLiftingWithReadOnlyField: function () {
            var localValue = 456;
            return Bridge.Linq.Enumerable.from([1, 2, 3]).select($_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f5).select($_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f5).select($_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f6).select(Bridge.fn.bind(this, $_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f7)).select(Bridge.fn.bind(this, $_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f8)).select(function (value) {
                return value + localValue;
            });
        },
        lambaLiftingWithProperty: function () {
            var localValue = "What a name";
    
            return Bridge.Linq.Enumerable.from(["one", "two", "three"]).select($_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f5).select($_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f5).select($_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f6).select(Bridge.fn.bind(this, $_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f9)).select(Bridge.fn.bind(this, $_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f10)).select(function (value) {
                return value + localValue;
            });
        },
        lambaLiftingWithStaticProperty: function () {
            var localValue = "What a name";
    
            return Bridge.Linq.Enumerable.from(["one", "two", "three"]).select($_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f5).select($_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f5).select($_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f6).select(Bridge.fn.bind(this, $_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f9)).select($_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f11).select(function (value) {
                return value + localValue;
            });
        },
        lambaLiftingWithInstanceMethod: function () {
            var localValue = Bridge.Decimal(10.0);
    
            return Bridge.Linq.Enumerable.from([Bridge.Decimal(1.0), Bridge.Decimal(2.0), Bridge.Decimal(3.0)]).select($_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f12).select($_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f12).select(Bridge.fn.bind(this, $_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f13)).select(Bridge.fn.bind(this, $_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f14)).select(Bridge.fn.bind(this, $_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f15)).select(function (value) {
                return value.add(localValue);
            });
        },
        lambaLiftingWithDelegate: function () {
            // Lift
            var addThousand = $_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f16;
    
            var localValue = 123;
    
            return Bridge.Linq.Enumerable.from([1, 2, 3]).select(function (value) {
                return addThousand(value + 1);
            }).select(function (value) {
                return addThousand(value + 1);
            }).select(function (value, index) {
                return addThousand(value + index);
            }).select(Bridge.fn.bind(this, function (value) {
                return addThousand(value) + this._offset;
            })).select(Bridge.fn.bind(this, function (value, index) {
                return addThousand(value) + index + this._offset;
            })).select(function (value) {
                return addThousand(value + addThousand(localValue));
            });
        },
        lambaLiftingWithDelegateChangingType: function () {
            // Lift
            var toString = $_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested.f17;
    
            var localValue = 7;
    
            return Bridge.Linq.Enumerable.from([1, 2, 3]).select(function (value) {
                return toString(value + 1);
            }).select(function (value) {
                return toString(value.length);
            }).select(function (value, index) {
                return toString(value.length + index);
            }).select(Bridge.fn.bind(this, function (value) {
                return toString(value.length) + this._offset;
            })).select(Bridge.fn.bind(this, function (value, index) {
                return toString(value.length) + index + this._offset;
            })).select(function (value) {
                return toString(value.length + toString(localValue).length);
            });
        }
    });
    
    Bridge.ns("TestIssue921Nested.Issue921NestedOuter.Issue921Nested", $_)
    
    Bridge.apply($_.TestIssue921Nested.Issue921NestedOuter.Issue921Nested, {
        f1: function (i) {
            return 3 * i + Bridge.get(TestIssue921Nested.Issue921NestedOuter.Issue921Nested).getIntStatic();
        },
        f2: function (i) {
            return 2 * i + Bridge.get(TestIssue921Nested.Issue921NestedOuter.Issue921Nested).getIntStatic();
        },
        f3: function (i, j) {
            return i + j + Bridge.get(TestIssue921Nested.Issue921NestedOuter.Issue921Nested).getIntStatic();
        },
        f4: function (i, j, k) {
            var x = i + j + k + Bridge.get(TestIssue921Nested.Issue921NestedOuter.Issue921Nested).getIntStatic();
        },
        f5: function (value) {
            return value + 1;
        },
        f6: function (value, index) {
            return value + index;
        },
        f7: function (value) {
            return value + this._offset;
        },
        f8: function (value, index) {
            return value + index + this._offset;
        },
        f9: function (value) {
            return value + this.getName();
        },
        f10: function (value, index) {
            return value + index + this.getName();
        },
        f11: function (value, index) {
            return value + index + Bridge.get(TestIssue921Nested.Issue921NestedOuter.Issue921Nested).getNameStatic();
        },
        f12: function (value) {
            return value.add(Bridge.Decimal(1));
        },
        f13: function (value, index) {
            return value.add(this.computeValue(Bridge.Decimal.lift(index)));
        },
        f14: function (value) {
            return value.add(this.computeValue(Bridge.Decimal(100.0)));
        },
        f15: function (value, index) {
            return value.add(Bridge.Decimal(index)).add(this.computeValue(Bridge.Decimal(200.0)));
        },
        f16: function (i) {
            return i + 1000;
        },
        f17: function (i) {
            return i.toString();
        }
    });
    
    
    
    Bridge.init();
})(this);
