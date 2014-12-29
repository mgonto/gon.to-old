---
title: 'Twitter&#8217;s Flight JS Framework: First thoughts and comparison with Backbone'
author: mgonto
layout: post
permalink: /2013/01/31/twitters-flight-js-framework-first-thoughts-and-comparison-with-backbone/
dsq_thread_id:
  - 2349898927
categories:
  - Javascript
tags:
  - backbone
  - Code
  - engineering
  - flight
  - javascript
  - mvc
  - mvp
  - twitter
  - twitter engineering
  - web 2.0
  - webapp
  - website
---
Hey,

**Twitter released earlier today a new JS framework called Flight. **You can check it out at <a title="Github" href="https://github.com/twitter/flight/blob/master/README.md" target="_blank">Github</a>

After reading the documentation, downloading it, and trying it for a while, I&#8217;ve my first thoughts.

**Basically, what this framework provides is a way to create components. Each component is then &#8220;binded&#8221; or &#8220;assigned&#8221; to a certain node in the DOM element.** This node can be a div, span, table, button or any other HTML element. That component will take care of all of the actions regarding it&#8217;s elements. It could be change one element&#8217;s color, adding another text, handling a button click or receiving custom events. Each component can trigger and &#8220;listen to&#8221; custom events or DOM events. This is the only way components can communicate with each other, as they&#8217;ll never know another component. It&#8217;s a 100% decoupled. I think this sums up what the new framework is about.

Now, some comments about this implementation:

**I love and hate an event model at the same time.** In one way, it&#8217;s 100% decoupled with actually rules, as you can reutilize each component wherever you want. However, working with events make it almost impossible to debug your code. You see tons of events &#8220;flying&#8221; around, with no easy way of knowing who, when, where and why each event was launched. It can be debugged, but it can be painful at first. So, it&#8217;s a tough call, but I actually still like events. I think that a way to debug this events easily should be added somehow.

**Each of this components reminds me to Backbone&#8217;s View object.** Backbone is a very well known MVP for JavaScript. In backbone each view is binded to an element as well, which can be received as a parameter, and then you can hook to both dom events and custom events. **However, Backbone also has a Router (to handle URL changes via HTML5&#8242;s pushState or #!), models (Which can call your RestAPI easily)** and that&#8217;s it.

However, in Backbone, one View can have a nested view or a list of nested views inside. So, imagine that you have an ul which is a Component or view. And, you want to dinamically add a lot of Li&#8217;s with some configuration. I haven&#8217;t found a way of having a Component &#8220;know&#8221; its child components in Flight. I know that that&#8217;s part of the architecture of no component knows another one, but I think that for child components, they should make an exception. I don&#8217;t think that a parent with its child should communicate via events. So, I do like that of Backbone and not on Flight.

**What does Flight do really well? In my opinion 2 things.**

**1) Mixins. I love Flight&#8217;s mixins.** You can create some &#8220;common&#8221; behaviour that can then be easily added to any component. So, let&#8217;s assume that all your components need to turn red if an event coolEvent is triggered. Instead of coding this in every Component, we just create a mixin that does it, and add this mixin to every component. This is awesome and makes you follow DRY (Don&#8217;t repeat yourself). Backbone should definitely add this!

**2) Component&#8217;s lifecycle.** When a certain Component is to be removed or changed from the DOM, it&#8217;s important to remove and clear certain JS variables so as not to have Memory Leaks. Flight allows us to do this with some cool hooks, but backbone doesn&#8217;t. I think that every JS frameworks should have a tearDown for objects. Open any webpage and leave it open for 1 hour and you&#8217;ll see that it consumes a bunch of memory. Every website has memory leaks. Yes, even Facebook! hahaah

**So, will I use Flight? If I&#8217;m having some Rest API and then the Website, the answer is NO. Backbone has almost everything that Flight has, an even more. I thought that Backbone was lightweight but Flight is even more!**

I hope you liked the quick review <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> See yaa!