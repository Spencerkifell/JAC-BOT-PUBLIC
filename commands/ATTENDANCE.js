module.exports = {
    name: 'ATTENDANCE',
    description: "Allows Mods and Teachers to take Attendance of those in the Voice Channel",
    execute(message,args,sender){
        
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
        const studentModID = config.studentModID;

        if(message.guild === null)
        {
            message.author.send("Error: 005").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.author.send("You currently aren't in a server...").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.author.send("Please refrain from using commands within Direct-Messages...").then(d_msg => {d_msg.delete({timeout: 20000}); });
            return
        }
        
        else if(!sender.roles.cache.has(adminID) && !sender.roles.cache.has(teacherRoleID) && !sender.roles.cache.has(studentModID))
        {
            message.reply("Error: Please check Direct Messages for more information...").then(d_msg => {d_msg.delete({timeout: 3000}); });
            message.delete(3000);
            message.author.send("Error: 001").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.author.send("You need to have to have the role: Teacher or Administrator").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.author.send("If you feel you don't have the correct role, please contact a server administrator").then(d_msg => {d_msg.delete({timeout: 20000}); });
            return
        }
        
        else if(!message.member.voice.channel)
        {
            message.author.send("Error: 002").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.author.send("You need to be in a voice channel in order to use this command!").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.delete(1000); //Deletes User Message...
            return;
        }
        
        else 
        {
            message.author.send("Student Attendance Sheet: (Every Student on this List Is Marked Present)");
            message.channel.send("ATTENDANCE is officially being taken").then(d_msg => {d_msg.delete({timeout: 20000}); });
            const temp = sender.voiceChannel.members.filter(function(member) { return !member.roles.has(teacherRoleID); });
            //console.log(temp);
            temp.every(function(member) { member.send("You've been marked PRESENT for your attendance!"); member.send("If you're in another section please make sure to let the teacher know...");});
            temp.every(function(member) { message.author.send("Name: " + member.displayName);});
            message.channel.send("Attendance Complete! If you haven't received confirmation of your attendance, please contact your teacher.").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.delete(1000); //Deletes User Message...
            break;
        }
    }
}