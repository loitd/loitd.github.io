---
layout: cheatsheet
title: Markdown Cheatsheet
---

This is a complete Markdown cheatsheet. Press Control+F to speedup your findings.

## Heading
Use number signs to define headings. Number of number sign defines the level of the heading.

| Markdown      |   Meaning     |
|---------------|---------------|
| `# H1`           | Heading 1     |
| `## H2`          | Heading 2     |
| `### H3`         | Heading 3     |

## Line Breaks
Add two or more space at the end of the line for line breaker (br)

> First line (space)(space)  
> Second line

## Bold & Italic
Use:
- 01 asterisk to *italicize* words  
- 02 asterisks to **bold** words  
- 03 asterisks to ***bold and italicize*** words at the same time  

You can use underscore(s) but it is not the best practices.

## Blockquotes, code and pre
Use:  
- Put greater sign (>) at the begining of a paragraph to create a blockquotes  

![Markdown blockquotes]({{ site.baseurl }}/images/20201207/markdown-blockquotes.png)  

Result

> This is a blockquotes  

- Use single backtick to put words inside inline code  

![Markdown inline code]({{ site.baseurl }}/images/20201207/markdown-inline-code.png)  

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

## Colors
Markdown doesn't support color, we need to use inline HTML inside markdown.

![Markdown Colors]({{ site.baseurl }}/images/20201207/markdown-colors.png)

Result

I am <span style="color:red"> the **RED** text</span>
