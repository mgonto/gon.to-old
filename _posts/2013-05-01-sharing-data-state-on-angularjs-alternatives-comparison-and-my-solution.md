---
title: 'Sharing Data, State and Models on AngularJS: Alternatives, comparison and my solution'
author: mgonto
layout: post
permalink: /2013/05/01/sharing-data-state-on-angularjs-alternatives-comparison-and-my-solution/
dsq_thread_id:
  - 1252146299
categories:
  - AngularJS
tags:
  - alternatives
  - angular
  - angularjs
  - comparison
  - data
  - javascript
  - js
  - library
  - share
  - share data
  - solution
  - state
---
Once you start using AngularJS for all of your apps, **you&#8217;ll see that each time your apps are bigger and they use more JS and Angular**. At this point, the regular example of TODO list isn&#8217;t really useful anymore. At this point **we really need to start sharing data and state.** In other words, we need to have models that are known by several controllers and directives and we need to be able to be notified of this model changes.

**Once we realize this, we&#8217;ll see that there&#8217;re actually a bunch of options for doing so**, and at first we don&#8217;t really know which is the best one. I&#8217;ve personally tried all of them, and have had to refactored the code sometimes as I ended up getting the unfourtenately-too-well-known spaghetti code.

Let&#8217;s first state all of the options:

**1) We can use Models as a service.** What does this mean? We create a service that will actually be a model. This &#8220;service&#8221; will have state and data. So, each time we need to use this model, we just import it in the controller or in the directive and we use it to set or get values. But what about being notified? We can actually assign this &#8220;service&#8221; to a scope variable in the first line of our controller and then use the *$watch* method from the scope to see if it has changed. For example:

<noscript>
  <pre><code class="language-javascript javascript">angular.module("test").service("Greeting", function() {
  this.greet = null;
  
  this.greetTo = function(name) {
    this.greet = "Hello " + name;
  }
});

angular.module("test").controller("TestCtrl", function(Greeting) {
  $scope.greeting = Greeting;
  
  $scope.$watch("greeting", function(){
    // The model has changed. Do something
  });
  
  $scope.greeting.greetTo("Gonto");
});</code></pre>
</noscript>

**2) Using ng-include. **Using ng-include, we can include some other piece of HTML. This HTML will have a new scope (ng-include does this) and will create a controller for it. So, we&#8217;ll have a Controller inheritance with ng-include. $scope is inherited as well (It uses prototypal inheritance), so when you call something in the child controller&#8217;s scope, if it&#8217;s not there, it&#8217;ll go look to the parent. We can get notified of changes using $watch as well.

**3) Using NOT isolated directives.** This is very similar to the option #2. We can create some directives that will inherit scope from parent and share model like this. Remember that each directive can have a Controller. In this case Scope won&#8217;t be isolated.

**4) Using isolated directives. **We can use directives with an isolated scope (declaring scope: {stuff: &#8216;=&#8217;} for example) so that we can actually reuse them easier. This directive don&#8217;t depend on the parent scope. They depend on getting some parameters from the parent. Those paramters are stated in the scope configuration of the directive declaration. In the example 2 lines above, we expect to get an attribute named stuff. The value will be name of the model from the parent to which we&#8217;ll have a bidirectional asociation. In this case, we can use $watch to get notified as well

**5) Using events. **We can use events to comunicate between controllers, directives, etc. This events can carry extra information like a model. So we can say something like Greet Changed and sending in the event payload the new greeting. This way, all that want to know about it just gotta call the $on method from the scope stating the method name.

**Let&#8217;s compare them and find their advantages and disadvantages.**

As you can see, there&#8217;re a lot of options. Some of them are very similar, but have one or 2 differences.

I&#8217;ve started using events at first to decouple everything to the maximum. What&#8217;s the problem of this? That as we need to send this models or changes to model through events, we cannot rely or use the full advantages of the binding (bidirectional asociations) for models in scope. What does this mean? That I need to receive the event and manually set the value to some local scope variable. Then, the scope will taken as changed and then the DOM will change. This way, I need to send events receive them and a lot of boilerplate.

If we use option #2 or #3, as the scope variables are inherited, if we change in the child scope something in the model that was inherited, then the DOM from the parent controller (and the $watch functions) will get notified inmediately and the change will be done. This means that we don&#8217;t need to pass any value around. We just change this value where it needs to be changed and automatically this will be shown in the DOM, even if the HTML for what was changed actually &#8220;belongs&#8221; to the parent controller. But what is the disadvantage of this? Our directives and controllers are coupled with their parents. If the parent isn&#8217;t there, it doesn&#8217;t work.

So, at this point, we start thinking about #3 having isolated directives. But if a directive needs a lot of things from the parent, setting all this attributes in the directive declaration is a pain in the ass. And if we need some new attribute it&#8217;s not &#8220;magically inherited&#8221;, but we need to set it in the attribute and also define it in the scope definition from Directive.

Now, you&#8217;re thinking OK, Services models are the solution then. Well, I don&#8217;t really like it. You gotta set them to a scope variable at the first line if you want to get notified of stuff using $watch. If you have this service at multiple controllers in a &#8220;controller chain&#8221; of inehritance, you&#8217;d have this scope variable repeated all over the place in the scope. It might eventually make your app much slower, even more if this model is huge as it&#8217;s going to be in several scopes. But the good thing is that here, when we have a model dependency, it&#8217;s not implicit as with options #2 and #3, but it&#8217;s explicit, so it&#8217;s much easier to understand once it&#8217;s read.

**So, what&#8217;s the best?** I don&#8217;t really know. **I can tell you what I&#8217;ve chosen to use.**

Right now, I&#8217;m using #3 and #4. I like directives more than ng-include as they&#8217;re much more declarative and the HTML is very clear. ng-include and NOT isolated directive are VERY similar. Also another cool thing about directives is that I can transclude them.

So what I do is, I have always one parent controller that has all the important variables and methods for the whole page (for example if it has a lot of tabs). Then, I have one controller per tab (the one changed with the Route). Then, I try to divide most of the things in Directives. If the thing I&#8217;m coding is reusable in some other stuff, I use an isolated directive. When it&#8217;s isolated, the &#8220;dependencies&#8221; are explicit and it&#8217;s much easier to reuse. If I don&#8217;t want to reuse the directive, but I just use it to organize code and also need a lot of variables from the parent, then I use a NOT isolated directive. This approach has worked for me VERY well.

&nbsp;

So, it&#8217;s time for u guys to try. Tell me which option you like the more, which one you&#8217;re using and why :).

Happy coding!!