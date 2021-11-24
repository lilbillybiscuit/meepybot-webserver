if (!getparameter("channel") || !getparameter("key")) {
    $("#channel-title").text("Error: missing parameters");
    throw new Error("Missing parameters");
}


$("#channel-title").text("Pins for channel");
var hi = `
<div id="message-block" class="message-block">
   <div id="avatar-div" class="avatar-div"><img src="avatar_url" loading="lazy" id="avatar_image" width="50" alt="" class="image-2"></div>
   <div class="message-container">
      <div class="message-nickname">
         <p class="username" style="color: username_color;"><strong>username_text</strong></p>
         <p class="date-text">timestamp_text</p>
         <a href="#" class="link">Go to message</a>
      </div>
      <div class="message-text">
         <div id="message-text" class="text-block-7" style="white-space: pre-wrap;">user_text</div>
      </div>
   </div>
</div>`;

var avatar_url =
  "https://cdn.discordapp.com/avatars/411989408246398989/652be26e8798d58e6cb3259faf2660bb.webp";
var user_name = "lilbillybiscuit";
var user_message = `This is a test hi1
hi2`;
var user_color = "#000000";
var timestamp = "Today at 10:18 PM";

function replaceAll(str, mapObj) {
  var re = new RegExp(Object.keys(mapObj).join("|"), "gi");

  return str.replace(re, function (matched) {
    return mapObj[matched];
  });
}

function nl2br(str, is_xhtml) {
  var breakTag =
    is_xhtml || typeof is_xhtml === "undefined" ? "<br/>" : "<br>";
  return (str + "").replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    "$1" + breakTag + "$2"
  );
}

function getparameter(key) {
    var cururl= window.location.href;
    var url = new URL(cururl);
    var ret = url.searchParams.get(key);
    return ret
}

var replacethis = {
  avatar_url: avatar_url,
  username_text: user_name,
  user_text: user_message,
  username_color: user_color,
  timestamp_text: timestamp,
};
var temp = replaceAll(hi, replacethis);
//str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
var divobj = $(temp);
divobj.appendTo('#message-list')
/*
divobj
  .find("#message-text")
  .text(nl2br(user_message,true));
divobj.appendTo("#message-list");
*/