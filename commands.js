const http = require("http");
const ytdl = require("ytdl-core");
const Player = require("./musicplayer");
const Discord = require("discord.js");
const https = require("https");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //woaaah woah wooooooah wooah woooa uh woooo wooo woooah
}

function validURL(str) {
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(str);
}

class Commands {
    static messageOfTheDay = "Anti-retard";
    static messageOfTheAuthor = "el gato";

    static commandslist = [
        "**MAIN**",
        "e!help",
        "e!say <what to say>",
        "e!avatar - Your avatar",
        "e!avatar <@mention> - Someone's avatar",
        "e!motd - Displays message of the day.",
        "e!motd set <value> - Sets message of the day!",
        "e!dog - Don't do that :flushed:",
        "e!cat - Shows random picture of the :cat:",
        "e!meme - Shows random meme",
        "e!credits",
        "**MUSIC**",
        "e!play <youtube url> - Plays music from youtube url",
        "e!join",
        "e!queue - Shows queue",
        "e!repeat/e!loop - Repeat music",
        "e!skip - Skip music ",
        "**MODERATION**",
        "e!ban <@mention> <reason>",
        "e!kick <@mention> <reason>",
        "**FUN**",
        "e!trashfacts - Facts",
        "e!russianroulette - Try your luck!"
    ];

    static antiSpamShit = [];
    static prevMessage = "";
    static prevMessageAuthor = null;
    static enoughTimeElapsed = false;
    static currentElapsedTimer = null;

    static NewMessage(message) {
        this.AntiSpam(message);
        switch (true) {
            case message.content.includes("e!help"):
                this.Help(message);
                break;

            case message.content.includes("e!meme"):
                this.Meme(message);
                break;

            case message.content.includes("e!say"):
                if (!message.content.includes("e!kick") && !message.content.includes("e!ban")) {
                    message.delete();
                    message.channel.send(message.content.split("e!say ")[1]);
                } else message.channel.send("Mod abuse and cyber boobing");
                break;

            case message.content.includes("e!avatar"):
                this.Avatar(message);
                break;

            case message.content.includes("e!trashfacts"):
                var retard = ["I love watching hentai with chads!", "https://open.spotify.com/track/3PAr6to0KN3W3eUtpHNKQ0?si=6CEpgi3DTAWxxOvKNtbF7Q", "https://open.spotify.com/track/49MoLpFtl1d1z2HEMzAHlh?si=Q89Ia7J7QseXocKu9NhOlw", "fuck sunfire", "https://cdn.discordapp.com/attachments/740506225455661107/760233459826032750/unknown.png", "Why do you like this?", "Every time you use this command, your iq lowered by 1%!!!!"]
                message.channel.send(retard[getRandomInt(0, retard.length - 1)]);

                break;

            case message.content.includes("e!credits"):
                this.Credits(message);
                break;

            case message.content.includes("e!cat"):
                this.Cat(message);
                break;

            case message.content.includes("e!dog"):
                message.channel.send("No dogs bro... :flushed:");
                break;

            case message.content.includes("e!serverinfo"):
                this.ServerInformation(message);
                break;

            case message.content.includes("e!motd"):
                this.Motd(message);
                break;
            case message.content.includes("e!play"):
                this.Play(message);
                break;

            case message.content.includes("e!hentai"):
                this.Hentai(message);
                break;

            case message.content.includes("e!join"):
                message.member.voice.channel.join();
                break;

            case message.content.includes("e!queue"):
                this.Queue(message);
                break;

            case message.content.includes("e!leave"):
                break;

            case message.content.includes("e!repeat"):
                this.Repeat(message);
                break;

            case message.content.includes("e!loop"):
                this.Repeat(message);
                break;

            case message.content.includes("e!ban"):
                this.Ban(message);
                break;

            case message.content.includes("e!kick"):
                this.Kick(message);
                break;
            
            case message.content.includes("e!russianroulette"):
                this.PycckaRPyletka(message);
                break;
        }
    }

    static PycckaRPyletka(message) {
        let chance = getRandomInt(0, 5);
        let mess = message.channel.send(":taelsspin: Deciding your fate").then(mess=>{
            let user = message.mentions.members.first();
            setTimeout(function(){
               if(chance > 0){
                   mess.edit(`${message.author.toString()} Missed shot due to no flop :pensive: `);
               }else{
                   mess.edit(`:eggboborussianroulette:➼  ${message.author.toString()}`);
                   mess.edit(`:eggboborussianroulette:  ➼  ${message.author.toString()}`);
                   mess.edit(`:eggboborussianroulette:   ➼${message.author.toString()}  owned`);
                   message.member.ban();
               }
            },2500);
        });
        
    }


