const http = require("http");
const ytdl = require("ytdl-core");
const Discord = require("discord.js");

class QueueMember {
  url = "";
  author = "";
  channel = null;

  constructor(url, author, channel) {
    this.url = url;
    this.author = author;
    this.channel = channel;
  }
}

class Player {
   
  static index = -1;
  static queue = [];
  static loop = false;
  static currentVoiceChannel = null;
  static playMusic(msg,connection) {
    if (this.index >= this.queue.length) //if end of queue
    {
      connection.disconnect(); //disconnecting from voice channel
    }
    else {
      
      msg.channel.send(
        "Now playing: " +
        this.queue[this.index].url +
        ". Requested by: " +
        this.queue[this.index].author
      ); //Send message

      const dispatcher = connection.play(ytdl(this.queue[this.index].url, {filter : 'audioonly'}));
      dispatcher.on("finish", ()=>
      {
        this.playNext(msg,connection);
      });
    }
  }

  static addNewSong(url, author, message) {
    var voicechannel = message.member.voice.channel;  
    if (this.index == -1) {
      this.index = 0;
      this.queue.push(new QueueMember(url, author, voicechannel));
      this.currentVoiceChannel = voicechannel;
      voicechannel.join().then(con => {
         this.playMusic(message,con);
      });
      
    }
    else
    {  
      this.queue.push(new QueueMember(url, author, voicechannel));
    }
  }

  //Play next music function suff
  static playNext(msg,connection) {
    if (!this.loop)
    this.index++;
    this.playMusic(msg,connection);
  }

}

module.exports = Player;
