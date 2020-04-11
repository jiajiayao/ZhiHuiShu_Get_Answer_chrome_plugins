// 发送普通消息到content-script


var isWaitting = 0

var problems = [];

var NUM

function setA() {
	tip('开发中，敬请期待')
}

function setB() {
	tip('开发中，敬请期待')
}

function upDate() {
	
	window.open("https://github.com/jiajiayao/ZhiHuiShu_Get_Answer_chrome_plugins"); 

}
function sendProblem(num) {
	NUM=num
	let courseName = $(".course_name").text()
	let singlePro = [];
	singlePro.push(problems[num])
	singlePro = JSON.stringify(singlePro)


	isWaitting = 1
	waitting(0)

	window.postMessage({ singlePro:singlePro, courseName: courseName, type: 'getAnswer' }, '*');
	console.log(problems[num])
	

}

window.addEventListener("message", function(e)
	{
	console.log('前台收到信息')
	console.log(e.data);
	if (e.data.type == 'answer') {
		console.log('获取到答案')
		let data = JSON.parse(JSON.parse(e.data.res))
		console.log(data)
		$($('.subject_type')[NUM]).html('<h1>答案：' + data[0].answer + '</h1>')
		isWaitting = 0
	}
}, false);
	
window.onload = function () {
	isWaitting = 1
	waitting(0)

	setTimeout(function () {
		getProblem()
		for (let i = 0; i < $(".subject_describe").length;i++) {
			$($(".subject_describe")[i]).append('<button onclick="sendProblem('+i+')">获取</button>')
		}
		isWaitting = 0
	}, 1000);
}



//取得问题
function getProblem() {

    //获取题目
    let t = $('.subject_describe');

    let len = t.length;

   

    
    for (let i = 0; i < len; i++){
        problems.push($(t)[i].textContent);
	}
	
    console.log(problems);

    //sendProblem(problems,problems.length)

}


// //发送问题

// function sendProblem(problems, len) {

// 	let singlePro = [];
// 	singlePro.push(problems[len - 1]);

// 	/*
// 	if (isGetting) {
// 		tip('已经获取答案请勿重复获取')
// 		return
// 	}
// 	*/
// 	isGetting = 1
// 	singlePro = JSON.stringify(singlePro)
// 	isWaitting = 1
// 	waitting(0)
// 	let courseName = $(".course_name").text()

// 	/*
//     $.ajax({
//         type: "get",
//         async: true,
// 		//url: "http://47.93.203.62:8080/getAnswer?problem="+singlePro+"course_name="+$(".course_name").text(),
// 		url: "http://47.93.203.62:8080/getAnswer?problem="+singlePro+'&coursename='+courseName,
//         dataType: "jsonp",
//         jsonp:"jsonpCallback",
//         jsonpCallback:"success_jsonpCallback",
//         success: function(json){
//             console.log(json);

// 			data = json
			
// 			isWaitting = 0
            
//             $($('.subject_type')[len-1]).html('<h1>答案：'+data[0].answer+'</h1>')
			

// 			len--;
// 			if (len == -1) {
// 				return;
// 			}
// 			sendProblem(problems,len)

			
//         },
// 	});
// 	*/
// }
function waitting(val) {
		for(var i = val;isWaitting;i++){
			tip('加载中')
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


