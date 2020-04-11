console.log('这是content script!')

// 注意，必须设置了run_at=document_start 此段代码才会生效
document.addEventListener('DOMContentLoaded', function () {
	console.log(location.host)

//	console.log(document.getElementsByClassName("operateBtn_box fr mr5")[0].textContent)
  console.log(window.location.href)


  
  targetStr = 'dohomework'

  if (location.host == 'onlineh5.zhihuishu.com') {

    initHelloPanel()

    setTimeout(function () {
      let schoolName = $('.have-no-logo').text()
      let name= $('.userName').text()
      /*
      schoolName = bg.getSchoolName()
      console.log(schoolName)
      */
     chrome.runtime.sendMessage({type: 'setName',name:name,schoolName:schoolName}, function(response) {
      console.log('收到来自后台的回复：' + response);
      });
    }, 1000);
   
  }

  if (location.host == 'onlineexamh5new.zhihuishu.com') {

    chrome.runtime.sendMessage({ type: 'getName' }, function (response) {
      response=JSON.parse(response)
      console.log(response);
      /*
      if (response.schoolName == "") {
        window.open('https://onlineh5.zhihuishu.com/onlineWeb.html#/studentIndex');

        setTimeout(function () {
          location.reload()
        }, 1500);

      }
      */
    });
    /*
    if (window.location.href.indexOf("https") != -1) {
      alert('请修改网站地址为http，否则程序无法运行！！！！')
    } 
    */
    // 注入自定义JS
    injectCustomJs()

    initCustomPanel()
  }
 
})

//接收从页面收来的命令做中转
window.addEventListener("message", function(e)
{
  console.log('中转前台发送的数据')
  console.log(e.data);
  if (e.data.type == "getAnswer") {//搜题访问bg
    console.log('发送数据到后台')
    chrome.runtime.sendMessage(e.data, function (response) {

      console.log('收到来自后台的回复：' + response);
      console.log('中转发送发送信息到前台')
      window.postMessage({"type": 'answer',"res":response}, '*');
      });
  }
}, false);


function initCustomPanel() {
  var panel = document.createElement('div')
  panel.className = 'chrome-plugin-demo-panel'
  panel.innerHTML = `
		<h1>智慧树网课自动搜题插件</h1>
		
		<div class="btn-area" >
			<a href="javascript:upDate()">更新脚本</a><br>
			<a href="javascript:setA()">获取使用信息</a><br>
			<a href="javascript:setB()">获取个人信息</a><br>
		</div>
		<div id="my_custom_log">
		</div>
	`
  document.body.appendChild(panel)
}

function initHelloPanel() {
  var panel = document.createElement('div')
  panel.className = 'chrome-plugin-demo-panel'
  panel.innerHTML = `
		<h1>智慧树网课自动搜题插件</h1>
		
		<div class="btn-area" >
			<a>欢迎使用！！</a><br>
			<a>请点击课程开始答题</a><br>
		</div>
		<div id="my_custom_log">
		</div>
	`
  document.body.appendChild(panel)
}

// 向页面注入JS
function injectCustomJs(jsPath) {
  jsPath = jsPath || 'js/inject.js'
  var temp = document.createElement('script')
  temp.setAttribute('type', 'text/javascript')
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  temp.src = chrome.extension.getURL(jsPath)
  temp.onload = function() {
    // 放在页面不好看，执行完后移除掉
    this.parentNode.removeChild(this)
  }
  document.body.appendChild(temp)
}
