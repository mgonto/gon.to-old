---
title: 'Angularytics: The solution to tracking page views and events in a SPA with AngularJS'
author: mgonto
layout: post
permalink: /2013/06/03/angularytics-the-solution-to-tracking-page-views-and-events-in-a-spa-with-angularjs/
dsq_thread_id:
  - 1357925627
categories:
  - AngularJS
tags:
  - analytics
  - angular
  - angularjs
  - angularytics
  - event
  - Google Analytics
  - kissmetrics
  - pageview
  - spa
  - track

---
-----------
**<a href="https://github.com/mgonto/angularytics" target="_blank">TL;DR: Check out the Angularytics GitHub repo and quick bootstrap here</a>**

-----------

Hey,

**We need Analytics to improve our app**. However, **most analytics** (Like Google Analytics) **aren&#8217;t yet fully prepared for Single Page Apps (SPA)**. Google Analytics tracks page views once your browser refreshes the page, which in old pages meant changing the URL. **Now, with AngularJS, we never refresh the page**. We have a complete WebApp which changes URLs, changes resources, but never does a refresh. So, the question is **how can we track page views and events now?**

**That&#8217;s why I&#8217;ve created Angularytics**. Angularytics makes it easy to track page views and events. For now, it works with a console logger and with Google Analytics.

**In order to configure this to automatically track page views, all you need to do is the following:**

<script src="https://gist.github.com/mgonto/5703159.js"></script>

**Withi this, every time the URL changes in your SPA, Google is going to track this page view. Just 5 lines of code and you have this working in your SPA.**

****Now, if you want to track events, you can do this by either using the trackEvent filter or the Angularytics service. **The track event method signature is the same as the one in Google Analytics and <a href="https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide" target="_blank">can be checked by clicking here</a>**

**Let&#8217;s see how we can use the filter**. Imagine we want to track an event when a user clicks on certain button that actually calls a function in the scope.

<script src="https://gist.github.com/mgonto/5703172.js"></script>

Pretty easy, right?

Now, let&#8217;s see how we can do this in a service:

<script src="https://gist.github.com/mgonto/5703189.js"></script>

This is it :). **What do you think about this? I&#8217;d love your feedback :).**

<a href="https://github.com/mgonto/angularytics" target="_blank">If you want to learn how to add an extra event handler like KissMetrics or for further information, please check on GitHub by clicking here.</a>
