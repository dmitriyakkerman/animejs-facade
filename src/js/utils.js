export function transformer(target, separator) {
    let textWrapper = document.querySelector(target);
    let splitted = textWrapper.textContent.split(separator);

    let newArr = [];

    splitted.forEach(function (str) {
        let div = document.createElement('div');
        div.innerHTML = str.replace(/\S/g, "<span class='letter'>$&</span>");
        textWrapper.textContent = '';
        newArr.push(div);
    });

    newArr.forEach(function (el) {
        textWrapper.appendChild(el)
    });

    return textWrapper;
}