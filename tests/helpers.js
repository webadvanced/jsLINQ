(function(exports) {
    var helpers = {
        Person: function(first, last, age, dob) {
            this.first = first;
            this.last = last;
            this.age = age;
            this.dob = new Date(dob);
            this.full = function() {
                return this.first + ' ' + this.last;
            };
        }
    };
    exports.helpers = helpers;
})(window);