    static Hentai(message) {
        message.author.send("https://www.pornhub.com/view_video.php?viewkey=ph55b2ec08ad5b1");
    }

    static Ban(message) {
        let mention = message.mentions.members.first();

        // checking if message don't have a user mention
        if (!mention) { message.channel.send('You need to mention a user.'); return; } else {
            if (message.member.hasPermission("ADMINISTRATOR")) {
                mention.ban();
            } else {
                message.channel.send(
                    "No Permission to do that bro... <:ExLmao:700806104644583424>"
                );
            }
        }
    }

    static Kick(message) {
        let mention = message.mentions.members.first();

        // checking if message don't have a user mention
        if (!mention) { message.channel.send('You need to mention a user.'); return; } else {
            if (message.member.hasPermission("ADMINISTRATOR")) {
                mention.kick();
            } else {
                message.channel.send(
                    "No Permission to do that bro... <:ExLmao:700806104644583424>"
                );
            }
        }
    }

    static AntiSpam(message) {
        var testMessage = message.content.replace(/\s/g, '');
        if (testMessage.toLowerCase().includes("nigger") || testMessage.toLowerCase().includes("cum") ||
            testMessage.toLowerCase().includes("сum") || testMessage.toLowerCase().includes("cuм") ||
            testMessage.toLowerCase().includes("сuм") || testMessage.toLowerCase().includes("cüm") ||
            testMessage.toLowerCase().includes("сüm") || testMessage.toLowerCase().includes("сüм") ||
            testMessage.toLowerCase().includes("nigga") || testMessage.toLowerCase().includes("nigg")) {
            message.delete();
        }

        if (this.antiSpamShit[message.author.id] == null) {
            this.antiSpamShit[message.author.id] = new SpamMember(true, 0);
        }

        if (this.prevMessageAuthor != null && message.author == this.prevMessageAuthor) {
            this.antiSpamShit[message.author.id].counter++;
            console.log(this.antiSpamShit[message.author.id].counter);
            clearTimeout(this.currentElapsedTimer);
            if (this.antiSpamShit[message.author.id].counter > 7) {
                if (!this.antiSpamShit[message.author.id].kick)
                    message.member.kick('Anti-spam');
                else
                    message.member.ban();
                this.antiSpamShit[message.author.id].kick = true;
                this.antiSpamShit[message.author.id].counter = 0;
                console.log(this.antiSpamShit[message.author.id].kick);
            } else {
                this.prevMessageAuthor = message.author;
                this.currentElapsedTimer = setTimeout(function () {
                    Commands.waitForTimeElapsed(message.author.id);
                }, 1000);
            }
        }

        this.prevMessage = message.content;
        this.prevMessageAuthor = message.author;
    }


    static waitForTimeElapsed(author) {
        this.antiSpamShit[author].counter = 0;
    }


    //Commands
    static Meme(message) {
        https.get("https://meme-api.herokuapp.com/gimme", function (res) {
            var body = "";

            res.on("data", function (chunk) {
                body += chunk;
            });

            res.on("end", function () {
                console.log(body);
                var fbResponse = JSON.parse(body);
                var emd3 = new Discord.MessageEmbed();
                emd3.setImage(fbResponse.url);
                emd3.setTitle(fbResponse.title);
                emd3.setFooter("Upvotes: " + fbResponse.ups);
                emd3.setURL(fbResponse.postLink);
                if (!fbResponse.nsfw)
                    message.channel.send(emd3);
            });
        });
    }


    static Help(message) {
        //Constructing new embed
        const embed = new Discord.MessageEmbed()
            .setColor("#9e0000")
            .setTitle("Hello!")
            .setAuthor(
                message.member.displayName,
                "https://cdn.discordapp.com/avatars/750089415736688640/0280ce8c4473832ee4d3a8bee6ca79f1.png?size=1024",
                "https://discord.gg/2SksQNp"
            )
            .setDescription(
                "Hello! I'm EggBobo Bot! Check out my commands! <:exFellingNice:662442040407359489>"
            )
            .setThumbnail(
                "https://cdn.discordapp.com/avatars/750089415736688640/0280ce8c4473832ee4d3a8bee6ca79f1.png?size=1024"
            )
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.avatarURL());

        this.commandslist.forEach(element => {
            embed.addField(element, "⠀");
        });

