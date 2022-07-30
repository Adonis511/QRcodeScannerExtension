// background.js

// let color = '#3aa757';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });

function getImgSrc(){
    var img=document.getElementById('s_lg_img')
    console.log(img.src);
    return img.src
}

function addImgSelection(){
    var imgs=document.getElementsByTagName('img')
    console.log(imgs);
    var res=[]
    for(var i=0;i<imgs.length;i++){
        // imgs[i].addEventListener("click",()=>{
        //     console.log("click:"+this.src);
        // })
        // console.log(imgs[i].src)
        res.push(imgs[i].src)
    }
    return res
}

function changeClick(id){
    let elem=document.getElementById(id)
    // elem.addEventListener("click",function(){
    //     console.log(this);
    // })
    elem.onclick=function(){console.log(this);}
}

async function getTabId() {
    var [tab]=await chrome.tabs.query({ currentWindow: true, active: true });
    console.log("in:"+tab.id)
    return tab.id
    
  }
let capture=document.getElementById('capture')
let img=document.getElementsByClassName('show_img')[0]
let panel=document.getElementById('panel')
let text=document.querySelector('#result textarea')



getTabId().then((tabId)=>{
    console.log('out:'+tabId)
    
    flag=false
    capture.addEventListener("click",function(e){
        // if(flag){
        //     this.style.backgroundColor="white"
        // }
        // else{
        //     this.style.backgroundColor="blue"
        // }
        // flag=!flag
        chrome.scripting.executeScript(
            {
            target: {tabId: tabId, allFrames: true},
            func: addImgSelection,
            },
            (injectionResults) => {
                console.log(injectionResults[0].result);
                // img.src=injectionResults[0].result
                
                // panel.appendChild(document.createElement('div'))
                panel.innerHTML=""
                injectionResults[0].result.forEach(img_src => {
                    var img=document.createElement('img')
                    img.src=img_src
                    img.setAttribute('class','show_img')
                    img.addEventListener('click',()=>{
                        console.log("click:"+img);
                        // qrcode.decode(img.src)
                        chrome.runtime.sendMessage({msg:"src",url: img.src}, function(response) {
                            console.log(response);
                          });
                    })
                    panel.appendChild(img)
                });
            });
    
})
});
