const {
    Client,
    PermissionOverwrites,
    MessageEmbed,
    Collection,
    Guild,
} = require('discord.js');

const Discord = require('discord.js');

module.exports = {
    name: 'ROLES',
    description: "Allows Users to Assign and Manage their Roles",
    execute(message,args,sender){

        var rolesComplete = false;
        
        const config = require("../SetUp.json");
            
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
        const tinkererID = config.tinkererID;

        const filter = (reaction, user) => ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
        
        if(message.guild === null)
        {
            message.author.send("Error: 005").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.author.send("You currently aren't in a server...").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.author.send("Please refrain from using commands within Direct-Messages...").then(d_msg => {d_msg.delete({timeout: 20000}); });
            return;
        }

        if(message.guild !== null)
        {
            const yearEmbed = new Discord.MessageEmbed()
            const sectionEmbed = new Discord.MessageEmbed()
            CreateEmbed(yearEmbed,"Please Select Your Year", "blue", "1️⃣ - First Year\n\n2️⃣ - Second Year\n\n3️⃣ - Third Year");
            message.channel.send(yearEmbed).then(async msg => {
                msg.react('1️⃣').then();
                msg.react('2️⃣').then();
                msg.react('3️⃣').then();
                YearCollection(msg);
            })
            CreateEmbed(sectionEmbed,"Please Select Your Section", "blue", "1️⃣ - Section One\n\n2️⃣ - Section Two");
            message.channel.send(sectionEmbed).then(async msg => {
                msg.react('1️⃣').then();
                msg.react('2️⃣').then();
                SectionCollection(msg);
            })
        }
        
        else
        {
            message.reply("Invalid Command! Please Consult the Documentation...").then(d_msg => {d_msg.delete({timeout: 3000}); });
            message.delete({timeout: 3000});
            return;
        }

        //Functional Decomposition

        function YearCollection(msg){
            msg.awaitReactions(filter, {
                max: 1
            }).then(collected =>{
                const reaction = collected.first()
                switch(reaction.emoji.name){
                    case '1️⃣':
                        RoleAssignment(yearOneID, "FIRST YEAR");
                        break;
                    case '2️⃣':
                        RoleAssignment(yearTwoID, "SECOND YEAR");
                        break;
                    case '3️⃣':
                        RoleAssignment(yearThreeID, "THIRD YEAR");
                        break;
                }
            }).catch(collected => {
                console.log(collected)
                return message.channel.send('Roles: (Errors) No Reactions Provided...')
            });
        }

        function SectionCollection(msg){
            msg.awaitReactions(filter, {
                max: 1
            }).then(collected =>{
                const reaction = collected.first()
                switch(reaction.emoji.name){
                    case '1️⃣':
                        RoleAssignment(sectionOneID, "SECTION ONE");
                        break;
                    case '2️⃣':
                        RoleAssignment(sectionTwoID, "SECTION TWO");
                        break;
                }
                rolesComplete = true;
            }).catch(collected => {
                console.log(collected)
                return message.channel.send('Roles: (Errors) No Reactions Provided...')
            });
        }

        function RoleAssignment(roleID, role){
            message.member.roles.add(roleID);
            message.reply(`You've been assigned the '${role}' role...`).then(d_msg => {d_msg.delete({timeout: 3000}); });
            if(rolesComplete){
                message.author.send("You have confirmed your default roles. The role 'BLINDED' has now been removed.").then(d_msg => {d_msg.delete({timeout: 20000}); });
                message.member.roles.remove(blindedID);
                rolesComplete = false;
            }
            message.delete({timeout: 3000});
        }

        function CreateEmbed(embed,title, color, description){
            embed.setTitle(title);
            embed.setColor(color.toUpperCase());
            embed.setDescription(description);
        }
    }
}