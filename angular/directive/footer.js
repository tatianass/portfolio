(function() {
    'use strict';

    /**
     * Diretiva para o footer.
     *
     * @author missyuri12
     */
    app.directive('footer', [
        DiretivaFooter]);

    /**
     * Implementação da diretiva do footer.
     */
    function DiretivaFooter() {
        return {
            restrict: 'A',
            templateUrl: 'view/directive/footer.html',
            replace: true,
            link: function() {}
        };
    }
})();