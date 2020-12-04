---
layout: post
title: How to add new post types in Jekyll
---

In Jekyll, `posts` inside `_posts` folder belong to a special *post* type and being handled automatically by Jekyll, therefore you have to do some extra configuration steps if you want to create a new post type yourself.  

In this tutorial, I will create a new type called *cheatsheets* step-by-step from ground up. Before we begin, here is the layout of the final project:  

{:refdef: style="text-align: center;"}
![Jekyll Project Directory Layout]({{ site.baseurl }}/images/20201204/jekyll-project-directory-tree.png)
{: refdef}

## Step 1: Create a new folder
As I need to create a new post type named `cheatsheets`, I will create a new folder named `_cheatsheets` in the root folder, at the same directory level with `_posts`.

## Step 2: Create a cheatsheet layout
Create a file named `cheatsheet.html` inside `_layouts` folder with below content:  

```
{% raw %}
---
layout: default
---

<article class="post cheatsheet">
  <h1>{{ page.title }}</h1>

  <div class="entry">
    {{ content }}
  </div>

  <div class="date">
    Last updated on {{ page.date | date: "%B %e, %Y" }}
  </div>

  {% include disqus.html %}
</article>
{% endraw %}
```

## Step 3: Create a html file to handle the url
Since I want users to navigate to the new post type `cheatsheet` using `/cheatsheets/` url, I will create a new file named `cheatsheets.html` at the root of the project. Fill the file with the following content:  

```
{% raw %}
---
layout: default
---

<div class="posts cheatsheets">
  {% for cheatsheet in site.cheatsheets %}
    <article class="post">

      <h1><a href="{{ site.baseurl }}{{ cheatsheet.url }}">{{ cheatsheet.title }}</a></h1>

      <div class="entry">
        {{ cheatsheet.excerpt }}
      </div>

      <a href="{{ site.baseurl }}{{ cheatsheet.url }}" class="read-more">Read More</a>
    </article>
  {% endfor %}
</div>
{% endraw %}
```

## Step 4: Create new cheatsheet files inside _cheatsheets folder
Now we will create a new *cheatsheet* file inside the created `_cheatsheets` folder named `2020-12-04-jekyll-so-good.md` then fill the file with the following content:

```
---
layout: cheatsheet
title: Markdown Cheatsheet
---
This is a complete cheatsheet
```

## Step 5: Modify project configuration
Now the final step, open the `_config.yml` and add the following configuration lines to the end of the file:  

```
collections:
  cheatsheets:
    output: true
    permalink: /:collection/:title/
```

Now you can test your newly configuration by browsing the `/cheatsheets/` url.