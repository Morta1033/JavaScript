var month_leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var month_name = ["January", "Febrary", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"];
        var holder = document.getElementById("days");
        var prev = document.getElementById("prev");
        var next = document.getElementById("next");
        var ctitle = document.getElementById("calendar-title");
        var cyear = document.getElementById("calendar-year");
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var deleIndex = undefined;

        let li = document.querySelector("#days li");

        //第一天是星期幾
        function dayStart(month, year) {
            var tmpDate = new Date(year, month, 1);
            return (tmpDate.getDay() + 1); //表從星期日開始所以要+1
        }

        //計算是否為閏年
        function daysMonth(month, year) {
            if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                return (month_leapYear[month]);
            } else {
                return (month_normal[month]);
            }
        }

        function refreshDate() {
            var str = "";
            var totalDay = daysMonth(month, year); //當月總天數
            var firstDay = dayStart(month, year); //當月第一天是星期幾
            var classes;
            for (var i = 1; i < firstDay; i++) {
                str += "<li></li>"; //為起始日之前的日期建立空白
            }
            for (var i = 1; i <= totalDay; i++) {
                if ((i < day && year == date.getFullYear() && month == date.getMonth()) || year < date.getFullYear() || (year == date.getFullYear() && month < date.getMonth())) {
                    classes = " class='pastDays'"; //日期在今天之前時，以浅灰色字體顯示
                } else if (i == day && year == date.getFullYear() && month == date.getMonth()) {
                    classes = " class='today_box'"; //當天日期以綠色背景顯示
                } else {
                    classes = " class='futureDays'"; //日期在今天之後時，以深灰字體顯示
                }
                str += "<li" + classes + ">" + `<span>${i}</span><div class="eventArea"></div>` + "</li>"; //建立日期
            }
            holder.innerHTML = str; //日期顯示
            ctitle.innerHTML = month_name[month]; //月份顯示
            cyear.innerHTML = year; //年份顯示
        }
        refreshDate();

        function insertEvent() {
            scheduleItemArr.forEach((element, index_array) => {
                //先切割年月日
                let checkDate = new Date(Number(element.Day.substring(0, 4))//年
                    , Number(element.Day.substring(4, 6) - 1)//月
                    , Number(element.Day.substring(6, 8)));//日

                if (year == checkDate.getFullYear() && month == checkDate.getMonth()) {//當年當月才顯示資料
                    let firstDay = new Date(checkDate.valueOf());//把 checkDate 的值複製給 firstDay
                    firstDay.setDate(1); //設定第一天
                    let index = firstDay.getDay() + checkDate.getDate() - 1;
                    let li = document.querySelectorAll("#days li");
                    let p = document.createElement("p");
                    let div = li[index].querySelector("div");
                    div.appendChild(p);
                    p.innerHTML += element.Time + " " + element.Subject;
                    p.style.color = element.color;
                    p.setAttribute('data-index', index_array);
                    p.setAttribute('data-toggle', "modal");
                    p.setAttribute('data-target', "#ChangeEvent");
                    p.addEventListener('click', (e) => {
                        deleIndex = e.currentTarget.getAttribute('data-index');
                        console.log(deleIndex);
                    });
                    li[index].append(div);
                }
            });
        }

        prev.onclick = function (e) {
            e.preventDefault();
            month--;
            if (month < 0) {
                year--;
                month = 11;
            }
            refreshDate();

            insertEvent();
        }
        next.onclick = function (e) {
            e.preventDefault();
            month++;
            if (month > 11) {
                year++;
                month = 0;
            }
            refreshDate();

            insertEvent();
        }
        /*
                function saveEvent() {
                    let li = document.querySelectorAll("#days li");
                    let p = document.createElement("p");
                    let event = document.querySelector(".writeEvent").value;
                    localStorage.setItem('Event', event);
                    //console.log(event);
                    p.innerHTML = event;
        
                    let cd = new Date();
                    console.log(cd.getDate() + new Date(cd.getFullYear(), cd.getMonth(), 1).getDay());
                    li[cd.getDate() + new Date(cd.getFullYear(), cd.getMonth(), 1).getDay() - 1].appendChild(p); //活動增加在當天 //陣列要-1
                }
        */
        var scheduleItemArr = null; //初始化
        if (localStorage.getItem('item') == null) {
            scheduleItemArr = []; //還沒有資料就建立放資料的陣列
        }
        else {
            scheduleItemArr = JSON.parse(localStorage.getItem('item'));
            scheduleItemArr.forEach((element, index_array) => {
                let checkDate = new Date(Number(element.Day.substring(0, 4)) //年
                    , Number(element.Day.substring(4, 6) - 1) //月
                    , Number(element.Day.substring(6, 8))); //日

                if (year == checkDate.getFullYear() && month == checkDate.getMonth()) {//當年當月才顯示資料
                    let firstDay = new Date(checkDate.valueOf());
                    firstDay.setDate(1);

                    let index = firstDay.getDay() + checkDate.getDate() - 1;
                    let li = document.querySelectorAll("#days li");
                    let p = document.createElement("p");
                    let div = li[index].querySelector("div");
                    div.appendChild(p);
                    p.innerHTML += element.Time + " " + element.Subject;
                    p.style.color = element.color;
                    p.setAttribute('data-index', index_array);
                    p.setAttribute('data-toggle', "modal");
                    p.setAttribute('data-target', "#ChangeEvent");
                    li[index].append(div);

                    p.addEventListener('click', (e) => {
                        deleIndex = e.currentTarget.getAttribute('data-index');
                        console.log(deleIndex);
                    });
                }
            });
        }

        var save = document.getElementById("save");
        save.onclick = function () {
            //console.log(document.getElementById("date").value);
            //console.log(new Date(document.getElementById("date").value).getMonth()); //有new Date, 一月是0

            var inputDate = document.getElementById("date").value.split("-");
            // console.log(document.getElementById("date").value);
            var time = document.getElementById("time").value;
            // console.log(document.getElementById("time").value);
            var thing = document.getElementById("thing").value;
            // console.log(document.getElementById("thing").value);
            var color = document.getElementById("colorWell").value;
            // console.log(document.getElementById("colorWell").value);

            var scheduleItem = {
                Day: inputDate[0] + inputDate[1] + inputDate[2],
                Time: time,
                Subject: thing,
                color: color
            };
            // console.log(scheduleItem);

            scheduleItemArr.push(scheduleItem); //資料放到 scheduleItemArr 陣列裡
            localStorage.setItem('item', JSON.stringify(scheduleItemArr)); //為scheduleItemArr設定key值

            let li = document.querySelectorAll("#days li");
            // console.log(scheduleItem.Day);

            let checkDate = new Date(document.querySelector('#date').value);
            if (year == checkDate.getFullYear() && month == checkDate.getMonth()) {
                let firstDay = new Date(checkDate.valueOf());
                firstDay.setDate(1);
                let index = firstDay.getDay() + checkDate.getDate() - 1;
                let div = li[index].querySelector("div");
                let p = document.createElement("p");
                p.innerHTML += scheduleItem.Time + " " + scheduleItem.Subject;
                // p.innerHTML += ' ';
                // p.innerHTML += scheduleItem.Subject;
                p.setAttribute('data-index', scheduleItemArr.length - 1);
                div.append(p);
                li[index].append(div);
            }
            document.getElementById("date").value = "";
            document.getElementById("time").value = "";
            document.getElementById("thing").value = "";
            document.getElementById("colorWell").value = "#ff0000";
            refreshDate();
            insertEvent();
        }

        var del = document.getElementById("delete");
        del.onclick = function () {
            scheduleItemArr.splice(deleIndex, 1); //刪除活動
            localStorage.setItem("item", JSON.stringify(scheduleItemArr));
            refreshDate();
            insertEvent();
        };

        var update = document.getElementById("update");
        update.onclick = function () {
            var inputDate = document.getElementById("dateChange").value.split("-");
            var time = document.getElementById("timeChange").value;
            var thing = document.getElementById("thingChange").value;
            var color = document.getElementById("colorWellChange").value;

            var scheduleItem = {
                Day: inputDate[0] + inputDate[1] + inputDate[2],
                Time: time,
                Subject: thing,
                color: color
            };
            
            scheduleItemArr.splice(deleIndex, 1, scheduleItem);
            localStorage.setItem('item', JSON.stringify(scheduleItemArr));

            document.getElementById("date").value = "";
            document.getElementById("time").value = "";
            document.getElementById("thing").value = "";
            document.getElementById("colorWell").value = "#ff0000";
            refreshDate();
            insertEvent();
        };