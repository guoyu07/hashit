## Hash It

Use `gulp css` to generated assets from `resources/asserts` to `public`
with a hashed file name which is generated by the file's content.

For example:
```
img/a.png => img/a-xxxx.png
css/a.css => css/a-yyyy.css
```

In css:
```
background: @url('../img/a.png'); => background: @url('../img/a-xxx.png');
```

In blade:
```
<link rel="stylesheet" href="@url(css/app.css)"> => <link rel="stylesheet" href="css/app-zzzz.css">
```
