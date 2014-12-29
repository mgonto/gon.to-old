---
title: 'New features on Restangular: the ultimate Rest API client for Angular'
author: mgonto
layout: post
permalink: /2013/04/26/new-features-on-restangular-the-ultimate-rest-api-client-for-angularjs/
dsq_thread_id:
  - 1238282986
dsq_needs_sync:
  - 1
categories:
  - AngularJS
  - Javascript
tags:
  - angular
  - angularjs
  - api
  - client
  - custom
  - methods
  - resources
  - rest
  - restangular
  - restful
  - ultimate
---
Hey,

I&#8217;ve been working more and more on Restangular and added a bunch of more features. **<a style="font-size: 15px;" href="https://github.com/mgonto/restangular" target="_blank">You don&#8217;t know about it yet? Click here to find out @Github</a>**

Let&#8217;s get down to business. What are the cool new features?

&nbsp;

**1) You can now do URL Building with Restangular:**

Sometimes, we have a lot of entities names with their ids and we just want to fetch the later entity. In those cases, doing a request for everything to get the last entity is an overkill. For those cases, I&#8217;ve added the possibility to create URLs using the same API as creating a new Restangular object. This connections are created without doing any request. Let&#8217;s see how to do this:

````js
var restangualrSpaces = Restangular.one("accounts",123).one("buildings", 456).all("spaces");

// This will do ONE get to /accounts/123/buildings/456/spaces
restangularSpaces.getList()

// This will do ONE get to /accounts/123/buildings/456/spaces/789
Restangular.one("accounts", 123).one("buildings", 456).one("spaces", 789).get()

// POST /accounts/123/buildings/456/spaces
Restangular.one("accounts", 123).one("buildings", 456).all("spaces").post({name: "New Space"});
````

**2) Now you can manually run any custom Rest operation that&#8217;s not 100% Restful anyway.**

Sometimes our APIs have other operations besides the regular one. For example */messages/123/archive* or */messages/clear-all* For those cases, we can now use Restangular anyway. Restangular provides a set of &#8220;customOPERATION&#8221; methods like *customGET, customPOST, customGETLIST, customPUT. *Let&#8217;s see an example

````js
//GET /messages/123/archive
Restangular.one("messages", 123).customGET("archive")

//POST /messages/clear-all?param=param2 with body of {force: true}
Restangular.all("messages").customPOST("clear-all", {param: "param2"}, {}, {force: true})
````

**3) You can also create your own Restangular methods and extend it as you want.**

Let&#8217;s assume that your API needs some custom methods to work. If that&#8217;s the case, always calling customGET or customPOST for that method with all parameters is a pain in the ass. That&#8217;s why every element has a `addRestangularMethod` method. This can be used together with the hook `setOnElemRestangularized` to do some neat stuff. Let&#8217;s see an example to learn this.

````js
//In your app configuration (config method)
RestangularProvider.setOnElemRestangularized(function(elem, isCollection, route) {
    if (!isCollection && route === "buildings") {
        // This will add a method called evaluate that will do a get to path evaluate with NO default
        // query params and with some default header
        // signature is (name, operation, path, params, headers, elementToPost)
        elem.addRestangularMethod('evaluate', 'get', 'evaluate', undefined, {'myHeader': 'value'});
    }
    return elem;
})

// Then, later in your code you can do the following:

//GET to /buildings/123/evaluate?myParam=param with headers myHeader: value
//Signature for this "custom created" methods is (params, headers, elem)
// If something is set to any of this variables, the default set in the method creation will be overrided
// If nothing is set, then the defaults are sent
building.evaluate({myParam: 'param'});

//GET to /buildings/123/evaluate?myParam=param with headers myHeader: specialHeaderCase
building.evaluate({myParam: 'param'}, {'myHeader': 'specialHeaderCase'});
````

**4) It&#8217;s now available in a CDN.**

````html
&lt;!-- Use LATEST folder to always get the latest version--&gt;
&lt;script type="text/javascript" src="http://cdn.jsdelivr.net/restangular/latest/restangular.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="http://cdn.jsdelivr.net/restangular/latest/restangular.min.js"&gt;&lt;/script&gt;

&lt;!-- Or use TAG number for specific version --&gt;
&lt;script type="text/javascript" src="http://cdn.jsdelivr.net/restangular/0.5.3/restangular.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="http://cdn.jsdelivr.net/restangular/0.5.3/restangular.min.js"&gt;&lt;/script&gt;
````

**5) Now you can send your own Headers**

Every method in Restangular now accepts custom Query parameters and custom Headers as parameters.

**6) Now you can use any response format in Restangular**

****Let&#8217;s assume that you have a Response that&#8217;s actually wrapped in some Object with some Metadata and that your List of element isn&#8217;t an array. If that&#8217;s the case, you can now use Restangular anyway thanks to the *responseInterceptor* and the *responseExtractor.*

````js
app.config(function(RestangularProvider) {
    // First let's set listTypeIsArray to false, as we have the array wrapped in some other object.
    RestangularProvider.setListTypeIsArray(false);

    // Now let's configure the response extractor for each request
    RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
      var newResponse;
      // This is a get for a list
      if (operation === "getList") {
        // First the newResponse will be response.objects which is actually an array
        newResponse = response.objects;
        // Then we add to this array a special property containing the metadata for paging for example
        newResponse.metadata = response.data.meta;
      } else {
        // If it's an element, then we just return the "regular" response as there's no object wrapping it
        newResponse = response;
      }
      return newResponse;
    });
});
````

**7) Restangularized promises**

****Now all promises are enhanced as well. You can for example add a new element to the promise of an array returned by getList without calling the then. It will return a new Promise of the edited array, which you can use in your view as Angular knows how to handle promises. Take a look

````js
var buildings = Restangular.all("buildings").getList();

// New promise after adding the new building
// Now you can show in scope this newBuildings promise and it'll show all the buildings 
// received from server plus the new one added
var newBuildings = buildings.push({name: "gonto"});

var newBuildingsSame = buildings.call("push", {name: "gonto"});

// This is a promise of a number value. You can show it in the UI
var lengthPromise = buildings.get("length");

lengthPromise.then(function(length) {
  // Here the length is the real length value of the returned collection of buildings
});
````

That&#8217;s it for now!

If you have ANY suggestion on something to add, please create an Issue at Github or comment it here
