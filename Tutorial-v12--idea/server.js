const discord = require("discord.js");
const fs = require("fs");
const bot = new discord.Client();
const { Client } = require('pg');
const botconfig = require("../botconfig.json");
const moment = require("moment");
const ms = require('parse-ms');

bot.on("ready", async() => {
  const channel = bot.channels.cache.get(`701667050694639727`);
  if (channel) {
    const fetchedChannels = [channel];
    fetchedChannels.forEach(c => {
      c.messages.fetch(`725295846387613788`);
    })
  }
})

bot.on("messageReactionAdd", async (messageReaction, user) => {
  let message = messageReaction.message;
  let guildoff = bot.guilds.cache.get(`694748513371816008`);
  if(message.guild.id != guildoff.id) return;
  if(message.channel.id != "701667050694639727") return;
  if(messageReaction.emoji.id === "720728668485189768"){
    let member = message.guild.members.cache.get(user.id)
    let role = message.guild.roles.cache.get(`694748513371816009`)
    member.roles.add(role)
    let embed = new discord.MessageEmbed()
    .setTitle(`Выдача роли`)
    .setDescription(`**Вам была выдана роль \`${role.name}\` на сервере \`${message.guild.name}\`**`)
    .setThumbnail(member.user.avatarURL({format: 'png', dynamic: true, size: 1024}))
    .setTimestamp();
    member.send(embed);
  }
})

bot.on("messageReactionRemove", async (messageReaction, user) => {
  let message = messageReaction.message;
  let guildoff = bot.guilds.cache.get(`694748513371816008`);
  if(message.guild.id != guildoff.id) return;
  if(message.channel.id != "701667050694639727") return;
  if(messageReaction.emoji.id === "720728668485189768"){
    let member = message.guild.members.cache.get(user.id)
    let role = message.guild.roles.cache.get(`694748513371816009`)
    member.roles.remove(role)
    let embed = new discord.MessageEmbed()
    .setTitle(`Снятие роли`)
    .setDescription(`**Вам была снята роль \`${role.name}\` на сервере \`${message.guild.name}\`**`)
    .setThumbnail(member.user.avatarURL({format: 'png', dynamic: true, size: 1024}))
    .setTimestamp();
    member.send(embed);
  }
})

bot.on("message", async (message) => {
  if (message.author.bot) return;//Если автор другой бот - нет.
  if (message.channel.type == "dm") return;//Если команда в личку - нет.
  if (message.guild.id != "694748513371816008") return;//Проверяем сервер
  let channelidea = bot.channels.cache.get(`701683705508266014`)
  if(message.channel.id === channelidea.id){
    message.delete();//Удаляем сообщение
    let embed = new discord.MessageEmbed()
    .setTitle(`Идея от ${message.author.tag}`)
    .setDescription(`**Суть идеи: \`${message.content}\`**`)
    .addField(`**Описание смайликов**`, `**👍 - хорошая идея\n\n👎 - плохая идея**`)
    .setThumbnail(message.author.avatarURL({format: 'png', dynamic: true, size: 1024}))
    .setTimestamp();
    channelidea.send("**Внимание! <@&701686578124423208> была предложена новая идея, рассмотрите её**", embed).then(async(msg) => {
      await msg.react("👍");
      await msg.react("👎");
    });
  }
});

bot.login(botconfig.tokendcd)
