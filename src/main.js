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
    .my_editor_continaer {
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
        e.target.parentNode.nextSibling.nextSibling.style.display = 'block'
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
    con.style.display = 'none';
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
        e.target.parentNode.parentNode.parentNode.children[0].value = val.indexOf('<p>') == 0 ? 
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
        e.target.parentNode.parentNode.children[2].style.display = 'none';
        e.target.parentNode.parentNode.children[3].style.display = 'none';
    }

    return button;
}

const wrapInContainer = (el) => {
    el.style.paddingRight = `${buttonSize + 4}px`
    let editorCon = document.createElement("div");
    editorCon.setAttribute('class', 'my_editor_container');

    let elc = el.cloneNode();
    let editor = getEditor(el);
    let iconCon = getIcon();
    
    let container = document.createElement("div");
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
          toolbar: {
            formula: true,
            syntax: true,
            toolbar: '#toolbar-container'
          }
        }
    });
  
    editor.previousSibling.style.display = 'none';

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