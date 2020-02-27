console.log('这是content script!')

// 注意，必须设置了run_at=document_start 此段代码才会生效
document.addEventListener('DOMContentLoaded', function () {
	console.log(location.host)

//	console.log(document.getElementsByClassName("operateBtn_box fr mr5")[0].textContent)
  console.log(window.location.href)

 
  
  targetStr = 'dohomework'

  if (location.host == 'onlineexamh5new.zhihuishu.com') {
  
    if (window.location.href.indexOf("https") != -1) {
      alert('请修改网站地址为http，否则程序无法运行！！！！')
    } 
    // 注入自定义JS
    injectCustomJs()

    initCustomPanel()
  }
})

function initCustomPanel() {
  var panel = document.createElement('div')
  panel.className = 'chrome-plugin-demo-panel'
  panel.innerHTML = `
		<h1>智慧树网课自动搜题插件</h1>
		
		<div class="btn-area" >
			<a href="javascript:getProblem()">点击搜题</a><br>
			<a href="javascript:setA()">使用默认搜题源</a><br>
			<a href="javascript:setB()">使用备用搜题源</a><br>
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
