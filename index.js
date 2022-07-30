import{qrcode} from "./src/findpat.js"
        let text=document.getElementById('text')
        let qr_img=document.getElementById('qr_code')
        var [tab]=await chrome.tabs.query({ currentWindow: true, active: true });
        console.log("generate "+tab.id)
        qrcode.callback=result=>{
            console.log(result);
            text.value=result
        }
        chrome.runtime.sendMessage({msg: "ok"}, function(response) {
            if(response.url){
                qrcode.decode(response.url)
                qr_img.src=response.url
            }
            else{
                console.log(response);
            }
          });
        console.log("done");