const data = Object.freeze({
    maxWidth: 20,
    maxHeight: 20,
    icon: '',
    target: [
        'textarea',
        'input[type=text]'
    ]
})

const buttonSize = data.maxWidth;

const getIcon = () => {

    let iconCon = document.createElement('a');
    let icon = document.createElement('img');

    icon.style.maxWidth = data.iconMaxWidth;
    icon.style.maxHeight = data.iconMaxHeight;

    iconCon.onclick = () => {
        alert(1)
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

const getEditor = () => {
    let con = document.createElement("div");
    let TA = document.createElement('textarea');
    TA.value = el.value;
    con.style.display = 'none';
    con.appendChild(TA);
    return con;
}

const wrapInContainer = (el) => {
    el.style.paddingRight = `${buttonSize + 4}px`
    let elc = el.cloneNode();
    let editor = getEditor(el);
    
    let container = document.createElement("div");
    container.appendChild(elc);
    container.appendChild(iconCon)
    container.appendChild(editor)

    el.parentNode.replaceChild(
        container,
        el
    )

    let cEditor = CKEDITOR.replace(editor.children[0]);
}