const { EmailClient } = require("@azure/communication-email");
 
const connectionString = process.env['endpoint=https://abcallmessage.unitedstates.communication.azure.com/;accesskey=BJqYSH8YXOBofNeXuPRc8p4b60nApOxDqV3MwyKbyDSmUB8kSVmmJQQJ99AJACULyCpr9LF1AAAAAZCSlH24'];
const client = new EmailClient(connectionString);
 
async function main() {
    const emailMessage = {
        senderAddress: "DoNotReply@24ee64cf-5c96-45cd-9d96-4141f7f7123f.azurecomm.net",
        content: {
            subject: "Correo electrónico de prueba",
            plainText: "Hola mundo por correo electrónico.",
            html: `
<html>
<body>
<h1>Hola mundo por correo electrónico.</h1>
</body>
</html>`,
        },
        recipients: {
            to: [{ address: "Juanfe2898@gmail.com" }],
        },
    };
 
    const poller = await client.beginSend(emailMessage);
    const result = await poller.pollUntilDone();
}
 
main();