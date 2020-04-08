![sesam banner](https://res.cloudinary.com/lennertderyck/image/upload/v1585256935/BANNER_SESAM_za3b6v.svg)
<p style="text-align: center;">Use Sesam to create easy collapsing items on your site</p>

# Install
### With NPM

**1. Install package**

```shell
npm i sesam-collapse
```

**2. Import package**

```javascript
const sesam = require('./node_modules/sesam-collapse'); // check the relative path to node_modules
```

### With a CDN

Just copy paste this script tag at the end of your dom. If you want to call Sesam functions in other scripts, place this before other scripts.
```html
<script type="module" src="https://unpkg.com/sesam-collapse"></script>
```



or import in your javascript-files

> available from version 4.0

```js
import {sesamCollapse, sesam} from 'https://unpkg.com/sesam-collapse';

sesamCollapse.initialize();
```

# Use
The only thing Sesam will do, is adding, removing or toggle classes. You have to write the needed css to let something happen on screen.

So sesam can be used in various ways.
- For hamburger menu's
- Custom selection lists (later on, there wil be code snippets available to show how)
- Collapsing text sections
- Just hiding or showing elements
- Add or remove animations
- ...

Possibilities are infinite!

### **1. INITIALIZE**
**In a javascript file**

Just place it anywhere in a javascript file but make shure it's not launched before your DOM is loaded.

```javascript
sesamCollapse.initialize();
```

**In a html file**

Add this just before `</body>` inside a `<script></script>` element

```html
<script>
    sesamCollapse.initialize();
</script>
```

### **2. DEFINE A TARGET ELEMENT** 
Let the script know which element will be collapsed

```html
data-sesam-target="placeNameHere"
```

```html
<div data-sesam-target="placeNameHere">
    <p>Some content</p>
</div>
```

### **3. DEFINE A TRIGGER ELEMENT** 
Define which element will trigger the action. Multiple triggers can be defined, just add the same markup.

```html
data-sesam-trigger="placeNameHere"
```

```html
<button data-sesam-trigger="placeNameHere">
    Show / hide
</button>
```

---

### **Extra! Hide other sesam targets when element is triggered**
If you want that another Sesam target is hidden when you click a trigger, just define a group.

**Add this to the parent element**

```html
data-sesam-group="groupNameHere"
```

**And define the parent for the children elements**

This has to be added to the target element!

```html
data-sesam-parent="groupNameHere"
```

```html
<div data-sesam-group="groupNameHere">
    <div>
        <button data-sesam-trigger="collapseFirst">
            Show / hide
        </button>
        <div data-sesam-target="collapseFirst" data-sesam-parent="groupNameHere">
            <p>Some content</p>
        </div>
    </div>
    <div>
        <button data-sesam-trigger="collapseSecond">
            Show / hide
        </button>
        <div data-sesam-target="collapseSecond" data-sesam-parent="groupNameHere">
            <p>Some content</p>
        </div>
    </div>
</div>
```



<!-- [I'll npm](#install-npm)
[I'll use a <link> (CDN)](#install-cdn) -->
