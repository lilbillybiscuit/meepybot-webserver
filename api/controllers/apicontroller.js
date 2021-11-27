const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('meepybot.db');
const { Client, Intents, Collection} = require("discord.js");
const { parser, htmlOutput, toHTML } = require('discord-markdown');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

/*
db.all("SELECT * FROM pins", (error, rows) => {
    rows.forEach((row) => {
        console.log(row);
    })
});

db.all("SELECT * FROM messages", (error, rows) => {
    rows.forEach((row) => {
        console.log(row);
    })
});*/

exports.list_all_tasks = function(req, res) {
  console.log(req._parsedUrl.pathname);
  //console.log(res);
  res.json("Hi");
  return;
};


exports.create_a_task = function(req, res) {
  console.log(req.query);
  //console.log(res);
  res.json("create_a_task");
  return;
};


exports.read_a_task = function(req, res) {
  console.log(req._parsedUrl.pathname);
  //console.log(res);
  res.json("read_a_task");
  return;
};


exports.update_a_task = function(req, res) {
  console.log(req.query);
  //console.log(res);
  res.json("update_a_task");
  return;
};


exports.delete_a_task = function(req, res) {
    console.log("delete_a_task");
    res.json("update_a_task");
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
    await db.all("SELECT message_id FROM pins WHERE channel=$channel", {
        $channel: page,
    }, (error, rows) => {
        console.log(rows.length);
        if (rows.length==0) {
            ret={
                'success': false,
                'error': "Invalid channel ID"
            };
            res.json(ret);
            return
        }
        rows.forEach((row) => {
            console.log(row);
            db.get("SELECT message FROM messages WHERE message_id=$id", {
                $id: parseInt(row.message_id)
            }, (error, rows) => {
                console.log(rows);
            })
        })
    });
    console.log("hi");
    var ret={
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
            },
            {
                'index': 3,
                'timestamp': "Today at 11:58 PM",
                'username': "Jwana",
                'username_color': '#FFFFFF',
                'avatar_url': 'https://cdn.discordapp.com/avatars/411989408246398989/652be26e8798d58e6cb3259faf2660bb.webp',
                'message_url': 'https://google.com/',
                'attachments': false,
                'attachments_api': null,
                'message': toHTML('```hi.print(5)```')
            },
            {
                'index': 3,
                'timestamp': "Today at 11:59 PM",
                'username': "lilbillbiscuit",
                'username_color': '#FFFFFF',
                'avatar_url': 'https://cdn.discordapp.com/avatars/411989408246398989/652be26e8798d58e6cb3259faf2660bb.webp',
                'message_url': 'https://google.com/',
                'attachments': false,
                'attachments_api': null,
                'message': toHTML('```hi.print(5)```')
            }
        ]
    };
    //res.json(ret);
}