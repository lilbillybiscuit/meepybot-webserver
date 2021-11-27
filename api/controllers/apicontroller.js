const Database = require('better-sqlite3');
const db = new Database('../meepybot/meepybot.db');
const { Client, Intents, Collection} = require("discord.js");
const { parser, htmlOutput, toHTML } = require('discord-markdown');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

exports.list_all_tasks = function(req, res) {
  console.log(req._parsedUrl.pathname);
  //console.log(res);
  res.json("Hi");
  return;
};

exports.pinlist = async function(req, res) {
    if (!'key' in req.query) {
        ret={
            'success': false,
            'error': 'Key required for authenication'
        };
        res.json(ret);
        return;
    }
    var page = req._parsedUrl.pathname.split("/").pop();
    console.log(page);
    /*var hi = db.each("SELECT CAST(message_id as TEXT) AS message_id, datetime FROM pins WHERE channel=$chan", {
        $chan: page,
    }, (error, row) => {
        if (rows.length==0) {
            ret={
                'success': false,
                'error': "Invalid channel ID"
            };
            res.json(ret);
            return
        }
        return message_ids;
    });*/
    var message_ids = db.prepare("SELECT CAST(message_id as TEXT) AS message_id, datetime FROM pins WHERE channel=?").all(page);
    message_ids=Object.values(message_ids);
    var messages=[];
    for (const i in message_ids) {
        var row = message_ids[i];
        var result=db.prepare("SELECT message FROM messages WHERE message_id=?").get(BigInt(row.message_id));
        if (result==undefined) continue;
        messages.push(JSON.parse(result.message));
    }
    var initial = messages[0];
    var ret = {
    'date': Math.round(Date.now() / 1000), //time since epoch
    'size': messages.length,
    'channel_name': initial.channel.name,
    'success': true,
    'error': "Success",
    'elements': []
    };
    for (const i in messages) {
        var msg = messages[i];
        var temp = {
                'index': i,
                'timestamp': msg.created_at,
                'username': msg.author.nick==null?msg.author.display_name : msg.author.nick,
                'username_color': msg.author.color=="#000000"?"#FFFFFF" : msg.author.color,
                'avatar_url': msg.author.avatar_url,
                'message_url': msg.jump_url,
                'attachments': msg.has_attachments,
                'attachments_api': msg.has_attachments?msg.attachments[0].url:null,
                'message': toHTML(msg.content)
            }
            ret.elements.push(temp);
    }
    res.json(ret);
    /*var ret={
        'date': 53298452345,
        'size': 5,
        'channel_name': 'test',
        'success': true,
        'error': "Success",
        'elements': [
            {
                'index': 3,
                'timestamp': "Today at 11:58 PM",
                'username': "lilbillbiscuit",
                'username_color': '#FFFFFF',
                'avatar_url': 'https://cdn.discordapp.com/avatars/411989408246398989/652be26e8798d58e6cb3259faf2660bb.webp',
                'message_url': 'https://google.com/',
                'attachments': false,
                'attachments_api': null,
                'message': toHTML('```hi.print(5)```')
            }
        ]
    };*/
}