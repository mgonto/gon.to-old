---
title: 'Can I commit in GIT only parts of a file I&#8217;ve modified? What&#8217;s git add -p'
author: mgonto
layout: post
permalink: /2012/12/10/can-i-commit-in-git-only-parts-of-a-file-ive-modified-whats-git-add-p/
dsq_thread_id:
  - 968155898
categories:
  - Git
tags:
  - add
  - add-p
  - bash
  - chunk
  - commit
  - file
  - git
  - multiple
  - trick
---
Hey everyone

Today I come with a Git tip that rocks basically :).

It has happen to me a lot of times that I&#8217;ve modified a lot of lines in a file. For clarity, I want my commits to be atomic, so I want a certain commit to only have one part of the modifications I&#8217;ve done. I thought this was impossible, but GIT (the SCM Swiss army knife in my opinion) has a solution <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" /> 

So, let&#8217;s suppose I have a file with texts commited to the repo like the following:

````
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
````

So, I first modify the second line of the file and change &#8220;Line 2&#8243; to &#8220;Line 20&#8243;  
Then, I modify the last line of the file to &#8220;Last line&#8221;

And now, I want make a commit first with the Last Line modification.

So what do I do? git add -p <img src="http://gon.to/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley" />  
After that, you&#8217;re going to get something like this

<a rel="lightbox" href="http://gon.to/wp-content/uploads/2012/12/Screen-Shot-2012-12-10-at-10.51.42-PM.png" rel="lightbox" title="Can I commit in GIT only parts of a file I've modified? What's git add -p"><img class="aligncenter size-medium wp-image-178" title="Screen Shot 2012-12-10 at 10.51.42 PM" src="http://gon.to/wp-content/uploads/2012/12/Screen-Shot-2012-12-10-at-10.51.42-PM-300x205.png" alt="" width="300" height="205" /></a>

This is only the first change. And basically here, I can say &#8220;y&#8221; or &#8220;n&#8221; if I want this in my commit. In my case, I don&#8217;t want this in my commit, as this is the Line 2 to Line 20 change. So I choose n.

After this, I get the next chunk.

<a rel="lightbox" href="http://gon.to/wp-content/uploads/2012/12/Screen-Shot-2012-12-10-at-10.53.56-PM.png" rel="lightbox" title="Can I commit in GIT only parts of a file I've modified? What's git add -p"><img class="aligncenter size-medium wp-image-179" title="Screen Shot 2012-12-10 at 10.53.56 PM" src="http://gon.to/wp-content/uploads/2012/12/Screen-Shot-2012-12-10-at-10.53.56-PM-275x300.png" alt="" width="275" height="300" /></a>

In this case, I do want this change in the commit, so I type y.

<a rel="lightbox" href="http://gon.to/wp-content/uploads/2012/12/Screen-Shot-2012-12-10-at-10.54.05-PM.png" rel="lightbox" title="Can I commit in GIT only parts of a file I've modified? What's git add -p"><img class="aligncenter size-medium wp-image-180" title="Screen Shot 2012-12-10 at 10.54.05 PM" src="http://gon.to/wp-content/uploads/2012/12/Screen-Shot-2012-12-10-at-10.54.05-PM-300x135.png" alt="" width="300" height="135" /></a>

Now, you&#8217;ll see that the file is twice in the git st. One part is ready to be commited and another one is not staged to be committed.

Awesome right? Go and tell your friends that you know more GIT than them hahaha.
