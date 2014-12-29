---
title: 'Automatically download &#038; use FrontEnd JS dependencies with Bower + Grunt boilerplate free'
author: mgonto
layout: post
permalink: /2013/04/25/automatically-download-use-frontend-js-dependencies-with-bower-grunt-boilerplate-free/
dsq_thread_id:
  - 1236252462
categories:
  - Javascript
tags:
  - angular
  - bower
  - dependencies
  - development
  - download
  - frontend
  - grunt
  - gruntfile
  - install
  - node
  - npm
  - restangular
  - script
  - task
---
Hey,

Today I wanted to talk a little about Bower and Grunt.

***Bower*** is a package manager for FrontEnd JS dependencies mostly. You create your *bower.json* (*components.json* before, now depracated), put all of your dependencies in that file, and then just run *bower install*. That will download all of those dependencies and copy them to components/ folder inside your project. However, this will download the WHOLE git tag, which has a lot of boilerplate you won&#8217;t need like README, build files, and so on. Bower tells you to link to the file in /components/angular/angular.js but I don&#8217;t really like that. I&#8217;d rather those dependencies are copied to my &#8220;output&#8221; folder or something like that but that&#8217;s not possible with Bower out of the box.

That&#8217;s where ***Grunt***** **comes to play :). Grunt is a Javascript Task runner. It&#8217;s very similar to Rake. It lets you add tasks and execute them sequentially.

**What I want to show you guys is how to just run *grunt* and it will download bower dependencies automatically and copy only the main file to some output folder you want, without all that components boilerplate. Pretty neat right?**

So, what do you need to do

1) Install NODE + NPM. I recommend installing it with [NVM][1] but it&#8217;s just a matter of choice.

2) Install grunt to be used everywhere in your enviroment. That can be done running *npm install grunt-cli -g*

3) Install bower to be used everywhere in your enviroment. That can be done running *npm install bower -g*

4) After this, we have everything configured to start working. Grunt also supports adding some plugins to run some cool tasks. Those plugins will be downloaded for this specific case. For that, we can create a *package.json* and npm will then take care of installing all of this plugins when running npm install. So, create a package.json like this:

````js
{
  "name": "restangular",
  "description": "Restfull Resources service for AngularJS apps",
  "version": "0.5.3",
  "filename": "restangular.min.js",
  "homepage": "https://github.com/mgonto/restangular",
  "author": "Martin Gontovnikas &lt;martin@gonto.com.ar&gt;",
  "dependencies": {},
  "devDependencies": {
    "grunt-cli": "&gt;= 0.1.7",
    "grunt-bower": "*",
    "grunt-bower-task": "*",
  }
}
````

Take a special look into the devDependencies. In there, we&#8217;re stating that we need 2 bower plugins that we&#8217;ll use later.

5) Create your *bower.json *with the dependencies you need. You can either create one similar to the next one or running *bower init* to follow some guide to create it:

````js
{
  "name": "restangular",
  "version": "0.5.3",
  "main": "./dist/restangular.min.js",
  "description": "Restfull Resources service for AngularJS apps",
  "repository": {
    "type": "git",
    "url": "git://github.com/mgonto/restangular.git"
  },
  "dependencies": {
    "underscore": "&gt;= 1.4.4",
    "angular": "*",
    "angular-resource": "*"
  },
  "ignore": [
    "node_modules",
    "components",
    "lib"
  ]
}
````

6) Now, we have everything we need to start creating our *Gruntfile.js*. This file is the one read when running grunt in that directory. Check this Gruntfile. I&#8217;ll explain it below <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> *  
*

<noscript>
  <pre><code class="language-javascript javascript">'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    dirs: {
      dest: 'dist'
    },
    bower: {
      dev: {
        dest: '&lt;%= dirs.dest %&gt;/dependencies'
      }
    },
    bowerInstall: {
        install: {
        }
    },
  });

  grunt.loadNpmTasks('grunt-bower-task');

  grunt.renameTask("bower", "bowerInstall");

  grunt.loadNpmTasks('grunt-bower');

  // Default task.
  grunt.registerTask('default', ['build']);

  // Build task.
  grunt.registerTask('build', ['bowerInstall', 'bower']);
};</code></pre>
</noscript>

So, let&#8217;s explain this step by step. With *loadNpmTasks *we&#8217;re loading some plugin. As that plugin has been installed with npm install, it&#8217;ll be available through an npm task. As you can see, we import the 2 devDependencies we added in the package.json. The problem is that both of those dependencies actually define a task named bower, so by default I can&#8217;t import both as one would override the other. That&#8217;s why I first import one, then rename that one, and then I import the other. *grunt-bower-task* will take care of running bower install. *grunt-bower* will take care of retrieving the main file of each dependency and copy it somewhere.

As you can see above this loadNpmTasks, we call an initConfig method. In there we configure the tasks. First, we create a dirs object with a dest property that points to &#8220;dist&#8221;. That&#8217;s actually our output folder. We can change that to whatever we want. Then, we configure the bower task with the dev action. In there, we configure where to put the main dependency file that&#8217;s retrieved from components folder. There, we use the dirs.dest variable we configured and we put them in a &#8220;dependencies&#8221; folder inside there.

Then, I just configure that running *grunt* by default will call the build task, which first installs all dependencies and then copies them to where they&#8217;re needed.

That&#8217;s it! This is all we need to configure.

Now, you can just run:

*npm install*

*grunt*

And now you have all of your dependencies copied to /dist/dependencies. <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> Just 2 commands after the configuration has been done.

I actually use this approach in [Restangular, so you can check it out there.][2]

I hope this helps you and that you can use this <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" />

 [1]: https://github.com/creationix/nvm
 [2]: https://github.com/mgonto/restangular
