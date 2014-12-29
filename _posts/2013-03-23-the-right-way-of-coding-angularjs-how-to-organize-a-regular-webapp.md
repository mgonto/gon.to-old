---
title: 'The right way of coding AngularJS: How to organize a regular WebApp. Basic Example'
author: mgonto
layout: post
permalink: /2013/03/23/the-right-way-of-coding-angularjs-how-to-organize-a-regular-webapp/
dsq_thread_id:
  - 2368318154
categories:
  - Javascript
tags:
  - angular
  - angular-ui
  - Code
  - coding
  - content
  - controller
  - directive
  - example
  - footer
  - header
  - js
  - right
  - ui-if
  - way
  - webapp
---
Hey,

I&#8217;ve been coding with AngularJS for some time. I still like BackBone very much, but I&#8217;ve come to understand that BackBone is very simple and minimalistic. You gotta do most of the job, which is not very productive. AngularJS is a very productive framework that lets you organize the code if you know what you&#8217;re doing. However, it&#8217;s very easy to fuck it up and end with the same (or worse) spaghetti code that you wanted to avoid by adding and MVC (not really :P) framework.

So, let&#8217;s get down to business. After trying different approaches, I&#8217;ve come with the approach that best suits me and I think it&#8217;ll suit most of you guys as well.

So, what would be a very good example of this.

You go to the URL / and you get a page in the following way:

<a href="http://gon.to/wp-content/uploads/2013/03/Blog.png" rel="lightbox" title="The right way of coding AngularJS: How to organize a regular WebApp. Basic Example"><img class="aligncenter size-medium wp-image-272" alt="Blog" src="http://gon.to/wp-content/uploads/2013/03/Blog-300x188.png" width="300" height="188" /></a>

&nbsp;

Then, you login and you go to /sports and you get:

&nbsp;

<a href="http://gon.to/wp-content/uploads/2013/03/Blog-2.png" rel="lightbox" title="The right way of coding AngularJS: How to organize a regular WebApp. Basic Example"><img class="aligncenter size-medium wp-image-271" alt="Blog (2)" src="http://gon.to/wp-content/uploads/2013/03/Blog-2-300x127.png" width="300" height="127" /></a>

&nbsp;

Then, you go to /players and you get:

&nbsp;

<a href="http://gon.to/wp-content/uploads/2013/03/Blog-1.png" rel="lightbox" title="The right way of coding AngularJS: How to organize a regular WebApp. Basic Example"><img class="aligncenter size-medium wp-image-270" alt="Blog (1)" src="http://gon.to/wp-content/uploads/2013/03/Blog-1-300x189.png" width="300" height="189" /></a>

&nbsp;

&nbsp;

So, this example covers most of the different approaches and pages of a regular WebApp. So, how would we approach this?

1) The first thing we need to do is define the URL router and the controllers. We&#8217;d have one main controller for each

&nbsp;

<noscript>
  <pre><code class="language-javascript javascript">var module = angular.module('basicsite', 
  	['ngResource']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/',
            {templateUrl: '/js//views/main.html', controller: 'MainCtrl'}).
            when('/sports',
            {templateUrl: '/js/views/sports.html', controller: 'SportsCtrl'}).
            when('/players',
            {templateUrl: '/js/views/players.html', controller: 'PlayersCtrl'}).
            otherwise({redirectTo: '/'});
    }]);</code></pre>
</noscript>

&nbsp;

2) Now, you have the main routes, templates and controllers defined. As you can see, Footer is used in several pages and is always the same. Header is used in several pages and is almost the same. It just changes if user is logged in or not. As we want to use the footer several times and we don&#8217;t want to define it so many times, we&#8217;re going to define a directive for it. This directive has its template and it can have a controller in case it needs it. Otherwise, we can just have a link method that will be run when added to other HTML.

