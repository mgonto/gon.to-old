---
title: Play! Framework 2 (2.1) Scala with Slick made easy (With example)
author: mgonto
layout: post
permalink: /2012/11/24/play-framework-2-2-1-scala-with-slick-made-easy-with-example/
dsq_thread_id:
  - 2366875328
categories:
  - Play! Framework
  - Scala
tags:
  - cake pattern
  - Code
  - example
  - play!
  - Play! Framework
  - scala
  - Slick
---
Hi everyone!

Today I&#8217;ve seen some videos about Slick and Play! Framework 2.1 and I got excited, so I thought, let&#8217;s code an app with Slick. What did I realize? It wasn&#8217;t that simple. **Play! isn&#8217;t yet thought to work with Slick very well.**

**First of all, if you want to see this example complete you can go to </p> 

<https://github.com/mgonto/slick-play2-example></strong>

In Slick, you create table definitions for the class you want to use. **However, all of the imports for the Table, the columns, etc. are driver dependant. So, when you change the driver, you don&#8217;t want to change the import in the code.** You just want to change a configuration in the application.conf from Play! Framework. That&#8217;s exactly what I did.

So, let&#8217;s see first how it&#8217;s implemented. Every Driver (H2, Postgres, etc) extends from a trait called ExtendedProfile. So, I needed my table classes to use some profile that was injected by me. **Once I realized that I needed to make some DI I thought about Cake Pattern**. For more information about the Cake Pattern please viisit [Cake pattern][1]

So, the first thing I implemented was a Trait Profile with an abstract Extended Profile value:

<pre>package models

import slick.driver.ExtendedProfile

trait Profile {
  val profile: ExtendedProfile
}</pre>

After this, I needed to create the Users table. That Users table needed the profile, so I&#8217;d createa UserModule which would need the Profile trait. Then, as I&#8217;d mix with a Profile trait, I&#8217;d import the things from the abstract ExtendedProfile field and everything would compile. Then I create the users table with an ID and a Name (pretty simple)

<pre>package models

case class User(id: Option[Int], name : String)

trait UserComponent {
  this: Profile =&gt;

  import profile.simple._

  object Users extends Table[User]("users") {
    def id = column[Int]("id", O.PrimaryKey)
    def name =  column[String]("name", O.NotNull)
    def * = id.? ~ name &lt;&gt; (User, User.unapply _)

    def add(user: User)(implicit session: Session) = {
      this.insert(user)
    }

    def countByName(name: String)(implicit session: Session) = {
      (for {
        user &lt;- Users
        if (user.name === name)
      } yield(user)).list.size
    }

  }
}</pre>

After this, I create a DataAccessLayer class (DAL) which would receive the ExtendedProfile as a constructor parameter and then would include the other traits (Profile and UserModule)

<pre>package models

import slick.driver.ExtendedProfile

class DAL(override val profile: ExtendedProfile) extends UserComponent with Profile {

  import profile.simple._

  def create(implicit session: Session): Unit = {
    Users.ddl.create //helper method to create all tables
  }
}</pre>

After this, I have everything to create a DAL from a given profile. However, now I needed a way to configure the profile, so I added a new property in the application.conf.

<pre>slick.db.driver=scala.slick.driver.H2Driver</pre>

Then, I created a trait that would import this driver from the conf and create the database to do the queries and the dal with the corresponding profile. It has two methods, getDb and getDal which will be then used by two other classes.

<pre>package models

import slick.session.Database
import play.api.db.DB
import play.api.Application
import slick.driver.ExtendedProfile

trait DBeable {

  val SLICK_DRIVER = "slick.db.driver"
  val DEFAULT_SLICK_DRIVER = "scala.slick.driver.H2Driver"

  def getDal(implicit app : Application) : DAL = {
    val driverClass = app.configuration.getString(SLICK_DRIVER).getOrElse(DEFAULT_SLICK_DRIVER)
    val driver = singleton[ExtendedProfile](driverClass)
    new DAL(driver)
  }

  def getDb(implicit app : Application) = {
    Database.forDataSource(DB.getDataSource())
  }

  private def singleton[T](name : String)(implicit man: Manifest[T]) : T =
    Class.forName(name + "$").getField("MODULE$").get(man.runtimeClass).asInstanceOf[T]

}</pre>

The only things left are creating the DB once the app starts and having a singleton object to be able to ask for the dal and the database to do the queries from a controller. This is done as following:

<pre>import models.{User, DBeable, AppDB}
import play.api.db.DB
import play.api.GlobalSettings
import play.api.Application
import slick.session.Session

object Global extends GlobalSettings with DBeable{

  override def onStart(app: Application) {
    implicit val application = app
    lazy val database = getDb
    lazy val dal = getDal
    database.withSession {
      implicit session: Session =&gt;
        dal.create
    }
  }
}</pre>

<pre>package models
import play.api.Play.current
object AppDB extends DBeable {

  lazy val database = getDb
  lazy val dal = getDal

}</pre>

And that&#8217;s it :). Now you have everything configured to start coding. I&#8217;ve tried if everything was working with a test as following.

<pre>class UserSpec extends Specification {

  "User" should {

    "be saved" in {
      running(FakeApplication(additionalConfiguration = inMemoryDatabase())) {
        AppDB.database.withSession {
          implicit session: Session =&gt;
            AppDB.dal.Users.add(User(Some(2), "hola"))
            AppDB.dal.Users.countByName("pepe") must beEqualTo(0)
            AppDB.dal.Users.countByName("hola") must beEqualTo(1)

        }
      }
    }
  }
}</pre>

And that&#8217;s it <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> Now you have Play! configured for running with Slick.

Cya people!

 [1]: http://jonasboner.com/2008/10/06/real-world-scala-dependency-injection-di/