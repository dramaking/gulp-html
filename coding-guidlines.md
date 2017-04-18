# SCSS Coding Guidelines

In addition to [Sass Guidelines](https://sass-guidelin.es/)

## Naming Conventions

### JavaScript
syntax: `js-<targetName>`

JavaScript-specific classes reduce the risk that changing the structure or theme of components will inadvertently affect any required JavaScript behaviour and complex functionality. It is not neccesarry to use them in every case, just think of them as a tool in your utility belt. If you are creating a class, which you dont intend to use for styling, but instead only as a selector in JavaScript, you should probably be adding the js- prefix. In practice this looks like this:

```
<a href="/login" class="btn btn-primary js-login"></a>
```

### Utilities
Utilities exist because certain CSS properties and patterns are used frequently. For example: floats, containing floats, vertical alignment, text truncation. Relying on utilities can help to reduce repetition and provide consistent implementations. They also act as a philosophical alternative to functional (i.e. non-polyfill) mixins.

Syntax: `u-<utilityName>`

Utilities must use a camel case name, prefixed with a `u` namespace. What follows is an example of how various utilities can be used to create a simple structure within a component.

```
<div class="u-clearfix">
  <a class="u-pullLeft" href="{$url}">
    <img class="u-block" src="{$src}" alt="">
  </a>
  <p class="u-sizeFill u-textBreak">
    …
  </p>
</div>
```

### Components
Syntax: `<componentName>[--modifierName|-descendantName]`

Component driven development offers several benefits when reading and writing HTML and CSS:
- It helps to distinguish between the classes for the root of the component, descendant elements, and modifications.
- It keeps the specificity of selectors low.
- It helps to decouple presentation semantics from document semantics.
You can think of components as custom elements that enclose specific semantics, styling, and behaviour.

#### componentName
The component's name must be written in camel case.
```
.myComponent { /* … */ }
```
```
<article class="myComponent">
  …
</article>
```

#### componentName-descendantName
A component descendant is a class that is attached to a descendant node of a component. It's responsible for applying presentation directly to the descendant on behalf of a particular component. Descendant names must be written in camel case.
```
<article class="tweet">
  <header class="tweet-header">
    <img class="tweet-avatar" src="{$src}" alt="{$alt}">
    …
  </header>
  <div class="tweet-body">
    …
  </div>
</article>
```

#### componentName--modifierName
A component modifier is a class that modifies the presentation of the base component in some form. Modifier names must be written in camel case and be separated from the component name by two hyphens. The class should be included in the HTML in addition to the base component class.
```
/* Core button */
.btn { /* … */ }
/* Default button style */
.btn--default { /* … */ }
```
```
<button class="btn btn--primary">…</button>
```

#### componentName.is-stateOfComponent
Use `is-stateName` for state-based modifications of components. The state name must be Camel case. Never style these classes directly; they should always be used as an adjoining class.

JS can add/remove these classes. This means that the same state names can be used in multiple contexts, but every component must define its own styles for the state (as they are scoped to the component).

```
.tweet { /* … */ }
.tweet.is-expanded { /* … */ }
```
```
<article class="tweet is-expanded">
  …
</article>
```
### variables
Syntax: `<property>-<value>[--componentName]`

Variable names in our CSS are also strictly structured. This syntax provides strong associations between property, use, and component.

The following variable defintion is a color property, with the value grayLight, for use with the highlightMenu component.

```
@color-grayLight--highlightMenu: rgb(51, 51, 50);
```

### files

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

## IDs vs. Classes
You should almost never need to use IDs. Broken behavior due to ID collisions are hard to track down and annoying.

## z-index Scale
Please use the z-index scale defined by z-index.scss. $zIndex-1 to $zIndex-10 are provided.

## Componentizing
Always look to abstract components. Using consistent style and the reuse of components across designs helps to improve this consistency at an implementation level.

A name like `.homepage-nav` limits its use. Instead think about writing styles in such a way that they can be reused in other parts of the app. Instead of `.homepage-nav`, try instead `.nav` or `.nav-bar`. Ask yourself if this component could be reused in another context (chances are it could!).

Components should belong to their own scss file. For example, all general button definitions should belong in `buttons.scss`.

## Name-spacing
Name-spacing is great! But it should be done at a component level – never at a page level.

Also, namespacing should be made at a descriptive, functional level. Not at a page location level. For example, `.profile-header` could become `.header-hero-unit`.

## Nesting
Don't nest. Ever.

Nesting makes it harder to tell at a glance where css selector optimizations can be made.

## Comments
Use SCSS style comments to annotate styles because they are compiled out. Use them to seperate logical groups of styles within a document. Always use the following style comment:
```
// Title of section // --------------------------------------------------
```
