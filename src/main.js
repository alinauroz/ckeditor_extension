const STYLES = `
    .editor_container {

    }
    .my_editor_container {
        position: absolute !important;
        background-color: white;
        width: 500px;
        height: 350px;
        z-index: 998;
    }
    .my_editor_icon {
        max-width: 16px;
        max-height: 16px;
        padding: 4px;
        border: 1px solid lightgrey;
        border-radius: 10px;
        background: white;
        cursor: pointer;
    }
    .ql-toolbar.ql-snow+.ql-container.ql-snow {
        background: white;
    }
    .myeditor_done_button, .myeditor_hide_button {
        border: 0px;
        background: white;
        color: #333;
        padding: 10px;
        border: 1px solid #333333aa;
        border-radius: 3px;
        cursor: pointer;
        margin-right: 5px;
        margin-top: 15px;
        margin-bottom: 20px;
    }
    .myeditor_hide_button {
        background: transparent;
        border: 0px;
    }
`

const buttonSize = MYEDITORDATA.maxWidth;

const getIcon = () => {

    let iconCon = document.createElement('a');
    let icon = document.createElement('img');

    iconCon.style.verticalAlign = 'top';
    icon.style.maxWidth = MYEDITORDATA.iconMaxWidth;
    icon.style.maxHeight = MYEDITORDATA.iconMaxHeight;
    icon.src = MYEDITORDATA.icon;
    icon.setAttribute('class', 'my_editor_icon');

    iconCon.onclick = (e) => {
        e.target.parentNode.nextSibling.style.display = 'block'
    }

    iconCon.appendChild(icon);
    return iconCon;
}

const getElements = () => {

    let els = [];

    MYEDITORDATA.target.map(target => {
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

const getSubmitButton = ({id, value, editor}) => {
    let button = document.createElement('button');
    let con = document.createElement('span');

    button.id = `editor_button_${id}`;
    button.innerHTML = value;
    button.setAttribute('class', 'myeditor_done_button');
    con.setAttribute('class', 'myeditor_done_button_container');

    button.onclick = (e) => {
        let val = e.target.parentNode.parentNode.children[0].innerHTML;
        e.target.parentNode.parentNode.parentNode.parentNode.children[0].value = val.indexOf('<p>') == 0 ? 
                                                                        val.substr(3, val.length - 7)
                                                                        : val;
    }

    con.appendChild(button);
    return con;
}

const getHideButton = () => {
    let button = document.createElement("button");
    button.innerHTML = "✕";
    button.setAttribute('class', 'myeditor_hide_button');

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

    if (el.style.width) {
        container.style.width =  `calc(${el.style.width} - 24px)`;
    }
    else {
        container.style.width = '100%'
        elc.style.width = 'calc(100% - 24px)'
    }

    elc.style.position = 'relative'
    container.display = 'inherit'

    el.parentNode.replaceChild(
        container,
        el
    )

    
    var quill = new Quill(editor, {
        theme: 'snow',
        background: 'white',
        modules: {
          toolbar: toolbar
        }
    });
  
    editorCon.style.display = 'none';

    let button = getSubmitButton({id: '', value: 'Done', editor: quill});
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