        //Sending
        message.channel.send(embed);
    }

    static Avatar(message) {
        var ping = message.mentions.members.first(); //get ping

        if (ping != null) {
            var embd = new Discord.MessageEmbed();
            console.log(ping.user.avatarURL());
            embd.setImage(ping.user.avatarURL());
            embd.setColor("#275BF0");
            message.channel.send(embd);
        }
        else {
            var embd = new Discord.MessageEmbed();
            embd.setImage(message.author.avatarURL());
            embd.setColor("#275BF0");
            message.channel.send(embd);
        }
    }

    static Credits(message) {
        var embd2 = new Discord.MessageEmbed()
            .setTitle("The bot was created by")
            .setAuthor(
                "Bot Credits",
                "https://cdn.discordapp.com/avatars/750089415736688640/0280ce8c4473832ee4d3a8bee6ca79f1.png?size=1024",
                "https://discord.gg/2SksQNp"
            )
            .setDescription(
                "** <@503184294353829918> , <@499095772084568095> and <@317986156589613057> <:exFellingNice:662442040407359489>**"
            )
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.avatarURL())
            .setColor("RANDOM");
        message.channel.send(embd2);
    }

    static Cat(message) {
        http.get("http://aws.random.cat/meow", function (res) {
            var body = "";

            res.on("data", function (chunk) {
                body += chunk;
            });

            res.on("end", function () {
                var fbResponse = JSON.parse(body);
                var emd3 = new Discord.MessageEmbed();
                emd3.setImage(fbResponse.file);
                message.channel.send(emd3);
            });
        });
    }

    static ServerInformation(message) {
        var serverinfo = new Discord.MessageEmbed()
            .setColor("#9e0000")
            .setTitle("Server Info <:ExLmao:700806104644583424>")
            .setImage(message.guild.iconURL)
            .setDescription(`${message.guild}'s information`)
            .addField("Owner", `The owner of this server is Quote/Merfy`)
            .addField("Region", `Russia`)
            .addField("Creation Date", `2017-07-16 17:30:54.782`)
            .addField(
                "Member Count",
                `This server has ${message.guild.memberCount} members`
            )
            .addField(
                "Emoji Count",
                `This server has ${message.guild.emojis.cache.size} emojis`
            )
            .addField(
                "Roles Count",
                `This server has ${message.guild.roles.cache.size} roles`
            )
            .setThumbnail(
                "https://cdn.discordapp.com/avatars/750089415736688640/0280ce8c4473832ee4d3a8bee6ca79f1.png?size=1024"
            )
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.avatarURL());

        message.channel.send(serverinfo);
    }

    static Motd(message) {
        if (message.content.includes("set")) {
            if (message.member.hasPermission("ADMINISTRATOR")) {
                this.messageOfTheDay = message.content.split("e!motd set ")[1];
                this.messageOfTheAuthor = message.author.username;
                message.channel.send("MOTD Set! <:exFellingNice:662442040407359489>");
            } else {
                message.channel.send(
                    "No Permission to do that bro... <:ExLmao:700806104644583424>"
                );
            }
        } else {
            const emb = new Discord.MessageEmbed()
                .setColor("#9e0000")
                .setTitle("Message of the day:")
                .addField(this.messageOfTheDay, "by " + this.messageOfTheAuthor)
                .setTimestamp()
                .setFooter(message.member.displayName, message.author.avatarURL());
            message.channel.send(emb);
        }
    }

    static Play(message) {
        if (message.member.voice.channel != null) {
            var url = message.content.split("e!play ")[1];
            if (validURL(url)) {
                Player.addNewSong(url, message.author.username, message);
                message.channel.send(":white_check_mark: Added to queue!");
            }
        }
        else {
            message.channel.send("Connect to voice channel first!");
        }
    }

    static Queue(message) {
        if (Player.index != -1) {
            var emd3 = new Discord.MessageEmbed();
            Player.queue.forEach((element, index) => {
                if (index > Player.index - 1)
                    emd3.addField(" |Youtube| ", element);
            });
            emd3.setTitle("Queue for Exe Empire:");
            emd3.setTimestamp();
            emd3.setFooter(message.member.displayName, message.author.avatarURL());
            message.channel.send(emd3);
        } else {
            message.channel.send("No queue for Exe Empire!");
        }
    }

    static Repeat(message) {
        if (message.member.voice.channel != null) {
            Player.loop = !Player.loop;
            if (Player.loop) {
                message.channel.send("Music is repeating now!");
            } else {
                message.channel.send("Music is not repeating anymore.");
            }
        }
    }
}

class SpamMember {
    constructor(elapsed, a) {
        this.enoughTimeElapsed = elapsed;
        this.kick = false;
        this.counter = a;
    }
}

module.exports = Commands;
