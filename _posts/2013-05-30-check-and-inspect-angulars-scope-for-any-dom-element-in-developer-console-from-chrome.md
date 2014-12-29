---
title: 'Check and inspect Angular&#8217;s scope for any DOM element in Developer Console from Chrome'
author: mgonto
layout: post
permalink: /2013/05/30/check-and-inspect-angulars-scope-for-any-dom-element-in-developer-console-from-chrome/
dsq_thread_id:
  - 1337398466
categories:
  - AngularJS
tags:
  - angular
  - angularjs
  - debugging
  - developer console
  - developer tools
  - protip
  - scope
  - tip
---
Hey guys,

Today I come with a quick tip that you might not know.

angular has a method where you can actually send either an element or a selector and angular will select that element. That element has some cool functions that aren&#8217;t available if we select that element any other way.

One of this methods is *scope()*. It actually returns the scope binded to the selected element, which is really cool :). It also supports using $0 as the selector, so if we inspect some element in the developer console and then we do *angular.element($0).scope()* it will return the scope of the selected element.

I know that using the AngularJS developer console extension you can do this as well, but I actually hate that console. I&#8217;d rather do this and jsut work with the &#8220;regular&#8221; Developer console.

Check the following <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> 

&nbsp;

<p style="text-align: center;">
  <a href="http://gon.to/wp-content/uploads/2013/05/Screen-Shot-2013-05-30-at-12.34.50-AM.png" rel="lightbox" title="Check and inspect Angular's scope for any DOM element in Developer Console from Chrome" rel="lightbox"><img class="aligncenter  wp-image-352" alt="Screen Shot 2013-05-30 at 12.34.50 AM" src="http://gon.to/wp-content/uploads/2013/05/Screen-Shot-2013-05-30-at-12.34.50-AM-1024x198.png" width="475" height="92" /></a>
</p>

I hope this works out for you guys <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" />