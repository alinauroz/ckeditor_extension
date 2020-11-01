const data = Object.freeze({
    iconMaxWidth: 20,
    iconMaxHeight: 20,
    icon: 'https://www.flaticon.com/svg/static/icons/svg/61/61456.svg',
    target: [
        'textarea',
        'input[type=text]'
    ]
});

const STYLES = `
    .editor_container {
        width: 600px;
    }
    .my_editor_container {
        position: absolute !important;
        background: white;

    }
`

const buttonSize = data.maxWidth;

const getIcon = () => {

    let iconCon = document.createElement('a');
    let icon = document.createElement('img');

    icon.style.maxWidth = data.iconMaxWidth;
    icon.style.maxHeight = data.iconMaxHeight;
    icon.src = data.icon;

    iconCon.onclick = (e) => {
        e.target.parentNode.nextSibling.style.display = 'block'
    }

    iconCon.appendChild(icon);
    return iconCon;
}

const getElements = () => {

    let els = [];

    data.target.map(target => {
        els_ = document.querySelectorAll(target);
        els_.forEach(el => {
            els.push(el)
        });
    });

    return els;
}

const getEditor = (el) => {
    let con = document.createElement("div");
    con.innerHTML = el.value;
    con.setAttribute('class',  'my_editor');
    return con;
}

const getSubmitButton = ({id, value}) => {
    let button = document.createElement('button');
    let con = document.createElement('div');

    button.id = `editor_button_${id}`;
    button.innerHTML = value;

    button.onclick = (e) => {
        //let val = CKEDITOR.instances[id].getData();
        let val = "ABC"
        e.target.parentNode.parentNode.parentNode.parentNode.children[0].value = val.indexOf('<p>') == 0 ? 
                                                                        val.substr(3, val.length - 8)
                                                                        : val;
    }

    con.appendChild(button);
    return con;
}

const getHideButton = () => {
    let button = document.createElement("button");
    button.innerHTML = "Hide";

    button.onclick = (e) => {
        e.target.parentNode.parentNode.style.display = 'none';
    }

    return button;
}

const getToolbar = () => {
    let container = document.createElement("div");
    container.innerHTML = `<span class="ql-formats"> <select class="ql-font"></select> <select class="ql-size"></select> </span> <span class="ql-formats"> <button class="ql-bold"></button> <button class="ql-italic"></button> <button class="ql-underline"></button> <button class="ql-strike"></button> </span> <span class="ql-formats"> <select class="ql-color"></select> <select class="ql-background"></select> </span> <span class="ql-formats"> <button class="ql-script" value="sub"></button> <button class="ql-script" value="super"></button> </span> <span class="ql-formats"> <button class="ql-header" value="1"></button> <button class="ql-header" value="2"></button> <button class="ql-blockquote"></button> <button class="ql-code-block"></button> </span> <span class="ql-formats"> <button class="ql-list" value="ordered"></button> <button class="ql-list" value="bullet"></button> <button class="ql-indent" value="-1"></button> <button class="ql-indent" value="+1"></button> </span> <span class="ql-formats"> <button class="ql-direction" value="rtl"></button> <select class="ql-align"></select> </span> <span class="ql-formats"> <button class="ql-link"></button> <button class="ql-image"></button> <button class="ql-video"></button> <button class="ql-formula"></button> </span> <span class="ql-formats"> <button class="ql-clean"></button> </span>`
    return container;
}

const wrapInContainer = (el) => {
    el.style.paddingRight = `${buttonSize + 4}px`
    let editorCon = document.createElement("div");
    editorCon.setAttribute('class', 'my_editor_container');

    let elc = el.cloneNode();
    let editor = getEditor(el);
    let iconCon = getIcon();
    let toolbar = getToolbar();
    
    let container = document.createElement("div");
    editorCon.appendChild(toolbar);
    editorCon.appendChild(editor);
    container.appendChild(elc);
    container.appendChild(iconCon)
    container.appendChild(editorCon)
    container.setAttribute('class', 'editor_container');

    el.parentNode.replaceChild(
        container,
        el
    )

    
    var quill = new Quill(editor, {
        theme: 'snow',
        modules: {
          toolbar: toolbar
        }
    });
  
    editorCon.style.display = 'none';

    let button = getSubmitButton({id: '', value: 'Done'});
    editor.appendChild(button);
    editor.appendChild(getHideButton());
}

window.onload = () => {

    let style = document.createElement("style");
    style.innerHTML = STYLES;
    document.getElementsByTagName('head')[0].appendChild(style);
    
    getElements().map(el => {
        console.log(el);
        wrapInContainer(el);
    })

    STYLES_.map(style => {
        addStyle(style);
    })

}