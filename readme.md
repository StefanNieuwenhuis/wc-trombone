# 🎺 Trombone Web Component 🎺
"The trombone is a musical instrument in the brass family. As on all brass instruments, sound is produced when the player's vibrating lips (embouchure) cause the air column inside the instrument to vibrate." -- [Wikipedia](https://en.wikipedia.org/wiki/Trombone).

But not this one! Its sound is produced by resizing the window of your browser or popup. Pretty amazing, right?!

By [Stefan Nieuwenhuis](https://twitter.com/stefannhs)

![npm (tag)](https://img.shields.io/npm/v/wc-trombone/latest?color=blue)
![npm](https://img.shields.io/npm/dt/wc-trombone)

## Goals
The idea behind this Web Component is to learn more about the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) in a fun way and to bring Web Components to a wider audience. 

This Web Component is built with [StencilJs](https://stenciljs.com).

## Installation 
Script tag (with unpkg):
Put the following tag in the `<head>` of your `index.html` and you can use the element anywhere in your application:

```js
<script src='https://unpkg.com/wc-trombone@latest/dist/wc-trombone.js'></script>
```

Node Modules (npm or yarn):
Add the `wc-components` as dependency to `node_modules` via npm or yarn:

```bash
# add dependency with npm:
$ npm install wc-trombone

# or with yarn:
$ yarn add wc-trombone
```

Put the following tag in the `<head>` of your `index.html` and you can use the element anywhere in your application: 

```js
<script src='node_modules/wc-trombone/dist/wc-trombone.js'></script>
```

## Framework integration
[Stencil documentation](https://stenciljs.com/docs/overview) provides examples of Javascript and framework integration for Angular, React, Vue and Ember.

## How to use?
After installing the dependency, just add the following tag in your `html`:

```html
<wc-trombone></wc-trombone>
```

Resize the window to make music!

## Showcase
To make it go *TooT* click [here](https://stefannieuwenhuis.github.io/wc-trombone/)

## Credits
A HUGE thanks to [Matthew Rayfield](https://twitter.com/MatthewRayfield), who came up with the idea of a popup trombone and who allowed me to turn his idea into a Web Component.

![thanks Matthew](https://media.giphy.com/media/3oz8xIsloV7zOmt81G/giphy.gif) 
