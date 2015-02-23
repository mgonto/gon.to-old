---
title: 'Have 2 private GitHub repositories for the price of one. For example: Documentation + Coding'
author: mgonto
layout: post
permalink: /2013/02/07/have-2-private-github-repositories-for-the-price-of-one-for-example-documentation-coding/
dsq_thread_id:
  - 1069674012
categories:
  - Git
tags:
  - clone
  - extra
  - git
  - github
  - private
  - repository
  - tip
  - tricks
  - wiki
---
Hey,

I have a quick tip to give you guys today on how to improve your usage of GitHub.

**I know many of you use GitHub for your private and public projects.** When you create a new GitHub project, you get the Git repository and the URL to fetch it. It&#8217;s shown this way:

Then, you normally do **git clone git@github.com:mgonto/factory_pal.git**

<a rel="lightbox" href="http://gon.to/wp-content/uploads/2013/02/Screen-Shot-2013-02-07-at-12.24.24-AM.png" rel="lightbox" title="Have 2 private GitHub repositories for the price of one. For example: Documentation + Coding"><img class="aligncenter size-medium wp-image-257" alt="Screen Shot 2013-02-07 at 12.24.24 AM" src="http://gon.to/wp-content/uploads/2013/02/Screen-Shot-2013-02-07-at-12.24.24-AM-300x30.png" width="300" height="30" /></a>

&nbsp;

As you might know, Github also provides us with a Wiki, where we can put text and everything we want.

**Actually, the wiki is another Git repository that we can access**. We just have to add a &#8220;.wiki&#8221; before the &#8220;.git&#8221; part of the url. So for the **git@github.com:mgonto/factory_pal.git, the wiki repository is git@github.com:mgonto/factory_pal.wiki.git.**

&nbsp;

<a rel="lightbox" href="http://gon.to/wp-content/uploads/2013/02/Screen-Shot-2013-02-07-at-12.29.36-AM.png" rel="lightbox" title="Have 2 private GitHub repositories for the price of one. For example: Documentation + Coding"><img class="aligncenter size-medium wp-image-258" alt="Screen Shot 2013-02-07 at 12.29.36 AM" src="http://gon.to/wp-content/uploads/2013/02/Screen-Shot-2013-02-07-at-12.29.36-AM-300x78.png" width="300" height="78" /></a>

**You can clone that directory and have a secondary Git repository for anything you want.**

**So, what are possible usages of this?**

I usually have some documentation for the project. This documentation can be Mockups, client meetings, UMLs diagrams and so on. I used to have in my Github repository a code and docs folder. **Now, I store the code in the regular repository where I can have pull requests, and the documentation in the wiki repository, together with the wiki pages.** This makes it easier to separate our concerns in my opinion.

Another usage would be to have an extra Git private repository <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> 

Enjoy!
