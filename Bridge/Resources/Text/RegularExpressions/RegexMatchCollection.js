﻿// @source Text/RegularExpressions/RegexMatchCollection.js

Bridge.define("Bridge.Text.RegularExpressions.MatchCollection", {
    inherits: function () {
        return [Bridge.ICollection];
    },

    _regex: null,
    _input: null,
    _beginning: 0,
    _length: 0,
    _startat: 0,
    _prevlen: 0,
    _matches: null,
    _done: false,

    constructor: function (regex, input, beginning, length, startat) {
        if (startat < 0 || startat > input.Length) {
            throw new Bridge.ArgumentOutOfRangeException("startat");
        }

        this._regex = regex;
        this._input = input;
        this._beginning = beginning;
        this._length = length;
        this._startat = startat;
        this._prevlen = -1;
        this._matches = [];
    },

    getCount: function () {
        if (!this._done) {
            this._getMatch(0x7FFFFFFF);
        }

        return this._matches.length;
    },

    getSyncRoot: function () {
        return this;
    },

    getIsSynchronized: function () {
        return false;
    },

    getIsReadOnly: function () {
        return true;
    },

    get: function (i) {
        var match = this._getMatch(i);

        if (match == null) {
            throw new Bridge.ArgumentOutOfRangeException("i");
        }

        return match;
    },

    copyTo: function (array, arrayIndex) {
        if (array == null) {
            throw new Bridge.ArgumentNullException("array");
        }

        var count = this.getCount();

        if (array.length < arrayIndex + count) {
            throw new Bridge.IndexOutOfRangeException();
        }

        for (var i = arrayIndex, j = 0; j < count; i++, j++) {
            var match = this._getMatch(j);

            Bridge.Array.set(array, match, [i]);
        }
    },

    getEnumerator: function () {
        return new Bridge.Text.RegularExpressions.MatchEnumerator(this);
    },

    _getMatch: function (i) {
        if (i < 0) {
            return null;
        }

        if (this._matches.length > i) {
            return this._matches[i];
        }

        if (this._done) {
            return null;
        }

        var match;

        do {
            match = this._regex._runner.run(this._regex, false, this._prevLen, this._input, this._beginning, this._length, this._startat);

            if (!match.getSuccess()) {
                this._done = true;
                return null;
            }

            this._matches.push(match);

            this._prevLen = match._length;
            this._startat = match._textpos;

        } while (this._matches.length <= i);

        return match;
    }
});

Bridge.define("Bridge.Text.RegularExpressions.MatchEnumerator", {
    inherits: function () {
        return [Bridge.IEnumerator];
    },

    _matchcoll: null,
    _match: null,
    _curindex: 0,
    _done: false,

    constructor: function (matchColl) {
        this._matchcoll = matchColl;
    },

    moveNext: function () {
        if (this._done) {
            return false;
        }
 
        this._match = this._matchcoll._getMatch(this._curindex);
        this._curindex ++;
 
        if (this._match == null) {
            this._done = true;

            return false;
        }
 
        return true;
    },

    getCurrent: function () {
        if (this._match == null) {
            throw new Bridge.InvalidOperationException("Enumeration has either not started or has already finished.");
        }

        return this._match;
    },

    reset: function () {
        this._curindex = 0;
        this._done = false;
        this._match = null;
    }
});
