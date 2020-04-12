var nLast = 0; //存放當前最後的數字
var bNewNum = false; //判斷是否增加一個數字
var sLastOpr = ""; //存放當前最後的符號
var sLastPrompt = ""; //全部字串的紀錄
var result;
var prompt;

function fInit() {
    result = document.getElementById("jsqResult");
    prompt = document.getElementById("jsqPrompt"); //歷史紀錄
}

function inputNum(num) {
    if (bNewNum) {
        result.value = num;
        bNewNum = false;
        if (sLastOpr == "=") {
            prompt.innerHTML = num;
        } else {
            prompt.innerHTML += num;
        }
    } else {
        if (result.value == "0") {
            result.value = num;
            prompt.innerHTML = num;
        } else {
            result.value += num;
            prompt.innerHTML += num;

        }
    }
    sLastPrompt = prompt.innerHTML;


    // console.log("nLast " + nLast);
    // console.log("bNewNum " + bNewNum);
    // console.log("sLastOpr " + sLastOpr);
    // console.log("sLastPrompt " + sLastPrompt);
    // console.log("result " + result.value);
    // console.log("prompt " + prompt);
    // console.log("************number************");

}


function operate(opr) {
    if (!sLastPrompt && opr != '√') {
        return;
    }
    var Readout = result.value;
    if (bNewNum && sLastOpr != "=") {
        switch (opr) {
            case '+':
            case '－':
                prompt.innerHTML = sLastPrompt + opr;	//字串相加	
                break;
            case '×':
            case '÷':
                prompt.innerHTML = "(" + sLastPrompt + ")" + opr;
                break;
            case '√':
                prompt.innerHTML = opr;
                break;
            default:
                break;
        }
        sLastOpr = opr;
    } else {
        bNewNum = true;
        switch (sLastOpr) {
            case '+':
                nLast += parseFloat(Readout);
                break;
            case '－':
                nLast -= parseFloat(Readout);
                break;
            case '×':
                nLast *= parseFloat(Readout);
                break;
            case '÷':
                nLast /= parseFloat(Readout);
                break;
            case '√':
                nLast = Math.sqrt(parseFloat(Readout));
                break;
            default:
                nLast = parseFloat(Readout);
                break;
        }
        switch (opr) {
            case '+':
            case '－':
                prompt.innerHTML += opr;
                break;
            case '×':
            case '÷':
                if (sLastOpr == '×' || sLastOpr == '÷' || sLastOpr == "") {
                    prompt.innerHTML += opr;
                } else {
                    prompt.innerHTML = "(" + prompt.innerHTML + ")" + opr;
                }
                break;
            case '=':
                break;
            case '√':
                prompt.innerHTML = opr;
                break;
            default:
                break;
        }
        result.value = nLast;
        sLastOpr = opr;
    }


    console.log("nLast " + nLast);
    console.log("bNewNum " + bNewNum);
    console.log("sLastOpr " + sLastOpr);
    console.log("sLastPrompt " + sLastPrompt);
    console.log("result " + result.value);
    console.log("prompt " + prompt);
    console.log("************operate************");
}

function inputDecimal() {
    var value = result.value;
    if (bNewNum) {
        value = "0.";
        prompt.innerHTML += "0.";
        bNewNum = false;
    } else {
        if (value.indexOf(".") == -1) {
            value += ".";
            if (prompt.innerHTML == "") {
                prompt.innerHTML = "0.";
            } else {
                prompt.innerHTML += ".";
            }
        }
    }
    result.value = value;
}

function Delete() {
    if (!sLastOpr) { //刪除數字
        let toArr = result.value.split('');
        toArr.pop();
        result.value = toArr.join('');
        sLastPrompt = result.value;

        prompt.innerHTML = result.value;
    } else if (sLastOpr != "") {
        if (bNewNum === false) { //如果數字前面有符號就執行這個判斷
            let toArr = sLastPrompt.split('');
            toArr.pop();
            sLastPrompt = toArr.join('');
            result.value = "";

            prompt.innerHTML = (sLastPrompt);
        }
        else {  //刪除符號
            sLastOpr = "";

            prompt.innerHTML = result.value;
        }
    }

    // console.log("nLast " + nLast);
    // console.log("bNewNum " + bNewNum);
    // console.log("sLastOpr " + sLastOpr);
    // console.log("sLastPrompt " + sLastPrompt);
    // console.log("result " + result.value);
    // console.log("prompt " + prompt);
    // console.log("************delete************");

}

function clearAll() {
    nLast = 0;
    sLastOpr = "";
    sLastPrompt = "";
    result.value = "0";
    prompt.innerHTML = "";
    bNewNum = true;
}

function negative() {
    result.value = parseFloat(result.value) * -1;
    prompt.innerHTML = "-(" + prompt.innerHTML + ")";
}