<noscript>
  <pre><code class="language-javascript javascript">module.directive('footer', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "/js/directives/footer.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
        }]
    }
});</code></pre>
  
  <pre><code class="language-html html">&lt;div&gt;
  &lt;p&gt;
    This is the footer. Yeah baby. Coyrhing and all of that!
  &lt;/p&gt;
&lt;/div&gt;</code></pre>
</noscript>

&nbsp;

3) Almost same things happen with Header. We&#8217;re going to use this in many places but it has some differences. For this cases, I use AngularUI ui-if directive which is awesome, as that&#8217;s exactly what we want. Depending on something we show one content or another. Check it out [clicking here][1]

<noscript>
  <pre><code class="language-javascript javascript">module.directive('header', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
        templateUrl: "/js/directives/header.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
        }]
    }
});</code></pre>
  
  <pre><code class="language-html html">&lt;div&gt;
  &lt;p&gt;
    This part of the hader is always here
  &lt;/p&gt;
  &lt;p ui-if="user"&gt;
    User {{user.name}} is logged in :D
  &lt;/p&gt;
  &lt;p ui-if="!user"&gt;
    Hey buddy, log in! Be cool
  &lt;/p&gt;
&lt;/div&gt;</code></pre>
</noscript>

Here, there are 2 important things to note. First the scope attribute, where we put user: &#8220;=&#8221;. What does this mean? This will add the user to out scope ($scope.user). It will create a bidirectional asociation with the value supplied in the HTML as a parameter. If the user doesn&#8217;t put anything, it will be asumed that the name of the parent scope variable is user (Don&#8217;t do this, it&#8217;s impossible to understand :)). What does this mean in english?

If you put <div header user=&#8221;userModel&#8221;> in the template HTML for the controller, it will mean that $scope.user in the Header directive will be always the same as $scope.userModel in the Controller. If one of them changes, the other will change. This is really cool! So, then, we can actually check if this $scope.user exists or not in our template with ui-if. And as it&#8217;s a bidirectional asociation, if $scope.userModel changes from being undefined to a user (He&#8217;s logged in somehow), the hader will change automatically. This is freaking awesome! Binding rules <img src="http://gon.to/wp-includes/images/smilies/icon_biggrin.gif" alt=":D" class="wp-smiley" /> 

4) All we need to do now is create the main templates for each controller using our directives.

&nbsp;

<noscript>
  <pre><code class="language-html html">&lt;div&gt;
  &lt;div header&gt;&lt;/div&gt;
  
  &lt;div class="main-content"&gt;
    &lt;p&gt;
      Here it's this page specific content :)
    &lt;/p&gt;
  &lt;/div&gt;
  
  &lt;div footer&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
  
  <pre><code class="language-html html">&lt;div&gt;
  &lt;div header user="player"&gt;&lt;/div&gt;
  
  &lt;div class="main-content"&gt;
    &lt;p&gt;
      Here it's this page specific content :)
    &lt;/p&gt;
  &lt;/div&gt;
  
  &lt;div footer&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
  
  <pre><code class="language-html html">&lt;div&gt;
  &lt;div header user="userModel"&gt;&lt;/div&gt;
  
  &lt;div class="main-content"&gt;
    &lt;p&gt;
      Here it's this page specific content :)
    &lt;/p&gt;
  &lt;/div&gt;
  
&lt;/div&gt;</code></pre>
</noscript>

And we finished. We&#8217;ve an app up and running with a header, a footer and specific content for each page. Now, every time we add a page, all we need to do is just create the controller, create the template and add the header and footer if needed and that&#8217;s it.

I&#8217;ve not put it in this example, but what if the directive and the controller need to talk? One way is the scope: &#8220;=&#8221; that I showed here. Other way is through events. This way, they can talk but they&#8217;re not coupled which is really cool.

So, what do you guys think about this approach? What do you think about angular?

 [1]: https://github.com/angular-ui/angular-ui/blob/master/modules/directives/if/if.js