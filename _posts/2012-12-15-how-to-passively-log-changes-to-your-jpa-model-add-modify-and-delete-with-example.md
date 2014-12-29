---
title: How to passively log changes to your JPA Model (Add, Modify and delete) with example
author: mgonto
layout: post
permalink: /2012/12/15/how-to-passively-log-changes-to-your-jpa-model-add-modify-and-delete-with-example/
dsq_thread_id:
  - 2427227438
categories:
  - Java
tags:
  - callbackr
  - example
  - hibernate
  - hook
  - java
  - jpa
  - log
  - map
  - passively
  - play!
  - Play! Framework
  - reflection
---
Hi!

Today I come with a Java tip.

If you are like me and you first want to check out the code, then go to <a target="_blank" href="https://github.com/mgonto/jpa-passive-logging-example/blob/master/app/models/observer">https://github.com/mgonto/jpa-passive-logging-example/blob/master/app/models/observer</a> Or you can first read the explanation and then go to the code <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" rel="lightbox" title="How to passively log changes to your JPA Model (Add, Modify and delete) with example" alt=":)" class="wp-smiley" /> as you like.

I was asked to do a JPA model logging framework. The idea was to Log every change that happens to some specified models. However, I didn&#8217;t want to add information about this logging to the current models. This would make the code uglier and much harder to read. I wanted to be able to passively log the changes without making any change to the model besides some Inheritance or something like that.

That&#8217;s when I remembered that JPA has a lot of Listeners. So, I would use @PostDelete and @PostPersist to log creation and deletion of entities. That was easy enough. Now, the problem was how to log modifications on the model.

There&#8217;s a @PostLoad hook on JPA that is called inmediately after some entity is loaded into the EntityManager. And there&#8217;s also a @PreUpdate hook that is called just before making an update to the database.

So what did I do? In the @PostLoad I save all of the Object properties into a Map<PropertyName, PropertyValue>. I save that in a transient field in the object for future reference. Then, in the @PreUpdate, I convert the current object to a map of the same type and I check for the differences. For every difference that is there, I create a logging event for modification. And that&#8217;s basically the magic :).

You can see the whole example at <a target="_blank" href="https://github.com/mgonto/jpa-passive-logging-example">https://github.com/mgonto/jpa-passive-logging-example</a>

The example was made using Play! Framework 1.2 with JPA, but you can actually make this work with any JPA app. You can use Spring MVC, Struts, etc.

You&#8217;ll also see that I&#8217;ve added several tests so that you can see how this works :).

All of the listener&#8217;s &#8220;magic&#8221; is in <a target="_blank" href="https://github.com/mgonto/jpa-passive-logging-example/blob/master/app/models/observer/AuditableModelListener.java">https://github.com/mgonto/jpa-passive-logging-example/blob/master/app/models/observer/AuditableModelListener.java</a>

The most important code is in <a target="_blank" href="https://github.com/mgonto/jpa-passive-logging-example/blob/master/app/models/observer">https://github.com/mgonto/jpa-passive-logging-example/blob/master/app/models/observer</a>

Enjoy logging guys <img src="http://gon.to/wp-includes/images/smilies/icon_biggrin.gif" alt=":D" class="wp-smiley" />