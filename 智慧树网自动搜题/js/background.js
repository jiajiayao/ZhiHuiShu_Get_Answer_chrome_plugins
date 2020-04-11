var schoolName = ''
var name=''
// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	//console.log('收到来自content-script的消息：');
    //console.log(request, sender, sendResponse);
    if (request.type == 'setName') {
        schoolName = request.schoolName
        name = request.name
        
        chrome.storage.local.set({schoolName:schoolName,name:name}, function() {
            console.log('保存成功！');
        });
        sendResponse(JSON.stringify(request));
    }
    if (request.type == 'getName') {
        let data = {
            'name': name,
            'schoolName': schoolName
        }
        request = data
        
        sendResponse(JSON.stringify(request));
    }
    if (request.type == 'getAnswer') {

        chrome.storage.sync.get({name: '未获取', schoolName: '未获取'}, function(items) {
            console.log(items.name, items.schoolName);
            schoolName = item.schoolName
            name =item.name
        });

        if (name == '') {
            name='未获取'
        }
        if (schoolName == '') {
            schoolName='未获取'
        }
        let courseName = request.courseName
        let singlePro = request.singlePro
        $.ajax({
            type: "get",
            //url: "http://47.93.203.62:8080/getAnswer?problem="+singlePro+"course_name="+$(".course_name").text(),
            url: "http://47.93.203.62:8080/getAnswer?problem="+singlePro+'&coursename='+courseName+'&schoolName='+schoolName+'&name='+name,
            success: function(data){
                console.log(data);   
                request = data
                sendResponse(JSON.stringify(request));
            },
        });
    }
	return true;  
});