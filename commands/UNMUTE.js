module.exports = {
    name: 'UNMUTE',
    description: "Un-Mutes all the students in a specific channel.",
    execute(message){

        const config = require("../SetUp.json");    

        const DMID = config.DMID;
        const GMID = config.GMID;
        const PREFIX = config.prefix;

        const blindedID = config.blindedID;
        const everyoneID = config.everyoneID;
        const adminID = config.adminID;
        const teacherRoleID = config.teacherRoleID
        const studentModID = config.studentModID
        const confirmedID = config.confirmedID
        const sectionOneID = config.sectionOneID
        const sectionTwoID = config.sectionTwoID
        const yearOneID = config.yearOneID
        const yearTwoID = config.yearTwoID
        const yearThreeID = config.yearThreeID
        const alumniID = config.alumniID
        const tinkererID = config.tinkererID;

        if(message.guild === null)
            {
                message.author.send("Error: 005").then(d_msg => {d_msg.delete({timeout: 20000}); });
                message.author.send("You currently aren't in a server...").then(d_msg => {d_msg.delete({timeout: 20000}); });
                message.author.send("Please refrain from using commands within Direct-Messages...").then(d_msg => {d_msg.delete({timeout: 20000}); });
                message.delete({timeout: 1000});
                break;
            }
            if(!sender.roles.cache.has(teacherRoleID) && !sender.roles.cache.has(adminID))
            {
                message.author.send("Error: 001").then(d_msg => {d_msg.delete({timeout: 20000}); });
                message.author.send("You need to have to have the role: Teacher or Administrator").then(d_msg => {d_msg.delete({timeout: 20000}); });
                message.author.send("If you feel you don't have the correct role, please contact a server administrator").then(d_msg => {d_msg.delete({timeout: 20000}); });
                message.delete({timeout: 1000}); //Deletes User Message...
                break;
            }
            else if(!message.member.voice.channel)
            {
                message.author.send("Error: 002").then(d_msg => {d_msg.delete({timeout: 20000}); });
                message.author.send("You need to be in a voice channel in order to use this command!").then(d_msg => {d_msg.delete({timeout: 20000}); });
                message.delete({timeout: 1000});
                break;
            }
            else if(sender.voice.channel !== null)
            {
                const temp = sender.voice.channel.members.filter(function(member) { return !member.roles.cache.has(teacherRoleID) && !member.roles.cache.has(adminID); });
                console.log(temp);
                temp.every(function(member) { member.voice.setMute(false, "Teacher has unmuted you"); return true; /*console.log(member);*/ });
                temp.every(function(member) { member.send("Warning: A Teacher has UNMUTED you!"); return true;});
                message.reply("Students have been officially UNMUTED...").then(d_msg => {d_msg.delete({timeout: 3000}); });
                message.delete({timeout: 1000});
                break;
            }
            break;
    }
}