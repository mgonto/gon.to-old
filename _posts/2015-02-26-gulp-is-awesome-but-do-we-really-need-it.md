---
layout: post
title: "Gulp is awesome, but do we really need it?"
description: "I've been using Grunt and Gulp for some time now. However, I've realized lately that with a simple package.json I can do the same, but more manteinable and with less code. In this post, I'll explain how we can do it!"
date: 2015-02-26 22:58
image:
  thumb: 2015-02-26-gulp-is-awesome-but-do-we-really-need-it/logo.jpeg
comments: true
share: true
tags: 
- gulp
- build
- ci
- grunt
- makefile
- package.json
- node
- frontend
- build tools
---
When I build a Single Page Application (SPA), I need to somehow concatenate, minify and compress all my JS, CSS and Image files for production while keeping them as they oringinally are for development. Also, I'd like my app to continually redeploy on each change I do while I'm coding. 

Before Grunt existed, I thought that doing this in an easy and manteinable way was impossible. That's why I thought Grunt was the holly grail for build tools. But then, Gulp appeared. Now I could have all the pipeline of transformations that happens to certain type of files in only one place. It was so much easier to understand than Grunt. And then again, now I thought Gulp was the holly grail.

**But what if none of this complex build tools are needed and we can just do the same with less code making it more manteinable and easier to use?** This is what we're going to be talking about in this post!

<!-- more -->

Let's start from the begining. A few months back, I built a seed project for creating Single Page Apps (SPAs) without any framework at all. For this project, I created what I thought was a [simple `Gulpfile.js`](https://github.com/auth0/single-page-app-seed/blob/master/gulpfile.js). 

Basically, it had the [`watch` task](https://github.com/auth0/single-page-app-seed/blob/master/gulpfile.js#L82) which took care of [calling `browserify` and apply the needed transformations](https://github.com/auth0/single-page-app-seed/blob/master/gulpfile.js#L23-L49) as well as [using `rework` for CSS requires](https://github.com/auth0/single-page-app-seed/blob/master/gulpfile.js#L62-L75) and finally [serving the `build/` folder](https://github.com/auth0/single-page-app-seed/blob/master/gulpfile.js#L56).

Gulp in its core is really simple!. It just provides a way of creating a stream from several source files and then pipe it through different transformations. Usually, those transformations are either just regular node.js packages like [`browserify`, `rework` and `watchify`](https://github.com/auth0/single-page-app-seed/blob/master/gulpfile.js#L9-L10) or simple wrappers that makes regular node.js packages work with stream like [`gulp-serve`](https://github.com/auth0/single-page-app-seed/blob/master/gulpfile.js#L15) which is just a wrapper on top of [`serve`](https://github.com/tj/serve).

I was really happy about what I had implemented since my Gulpfile was just 82 lines of code and the code was really clear. I didn't have to be in the lookout for all of those `baseDir` and `dest` folders to understand what was going on like I used to do with Grunt.

This week, I decided to update that seed project to make it work with React for templating instead of Ripple. While doing so, I decided to try out using the `package.json` to accomplish the same tasks I was doing with Gulp as well as a few more. 

> Side note: I'll be talking about [the seed project](https://github.com/mgonto/react-browserify-spa-seed) in an upcoming post. 

I want to focus now on the [scripts section](https://github.com/mgonto/react-browserify-spa-seed/blob/master/package.json#L19-L28) of the `package.json`. Notice first that it's just 9 (yes 9!) lines of code! And I thought that 82 LOC from Gulp were awesome!

Let's analyze what we're doing there! The equivalent of the previous `watch` function is [this line](https://github.com/mgonto/react-browserify-spa-seed/blob/master/package.json#L20) which basically just calls simultaneously (notice it's doing `&` and not `&&`) 2 other tasks from the `package.json` and the `serve` function which is installed as a [dev dependency](https://github.com/mgonto/react-browserify-spa-seed/blob/master/package.json#L50). 

Most node.js utilities we use with Gulp usually provide a `CLI` interface as well. `serve` is one of those cases. When we install it as a dev dependency, the `CLI` executable is put into `node_modules/bin` which can be just run by calling it from the `package.json`'s' `scripts` (like we're doing in the `watch` task).

Now, let's checkout the [`watch-js` and `watch-css` tasks](https://github.com/mgonto/react-browserify-spa-seed/blob/master/package.json#L24-L25). They both just call the cli for `watchify`, `nodemon` and `rework` which were installed as dev dependencies as well.

Finally, let's take a look at the [`build-js` task](https://github.com/mgonto/react-browserify-spa-seed/blob/master/package.json#L23). We can see that it's using a cool feature that most node.js `CLIs` provide: If you don't set an output file, you can just pipe the response to another command, just like you regularly do with any regular UNIX command. In this case, we're first using `browserify` to handle all the requires and output one concatenated file and then pass its output to `uglify` to minify this. It's basically the same as what we're doing with Gulp when we call the `.pipe()` method, but using UNIX command line features instead.

## What does this all mean?

Suming up, if we take a look at our `package.json`, we're just calling `CLI` interfaces for node.js packages which we installed as dev dependencies and then piping the content of calling one of them to another. We accomplished the same we did with Gulp but with less, much simpler and easier to mantain code.

I'm not saying Gulp is never going to be needed. But for most cases that we use it (which are quite simple), we can just use the `package.json` or even a `Makefile`.

What do you guys think about it? Are you willing to try this aproach out?
