// 发送普通消息到content-script

isGetting = 0

isWaitting = 0
//取得问题
function getProblem() {

    //获取题目
    let t = $('.subject_describe');

    let len = t.length;

   
    problems = [];
    
    for (let i = 0; i < len; i++){
        problems.push($(t)[i].textContent);
    }


    

    console.log(problems);

    sendProblem(problems,problems.length)

}


//发送问题
function sendProblem(problems, len) {

	let singlePro = [];
	singlePro.push(problems[len - 1]);

	/*
	if (isGetting) {
		tip('已经获取答案请勿重复获取')
		return
	}
	*/
	isGetting = 1
	singlePro = JSON.stringify(singlePro)
	isWaitting = 1
	waitting(0)
	let courseName=$(".course_name").text()
    $.ajax({
        type: "get",
        async: true,
		//url: "http://47.93.203.62:8080/getAnswer?problem="+singlePro+"course_name="+$(".course_name").text(),
		url: "http://47.93.203.62:8080/getAnswer?problem="+singlePro+'&coursename='+courseName,
        dataType: "jsonp",
        jsonp:"jsonpCallback",
        jsonpCallback:"success_jsonpCallback",
        success: function(json){
            console.log(json);

			data = json
			
			isWaitting = 0
            
            $($('.subject_type')[len-1]).html('<h1>答案：'+data[0].answer+'</h1>')
			

			len--;
			if (len == -1) {
				return;
			}
			sendProblem(problems,len)

			
        },
    });
}

function waitting(val) {
		for(var i = val;isWaitting;i++){
			tip('获取中。。。')
			window.setTimeout("waitting("+ ++i +")",3000)
			break
		}
}

//弹出
let tipCount = 0;
// 简单的消息通知
function tip(info) {

	if (tipCount > 6) {
		tipCount=0
	}
	info = info || '';
	var ele = document.createElement('div');
	ele.className = 'chrome-plugin-simple-tip slideInLeft';
	ele.style.top = tipCount * 70 + 20 + 'px';
	ele.innerHTML = `<div>${info}</div>`;
	document.body.appendChild(ele);
	ele.classList.add('animated');
	tipCount++;
	setTimeout(() => {
		ele.style.top = '-100px';
		setTimeout(() => {
			ele.remove();
			tipCount--;
		}, 600);
	}, 3000);
}


