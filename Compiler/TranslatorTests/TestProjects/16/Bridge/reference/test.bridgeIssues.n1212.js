﻿(function (globals) {
    "use strict";

    Bridge.define('Test.BridgeIssues.N1212.TestIncrementDecrement', {
        testDouble: function () {
            var v = 0;
            v++;
            v--;
            v = v--;
            v = --v;
            v = v++;
            v = ++v;
            var v1 = v++;
            var v2 = v--;
            var v3 = ++v;
            var v4 = --v;
        },
        testDecimal: function () {
            var $t;
            var v = Bridge.Decimal(0);
            v = v.inc();
            v = v.dec();
            v = ($t = v, v = v.dec(), $t);
            v = (v = v.dec());
            v = ($t = v, v = v.inc(), $t);
            v = (v = v.inc());
            var v1 = ($t = v, v = v.inc(), $t);
            var v2 = ($t = v, v = v.dec(), $t);
            var v3 = (v = v.inc());
            var v4 = (v = v.dec());
        },
        testSingle: function () {
            var v = 0;
            v++;
            v--;
            v = v--;
            v = --v;
            v = v++;
            v = ++v;
            var v1 = v++;
            var v2 = v--;
            var v3 = ++v;
            var v4 = --v;
        },
        testLong: function () {
            var $t;
            var v = Bridge.Long(0);
            v = v.inc();
            v = v.dec();
            v = ($t = v, v = v.dec(), $t);
            v = (v = v.dec());
            v = ($t = v, v = v.inc(), $t);
            v = (v = v.inc());
            var v1 = ($t = v, v = v.inc(), $t);
            var v2 = ($t = v, v = v.dec(), $t);
            var v3 = (v = v.inc());
            var v4 = (v = v.dec());
        }
    });
    
    
    
    Bridge.init();
})(this);
