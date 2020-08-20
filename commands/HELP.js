module.exports = {
    name: 'HELP',
    description: "Sends the Bots Documentation to the User",
    execute(message){
        
        if(message.guild === null)
        {
            message.author.send("Error: 005").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.author.send("You currently aren't in a server...").then(d_msg => {d_msg.delete({timeout: 20000}); });
            message.author.send("Please refrain from using commands within Direct-Messages...").then(d_msg => {d_msg.delete({timeout: 20000}); });
            return;
        }
        else
        {
            message.reply("I've sent you some documentation on all the commands that you can use...").then(d_msg => {d_msg.delete({timeout: 3000}); });
            message.delete({timeout: 3000});
            message.author.send('JAC [BOT] - Documentation');
            message.author.send({
                files: [{
                attachment: './JACBOT_DOCUMENTATION.pdf',
                name: 'JACBOT_DOCUMENTATION.pdf'
                }]
            }).then(d_msg => {d_msg.delete({timeout: 25000}); });
            return;
        }
    }
}