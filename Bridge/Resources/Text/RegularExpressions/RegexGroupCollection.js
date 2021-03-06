﻿// @source Text/RegularExpressions/RegexGroupCollection.js

Bridge.define("Bridge.Text.RegularExpressions.GroupCollection", {
    inherits: function () {
        return [Bridge.ICollection];
    },

    _match: null,
    _captureMap: null,
    _groups: null,

    constructor: function (match, caps) {
        this._match = match;
        this._captureMap = caps;
    },

    getSyncRoot: function () {
        return this._match;
    },

    getIsSynchronized: function () {
        return false;
    },

    getIsReadOnly: function () {
        return true;
    },

    getCount: function () {
        return this._match._matchcount.length;
    },

    get: function (groupnum) {
        return this._getGroup(groupnum);
    },

    getByName: function (groupname) {
        if (this._match._regex == null) {
            return Bridge.Text.RegularExpressions.Group.getEmpty();
        }

        var groupnum = this._match._regex.groupNumberFromName(groupname);

        return this._getGroup(groupnum);
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
            var group = this._getGroup(j);

            Bridge.Array.set(array, group, [i]);
        }
    },

    getEnumerator: function () {
        return new Bridge.Text.RegularExpressions.GroupEnumerator(this);
    },

    _getGroup: function (groupnum) {
        var group;

        if (this._captureMap != null) {
            var num = this._captureMap[groupnum];

            if (num == null) {
                group = Bridge.Text.RegularExpressions.Group.getEmpty();
            } else {
                group = this._getGroupImpl(num);
            }
        }
        else {
            if (groupnum >= this._match._matchcount.length || groupnum < 0) {
                group = Bridge.Text.RegularExpressions.Group.getEmpty();
            } else {
                group = this._getGroupImpl(groupnum);
            }
        }

        return group;
    },

    _getGroupImpl: function (groupnum) {
        if (groupnum === 0) {
            return this._match;
        }

        this._ensureGroupsInited();

        return this._groups[groupnum];
    },

    _ensureGroupsInited: function () {
        // Construct all the Group objects the first time GetGroup is called
        if (this._groups == null) {
            var groups = [];

            groups.length = this._match._matchcount.length;

            if (groups.length > 0) {
                groups[0] = this._match;
            }

            for (var i = 0; i < groups.length-1; i++) {
                var matchText = this._match._text;
                var matchCaps = this._match._matches[i + 1];
                var matchCapcount = this._match._matchcount[i + 1];

                groups[i+1] = new Bridge.Text.RegularExpressions.Group(matchText, matchCaps, matchCapcount);
            }
            this._groups = groups;
        }
    }
});


Bridge.define("Bridge.Text.RegularExpressions.GroupEnumerator", {
    inherits: function () {
        return [Bridge.IEnumerator];
    },

    _groupColl: null,
    _curindex: 0,

    constructor: function (groupColl) {
        this._curindex = -1;
        this._groupColl = groupColl;
    },

    moveNext: function () {
        var size = this._groupColl.getCount();
 
        if (this._curindex >= size) {
            return false;
        }
 
        this._curindex++;

        return (this._curindex < size);
    },

    getCurrent: function () {
        return this.getCapture();
    },

    getCapture: function () {
        if (this._curindex < 0 || this._curindex >= this._groupColl.getCount()) {
            throw new Bridge.InvalidOperationException("Enumeration has either not started or has already finished.");
        }

        return this._groupColl.get(this._curindex);
    },

    reset: function () {
        this._curindex = -1;
    }
});
