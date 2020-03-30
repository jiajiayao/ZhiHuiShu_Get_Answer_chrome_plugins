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
	tip('开始获取,请等待')
	isWaitting = 1
	waitting(0)
    $.ajax({
        type: "get",
        async: true,
		//url: "http://47.93.203.62:8080/getAnswer?problem="+singlePro,
		url: "http://127.0.0.1:8080/getAnswer?problem="+singlePro,
        dataType: "jsonp",
        jsonp:"jsonpCallback",
        jsonpCallback:"success_jsonpCallback",
        success: function(json){
            console.log(json);

            data = json

            
            $($('.subject_type')[len-1]).html('<h1>答案：'+data[0].answer+'</h1>')
			

			len--;
			if (len == -1) {
				return;
			}
			sendProblem(problems,len)

			tip('获取成功')
			isWaitting = 0
        },
    });
}

function waitting(val) {
		for(var i = val;isWaitting;i++){
			tip('获取中。。。')
			window.setTimeout("waitting("+ ++i +")",2000)
			break
		}
}

//弹出
var tipCount = 0;
// 简单的消息通知
function tip(info) {
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


