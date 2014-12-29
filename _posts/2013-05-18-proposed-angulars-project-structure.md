---
title: 'Proposed Angular&#8217;s WebPage structure'
author: mgonto
layout: post
permalink: /2013/05/18/proposed-angulars-project-structure/
dsq_thread_id:
  - 2314268795
categories:
  - AngularJS
tags:
  - angularjs
  - directive
  - html
  - inherit
  - proposed
  - scope
  - structure
---
Guideline on creating pages on AngularJS. This applies for angularizing per page and not a SPA.

**Basic Structure**  
The basic idea is to have \*\*one Main Controller\*\* which will have in the scope all the common models and functions that will be used troughout the entire page. In Angular, if you have a child controller, that controlller&#8217;s scope will use prototypal inheritance with the MainCtrl. This means that the scope of the child controller will have all the models and functions from the MainCtrl.

Then, the page will have one controller per each main &#8220;view&#8221;. For example, if you have a page with 5 tabs, each of this tabs is a main view. Each view is different from the other. This views will actually be \`ng-view\` which means that they will be resolved by \`$routeProvider\`. So, each time you click on a tab, it actually changes the URL (for example \`/properties/spaces\`), once that URL changes, the controller defined in the \`$routeProvider\` will be used together with the template defined. This controller will be the view controller and will inherit from the main Controller.

Inside each view, we&#8217;ll be using directives for the different components of the page. If some of this components is reusable (can be used in another page/view), it \*\*MUST\*\* be defined with an isolated scope and it&#8217;ll receive via HTML attributes the parameters it needs to work. This ensures that the directive isn&#8217;t coupled to the parent as it doesn&#8217;t inherit the parent scope, which makes it easy to reuse it.  
If the directive we&#8217;re using is only to organize code and will not be reused in another view, we \*\*CAN\*\* inherit the parent scope (not making it isolated). However, if you want, you can make them isolated anyway.

**Reasons**  
Using this basic structure, we leverage scope inheritance and binding to get things done. If you modify a model in a directive, as it was inherited from the parent scope (or given to the directive via attribute if it&#8217;s isolated), the parent controller and the view from that controller will actually get notified when this happend and the HTML will be modified by itself.

If we need to also be notified of this changes, we can use the \`$scope.$watch\` function to watch some model for changes and get notified. This is exactly what the template uses to update itself.  
If we were to use events, we wouldn&#8217;t have this bidirectional binding, which makes creating with angular MUCH less useful.

**Example**

Let&#8217;s view an example of an app with this configuration.  
First, the main HTML will look something like this:

````html
&lt;html&gt;
  &lt;head&gt;
    &lt;!-- Include here Styles and AngularJS scripts--&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div class="container" ng-app="example" ng-controller="MainCtrl" ng-cloak&gt;
      &lt;header&gt;
      &lt;div&gt;This is the common headers for all of the tabs of this little app&lt;/div&gt;
      &lt;/header&gt;
      &lt;!-- This is the div that will change when the URL changes via the $routeProvider--&gt;
      &lt;div ng-view&gt;
      &lt;/div&gt;
      &lt;footer&gt;&lt;div id="white-logo"&gt;My Company Logo&lt;/div&gt;&lt;span id="copyright"&gt;&copy; 2013 My Company&lt;/span&gt;&lt;/footer&gt;
    &lt;/div&gt;
    
  &lt;/body&gt;
&lt;/html&gt;
````

In here you can see we define the MainCtrl and then we define the ng-view to be used with the RouteProvider

Now, let&#8217;s see the app.js the app definition:

````js
'use strict';

/**
* Application start point.
* 
* Note, we use minifyer, so all dependencies should be explicitly defined with ['&lt;dependency&gt;',
* function(&lt;dependency&gt;) {}];
*/
var module = angular.module('example',
  [ 'restangular', 'ngResource']).config(
  ['$routeProvider', '$locationProvider', 
  function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/test/firstTab',
      {
      templateUrl: '/js/test/angular/views/firstTab.html',
      controller: 'FirstTabCtrl'
      })
    .when('/test/secondTab',
      {
      templateUrl: '/js/test/angular/views/secondTab.html',
      controller: 'SecondTabCtrl'
      })
    .otherwise({
      redirectTo: '/test/firstTab'
    });
    
  $locationProvider.html5Mode(true);
} ]);
````

Here we define for each URL the HTML to be used and the template for that URL.  
We then must define all of this controllers remembering that all we set in the MainCtrl will be visible in the rest.  
Now, let&#8217;s see an example of a directive, in the firstTab.html we have the following:

````html
&lt;div&gt;
  &lt;h1&gt;First Tab&lt;/h1&gt;
  &lt;input type="text" ng-model="query.searchText" /&gt;
  &lt;pie data="data.valuesData | forPie" type="valuesPie" /&gt;
&lt;/div&gt;
````

The first tab controller changes the searchText property of the query model. The query model is inherited from the MainCtrl. The MainCtrl is watching this query object for changes. Once it changes, it fetches some information from the server, and sets that in the valuesData property of the data model. This \`data.valuesData\` is being sent as a parameter to the pie directive, so as soon as it changes, the directive will be watching it. Let&#8217;s see the code of the directive.

````js
module.directive('pie', function () {
  return {
    replace: true,
    restrict: 'EA',
    scope: {type: '@', data:'='},
    templateUrl: "/js/test/angular/partials/pie.html",
    controller: ['$scope', '$routeParams', '$element', '$filter', function($scope, $routeParams, $element, $filter) {
    
      $scope.$watch('data', function() {
        if (_.isUndefined($scope.data) || _.isNull($scope.data) || $filter('isZeroData')($scope.data)) {
          $element.hide();
        } else {
          $element.show();
          $element.plot($scope.data);
        }
      });
    }]
  }
});
````

In here we define an isolated scope. We set that the data HTML attribute will actually contain a scope variable name and that it&#8217;ll create a bidirectional asociation with it. This way, we can actually use a model from the parent scope, without inehriting the whole scope. Then, we set that the \`type\` attribute is just a string to be set in our current scope.  
Then, we watch the data for changes. If it changes and it&#8217;s either undefined or it has no data, we hide the pie element. Otherwise, we show it and we plot it using the data.
