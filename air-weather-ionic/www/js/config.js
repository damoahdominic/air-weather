air.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('intro', {
        url: '/intro',
        templateUrl: 'templates/intro.html',
        controller: 'IntroCtrl'
    })
    .state('blank', {
        url: '/blank',
        templateUrl: 'templates/blank.html',
        controller: 'BlankCtrl'
    })
    .state('air', {
        url: '/air',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MenCtrl'
    })
    .state('air.dash',{
        url: '/dashboard',
        views: {
            'air-content': {
                templateUrl: 'templates/dash.html',
                controller: 'DashCtrl'
            }
        }
    })
    .state('air.browse',{
        url: '/browse',
        views: {
            'air-content':{
                templateUrl: 'templates/browse.html',
                controller: 'BrowseCtrl'
            }
        }
    })
    .state('air.settings',{
        url: '/settings',
        views: {
            'air-content':{
                templateUrl: 'templates/settings.html',
                controller: 'SettingsCtrl'
            }
        }
    })
    .state('air.donate',{
        url: '/donate',
        views: {
            'air-content':{
                templateUrl: 'templates/donate.html',
                controller: 'DonateCtrl'
            }
        }
    })
    $urlRouterProvider.otherwise('/blank');
});
