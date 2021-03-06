var 바디 = document.body;
var 테이블 = document.createElement('table');
var 줄들 = [];
var 칸들 = [];
var 턴 = 'X';
var 결과 = document.createElement('div');


function 결과체크(몇줄, 몇칸) {
    //칸 다 채워졌나
    var 다참 = false;
    //가로줄 검사
    if (칸들[몇줄][0].textContent===턴 && 칸들[몇줄][1].textContent === 턴 && 칸들[몇줄][2].textContent === 턴) {
        다참 = true;
    }
    //세로줄 검사
    if (칸들[0][몇칸].textContent === 턴 && 칸들[1][몇칸].textContent === 턴 && 칸들[2][몇칸].textContent === 턴) {
        다참 = true;
    } 
    //대각선 검사

    if (칸들[0][0].textContent === 턴 && 칸들[1][1].textContent === 턴 && 칸들[2][2].textContent === 턴) {
        다참 = true;
    }
    
    
    if (칸들[0][2].textContent === 턴 && 칸들[1][1].textContent === 턴 && 칸들[2][0].textContent === 턴) {
        다참 = true;
    }
    return 다참;
};


function 초기화(무승부) {
    if (무승부) {
        결과.textContent = '무승부';
    }else{
        결과.textContent = 턴 + '님이 승리'
    }
    setTimeout(function () {
        결과.textContent = '';
        턴 = 'X';
        칸들.forEach(function (줄){
            줄.forEach(function(칸){
                칸.textContent = '';
            });
        });

    }, 1000);     
    
};

var 비동기콜백 = function(이벤트){//클릭했을때
    if(턴 === 'O') {//컴퓨터 턴에 내가 클릭시
        return;
    }
    var 몇줄 = 줄들.indexOf(이벤트.target.parentNode);
    var 몇칸 = 칸들[몇줄].indexOf(이벤트.target);
    if(칸들[몇줄][몇칸].textContent !== ''){//칸이 이미 채워져 있는가
        console.log('빈칸 아닙니다');
    }else{
        console.log('빈칸 입니다');
        칸들[몇줄][몇칸].textContent = 턴;
        var 다참 = 결과체크(몇줄, 몇칸);
        //모든 칸이 다찼는지 검사
        var 후보칸 = [];
        칸들.forEach(function (줄) {
        줄.forEach(function (칸) {
            후보칸.push(칸);
            });
        });
        후보칸 = 후보칸.filter(function (칸) { return !칸.textContent});
        //다 찼으면
        if (다참) {
            초기화(false);
        }else if(후보칸.length === 0) {//칸 더이상 선택 X
            초기화(true);
        }else{
            if (턴 === 'X'){
                턴 = 'O';
            }
            setTimeout(function() {
                console.log('컴퓨터의 턴입니다');
                //빈 칸 중 하나를 고른다.
                var 후보칸 = [];
                칸들.forEach(function (줄) {
                    줄.forEach(function (칸) {
                        후보칸.push(칸);
                    });
                });
                후보칸 = 후보칸.filter(function (칸) { return !칸.textContent});
                var 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)];
                선택칸.textContent = 턴;
                // 컴퓨터 승리 체크
                var 몇줄 = 줄들.indexOf(선택칸.parentNode);
                var 몇칸 = 칸들[몇줄].indexOf(선택칸);
                var 다참 = 결과체크(몇줄, 몇칸);
                if(다참) {
                    초기화();
                }
                //턴을 나한테 넘긴다
                턴 = 'X';
            }, 1000);
        }
    }
}
for(var i = 1; i <= 3; i+=1){
    칸들.push([]);
    var 줄 = document.createElement('tr');
    줄들.push(줄);
    for(var j = 1; j<=3; j+=1){
        var 칸 = document.createElement('td');
        칸.addEventListener('click', 비동기콜백);
        칸들[i-1].push(칸);
        줄.appendChild(칸);
    }
    테이블.appendChild(줄);
}
바디.appendChild(테이블);
바디.appendChild(결과);
console.log(칸들);
