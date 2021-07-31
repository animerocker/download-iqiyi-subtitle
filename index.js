const subBaseLink = 'http://meta.video.iqiyi.com';

const btnLink = document.getElementById('get-link');
const linkInput = document.getElementById('link');
const downsub = document.getElementById('downsub');
const downsubButton = document.getElementById('downsub-button');
const downm3u8 = document.getElementById('downm3u8');
const downm3u8Button = document.getElementById('downm3u8-button');
const nameInput = document.getElementById('name');

async function getLink() {
    let content = linkInput.value;
    if (!content || !nameInput.value) {
        return;
    }

    if (content.includes(');}catch(e){};')) {
        content = content.replace(');}catch(e){};', '');
        content = content.replace(content.substring(0,38), '');
    }
    
    const json = JSON.parse(content);
    const m3u8Object = json.data.program.video.find(item => item._selected);
    const m3u8 = m3u8Object.m3u8;
    const sub = json.data.program.stl.find(item => item._selected);
    const subLink = subBaseLink + sub.srt;
    downsub.href = subLink;
    downsub.download = nameInput.value;
    downsubButton.disabled = false;
    downm3u8Button.disabled = false;
    createLink(m3u8);
}

function reset() {
    downsubButton.disabled = true;
    downm3u8Button.disabled = true;
    downsub.href = "";
    downm3u8.href = "";
    linkInput.value = "";
    nameInput.value = ""
}

function createLink(data) {
    const type = 'application/x-mpegURL';
    const name = nameInput.value + '.m3u8';
    var file = new Blob([data], {type: type});
    downm3u8.href = URL.createObjectURL(file);
    downm3u8.download = name;
}

var getJSON = function(url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    
    xhr.onload = function() {
    
        var status = xhr.status;
        
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    
    xhr.send();
};

