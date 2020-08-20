module.exports = {
    name: 'PURGE',
    description: "Allows Mods and Users to Mass-Delete Messages",
    execute(message,args,sender){
        
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
            return;
        }
        
        else if(!sender.roles.cache.has(adminID) && !sender.roles.cache.has(teacherRoleID) && !sender.roles.cache.has(studentModID))
        {
            message.reply("Error: Please check Direct Messages for more information...").then(d_msg => {d_msg.delete({timeout: 3000}); });
            message.delete({timeout: 3000});
            message.author.send("Error: 001").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.author.send("You need to have to have the role: ADMIN").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.author.send("If you feel you don't have the correct role, please contact a server administrator").then(d_msg => {d_msg.delete({timeout: 20000}); });
            return;
        }
        
        else if(!args[1]) 
        {
            message.reply("Invalid Quantity! Please enter the amount of messages you would like to delete").then(d_msg => {d_msg.delete({timeout: 3000}); });
            message.delete({timeout: 3000});
            return;
        }
            
        else if(args[1] > 100)
        {
            message.author.send("Error: 003").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.author.send("You can only delete up to 100 messages at a time...").then(d_msg => {d_msg.delete({timeout: 20000}); });
            return;
        } 

        else if(args[1] <= 100)
        {
            message.channel.bulkDelete(args[1]);
            message.channel.send(args[1] + " messages have been deleted...").then(d_msg => {d_msg.delete({timeout: 3000}); });
            return;
        }
            
        else
        {
            message.reply("Error: Invalid Use Of Command - Please Check Documentation for more Information!").then(d_msg => {d_msg.delete({timeout: 3000}); });
            message.delete({timeout: 3000});
            return;
        }
    }
}