define(function (require) {
    'use strict';

    var Class = (function () {
        function createClass(properties) {
            var f = function () {
                if (this._super) {
                    this._super = new this._super(arguments);
                }
                this.init.apply(this, arguments);
            }
            for (var prop in properties) {
                f.prototype[prop] = properties[prop];
            }
            if (!f.prototype.init) {
                f.prototype.init = function () { }
            }
            return f;
        }

        Function.prototype.inherit = function (parent) {
            var oldPrototype = this.prototype;
            this.prototype = new parent();
            this.prototype._super = parent;
            for (var prop in oldPrototype) {
                this.prototype[prop] = oldPrototype[prop];
            }
        }

        return {
            create: createClass,
        };
    }());

    var MongoDB = Class.create({
        init: function () {
            this.url = "https://api.mongolab.com/api/1/databases/nectarine-snake/collections/scores?apiKey=SMc-LQqBYw3u5ZSYeB5h5YPjhs1sNbny";
            this.contentType = "application/json";
        },
        localStorageAdd: function (key, value) {
            window.localStorage.setItem(key, value);
        },
        localStorageGet: function (key) {
            return window.localStorage.getItem(key);
        },
        localStorageContain: function (key) {
            for (var i = 0; i < window.localStorage.length; i++) {
                if (window.localStorage.key(i)) {
                    return true;
                }
            }

            return false;
        },
        add: function (jsObject, callback) {
            $.ajax({
                url: this.url,
                contentType: this.contentType,
                type: "POST",
                data: JSON.stringify(jsObject),
                success: callback
            });
        },
        get: function (topCount, callback) {
            var top = '&l=' + topCount;
            var order = '&s={score:-1}'; // Descending
            var result;
            $.ajax({
                url: this.url + top + order,
                contentType: this.contentType,
                type: "GET",
                success: function (data) {
                    result = data;
                    callback(data);
                }
            });

            return result;
        },
        update: function (id, jsObject) {
            var query = '&q={"_id": ' + id + '}';
            $.ajax({
                url: this.url + query,
                contentType: this.contentType,
                type: "PUT",
                data: JSON.stringify({ "$set": jsObject })
            });
        }
    });

    // "Singleton" instance
    return new MongoDB();
})