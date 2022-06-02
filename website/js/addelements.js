if (!getparameter("channel") || !getparameter("key")) {
    $("#channel-title").text("Error: missing parameters");
    throw new Error("Missing parameters");
}


var hi = `
<div id="message-block" class="message-block">	
   <div id="avatar-div" class="avatar-div"><img src="avatar_url" loading="lazy" id="avatar_image" width="50" alt="" class="image-2"></div>	
   <div id="message-container" class="message-container">	
      <div class="message-nickname">	
         <p class="username" style="color: username_color;"><strong>username_text</strong></p>	
         <p class="date-text">timestamp_text</p>	
         <p class="index">index_text</p>	
         <a href="message_url" class="link">Go to message</a>	
      </div>	
      <div id = "message-text-block" class="message-text" style="word-wrap: break-word; width: 80%">	
          <div id="message-text" class="message">user_text</div>	
      </div>	
   </div>	
</div>`;

var message_attachment = `
<div class="message-attachment-div"><img src="image_url" loading="lazy" sizes="(max-width: 767px) 46vw, (max-width: 991px) 45vw, 450px" alt="" class="image-3"></div>`
var message_audio = `
<div class="message-attachment-div">
    <audio
        controls
        src="audio_url">
            Your browser does not support the
            <code>audio</code> element.
    </audio>
</div>
`
var attachment_url_obj = `
<a href="attachment_url">attachment_url</a>`


function replaceAll(str, mapObj) {
  var re = new RegExp(Object.keys(mapObj).join("|"), "gi");

  return str.replace(re, function (matched) {
    return mapObj[matched];
  });
}

function getparameter(key) {
    var cururl= window.location.href;
    var url = new URL(cururl);
    var ret = url.searchParams.get(key);
    return ret
}
var key = getparameter('key');
var channel = getparameter('channel');
var cururl = `/api/pinlist/${channel}?key=${key}`;

$.getJSON(cururl, function(data) {
  console.log(data);
  if (data.success==false) {
    $("#channel-title").text(data.error);
    throw new Error(data.error);
  }
  $("#channel-title").text('Pins for '+data.channel_name);
  for (var i=0; i<data.elements.length; i++) {
    var obj = data.elements[i];
    //console.log(obj);
    var replacethis = {
      avatar_url: obj.avatar_url,
      username_text: obj.username,
      user_text: obj.message,
      username_color: obj.username_color,
      timestamp_text: obj.timestamp,
      index_text: '#'+obj.index,
      message_url: obj.message_url
    };
    var attachment_html = "";
    var intext=false;
    if (obj.attachments) {
      console.log(obj.content_type);
      if (obj.content_type.includes("image")) {
        attachment_html=replaceAll(message_attachment, {image_url: obj.attachments_api});
      } else if (obj.content_type.includes("audio")) {
        attachment_html=replaceAll(message_audio, {audio_url: obj.attachments_api});
      } else {
        attachment_html=replaceAll(attachment_url_obj, {attachment_url: obj.attachments_api});
        intext=true;
      }
    }
    var temp = replaceAll(hi, replacethis);
    var divobj = $(temp);
    divobj
      .find("#message-text")
      .html(obj.message);
    if (obj.attachments && !intext) {
      divobj.find("#message-container").append(attachment_html);
    } else if (obj.attachments && intext) {
      divobj.find("#message-text").append(attachment_html);
    }
    divobj.appendTo("#message-list");
  }
});

