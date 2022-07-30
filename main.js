// import{qrcode} from "./src/findpat.js"

chrome.runtime.onInstalled.addListener(()=>{

    // qrcode.callback=(result)=>{
    //     // text.value=result
    //     alert(result)
    // }
    var data={}
    chrome.contextMenus.create(
        {
            contexts:['image'],id:"myscan",title:"scan this qrcode"
            // onclick:(info,tab)=>{
            //     // console.log("menu scan clicked");
            //     // console.log(tab);
            //     // console.log(info);
            //     qrcode.decode(info.srcUrl)
            // }
        },
        () =>{}
        )
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if(request.msg==='ok'){
                sendResponse(data)
                data={}
            }
            if(request.msg==='src'){
                data.url=request.url
                chrome.tabs.create(
                    {url:"./index.html"},
                    (tab) => {
                        console.log("generate "+tab.id)
                        
                    }
                  )
            }
        }
    )
    chrome.contextMenus.onClicked.addListener((info,tab)=>{
        if(info.menuItemId==="myscan"){
            // qrcode.decode(info.srcUrl)
            // console.log("click scan");
            data.url=info.srcUrl
            chrome.tabs.create(
                {url:"./index.html"},
                (tab) => {
                    console.log("generate "+tab.id)
                    
                }
              )
        }
    })
})