---
title: 'FactoryPal: Multiple templates for one class'
author: mgonto
layout: post
permalink: /2012/12/21/factorypal-multiple-templates-for-one-class/
dsq_thread_id:
  - 986354124
categories:
  - Scala
tags:
  - class
  - dsl
  - factorypal
  - factory_girl
  - scala
  - template
---
Hey guys,

I&#8217;ve working on improving FactoryPal. For those of you that don&#8217;t know about it, FactoryPal is a framework to easily create objects for testing or seed data based on a template. You can check out more about this on <https://github.com/mgonto/factory_pal>

The new feature that I&#8217;ve added is the ability to create multiple templates for one class. Before this, you could only create one per class. So, let&#8217;s see how it&#8217;s done and compare them:

````scala
//Default template creation
FactoryPal.register[Person]() { person =&gt;
    person.name.mapsTo("gonto") and
    person.age.isRandom
}

//Creating template for a certain name. This way you can create multiple templates for a certain class
FactoryPal.register[Person](Some('coolPerson)) { person =&gt;
    person.name.mapsTo("cool") and
    person.age.isRandom
}
````

The result of running this code would be to have two templates for Person. The default one and a cool one ;).

And, let&#8217;s use both them!

````scala
//Create a person from default template
val person = FactoryPal.create[Person]

//Creating a Person for cool template
val person = FactoryPal.create[Person](Some('coolPerson))()</code></pre>
````


Pretty neat, huh?

Happy holidays everybody!
