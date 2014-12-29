---
title: 'Restangular: New AngularJS framework to handle Rest API Restful Resources properly and easily'
author: mgonto
layout: post
permalink: /2013/04/09/restangular-new-angular-framework-to-handle-restful-resources-properly-and-easily/
dsq_thread_id:
  - 1199510662
dsq_needs_sync:
  - 1
categories:
  - AngularJS
  - Rest
tags:
  - angular
  - angularjs
  - javascript
  - play!
  - Play! Framework
  - resource
  - resources
  - rest
  - rest api
  - restful
  - ror
  - ruby
  - ruby on rails
  - service
  - underscore
---
Hey,

I&#8217;ve been working with AngularJS this past months and I&#8217;ve extracted one service that I&#8217;ve created to facilitate the usage of Restful Resources. Nowadays, we work with Rest APIs on a daily basis. We&#8217;re also starting to use AngularJS more and more each day as it makes us be much more productive. Restangular will make it even easier to work with the Rest APIs that we&#8217;ve implemented. **<a style="font-size:16px" href="https://github.com/mgonto/restangular" target="_blank">You can click here to check it out on GitHub</a>**.

**What&#8217;s the idea of this Framework?**

****We&#8217;re used to creating REST APIs using Resources in our BackEnd. However, when using AngularJS it&#8217;s not easy to work with them using $resource and $http. I&#8217;ve built a service that will help you get, update and delete resources following the &#8220;tree&#8221; that you&#8217;ve created. I&#8217;ve tried this out with Play! Framework and Ruby On Rails and this fits perfectly with both.

**How can I add this?**

In order to add this, you must download restangular.js [from here][1] and then link to it in your HTML file. **Restangular depends only on angular, angular-resource and underscore.** After this, you must just declare the dependency to your app.

<noscript>
  <pre><code class="language-javascript javascript">var app = angular.module('angularjs-starter', ['restangular']);

// Using RestangularProvider we can configure properties. To check all properties go to https://github.com/mgonto/restangular
app.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api/v1');
});

// Here it injects Restangular by itself
angular.module('angularjs-starter').controller('NewCtrl', function($scope, Restangular) {
  // My controller
});
</code></pre>
</noscript>

**Let&#8217;s start using it!!!**

I think that the best introduction for a Framework is Code. So let&#8217;s code <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> 

<noscript>
  <pre><code class="language-javascript javascript">// First way of creating a Restangular object. Just saying the base URL
var baseAccounts = Restangular.all('accounts');

// This will query /accounts and return a promise. As Angular supports setting promises to scope variables
// as soon as we get the information from the server, it will be shown in our template :)
$scope.allAccounts = baseAccounts.getList();

var newAccount = {name: "Gonto's account"};

// POST /accounts
baseAccounts.post(newAccount);

//Here we use Promises then 
// GET /accounts
baseAccounts.getList().then(function (accounts) {
  // Here we can continue fetching the tree :).

  var firstAccount = accounts[0];
  // This will query /accounts/123/buildings considering 123 is the id of the firstAccount
  $scope.buildings = firstAccount.getList("buildings");

  // GET /accounts/123/places?query=param with request header: x-user:mgonto
  $scope.loggedInPlaces = firstAccount.getList("places", {query: param}, {'x-user': 'mgonto'})

  // This is a regular JS object, we can change anything we want :) 
  firstAccount.name = "Gonto"

  // PUT /accounts/123. The name of this account will be Gonto from now on
  firstAccount.put();

  // DELETE /accounts/123 We don't have first account anymore :(
  firstAccount.remove();

  var myBuilding = {
    name: "Gonto's Building",
    place: "Argentina"
  };

  // POST /accounts/123/buildings with MyBuilding information
  firstAccount.post("Buildings", myBuilding).then(function() {
    console.log("Object saved OK");
  }, function() {
    console.log("There was an error saving");
  });

  // GET /accounts/123/users?query=params
  firstAccount.getList("users", {query: params}).then(function(users) {
    // Instead of posting nested element, a collection can post to itself
    // POST /accounts/123/users
    users.post({userName: 'unknown'});

    // Custom methods are available now :).
    // GET /accounts/123/users/messages?param=myParam
    users.customGET("messages", {param: "myParam"})

    var firstUser = users[0];

    // GET /accounts/123/users/456. Just in case we want to update one user :)
    $scope.userFromServer = firstUser.get();

    // ALL http methods are available :)
    // HEAD /accounts/123/users/456
    firstUser.head()

  });

}, function errorCallback() {
  alert("Oops error from server :(");
})

// Second way of creating Restangular object. URL and ID :)
var account = Restangular.one("accounts", 123);

// GET /accounts/123?single=true
$scope.account = account.get({single: true});

// POST /accounts/123/messages?param=myParam with the body of name: "My Message"
account.customPOST("messages", {param: "myParam"}, {}, {name: "My Message"})</code></pre>
</noscript>

That&#8217;s it <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> Please tell me what you guys think! If you want to read more about Restangular [You can click here to check it out][2].

 [1]: https://raw.github.com/mgonto/restangular/master/dist/restangular.js
 [2]: https://github.com/mgonto/restangular