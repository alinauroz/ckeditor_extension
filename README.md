# Chrome/Firefox Extension

This is a simple extension that adds the functionality of an advanced WYSIWYG editor. This uses quill.js, an open source javascript library.

## Load in Chrome

To load this extension in chrome, follow the steps

- Goto [chrome://extensions](chrome://extensions) in chrome
- Click on _load unpacked_ button and open the _src_ directory
- The extension is loaded

## Load in Firefox

The same extension will also work in firefox. To load this extension in firefox, follow the steps

- Open [about://debugging](about://debugging) in firefox
- Click on _Load Temporary Extension_
- Select the _manifest.json_ file in _src_ folder
_ The extension is loaded in firefox

**Note: _Wait for the page to load completely. This is because this extension access DOM elements and waits for the page to load completely._**

## Adding/Removing Target Elements

A target element is an element on which this extension will work. You can add/remove target elements by doing changes in _config.js_ file. Add or remove elements from the target array.

## Changing Icon

Change the value of _icon_ in the _config.js_ file. Use _base64_ for better performance.

```
const MYEDITORDATA = Object.freeze({
    iconMaxWidth: 16,
    iconMaxHeight: 16,
    icon: 'https://www.flaticon.com/svg/static/icons/svg/61/61456.svg',
    target: [
        'textarea',
        'input[type=text]' //add here
    ]
});
```