const data = Object.freeze({
    maxWidth: 20,
    maxHeight: 20,
    icon: '',
    target: [
        'textarea',
        'input[type=text]'
    ]
})

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
        els.concat(document.querySelector(target));
    });

    return els;
}