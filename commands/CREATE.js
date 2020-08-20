module.exports = {
    name: 'CREATE',
    description: "Allows Mods and Users to Create Text and Voice Channels",
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
            return;
        }
        
        else if(!sender.roles.cache.has(adminID) && !sender.roles.cache.has(teacherRoleID) && !sender.roles.cache.has(studentModID))
        {
            message.author.send("Error: 001").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.author.send("You need to have to have the role: ADMIN").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.author.send("If you feel you don't have the correct role, please contact a server administrator").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.delete({timeout: 1000});
            return;
        }
            
        else if(!args[1])
        {
            message.reply("Parameter can't be empty! Please include the type of channel!").then(d_msg => {d_msg.delete({timeout: 3000}); });
            message.delete({timeout: 3000});
            return;
        }
            
        else if(!args[2])
        {
            message.reply("Parameter can't be empty! Please include the name of the channel!").then(d_msg => {d_msg.delete({timeout: 3000}); });
            message.delete({timeout: 3000});
            return;
        }
        
        else if(args[1].toUpperCase() === "VC")
        {
            message.guild.channels.create(args[2], {type: 'voice'});
            message.reply("Voice Channel: " + args[2] + " created!").then(d_msg => {d_msg.delete({timeout: 3000}); });
            message.delete({timeout: 3000});
            return;
        }
        
        else if(args[1].toUpperCase() === "TC")
        {
            message.guild.channels.create(args[2], {type: 'text'});
            message.reply("Text Channel: " + args[2] + " created!").then(d_msg => {d_msg.delete({timeout: 3000}); });
            message.delete({timeout: 3000});
            return;
        }
        
        else
        {
            message.reply("Invalid Use of Command!").then(d_msg => {d_msg.delete({timeout: 3000}); });
            message.delete({timeout: 3000});
            return;
        }
    }
}