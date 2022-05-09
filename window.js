// declare variables
let screen_width = 1000;
let screen_height = 500;
let all_channels_container = document.getElementById("all-channel");
let channels_info = [
    {
        name: "ludwig",
        image: "https://yt3.ggpht.com/ytc/AKedOLTCKuyNop8HOKa7IvvTNYi2bGCxPbRonpgwGaMHKg=s88-c-k-c0x00ffffff-no-rj",
        selected: 0,
        live: "https://www.youtube.com/channel/UCrPseYLGpNygVi34QpGNqpA/live"
    },
    {
        name: "sykkuno",
        image: "https://yt3.ggpht.com/ytc/AKedOLQkqUiG_WQLLetGfjn_ou264Edzk43NbewQ6Ni4cA=s88-c-k-c0x00ffffff-no-rj",
        selected: 0,
        live: "https://www.youtube.com/channel/UCRAEUAmW9kletIzOxhpLRFw/live"
    },
    {
        name: "atrioc",
        image: "https://yt3.ggpht.com/ytc/AKedOLRwdqnYUz9wlA6ic932Jn57P-RtojCHCjl9g1Xfgw=s88-c-k-c0x00ffffff-no-rj",
        selected: 0,
        live: "https://www.youtube.com/channel/UCgv4dPk_qZNAbUW9WkuLPSA/live"
    },
    {
        name: "valkyrae",
        image: "https://yt3.ggpht.com/opnLGoCls9VgU85y-AQs5UdLuyr95I-kXG77JaGxshtVk2t0wpWcKWQyVz3PxtAeq6ZunPlm3bQ=s88-c-k-c0x00ffffff-no-rj",
        selected: 0,
        live: "https://www.youtube.com/channel/UCWxlUwW9BgGISaakjGM37aw/live"
    }
]

// append youtube channels
for (let index = 0; index < channels_info.length; index++) {
    let channel = document.createElement('div');
    channel.className = "channel";
    let img = document.createElement('img');
    img.src = channels_info[index].image;
    img.onclick = () => {
        if (channels_info[index].selected == 1) {
            channels_info[index].selected = 0;
            img.style.border = "none";
        }
        else {
            channels_info[index].selected = 1;
            img.style.border = "2px solid red";
        }
    }
    channel.appendChild(img);
    all_channels_container.appendChild(channel);
}

function update_screen_size(){
    chrome.system.display.getInfo().then(
        function(value) { 
            screen_width = value[0].bounds.width;
            screen_height = value[0].bounds.height;
        },
        function(error) { console.log(error); }
    );
}
update_screen_size();

document.getElementById("rm").onclick = () => {
    chrome.windows.getCurrent((cw) => {
        chrome.windows.getAll((windows) => {
            for (let index = 0; index < windows.length; index++) {
                if(windows[index].id != cw.id)
                chrome.windows.remove(windows[index].id);
            }
        })
    });
}
document.getElementById("launch").onclick = () => {
    let selected_channels = channels_info.filter(e => e.selected === 1);
    update_screen_size();
    for (let i = 0; i < selected_channels.length; i++) {
        chrome.windows.create({
            url: selected_channels[i].live,
            type: "popup"
        }, function(nw) {
            if(selected_channels.length == 1)
            chrome.windows.update(nw.id, {width: screen_width, height: screen_height});
            else if(selected_channels.length == 2)
            chrome.windows.update(nw.id, {width: (screen_width/2), height: screen_height});
            else if(selected_channels.length == 3){
                if(i<2)
                chrome.windows.update(nw.id, {width: (screen_width/2), height: (screen_height/2)});
                else
                chrome.windows.update(nw.id, {width: screen_width, height: (screen_height/2)});
            }
            else if(selected_channels.length == 4){
                chrome.windows.update(nw.id, {width: (screen_width/2), height: (screen_height/2)});
            }
            if(i==0)
            chrome.windows.update(nw.id, {top: 0, left: 0});
            else if(i==1)
            chrome.windows.update(nw.id, {top: 0, left: (screen_width/2)});
            else if(i==2)
            chrome.windows.update(nw.id, {top: (screen_height/2), left: 0});
            else if(i==3)
            chrome.windows.update(nw.id, {top: (screen_height/2), left: (screen_width/2)});
        });
    }
    
}


