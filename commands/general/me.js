const users = require('@database/services/users')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    category: 'about',
    description: 'Show your stats.',
    callback: async ({ client ,msg }) => {
        const user = await users.findOne(msg.senderNumber)
        let texts = `
User Number : ${user.user_jid}
User Limit : ${user.user_limit}
User Level : Lv. ${user.user_level}
User Exp : ${user.user_exp} XP
User Premium : ${user.user_premium ? 'Yes' : 'No'}
User Registered At : ${user.user_create_at}
`
return client.sendMessage(msg.from, {
    texts,
    footer: `© ${config.botName}`,
    title: `${config.botName} Help`,
    templateButtons: [
        { index: 1, quickReplyButton: { displayText: 'Cek Profil Saya', id: prefix + 'myprofile' } },
    ],
    viewOnce: true,
    mentions: [msg.sender],
})
    },
}
