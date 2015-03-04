---
layout: post
title: "F%#ck Github Pages for my Jekyll blog. Why I decided to use Digital Ocean instead?"
description: Using Github Pages for your Jekyll blog is pretty common. In this article I'll explain why that's the worse thing you can do!
date: 2015-03-03 22:06
image:
  thumb: 2015-03-03-f-percent-number-ck-github-pages-for-jekyll-why-i-decided-to-use-digital-ocean/logo.png
comments: true
share: true
tags: 
- github
- github pages
- jekyll
- blog
- ProTip
- redirect
- personal blog
---
You've finally decided to create a blog. You want to share your view of the world with everyone who cares to read about it. If you're a developer like me, you probably like Markdown and you'll end up creating your blog with Jekyll since it's very customizable and easy to use. 

Besides that, Github (the most beloved Webapp for all developers) has a nice feature that lets you [easily deploy](https://help.github.com/articles/using-jekyll-with-pages/) your Jekyll blog for everyone to read it.

However, not everything that Github does is pure gold. In this article, I'll tell you about my own experience when creating this blog and why I decided to move away from Github and Github pages to deploy my blog in Digital Ocean.

<!-- more -->
## Phases of creating a blog

In order to explain why I moved away from Github Pages, I'll go over all the different phases I went through when building my blog.

### Phase #1: I can just push the code to GH and it works! Life is great!

Once your jekyll blog is finished, you just push it to Github into the `gh-pages` branch and Github will [take care of publishing it](https://help.github.com/articles/using-jekyll-with-pages/#using-jekyll) for you. This is a pretty neat feature! I was impressed.

### Phase #2: I can get my custom domain with GH Pages. AWESOME!

Now that the blog is out, you'll want to serve it from your own domain. In my case, I wanted to serve the blog from the [gon.to](http://gon.to) domain. In order to do that, it's as easy as [commiting a CNAME file](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/) to our repository which will hold your domain. Again, I was really impressed.

### Phase #3: I want Google to knwo about my blog. Why isn't this working?

Now that the blog is out there, it's time to submit the `sitemap.xml` so that Google can know about it and more people can get in. When I submit it, Google tells me that it's having problem reading the file. I couldn't understand what was going on so I decided to procrastinate and work on another thing. I was a little mad now.

### Phase #4: Let's make the blog content shared on Twitter and Facebook look really good. Hell, this doesn't work either...

Another thing that makes it easy for people to read your blog is sharing it in Twitter and Facebook. I decided to add the [needed HTML headers](https://github.com/mgonto/gon.to/blob/master/_includes/head.html#L8-L24) to make the content look really nice when shared on Facebook and Twitter. When I tried it out, it didn't work at all. As this was the second thing that wasn't working I decided to investigate what was going on.

### So what's the problem?

In order to avoid [DDoS attacks](http://en.wikipedia.org/wiki/Denial-of-service_attack), Github makes Github Pages sometimes return a `302` Redirect status code instead of a `200`. This redirect makes it impossible for Google, Facebook and Twitter to crawl your website and get your website content. This was the reason why nor the `sitemap.xml`, nor the HTML headers were readed. I discovered this thanks to the amazing [Facebook Debugger](https://developers.facebook.com/tools/debug/og/object/) tool.

> **Important Note**: This problem only happens when you're using an A record in your DNS to point to Github Pages. This means that I was having this problem because I was using `gon.to` for my blog. If I were to use `blog.gon.to` which was just a `CNAME`, I wouldn't have had this problem.

### What's the solution?

I decided to buy a Digital Ocean machine for 5 USD a month. It's cheap and it's really easy to setup Jekyll on there. 

I'll write a more detailed blog post on how to do it, but basically, what I did is the following:

* Add a Git origin repository on Digital Ocean
* Add a `post-receive` hook that once it received a push, it'd run `jekyll build` and output the site to `/var/www/gon.to`
* Have a simple `nginx` to serve the `/var/www/gon.to` folder
* Do a `git push droplet master` from my machine everytime I did a change

Pretty easy, right?
