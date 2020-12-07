---
layout: cheatsheet
title: Markdown Cheatsheet
---

This is a complete Markdown cheatsheet. Press Control+F to speedup your findings.

## Table of content
| | | | |
|-|-|-|-|
|[Headings](#Headings)|[Line Breaks](#LineBreaks)|[Bold, Italic & Strikethrough](#BIS)|[Blockquotes, Code and Pre](#BCP)|
|[Colors](#Colors)|[Tables](#Tables)|[Images and Links](#ImagesLinks)|[Horizontal Lines](#Horizontal)|
|[Lists](#Lists)|[Footnotes](#Footnotes)|[Task Lists](#Task)||

## Headings {#Headings}
Use number signs to define headings. Number of number sign defines the level of the heading.

| Markdown      |   Meaning     |
|---------------|---------------|
| `# H1`           | Heading 1     |
| `## H2`          | Heading 2     |
| `### H3`         | Heading 3     |
| `# H1 {#heading-id}` | Heading with custom heading ID to call later (bookmark) |

## Line Breaks {#LineBreaks}
Add two or more space at the end of the line for line breaker (br)

```
First line (space)(space)  
Second line
```

## Bold, Italic & Strikethrough {#BIS}
Use:
- 01 asterisk to *italicize* words  
- 02 asterisks to **bold** words  
- 03 asterisks to ***bold and italicize*** words at the same time  
- 02 tildes to ~~strikethrough~~ text

## Blockquotes, Code and Pre {#BCP} 
Use:  
- Put greater sign (>) at the begining of a paragraph to create a blockquotes  

![Markdown blockquotes]({{ site.baseurl }}/images/20201207/markdown-blockquotes.png)  

Result

> This is a blockquotes  

- Use single backtick to put words inside inline code  

![Markdown inline code]({{ site.baseurl }}/images/20201207/markdown-inline-code.png)  

Result

This is `inline code`

- Use triple backticks to create a pre block  

![Markdown pre block]({{ site.baseurl }}/images/20201207/markdown-pre-block.png)

Result

```
# No language indicated -> no syntax highlighting
def func1():
'''Function 1'''
    do_it()
```  

Another pre block with syntax specified   

![Markdown Python pre block]({{ site.baseurl }}/images/20201207/markdown-python-pre-block.png)

Result

```python
# A block of Python code -> Python syntax highlighting
def func2():
'''Function 2'''
    do_it()
```  

## Colors {#Colors}
Markdown doesn't support color, we need to use inline HTML inside markdown.

![Markdown Colors]({{ site.baseurl }}/images/20201207/markdown-colors.png)

Result

I am <span style="color:red"> the **RED** text</span>

## Tables {#Tables}
By default, tables in markdown are left aligned. You can control the column alignment using colons (:) putting at the head of the column.

![Markdown Tables]({{ site.baseurl }}/images/20201207/markdown-tables.png)

Result

|   Column default    |   Column centered    |  Column Right-aligned    |
|---------------------|:--------------------:|-------------------------:|
|   I am left aligned | I am centered        |  I am right-aligned      |
| Col1                | col2                 | col3                     |
| `hey`               | 100                  | $150                     |

## Images and Links {#ImagesLinks}

Images with title

![Markdown Images]({{ site.baseurl }}/images/20201207/markdown-images.png "The markdown image with title")

Result (hover the image to see the text appears)

![alt-text]({{ site.baseurl }}/images/logo.png "The markdown image with title")

Link with title (text on hover)

![Markdown Links]({{ site.baseurl }}/images/20201207/markdown-links.png "The markdown image with title")

Result (hover the link to see the text appears)

[This is a link]({{ site.baseurl }}/cheatsheets/markdown-cheatsheet/ "The markdown link with title")

## Horizontal Lines {#Horizontal}
To draw a horizontal line in markdown we can use:
- 03 hyphens (-)
- 03 asterisks (*)
- 03 underscores (_)

Result

---
***
___

## Lists {#Lists}
### Ordered list  

![Markdown Ordered List]({{ site.baseurl }}/images/20201207/markdown-ordered-list.png)

Result

1. Item
2. Item  
    2.1. Sub-item  
    > What about adding a blockquotes here
    2.1. Sub-Item  
3. Item

### Un-ordered list

![Markdown unordered List]({{ site.baseurl }}/images/20201207/markdown-unordered-list.png)

Result

- Item
* Item
    - Sub-item
    > What about adding a blockquotes here
    * Sub-item
+ Item

## Footnotes {#Footnotes}
Please noted that the footnotes will be put at the end of the page automatically.

![Markdown Footnotes]({{ site.baseurl }}/images/20201207/markdown-footnotes.png)

Result

I will add a footnote [^1] in this sentence[^thecode].

[^1]: This is the footnote  
[^thecode]: Wow, i think this gonna be a long code.  
    You need to indent the text to include them into the footnote
    ```python
    def f1():
        hey()
    ```
    End of the long code here

## Task Lists (#Task)

```
\- [x] I've done this  
\- [ ] Note done yet  
```

Result

- [x] I've done this
- [ ] Note done yet

## Escaping Characters
In Markdown, the escaping charater is a backslash ( \ ). Put a backslash in front of the literal character.

\\\```python  
def f1():  
    hey()  
\\\```  

Result

\```python  
def f1():  
    hey()  
\```  


---