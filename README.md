提供一些工具方法以便处理与css3相关兼容性的问题。

#### 下载：

```js
> npm install css3support
```

#### 使用

```js
import { type, camelCase, getCssPrefix } from 'css3support';
```

具体提供的方法如下。

### type

判断值的具体类型。

```js
import { type } from 'css3support';

function fn() {}
let reg = /^123[a-z]{0, 10}/g;

console.log(type(0));   // number
console.log(type(false));  // boolean
console.log(type('hello')); // string
console.log(type(null));  // null
console.log(type(type.a)); // undefined
console.log(type(NaN));   // number
console.log(type([1, 2])); // array
console.log(type({name: 'bo'})); // object
console.log(type(fn));  // function
console.log(type(reg));  // regexp
console.log(type(new Date()));  // date
console.log(type(new Error()));  // error
```

### camelCase

将css属性兼容性写法，转化为对应的js特性值。

```js
import { camelCase } from 'css3support';

console.log(camelCase('-webkit-animation'));  // WebkitAnimation
console.log(camelCase('-moz-animation')); // MozAnimation
console.log(camelCase('-o-animation')); // OAnimation
console.log(camelCase('-ms-animation')); // msAnimation
```

### toFirstUpperCase

字符串首字母转化为大写

```js
import { toFirstUpperCase } from 'css3support';

console.log(toFirstUpperCase('hello')); // Hello
```

### getCssPrefix

获取浏览器支持的css3前缀。如果浏览器版本比较新，对css3属性直接支持，则返回空字符串。可以通过传入特定的css属性来判断该属性的兼容性，如果为未传入，则根据transform来判断。

```js
import { getCssPrefix } from 'css3support';

console.log(getCssPrefix());   // '' || -webkit- || -moz- || -o- || -ms-
getCssPrefix('transition'); 
```

### getCapitalPrefix

获取浏览器支持的css3特性值前缀。主要针对transitionend, animationend等事件兼容性写法，与属性特性值略有不同。

```js
import { getCapitalPrefix } from 'css3support';

console.log(getCapitalPrefix()); // ['', 'webkit', 'moz', 'o', 'MS']; 取其一
```

### getAttrName

得到浏览器支持的对应css属性的特性值。

```js
import { getAttrName } from 'css3support';
getAttrName('transition');  // WebkitTransition
```

### getEventName

获取浏览器支持的事件名，包括 animationstart, animationcancel, animationend, transitionend 等常用动画事件。

```js
import { getEventName } from 'css3support';
getEventName('animationend'); // MSAnimationend
```

### animationFrame

requestAnimationFrame 与 setTimeout 兼容性方法支持

### cancelFrame

cancelAnimationFrame 与 clearTimeout 兼容性方法支持

### getStyle 

 获取元素属性值

 ```js
 getStyle(elem, 'height');  // 100px
 ```


 ### setStyle 

 设置元素属性值

```js
 setStyle(elem, {
   height: '100px'
 })
 ``