# SCSS Coding Guidelines
## Naming Conventions
BEM methodology is used to create reusable and modular components in front-end development.

[BEM](http://getbem.com/naming/)

All file names are lowercase with word separated by a dash:

**Right**
```
icon-home.png
```

**Wrong**
```
iconHome.png
icon_home.png
iconhome.png
```

##IDs vs. Classes
You should almost never need to use IDs. Broken behavior due to ID collisions are hard to track down and annoying.

##Color Units
When implementing feature styles, you should only be using color variables provided by colors.scss

##z-index Scale
Please use the z-index scale defined by z-index.scss. $zIndex-1 to $zIndex-10 are provided.

##Font Weight

##Componentizing
Always look to abstract components. Using consistent style and the reuse of components across designs helps to improve this consistency at an implementation level.

A name like `.homepage-nav` limits its use. Instead think about writing styles in such a way that they can be reused in other parts of the app. Instead of `.homepage-nav`, try instead `.nav` or `.nav-bar`. Ask yourself if this component could be reused in another context (chances are it could!).

Components should belong to their own scss file. For example, all general button definitions should belong in `buttons.scss`.

##Name-spacing
Name-spacing is great! But it should be done at a component level – never at a page level.

Also, namespacing should be made at a descriptive, functional level. Not at a page location level. For example, `.profile-header` could become `.header-hero-unit`.

##Nesting
Don't nest. Ever.

Nesting makes it harder to tell at a glance where css selector optimizations can be made.

##Comments
Use SCSS style comments to annotate styles because they are compiled out. Use them to seperate logical groups of styles within a document. Always use the following style comment:
```
// Title of section // --------------------------------------------------
```

