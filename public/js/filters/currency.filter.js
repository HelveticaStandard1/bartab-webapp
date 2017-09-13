(function () {

    angular.module('app')
        .filter('currency', CurrencyFilter);

    function CurrencyFilter() {
        return function (input) {
            var out = '-';
            if (input == null) {
                return out;
            }
        };
    }

})();