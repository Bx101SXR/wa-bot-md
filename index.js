const { default: WASocket, fetchLatestBaileysVersion, DisconnectReason, useMultiFileAuthState } = require('@adiwajshing/baileys')
const Pino = require('pino')
const { sessionName } = require('./config.json')
const { Boom } = require('@hapi/boom')
const store = require('./store')
const { existsSync } = require('fs')
const fs = require('fs')
const { getBuffer } = require("./lib/function.js")
const path = require('path')
const messageHandler = require('./handler/message')

existsSync('./store/baileys_store.json') && store.readFromFile('./store/baileys_store.json')
setInterval(() => {
    store.writeToFile('./store/baileys_store.json')
}, 10000)

const connect = async () => {
    const { state, saveCreds } = await useMultiFileAuthState(path.resolve(`${sessionName}-session`), Pino({ level: 'silent' }))
    let { version, isLatest } = await fetchLatestBaileysVersion()

    console.log(`Using: ${version}, newer: ${isLatest}`)
    const sock = WASocket({
        printQRInTerminal: true,
        auth: state,
        logger: Pino({ level: 'silent' }),
        version,
    })
    store.bind(sock.ev)

    sock.ev.on('chats.set', () => {
        console.log('got chats', store.chats.all().length)
    })

    sock.ev.on('contacts.set', () => {
        console.log('got contacts', Object.values(store.contacts).length)
    })

    sock.ev.on('creds.update', saveCreds)
    sock.ev.on('connection.update', async (up) => {
        const { lastDisconnect, connection } = up
        if (connection) {
            console.log('Connection Status: ', connection)
        }

          if (connection) {
            console.log('Connection Status: ', connection)
        }


             if (connection === 'close') {
               
                lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? connect() : console.log('connection logged out...')
            
        }

    })

    // messages.upsert
    sock.ev.on('messages.upsert', ({ messages, type }) => {
        if (type !== 'notify') return
        messageHandler(sock, messages[0])
    })
	
		sock.ev.on('group-participants.update', async (anu) => {
        console.log(anu)
        try {
            let metadata = await sock.groupMetadata(anu.id)
			const welcome = JSON.parse(fs.readFileSync('./assets/welcome.json'))
			if(!welcome.includes(metadata.id)) return
            let participants = anu.participants
            for (let num of participants) {
                // Get Profile Picture User
                try {
                    ppuser = await sock.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }

                // Get Profile Picture Group
                try {
                    ppgroup = await sock.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }

               if (anu.action == 'add') {
                    sock.sendMessage(anu.id, { image: { url: `http://api.lolhuman.xyz/api/base/welcome?apikey=TAV1&img1=${ppuser}&img2=${ppgroup}&background=https://telegra.ph/file/e9e111de177581be079ba.jpg&username=@${num.split('@')[0]}&member=${metadata.participants.length}&groupname= ${metadata.subject}` }, contextInfo: { mentionedJid: [num] }, caption: `Welcome To ${metadata.subject} @${num.split("@")[0]}` })
                } else if (anu.action == 'remove') {
                    sock.sendMessage(anu.id, { image: { url: `http://api.lolhuman.xyz/api/base/leave?apikey=TAV1&img1=${ppuser}&img2=${ppgroup}&background=https://telegra.ph/file/e9e111de177581be079ba.jpg&username=${num.split('@')[0]}&member=${metadata.participants.length}&groupname= ${metadata.subject}` }, contextInfo: { mentionedJid: [num] }, caption: `@${num.split("@")[0]} Leaving To ${metadata.subject}` })
                }
            }
        } catch (err) {
            console.log(err)
        }
    })
	
	
}
connect()
