---
title: FactoryPal 0.2 for Scala 2.10.0 final released
author: mgonto
layout: post
permalink: /2013/01/14/factorypal-0-2-for-scala-2-10-0-final-released/
dsq_thread_id:
  - 1026200944
categories:
  - Scala
tags:
  - 2.10
  - 2.10.0
  - Code
  - factorypal
  - factory_girl
  - final
  - framework
  - macros
  - scala
---
Just a quick post to let everyone know that FactoryPal&#8217;s 0.2 version for Scala 2.10.0 final has finally been released.

In order to use this, just update the version of FactoryPal to 0.2 and your version of Scala. This is an example build.scala

````scala
import sbt._
import sbt.Keys._

object ApplicationBuild extends Build {

  lazy val root = Project(
    id = "factory_pal_sample",
    base = file("."),
    settings = Project.defaultSettings ++ Seq(
      name := "factory_pal_sample",
      organization := "ar.com.gonto",
      version := "0.2",
      scalaVersion := "2.10.0",
      scalacOptions += "",
      licenses      := ("Apache2", new java.net.URL("http://www.apache.org/licenses/LICENSE-2.0.txt")) :: Nil,
      libraryDependencies ++= Seq(
       "org.scala-lang" % "scala-compiler" % "2.10.0",
       "ar.com.gonto" % "factory_pal_2.10" % "0.2.1",
       "org.scalatest" % "scalatest_2.10" % "1.9.1" % "test"
      ),
      resolvers ++= Seq(
         "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/",
         Resolver.url("Factory Pal Repository", 
          url("http://mgonto.github.com/releases/"))(Resolver.ivyStylePatterns)
      )
    )
  )
}
````

**If you want to know what is FactoryPal or you want to get more information about it please visit <https://github.com/mgonto/factory_pal> and check the README.**
