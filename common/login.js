(function () {
    'use strict';
    angular.module('chaise.login', [
        'ngCookies',
        'chaise.utils',
        'chaise.authen',
        'ui.bootstrap'
    ])
        .directive('login', ['$rootScope', 'Session', 'modalUtils', '$window', function ($rootScope, Session, modalUtils, $window) {
            var chaisePath = chaiseConfig['chaisePath'] !== undefined? chaiseConfig['chaisePath'] : "./chaise/";
            var path = $window.location.pathname.includes("/chaise/") ? "../" : chaisePath;
            return {
                restrict: 'E',
                scope: {},
                templateUrl: path+"common/templates/login.html",
                link: function (scope) {
                    scope.signUpURL = chaiseConfig.signUpURL;
                    scope.profileURL = chaiseConfig.profileURL;

                    Session.subscribeOnChange(function () {
                        $rootScope.session = Session.getSessionValue();

                        if ($rootScope.session == null) {
                            scope.user = null;
                        } else {
                            var user = $rootScope.session.client;
                            scope.user = user.display_name || user.full_name || user.email || user;
                        }

                    });

                    // NOTE this will call the subscribed functions.
                    // So it will catch the errors of the subscribed functions,
                    // therefore we should make sure to throw these errors in here.
                    // Emitting the catch callback will make angularjs to throw extra error
                    // called: `Possibly unhandled rejection`
                    Session.getSession().catch(function (err) {
                        throw err;
                    })

                    scope.login = function login() {
                        Session.loginInAPopUp();
                    };

                    scope.logout = function logout() {
                        Session.logout();
                    };

                    scope.openProfile = function openProfile() {
                        modalUtils.showModal({
                            templateUrl: "../common/templates/profile.modal.html",
                            controller: "profileModalDialogController",
                            controllerAs: "ctrl"
                        }, false, false, false);
                    };

                }
            };
        }])
})();
