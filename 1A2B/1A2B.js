var answer_str = '';
        var input_str = '';
        var answer_num = new Array();
        var input_num = new Array();
        var after = document.getElementsByClassName('game-start-after');
        var before = document.getElementsByClassName('game-start-before');
        var txt_area = document.getElementsByClassName('txt_area')[0];
        var area = document.createElement('div');
        txt_area.appendChild(area);
        var input = document.getElementById('inputnumber');

        for (let game of after) {
            game.setAttribute('disabled', 'disabled');
        }
        
        function create_answer() {
            answer_str = '';
            input.value = '';
            area.innerHTML = '';
            txt_area.removeChild(area);
            for (let i = 0; i < 4; i++) {
                answer_num[i] = Math.round(Math.random() * 8 + 1);
                for (let j = 0; j < i; j++) {
                    if (answer_num[j] == answer_num[i]) {
                        j = 0;
                        answer_num[i] = Math.round(Math.random() * 8 + 1);
                    }
                }
                answer_str += `${answer_num[i]}`;
            }
            for (let game of after) {
                game.removeAttribute('disabled');
            }
            for (let game of before) {
            game.setAttribute('disabled', 'disabled');
        }
            console.log(answer_str);
            console.log(answer_num);
        }

        function guess_number() {
            txt_area.appendChild(area);
            input_str = document.getElementById('inputnumber').value;
            console.log(input_str);
            stringtoarray();
            console.log(input_num);
            JudgeAB();
            show_AB();
            countA = 0;
            countB = 0;
            input.value = '';
        }

        function stringtoarray() {
            for (let i = 0; i < 4; i++) {
                input_num[i] = parseInt(input_str[i]);
            }
        }

        var countA = 0, countB = 0;
        function JudgeAB() {
            var intersect = answer_num.filter(num => input_num.includes(num));
            console.log(intersect);
            var total = intersect.length;
            console.log(total);
            for (let i = 0; i < answer_num.length; i++) {
                if (answer_num[i] == input_num[i]) {
                    countA++;
                }
            }
            countB = total - countA;
            console.log(`${countA}A${countB}B`);
        }
        
        function show_AB() {
            var showall = document.createElement('div');
            showall.id = 'showall';
            if(countA == 4)
            {
                showall.innerHTML = `<span style="background-color: #16982b; color:#fff;">${countA}A${countB}B</span> <span>${input_str}</span>`;
                var success = setTimeout("alert('遊戲結束')",300);
                for (let game of before) {
                game.removeAttribute('disabled');
                input.value = '';
                }
            }
            else
            {
                showall.innerHTML = `<span style="background-color: red;color:#fff; ">${countA}A${countB}B</span> <span>${input_str}</span>`;
            }
            area.appendChild(showall);
        }

        function show_answer() {
            alert(`答案是${answer_str}`);
        }

        function restart_game(){
            alert(`答案是${answer_str}`);
            create_answer();
        }