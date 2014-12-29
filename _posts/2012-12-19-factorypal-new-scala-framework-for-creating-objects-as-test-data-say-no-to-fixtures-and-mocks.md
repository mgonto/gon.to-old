---
title: 'FactoryPal: New Scala framework for creating objects as test data. Say no to Fixtures and Mocks.'
author: mgonto
layout: post
permalink: /2012/12/19/factorypal-new-scala-framework-for-creating-objects-as-test-data-say-no-to-fixtures-and-mocks/
dsq_thread_id:
  - 983087775
categories:
  - Scala
tags:
  - dynamic
  - facotyrpal
  - factory_girl
  - fixture
  - fixtures
  - framework
  - fwk
  - macro
  - macros
  - mock
  - objects
  - reflection
  - scala
  - test
---
FactoryPal is a scala framework that lets you create objects as test data. All you have to do is define the templates for each of the classes that you want FactoryPal to create objects from. After that, FactoryPal takes care of the rest.

Have you ever heard of [factory_girl][1] a super cool Ruby framework? Well, FactoryPal is factory_girl for Scala. It is pretty similar in its use. The difference is that FactoryPal is 100% type safe, which all of us Scala people love.

**Here is a link to Github for the anxious <https://github.com/mgonto/factory_pal>**

**How do we use this?**

FactoryPal is a singleton object where you can register all of the templates. For example, you can define a template as follows:

<noscript>
  <pre><code class="language-scala scala">FactoryPal.register[Person]() { person =&gt;
    person.name.mapsTo("gonto") and
    person.age.isRandom
}</code></pre>
</noscript>

In this example, we register a new template for class model. If we try to set a value for a property that Person doesn&#8217;t has, your project won&#8217;t compile. If you try to set a value to a property that isn&#8217;t the type of that property, the project won&#8217;t compile either. Pretty cool huh? This was possible thanks to Scala Macros and Dynamic, two features added in the latest Scala 2.10 RC release.

For the time being, there are 3 supported operations on a field template.

  * **mapsTo**: This sets a certain specific value to that property.
  * **isRandom**: This sets a random value based on the type of the field. I&#8217;ve created some implicit randomizers for common objects (String, Long, Int, Double, etc.) but you can create your own. This is pretty similar to Ordering[T] used in List.
  * **isAnotherFactoryModel**: You tell FactoryPal that this is an inner object that can be constructed with another template of FactoryPal. For the time being, there can only be one template for each class. I&#8217;m going to change this very soon.

After we created the template, we can instantiate objects of that template as follows:

<noscript>
  <pre><code class="language-scala scala">val person = FactoryPal.create[Person]</code></pre>
</noscript>

The create method has another overload that lets you add some field overriders for certain test. For example you can do the following:

<noscript>
  <pre><code class="language-scala scala">val person = FactoryPal.create[Person]() { (person : ObjectBuilder[Person]) =&gt;
    person.age.mapsTo(45) alone
}
</code></pre>
</noscript>

And that&#8217;s it. That&#8217;s all you need to know to use this.

**How can I add this to my project?**

This is an example configuration for Build.scala for your SBT project :). There&#8217;re only snapshots for now as Scala 2.10 is not yet final. Once it&#8217;s, I&#8217;m going to make a release.

<noscript>
  <pre><code class="language-scala scala">import sbt._
import sbt.Keys._

object ApplicationBuild extends Build {

  lazy val root = Project(
    id = "factory_pal_sample",
    base = file("."),
    settings = Project.defaultSettings ++ Seq(
      name := "factory_pal_sample",
      organization := "ar.com.gonto",
      version := "0.1",
      scalaVersion := "2.10.0-RC3",
      scalacOptions += "",
      licenses      := ("Apache2", new java.net.URL("http://www.apache.org/licenses/LICENSE-2.0.txt")) :: Nil,
      libraryDependencies ++= Seq(
       "org.scala-lang" % "scala-compiler" % "2.10.0-RC3",
       "ar.com.gonto" % "factory_pal_2.10" % "0.1.1-SNAPSHOT",
       "org.scalatest" % "scalatest_2.10.0-RC3" % "1.8-B1" % "test"
      ),
      resolvers ++= Seq(
         "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/",
         Resolver.url("Factory Pal Repository", 
          url("http://mgonto.github.com/"))(Resolver.ivyStylePatterns)
      )
    )
  )
}</code></pre>
</noscript>

Take a look at the dependency and the repository!

**What does it use internally?**

Internally, this framework uses Scala Macros, Dynamic and the new Reflection library provided by Scala 2.10.

**Next Steps**

The next things I want to do are:

  * Add the posibility to have multiple templates for one Class
  * Add template inheritance
  * Add helpers to use this with ScalaTest and Specs2. For the moment, you can create the templates in the before.

For more information or to take a look at the code go to [Github][2]

**EDIT: This is already released for Scala 2.10.0 final, please check [this link][3] for more information on how to use the latest version or take a loot at GitHub&#8217;s README**

&nbsp;

 [1]: https://github.com/thoughtbot/factory_girl
 [2]: https://github.com/mgonto/factory_pal
 [3]: http://gon.to/2013/01/14/factorypal-0-2-for-scala-2-10-0-final-released/