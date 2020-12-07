---
layout: cheatsheet
title: Markdown Cheatsheet
---

This is a complete Markdown cheatsheet. Press Control+F to speedup your findings.

## Table of contents

|     ToC             |     ToC                  |            ToC                     |         ToC                     |
|---------------------|--------------------------|------------------------------------|---------------------------------|
| [Headings](#Headings) | [Line Breaks](#LineBreaks) | [Bold, Italic & Strikethrough](#BIS) | [Blockquotes, Code and Pre](#BCP) |
| [Colors](#Colors) | [Tables](#Tables)|[Images and Links](#ImagesLinks)|[Horizontal Lines](#Horizontal)|
| [Lists](#Lists) | [Footnotes](#Footnotes)|[Task Lists](#Task)|[Escaping Characters](#Esc)|

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

```
> This is a blockquotes 
```

Result

> This is a blockquotes  

- Use single backtick to put words inside inline code  

```
This is `inline code`
```

Result

This is `inline code`

- Use triple backticks to create a pre block  

```
    ```
    # No language indicated -> no syntax highlighting
    def func1():
    '''Function 1'''
        do_it()
    ```  
```

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

```
I am <span style="color:red"> the **RED** text</span>
```

Result

I am <span style="color:red"> the **RED** text</span>

## Tables {#Tables}
By default, tables in markdown are left aligned. You can control the column alignment using colons (:) putting at the head of the column.

```
|   Column default    |   Column centered    |  Column Right-aligned    |
|---------------------|:--------------------:|-------------------------:|
|   I am left aligned | I am centered        |  I am right-aligned      |
| Col1                | col2                 | col3                     |
| `hey`               | 100                  | $150                     |
```

Result

|   Column default    |   Column centered    |  Column Right-aligned    |
|---------------------|:--------------------:|-------------------------:|
|   I am left aligned | I am centered        |  I am right-aligned      |
| Col1                | col2                 | col3                     |
| `hey`               | 100                  | $150                     |

* Please have at least 3 dashes between each table header
* Put at least 1 space between the content of the column and separate signs (pipes)

## Images and Links {#ImagesLinks}

Images with title

```
![alt-text]({{ site.baseurl }}/images/logo.png "The markdown image with title")
```

Result (hover the image to see the text appears)

![alt-text]({{ site.baseurl }}/images/logo.png "The markdown image with title")

Link with title (text on hover)

```
[This is a link]({{ site.baseurl }}/cheatsheets/markdown-cheatsheet/ "The markdown link with title")
```

Result (hover the link to see the text appears)

[This is a link]({{ site.baseurl }}/cheatsheets/markdown-cheatsheet/ "The markdown link with title")

## Horizontal Lines {#Horizontal}
To draw a horizontal line in markdown we can use:
- 03 hyphens (-)
- 03 asterisks (*)
- 03 underscores (_)

```
---
***
___
```

Result

---
***
___

## Lists {#Lists}
### Ordered list  

```
1. Item
2. Item  
    2.1. Sub-item  
    > What about adding a blockquotes here
    2.1. Sub-Item  
3. Item
```

Result

1. Item
2. Item  
    2.1. Sub-item  
    > What about adding a blockquotes here
    2.1. Sub-Item  
3. Item

### Un-ordered list

```
- Item
* Item
    - Sub-item
    > What about adding a blockquotes here
    * Sub-item
+ Item
```

Result

- Item
* Item
    - Sub-item
    > What about adding a blockquotes here
    * Sub-item
+ Item

## Footnotes {#Footnotes}
Please noted that the footnotes will be put at the end of the page automatically.

```
I will add a footnote [^1] in this sentence[^thecode].

[^1]: This is the footnote  
[^thecode]: Wow, i think this gonna be a long code.  
    You need to indent the text to include them into the footnote
    ```python
    def f1():
        hey()
    ```
    End of the long code here
```

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

## Task Lists {#Task}

```
- [x] I've done this  
- [ ] Note done yet  
```

Result

- [x] I've done this
- [ ] Note done yet

## Escaping Characters {#Esc}
In Markdown, the escaping charater is a backslash ( \ ). Put a backslash in front of the literal character.

```  
* Will be a list item  
\* Will not be converted to an unordered list item
```  

Result

* Will be a list item  
\* Will not be converted to an unordered list item

---