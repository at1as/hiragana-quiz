# Hiragana Test

Simple webpage to test your Hiragana knowledge in just a few lines of code.

### Demo

Snapshot from 19 Sept 2018: [https://www.jasonwillems.com/sites/hiragana/](https://www.jasonwillems.com/sites/hiragana/)

### Screenshot

<image src="https://raw.githubusercontent.com/at1as/at1as.github.io/master/github_repo_assets/hiragana-1.png">

### Data Source

Fetch Data from [Wikipedia](https://en.wikipedia.org/wiki/Hiragana). To quickly scrape the contents of the page, follow these steps:

```
$ curl "https://en.wikipedia.org/wiki/Hiragana" | head -n 590 | tail -n 340 > hiragana.html
$ vim hiragana.html
````

Next, from within Vim:

```
#### Extract Title and Phonetic Spelling
:%s/^\(.*\)title="\([^"]\{1,3\}\)"\(.*\)>\([  ]\{0,1\}\)\([a-z, ]*\)\([  ]\{0,1\}\)\>\(.*\)title\(.*\)/  "\2": "\5",/g]"

#### Delete lines that did not match
:g/^</d

#### Add opening/closing braces to format as valid json
: gg O { esc
: G o 
} esc

#### Save updated file and exit
: x
```

Note that regex does not work well with XML. It is better to use a library that can traverse the XML tree and extract elements. Regex was used here out of lazyness, and because the Hiragana chart is not likely to remain fairly static.


### License

MIT
