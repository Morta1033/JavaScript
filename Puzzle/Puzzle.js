var size = document.querySelector("option").value;
var canvas = document.getElementById("background");
var context = canvas.getContext('2d');
var imgArr = [];
var img = new Image();
var ImgSrc;
var origin_img = document.querySelector(".origin img");

window.URL = window.URL || window.webkitURL;

var fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem");

fileSelect.addEventListener("click", function (e) {
    if (fileElem) {
        fileElem.click();
    }
    e.preventDefault(); // 取消事件的默認動作
}, false);

function handleFiles(files) { //本地檔案讀取
    if (files.length) {
        for (var i = 0; i < files.length; i++) {
            img.src = window.URL.createObjectURL(files[i]);
            ImgSrc = img.src;
        }
    }
}

function Change() { //拼圖幾 * 幾
    size = document.querySelector("select").value;
    document.querySelector('.picArea').style.display = 'flex';
    if (ImgSrc != undefined) {
        img.src = ImgSrc;
        origin_img.src = ImgSrc;
    } else {
        img.src = "images/1528956236dd1047ad248201a3fae74c.jpg";
    }
}

window.onload = () => {
    img.src = "images/1528956236dd1047ad248201a3fae74c.jpg";
}

var n;
var size_num;
origin_img.onload = () => {
    // 3 x 3
    if (size == 3) {
        n = 9;
        size_num = 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                canvas.height = 150;
                canvas.width = 150;
                context.clearRect(0, 0, 450, 450);
                context.drawImage(origin_img, 150 * j, 150 * i, 150, 150, 0, 0, 148, 148);
                imgArr.push(canvas.toDataURL());
            }
        }
        // context.drawImage(img, 0, 0, 150, 150, 0, 0, 150, 150); //上左
        // context.drawImage(img, 150, 0, 150, 150, 150, 0, 150, 150); //上中
        // context.drawImage(img, 300, 0, 150, 150, 300, 0, 150, 150); //上右
        // context.drawImage(img, 0, 150, 150, 150, 0, 150, 150, 150); //中左
        // context.drawImage(img, 150, 150, 150, 150, 150, 150, 150, 150); //中中
        // context.drawImage(img, 300, 150, 150, 150, 300, 150, 150, 150); //中右
        // context.drawImage(img, 0, 300, 150, 150, 0, 300, 150, 150); //下左
        // context.drawImage(img, 150, 300, 150, 150, 150, 300, 150, 150); //下中
        // context.drawImage(img, 300, 300, 150, 150, 300, 300, 150, 150); //下右
    }
    // 4 x 4
    else if (size == 4) {
        n = 16;
        size_num = 4;
        canvas.height = 112.5;
        canvas.width = 112.5;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                context.clearRect(0, 0, 112.5, 112.5);
                context.drawImage(origin_img, 112.5 * j, 112.5 * i, 112.5, 112.5, 0, 0, 109.5, 109.5);
                imgArr.push(canvas.toDataURL());
            }
        }
    }

    imgArr = imgArr.map((x, y) => {
        if (y == imgArr.length - 1) {
            return ''; //最後一張不顯示
        }
        return x;
    });

    var position = {};

    for (let k = 0; k < n; k++) {
        let imgElement = document.createElement("img");
        imgElement.className = `img_${k}`;
        imgElement.src = k < n - 1 ? imgArr[k] : "";
        imgElement.setAttribute('data-blank', (k < n - 1 ? '' : 1));

        if (k >= n - 1) {
            imgElement.classList.add('empty');
        }
        if (size == 4) {
            imgElement.style.width = '25%';
        }

        let picArea = document.querySelector(".picArea");
        picArea.appendChild(imgElement);

        let row = parseInt(k / size_num);
        let col = k % size_num;
        position[k] = { row: row, col: col }; //儲存位置
        // console.log(position[k]);

        imgElement.addEventListener('click', (e) => {
            let imgItem = document.querySelectorAll(".picArea img");
            // console.log(Array.isArray(imgItem));
            let i = Array.from(imgItem).indexOf(e.target);
            // console.log(i);
            let check = getNearPos(i).filter(x => {
                return imgItem[x].getAttribute('data-blank') == '1';
            });
            // console.log('test: ', i, getNearPos(i), check);

            imgItem[check].src = imgItem[i].src;
            imgItem[i].src = ' ';

            imgItem[i].setAttribute('data-blank', 1);
            imgItem[check].setAttribute('data-blank', 0);
        });
        // console.log(imgElement);
    }

    function getNearPos(i) {
        var location = [];
        var row = position[i].row, col = position[i].col;
        if (row - 1 >= 0) //上
            location.push((row - 1) * size_num + col);
        if (row + 1 < size_num) //下
            location.push((row + 1) * size_num + col);
        if (col - 1 >= 0) //左
            location.push((row) * size_num + col - 1);
        if (col + 1 < size_num) //右
            location.push((row) * size_num + col + 1);
        return location;
    }
}

img.onload = () => {
    imgArr = [];
    new Promise((resolve, reject) => { //非同步時使用 Promise
        (() => { //()沒名字的函式
            document.querySelector('.picArea').innerHTML = '';
            document.querySelector('.picArea').style.display = 'flex';
            canvas.height = 450;
            canvas.width = 450;
            context.drawImage(img, 0, 0, 450, 450);
            origin_img.src = canvas.toDataURL();
            resolve(); //承諾被兌現
        })();
    }).then(x => { // .then() 承諾被兌現就繼續做
        document.querySelector('#random').disabled = false;
    });
}

function Random() {
    var imgElement = document.querySelectorAll(".picArea img");
    let ran = []; //random後的圖片
    let j = n;
    for (let i = 0; i < n; i++) {
        let k = Math.floor(Math.random() * j);
        ran.push(imgArr[k]);
        imgArr = imgArr.filter(x => x !== imgArr[k]);
        // console.log(imgArr);
        imgElement[i].src = ran[i];
        imgElement[i].setAttribute('data-blank', (!ran[i] ? 1 : 0));
        j--;
    }
    imgArr = ran;
}
document.querySelector('#random').disabled = true;