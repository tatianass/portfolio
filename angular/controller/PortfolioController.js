(function () {
    'use strict';

    /**
     * Implementing Portfolio controller
     * @author Tatiana Saturno
     */
    app.controller("PortfolioController", [
        'PortfolioService',
        function (PortfolioService) {
            var self = this;
            var promise = PortfolioService.getData();
            
            promise.then(function (data){
                self.skills = data.skills;
            });

            self.search = "recipe_name"
        }
    ]);
})();
