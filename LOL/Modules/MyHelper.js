function $g(selector){
    //判斷是否為id selector
    if(selector.includes('#') && !selector.includes(' ')){
        //回傳Element
        return document.querySelector(selector);
    }

    //回傳 NodeList集合
    let nodeList = document.querySelectorAll(selector);
    return nodeList.length == 1 ? nodeList[0] : nodeList;
}

function $c(selector){
    return document.createElement(selector);
}