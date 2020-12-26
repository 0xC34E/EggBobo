//help rand functions
const Discord = require("discord.js");
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //woaaah woah wooooooah wooah woooa uh woooo wooo woooah
  }
 
class Client 
{
    static setRandomStatus(client) 
    {
        var status = [
            "balls",
            "doing stuf)))",
            "nice bot lol",
            "omg!!!",
            "eggbobo",
            "type e!help bro...",
            "hander premium code $",
            "cool status bro",
            "bored",
            "cooked porkchop",
            "porked chopchop",
            "gameing",
            "$$$",
            "catbo$$",
            "abusing status"
        ];

        
        var index = getRandomInt(0, status.length - 1);
         client.user
            .setActivity(status[index] + " | e!help", {
                type: "STREAMING",
                url: "https://twitch.tv/analterminator"
            })
            .catch(console.error);
    }
}

module.exports = Client;
