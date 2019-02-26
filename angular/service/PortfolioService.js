(function () {
    'use strict';

    /**
     * Implementing Portfolio controller
     * @author Tatiana Saturno
     */
    app.service("PortfolioService", [
        '$http', '$q',
        function ($http, $q) {
            var self = this;
            var deferred = $q.defer();

            $http.get('assets/json/skills.json').then(function(data){
                deferred.resolve(data.data);            
            });

            self.getData = function() {
                return deferred.promise;
            };
        }
    ]);
})();
