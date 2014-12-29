---
title: Fix to Blank (Empty) pages in Google Analytics
author: mgonto
layout: post
permalink: /2013/05/20/fix-to-blank-empty-pages-in-google-analytics/
dsq_thread_id:
  - 1302665353
categories:
  - Google
tags:
  - adblock
  - analytics
  - blank page
  - bug
  - Google
  - Google Analytics
  - problem
---
Hey guys,

This is a quick post on a fix that I&#8217;ve found for the Google Analytics problem.

I&#8217;ve had been going to Google ANalytics page getting a blank screen. First I get a warning message above and then just a blank screen. I checked the HTML and there was just an iFrame so I didn&#8217;t know what was going on. Tried different browsers, deleting cookies, cache, etc.

The real problem is that AdBlock plugin from Chrome is actually blocking this page. So **the solution is to go to the Extension options and whitelist analytics.google.com so that it&#8217;ll load.**

I hope this helps you. I&#8217;ve had this problem for a week and it was driving me nuts!

See ya!