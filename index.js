const fs = require('fs');

const {
    Client,
    Discord,
    PermissionOverwrites,
    MessageEmbed,
    Collection,
    Guild
} = require('discord.js');

const config = require("./SetUp.json");
const ROLES = require('./commands/ROLES');

const DMID = config.DMID;
const GMID = config.GMID;
const PREFIX = config.prefix;

const blindedID = config.blindedID;
const everyoneID = config.everyoneID;
const adminID = config.adminID;
const teacherRoleID = config.teacherRoleID
const yearOneModID =  config.yearOneModID
const yearTwoModID = config.yearTwoModID
const yearThreeModID = config.yearThreeModID
const confirmedID = config.confirmedID
const sectionOneID = config.sectionOneID
const sectionTwoID = config.sectionTwoID
const yearOneID = config.yearOneID
const yearTwoID = config.yearTwoID
const yearThreeID = config.yearThreeID
const alumniID = config.alumniID

const token = config.token;

var version = '1.0';
var releaseDate = '08/20/2020';

const bot = new Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on('ready', async () =>{
    console.log(`JAC [Bot] is now ready for use.`);
    console.log(`\nStable - Version: ${version} - ${releaseDate}\n`);
    bot.user.setActivity(`Version: ${version}`, {type: "STREAMING"});
    console.log("Waiting for Command Prompts...\n\n")
})

//Partial v Non-Partial Template (Meant for finding the specific reaction in order to decide what to do with it)

/*bot.on('messageReactionAdd', async(reaction,user) =>{
    let guildUser = reaction.message.guild.members.cache.get(user.id);
    if(user.bot)
        return;
    try{
        if(reaction.message.partial)
            reaction.message.fetch().then();
    } catch (error){
        console.log(`Error: ${error}`);
    }
    if(reaction.message.id === '745477668245471292'){
        reaction.message.reactions.cache.forEach((react) => {
            if (react.users.cache.get(user.id) != null) {
                switch(react.emoji.name){
                    case '1️⃣':
                        if(guildUser.roles.cache.has(yearOneID)){
                            guildUser.send("You've already been assigned the FIRST YEAR role.").then(d_msg => {d_msg.delete({timeout: 20000}); });
                            break;
                        }
                        else{
                            guildUser.roles.add(yearOneID);
                            guildUser.roles.remove(blindedID);
                            guildUser.send("You've been assigned the FIRST YEAR role!").then(d_msg => {d_msg.delete({timeout: 20000}); });
                            guildUser.send("You have confirmed your default roles. The role 'BLINDED' has now been removed.").then(d_msg => {d_msg.delete({timeout: 20000}); });
                            break;
                        }
                    case '2️⃣':
                        if(guildUser.roles.cache.has(yearTwoID)){
                            guildUser.send("You've already been assigned the SECOND YEAR role.").then(d_msg => {d_msg.delete({timeout: 20000}); });
                            break;
                        }
                        else{
                            guildUser.roles.add(yearTwoID);
                            guildUser.roles.remove(blindedID);
                            guildUser.send("You've been assigned the SECOND YEAR role!").then(d_msg => {d_msg.delete({timeout: 20000}); });
                            guildUser.send("You have confirmed your default roles. The role 'BLINDED' has now been removed.").then(d_msg => {d_msg.delete({timeout: 20000}); });
                            break;
                        }
                    case '3️⃣':
                        if(guildUser.roles.cache.has(yearThreeID)){
                            guildUser.send("You've already been assigned the THIRD YEAR role.").then(d_msg => {d_msg.delete({timeout: 20000}); });
                            break;
                        }
                        else{
                            guildUser.roles.add(yearThreeID);
                            guildUser.roles.remove(blindedID);
                            guildUser.send("You've been assigned the THIRD YEAR role!").then(d_msg => {d_msg.delete({timeout: 20000}); });
                            guildUser.send("You have confirmed your default roles. The role 'BLINDED' has now been removed.").then(d_msg => {d_msg.delete({timeout: 20000}); });
                            break;
                        }
                }
            }
        })
    }

    else if(reaction.message.id === "745477668509712398"){
        reaction.message.reactions.cache.forEach((react) => {
            if (react.users.cache.get(user.id) != null) {
                switch(react.emoji.name){
                case '1️⃣':
                    if(guildUser.roles.cache.has(sectionOneID)){
                        guildUser.send("You've already been assigned the SECTION ONE role.").then(d_msg => {d_msg.delete({timeout: 20000}); });
                        break;
                    }
                    else{
                        guildUser.roles.add(sectionOneID);
                        guildUser.roles.remove(blindedID);
                        guildUser.send("You've been assigned the SECTION ONE role!").then(d_msg => {d_msg.delete({timeout: 20000}); });
                        guildUser.send("You have confirmed your default roles. The role 'BLINDED' has now been removed.").then(d_msg => {d_msg.delete({timeout: 20000}); });
                        break;
                    }
                case '2️⃣':
                    if(guildUser.roles.cache.has(sec)){
                        guildUser.send("You've already been assigned the SECOND YEAR role.").then(d_msg => {d_msg.delete({timeout: 20000}); });
                        break;
                    }
                    else{
                        guildUser.roles.add(yearTwoID);
                        guildUser.roles.remove(blindedID);
                        guildUser.send("You've been assigned the SECOND YEAR role!").then(d_msg => {d_msg.delete({timeout: 20000}); });
                        guildUser.send("You have confirmed your default roles. The role 'BLINDED' has now been removed.").then(d_msg => {d_msg.delete({timeout: 20000}); });
                        break;
                    }
                }
    }
})*/

bot.on("guildMemberAdd", function(member)
{
    member.send("Welcome to JAC-CS");
    member.send("https://discord.gg/GS4PYj3");
    member.send("Please Open the Official Server to Continue...");
    member.send("Currently, you've been assigned the BLINDED role, therefore you won't be able to use the server until assigning yourself your base roles...");

    let blindedID = member.guild.roles.find("name", "Blinded");
    member.roles.add(blindedID)
});

bot.on('message', message =>{
    let args = message.content.toUpperCase().substring(PREFIX.length).split(" ");
    const sender = message.member;
    
    if(!message.content.startsWith(PREFIX))
        return;

    switch(args[0].toUpperCase())
    {
        case 'CREATE':
            bot.commands.get('CREATE').execute(message, args, sender);
            break;

        case 'PURGE':
            bot.commands.get('PURGE').execute(message, args, sender);
            break;

        case 'ROLES':
            bot.commands.get('ROLES').execute(message, args, sender);
            break;

        //Archived

        /*case 'DM':
            bot.commands.get('DM').execute(message, args, sender, bot);
            break;*/

        case 'MUTE':
            bot.commands.get('MUTE').execute(message, args, sender);
            break;

        case 'UNMUTE':
            bot.commands.get('UNMUTE').execute(message, args, sender);
            break;
            
        /*case 'REMIND': //To Be Implemented
            bot.commands.get('REMIND').execute(message,args, sender);
            break;

        case 'ATTENDANCE' //To Be Implemented
            bot.commands.get('ATTENDANCE).execute(message,args,sender);
            break;    
        */
        
        case 'HELP':
            bot.commands.get('HELP').execute(message,args,sender);
            break;
    }
})

bot.login(token);