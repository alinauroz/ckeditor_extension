const data = Object.freeze({
    maxWidth: 20,
    maxHeight: 20,
    icon: ''
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