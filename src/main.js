const data = Object.freeze({
    iconMaxWidth: 20,
    iconMaxHeight: 20,
    icon: 'https://www.flaticon.com/svg/static/icons/svg/61/61456.svg',
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
    let TA = document.createElement('textarea');
    TA.value = el.value;
    con.style.display = 'none';
    con.appendChild(TA);
    return con;
}

const getSubmitButton = ({id, value}) => {
    let button = document.createElement('button');
    let con = document.createElement('div');

    button.id = `editor_button_${id}`;
    button.value = value;

    con.appendChild(button);
    return con;
}

const wrapInContainer = (el) => {
    el.style.paddingRight = `${buttonSize + 4}px`
    let elc = el.cloneNode();
    let editor = getEditor(el);
    let iconCon = getIcon();
    
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

window.onload = () => {
    
    getElements().map(el => {
        console.log(el);
        wrapInContainer(el);
    })

}