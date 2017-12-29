// animation 特性值
// var animations = [ 'animation', 'WebkitAnimation',  'MozAnimation', 'OAnimation', 'msAnimation']

// var animationends = [ 'animationend', 'webkitAnimationEnd', 'mozAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd' ]
// var transitionends = ['transitionend', 'webkitTransitionEnd', 'mozTransitionEnd', 'oTransitionEnd', 'MSTransitionEnd']

let class2type = {};
const toString = Object.prototype.toString;
const typeArray = 'Boolean Number String Function Array Date RegExp Object Error'.split(' ');
const cssPrefix = ['', '-webkit-', '-moz-', '-o-', '-ms-'];
const captialPrefix = ['', 'webkit', 'moz', 'o', 'MS'];
const div = document.createElement('div');

typeArray.forEach(name => {
  class2type[`[object ${name}]`] = name.toLowerCase();
});

// 判断数据类型
export const type = value => {
  if (value === null) {
    return `${value}`;
  }

  return typeof value == 'object' || typeof value == 'function' ? class2type[toString.call(value)] : typeof value;
};

// -webkit-animation -> WebkitAnimation
export const camelCase = value => {
  let str = value.toString();
  return str.replace(/^-ms-/, 'ms-').replace(/-([a-z]|[0-9])/gi, (all, letter) => letter.toUpperCase());
};

// 字符串首字母替换为大写
export const toFirstUpperCase = str => {
  return str.replace(/^[a-z]/gi, l => l.toUpperCase());
};

// 获取浏览器支持的css3前缀
export const getCssPrefix = () => {
  let prefix = '';
  for (var i = 0; i < cssPrefix.length; i++) {
    if (camelCase(`${cssPrefix[i]}transform`) in div.style) {
      return cssPrefix[i];
    }
  }
  return prefix;
};

export const getCapitalPrefix = () => {
  for (var i = 0; i < captialPrefix.length; i++) {
    let n = 'requestAnimationFrame';
    if (captialPrefix[i] !== '') {
      n = `${captialPrefix[i]}${toFirstUpperCase(n)}`;
    }
    if (n in window) {
      return captialPrefix[i];
    }
  }
  return false;
};

// 获取css属性对应的浏览器支持的js特性值  transform -> transform || WebkitTransform
export const getAttrName = attr => {
  let prop = camelCase(attr);
  let _prop = camelCase(`${getCssPrefix}attr`);
  return (prop in div.style && prop) || _prop in div.style || '';
};

export const getEventName = name => {
  const prefix = getCapitalPrefix();
  if (prefix === false) {
    return false;
  }

  if (prefix === '') {
    return name;
  }

  return `${prefix}${toFirstUpperCase(name)}`;
};

let lastTime = 0;
export const animationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    let curTime = +new Date();
    let delay = Math.max(1000 / 60, 1000 / 60 - (curTime - lastTime));
    lastTime = curTime + delay;
    return setTimeout(callback, delay);
  };

export const cancelFrame =
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.mozCancelRequestAnimationFrame ||
  window.msCancelRequestAnimationFrame ||
  clearTimeout;

export const getAnimationEnd = () => {
  const prefix = getCapitalPrefix();
  if (prefix) {
    return `${getCapitalPrefix()}AnimationEnd`;
  }

  return 'animationend';
};

export const getStyle = (elem, attr) => {
  return window.getComputedStyle
    ? window.getComputedStyle(elem, null)[attr]
    : elem.currentStyle(attr) || elem.style[attr];
};

export const setStyle = (elem, options) => {
  if (type(options) == 'object') {
    for (let key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        elem.style[key] = options[key];
      }
    }
    return true;
  }

  return false;
};
