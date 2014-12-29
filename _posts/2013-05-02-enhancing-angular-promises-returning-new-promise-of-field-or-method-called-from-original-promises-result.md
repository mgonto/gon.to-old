---
title: 'Enhancing Angular Promises: Returning new promise of field or method called from original promise&#8217;s result'
author: mgonto
layout: post
permalink: /2013/05/02/enhancing-angular-promises-returning-new-promise-of-field-or-method-called-from-original-promises-result/
dsq_thread_id:
  - 2328095622
categories:
  - AngularJS
tags:
  - $q
  - angular
  - angularjs
  - enhanced
  - javascript
  - promise
---
The title is kind of confusing as it&#8217;s really hard for me to explain what I want to enhance on Angular promises without actually showing.

So, what&#8217;s the idea? You have a function that returns a promise for an object A. Let&#8217;s assume that that object is an Array for our example. And what you want is actually the length fo that array. So, given the promise, instead of setting the callback for the value and then assigning that value to some variable and doing something, what we&#8217;re going to do is to apply a transformation. We&#8217;re going to transform this Promise of an Array to a Promise of a Number (the length). Normally, for this you actually set a function called map which transforms the A to B (once A is received) and therefore returns a Promise of B. Scala for example has map and flatMap for promises.

I implemented this without functions, using names of the fields or of the function. So, let&#8217;s see some code to finally understand this.

````js
// This will return a promise of an Array
var promisedArray = $q.when([1,2,3]);

//Normal way of getting length in angular
promisedArray.then(function(arr) {
  var length = arr.length;
  // Do something with length in callback
})

//Using promises transformation
// This is a promise of a number
var lengthPromise = promisedArray.get('length');

//Calling methods
var biggerArrayPromise = promisedArray.call("push", {name: "Gonto"});</code></pre>
````

So, what&#8217;s the usage of this? Angular already knows how to work with promises and how to resolve them when working with views. What this means is that if in our template we put *{{lengthPromise}}, *once the promise is resolved (value is returned), it will be shown in the HTML. Before, nothing will be shown. That&#8217;s thanks to using $q from Angular.

So, let&#8217;s see the implementation.

````js
function enhancePromise(promise, isCollection) {
    promise.call = angular.bind(promise, promiseCall);
    promise.get = angular.bind(promise, promiseGet);
    return promise;
}

function promiseCall(method) {
    var deferred = $q.defer();
    var callArgs = arguments;
    this.then(function(val) {
        var params = Array.prototype.slice.call(callArgs, 1);
        var func = val[method];
        var result = func.apply(val, params);
        deferred.resolve(result);
    });
    return enhancePromise(deferred.promise);
}

function promiseGet(what) {
    var deferred = $q.defer();
    this.then(function(val) {
        deferred.resolve(val[what]);
    });
    return enhancePromise(deferred.promise);
}
````

I&#8217;ve [implemented it in Restangular][1] but I&#8217;m thinking in creating an Angular module for this. Do you think it&#8217;d be useful?

That&#8217;s all folks

 [1]: https://github.com/mgonto/restangular#enhanced-promises
