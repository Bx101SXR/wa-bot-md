/**
 *
 * @param { string } prefix
 */
exports.help = (prefix, salam, time) => {
return `

1. INFORMATION-MENU
Ketik *${prefix}owner*
Ketik *${prefix}rules*
Ketik *${prefix}donate*
Ketik *${prefix}sewa*
Ketik *${prefix}allmenu*
Ketik *${prefix}botgroup*
❏ Info: menmenampilkan Informasi 

2. OWNER-MENU
├ ❏ > evaluate
├ ❏ $ exec
├ ❏ *${prefix}join link*
├ ❏ *${prefix}leave* <groupId>
├ ❏ *${prefix}setppbot* (reply/send image)
├ ❏ *${prefix}delrespon*
├ ❏ *${prefix}delcmd*
❏ info: Ini khusus yang punya bot:v

3. _SYSTEM-MENU_
├ ❏ *${prefix}allmenu*
├ ❏ *${prefix}delete* (reply pesan)
├ ❏ *${prefix}runtime*
├ ❏ *${prefix}speed*
├ ❏ *${prefix}botstatus*
├ ❏ *${prefix}addrespon*
├ ❏ *${prefix}addcmd*
❏ Info: menmenampilkan Informasi 

4. _GROUP-MENU_
├ ❏ *${prefix}revoke*
├ ❏ *${prefix}add number*
├ ❏ *${prefix}kick tag/reply*
├ ❏ *${prefix}promote tag/reply*
├ ❏ *${prefix}demote tag/reply*
├ ❏ *${prefix}leave*
├ ❏ *${prefix}group open/close*
├ ❏ *${prefix}tagall text*
├ ❏ *${prefix}hidetag text*
├ ❏ *${prefix}welcome 1/0*
├ ❏ *${prefix}nsfw 1/0*
❏ Info: Menampilkan Menu untuk group

5. _ANIME-MENU_
├ ❏ *${prefix}anime query*
├ ❏ *${prefix}manga query*
├ ❏ *${prefix}character query*
├ ❏ *${prefix}elf*
├ ❏ *${prefix}loli*
├ ❏ *${prefix}waifu*
├ ❏ *${prefix}husbu*
├ ❏ *${prefix}neko*
├ ❏ *${prefix}shota*
├ ❏ *${prefix}sagiri*
├ ❏ *${prefix}shinobu
├ ❏ *${prefix}megumin*
├ ❏ *${prefix}wait*
├ ❏ *${prefix}wallnime*
├ ❏ *${prefix}kusonime link*
├ ❏ *${prefix}kusonimesearch*
├ ❏ *${prefix}otakudesu link*
├ ❏ *${prefix}otakudesusearch*
❏ Info: Menampilkan Anime menu

6. _SEARCH-MENU_
├ ❏ *${prefix}ytsearch query*
├ ❏ *${prefix}film query*
├ ❏ *${prefix}lirik query*
├ ❏ *${prefix}wattpad query*
├ ❏ *${prefix}webtoons query*
├ ❏ *${prefix}drakor query*
├ ❏ *${prefix}pinterest query*
├ ❏ *${prefix}pinterest2 query*
├ ❏ *${prefix}pinterestdl query*
├ ❏ *${prefix}pixiv query*
├ ❏ *${prefix}pixivdl id*
├ ❏ *${prefix}gcsearch query*
├ ❏ *${prefix}igstalk username*
├ ❏ *${prefix}spotifysearch query*
├ ❏ *${prefix}jooxplay query*
├ ❏ *${prefix}gimage query*
├ ❏ *${prefix}gimage2 query*
├ ❏ *${prefix}wallpapersearch2 query*
├ ❏ *${prefix}playstore query*
├ ❏ *${prefix}shopee query*
├ ❏ *${prefix}google query*
❏ info: Pencarian untuk Menemukan

7. _MEDIA-MENU_
├ ❏ *${prefix}toimg* (reply sticker)
├ ❏ *${prefix}tomp3* (reply video)
├ ❏ *${prefix}sticker* (send/reply image/video)
├ ❏ *${prefix}stickerwm* (send/reply image/video)
├ ❏ *${prefix}ocr* (send/reply image)
├ ❏ *${prefix}telesticker*
├ ❏ *${prefix}ttp*
├ ❏ *${prefix}attp*
❏ Info: Membuat sticker dan sebagainya

8. _MAKER-MENU_
├ ❏ *${prefix}carbon code*
├ ❏ *${prefix}quotemaker*
├ ❏ *${prefix}comictext*
├ ❏ *${prefix}hekerlogo*
├ ❏ *${prefix}graffiti*
├ ❏ *${prefix}glowtext*
├ ❏ *${prefix}covertext*
├ ❏ *${prefix}narutotext*
├ ❏ *${prefix}erodedtext*
├ ❏ *${prefix}walltext*
├ ❏ *${prefix}vietteltext*
├ ❏ *${prefix}wingstext*
├ ❏ *${prefix}halloween*
├ ❏ *${prefix}graffiti2*
├ ❏ *${prefix}graffiti3*
├ ❏ *${prefix}foiltext*
├ ❏ *${prefix}bloodtext*
├ ❏ *${prefix}hekertext*
├ ❏ *${prefix}bokehtext*
├ ❏ *${prefix}carbontext*
├ ❏ *${prefix}avengerstext*
├ ❏ *${prefix}watertext*
├ ❏ *${prefix}firetext*
├ ❏ *${prefix}metaltext*
├ ❏ *${prefix}ballontext*
├ ❏ *${prefix}gemboktext*
├ ❏ *${prefix}bannerff*
├ ❏ *${prefix}aloklogo*
├ ❏ *${prefix}miyalogo*
├ ❏ *${prefix}gamelogo*
├ ❏ *${prefix}blackpink*
├ ❏ *${prefix}thundername*
├ ❏ *${prefix}silktext*
├ ❏ *${prefix}partytext*
├ ❏ *${prefix}romancetext*
├ ❏ *${prefix}googletext*
├ ❏ *${prefix}glowtext2*
├ ❏ *${prefix}lovemessage*
├ ❏ *${prefix}glitchtext*
├ ❏ *${prefix}galaxytext*
├ ❏ *${prefix}pornhub*
├ ❏ *${prefix}hartatahta*
├ ❏ *${prefix}wetglass*
├ ❏ *${prefix}stylelogo*
├ ❏ *${prefix}watercolor*
├ ❏ *${prefix}qrcode*
├ ❏ *${prefix}barcode*
├ ❏ *${prefix}naruto*
├ ❏ *${prefix}breakwall*
├ ❏ *${prefix}matrix*
├ ❏ *${prefix}blueneon*
├ ❏ *${prefix}crosslogo*
├ ❏ *${prefix}flowertext*
├ ❏ *${prefix}wolflogo*
├ ❏ *${prefix}dropwater*
├ ❏ *${prefix}crosslogo*
├ ❏ *${prefix}crosslogo*
├ ❏ *${prefix}slapimage*
├ ❏ *${prefix}phkomen*
├ ❏ *${prefix}emoji*
├ ❏ *${prefix}silktext*
├ ❏ *${prefix}flametext*
├ ❏ *${prefix}retrotext*
├ ❏ *${prefix}lighttext*
├ ❏ *${prefix}cslogo*
├ ❏ *${prefix}skytext*
├ ❏ *${prefix}pubglogo*
├ ❏ *${prefix}smoketext*
├ ❏ *${prefix}glowtext*
├ ❏ *${prefix}glitchtext*
├ ❏ *${prefix}textlight*
├ ❏ *${prefix}leavestext*
├ ❏ *${prefix}bplogo*
├ ❏ *${prefix}phlogo*
├ ❏ *${prefix}text3d*
├ ❏ *${prefix}text3dbox*
├ ❏ *${prefix}splaybutton*
├ ❏ *${prefix}gplaybutton*
├ ❏ *${prefix}epep*
├ ❏ *${prefix}sandwrite*
├ ❏ *${prefix}firework*
├ ❏ *${prefix}watercolor*
├ ❏ *${prefix}snowwrite*
├ ❏ *${prefix}crismes*
├ ❏ *${prefix}blackpink text*
├ ❏ *${prefix}neon text*
├ ❏ *${prefix}greenneon text*
├ ❏ *${prefix}advanceglow text*
├ ❏ *${prefix}futureneon text*
├ ❏ *${prefix}sandwriting text*
├ ❏ *${prefix}sandsummer text*
├ ❏ *${prefix}sandengraved text*
├ ❏ *${prefix}metaldark text*
├ ❏ *${prefix}neonlight text*
├ ❏ *${prefix}holographic text*
├ ❏ *${prefix}text1917 text*
├ ❏ *${prefix}minion text*
├ ❏ *${prefix}deluxesilver text*
├ ❏ *${prefix}newyearcard text*
├ ❏ *${prefix}bloodfrosted text*
├ ❏ *${prefix}halloween text*
├ ❏ *${prefix}jokerlogo text*
├ ❏ *${prefix}fireworksparkle text*
├ ❏ *${prefix}natureleaves text*
├ ❏ *${prefix}bokeh text*
├ ❏ *${prefix}toxic text*
├ ❏ *${prefix}strawberry text*
├ ❏ *${prefix}box3d text*
├ ❏ *${prefix}roadwarning text*
├ ❏ *${prefix}breakwall text*
├ ❏ *${prefix}icecold text*
├ ❏ *${prefix}luxury text*
├ ❏ *${prefix}cloud text*
├ ❏ *${prefix}summersand text*
├ ❏ *${prefix}horrorblood text*
├ ❏ *${prefix}thunder text*
├ ❏ *${prefix}pornhub text1 text2*
├ ❏ *${prefix}glitch text1 text2*
├ ❏ *${prefix}avenger text1 text2*
├ ❏ *${prefix}space text1 text2*
├ ❏ *${prefix}ninjalogo text1 text2*
├ ❏ *${prefix}marvelstudio text1 text2*
├ ❏ *${prefix}lionlogo text1 text2*
├ ❏ *${prefix}wolflogo text1 text2*
├ ❏ *${prefix}steel3d text1 text2*
├ ❏ *${prefix}wallgravity text1 text2*
├ ❏ *${prefix}shadow text*
├ ❏ *${prefix}cup text*
├ ❏ *${prefix}cup1 text*
├ ❏ *${prefix}romance text*
├ ❏ *${prefix}smoke text*
├ ❏ *${prefix}burnpaper text*
├ ❏ *${prefix}lovemessage text*
├ ❏ *${prefix}undergrass text*
├ ❏ *${prefix}love text*
├ ❏ *${prefix}coffe text*
├ ❏ *${prefix}woodheart text*
├ ❏ *${prefix}woodenboard text*
├ ❏ *${prefix}summer3d text*
├ ❏ *${prefix}wolfmetal text*
├ ❏ *${prefix}nature3d text*
├ ❏ *${prefix}underwater text*
├ ❏ *${prefix}golderrose text*
├ ❏ *${prefix}summernature text*
├ ❏ *${prefix}letterleaves text*
├ ❏ *${prefix}glowingneon text*
├ ❏ *${prefix}fallleaves text*
├ ❏ *${prefix}flamming text*
├ ❏ *${prefix}harrypotter text*
├ ❏ *${prefix}carvedwood text*
├ ❏ *${prefix}tiktok text1 text2*
├ ❏ *${prefix}arcade8bit text1 text2*
├ ❏ *${prefix}battlefield4 text1 text2*
├ ❏ *${prefix}pubg text1 text2*
├ ❏ *${prefix}wetglass text*
├ ❏ *${prefix}multicolor3d text*
├ ❏ *${prefix}watercolor text*
├ ❏ *${prefix}luxurygold text*
├ ❏ *${prefix}galaxywallpaper text*
├ ❏ *${prefix}lighttext text*
├ ❏ *${prefix}beautifulflower text*
├ ❏ *${prefix}puppycute text*
├ ❏ *${prefix}royaltext text*
├ ❏ *${prefix}heartshaped text*
├ ❏ *${prefix}birthdaycake text*
├ ❏ *${prefix}galaxystyle text*
├ ❏ *${prefix}hologram3d text*
├ ❏ *${prefix}greenneon text*
├ ❏ *${prefix}glossychrome text*
├ ❏ *${prefix}greenbush text*
├ ❏ *${prefix}metallogo text*
├ ❏ *${prefix}noeltext text*
├ ❏ *${prefix}glittergold text*
├ ❏ *${prefix}textcake text*
├ ❏ *${prefix}starsnight text*
├ ❏ *${prefix}wooden3d text*
├ ❏ *${prefix}textbyname text*
├ ❏ *${prefix}writegalacy text*
├ ❏ *${prefix}galaxybat text*
├ ❏ *${prefix}snow3d text*
├ ❏ *${prefix}birthdayday text*
├ ❏ *${prefix}goldplaybutton text*
├ ❏ *${prefix}silverplaybutton text*
├ ❏ *${prefix}freefire text*
❏ info: Membut logo keren

9. _ISLAM-MENU_
├ ❏ *${prefix}listsurah*
├ ❏ *${prefix}alquran*
├ ❏ *${prefix}alquranaudio*
├ ❏ *${prefix}asmaulhusna*
├ ❏ *${prefix}kisahnabi*
├ ❏ *${prefix}jadwalsholat*
❏ info: Jalur untuk bertobat

10. _DOWNLOADER-MENU_
├ ❏ *${prefix}tiktok link*
├ ❏ *${prefix}tiktoknowm link*
├ ❏ *${prefix}tiktokmusic link*
├ ❏ *${prefix}spotify link*
├ ❏ *${prefix}ytmp3 link*
├ ❏ *${prefix}ytmp4 link*
├ ❏ *${prefix}play query*
├ ❏ *${prefix}ytplay query*
├ ❏ *${prefix}facebook link*
├ ❏ *${prefix}twitter link*
├ ❏ *${prefix}instagram link*
├ ❏ *${prefix}igdl link*
├ ❏ *${prefix}igdl2 link*
├ ❏ *${prefix}ig3 link*
├ ❏ *${prefix}twtdl link*
├ ❏ *${prefix}fbdl link*
├ ❏ *${prefix}zippyshare* (link)
❏ Info: Mendownload media sosial

11. _EFFECT PHOTO-MENU_
├ ❏ *${prefix}1977*
├ ❏ *${prefix}aden*
├ ❏ *${prefix}brannan*
├ ❏ *${prefix}brooklyn*
├ ❏ *${prefix}clarendon*
├ ❏ *${prefix}gingham*
├ ❏ *${prefix}hudson*
├ ❏ *${prefix}inkwell*
├ ❏ *${prefix}earlybird*
├ ❏ *${prefix}kelvin*
├ ❏ *${prefix}lark*
├ ❏ *${prefix}lofi*
├ ❏ *${prefix}maven*
├ ❏ *${prefix}mayfair*
├ ❏ *${prefix}moon*
├ ❏ *${prefix}nashville*
├ ❏ *${prefix}perpetua*
├ ❏ *${prefix}reyes*
├ ❏ *${prefix}rise*
├ ❏ *${prefix}slumber*
├ ❏ *${prefix}stinson*
├ ❏ *${prefix}toaster*
├ ❏ *${prefix}valencia*
├ ❏ *${prefix}walden*
├ ❏ *${prefix}willow*
├ ❏ *${prefix}xpro2*
├ ❏ *${prefix}pencil*
❏ info: Membuat logo dan efek

12. _RANDOM IMAGE-MENU_
├ ❏ *${prefix}wallpaper*
├ ❏ *${prefix}art*
├ ❏ *${prefix}bts*
├ ❏ *${prefix}exo*
❏ Info: Gambar random

13. _NSFW-MENU_
├ ❏ *${prefix}trap*
├ ❏ *${prefix}blowjob*
├ ❏ *${prefix}yaoi*
├ ❏ *${prefix}ecchi
├ ❏ *${prefix}hentai*
├ ❏ *${prefix}ahegao*
├ ❏ *${prefix}hololewd*
├ ❏ *${prefix}sideoppai*
├ ❏ *${prefix}animefeets*
├ ❏ *${prefix}animebooty*
├ ❏ *${prefix}animethighss*
├ ❏ *${prefix}hentaiparadise*
├ ❏ *${prefix}animearmpits*
├ ❏ *${prefix}hentaifemdom*
├ ❏ *${prefix}lewdanimegirls*
├ ❏ *${prefix}biganimetiddies*
├ ❏ *${prefix}animebellybutton*
├ ❏ *${prefix}hentai4everyone*
├ ❏ *${prefix}bj*
├ ❏ *${prefix}ero*
├ ❏ *${prefix}cum*
├ ❏ *${prefix}feet*
├ ❏ *${prefix}yuri*
├ ❏ *${prefix}lewd*
├ ❏ *${prefix}feed*
├ ❏ *${prefix}eron*
├ ❏ *${prefix}solo*
├ ❏ *${prefix}gasm*
├ ❏ *${prefix}poke*
├ ❏ *${prefix}anal*
├ ❏ *${prefix}holo*
├ ❏ *${prefix}tits*
├ ❏ *${prefix}kuni*
├ ❏ *${prefix}kiss*
├ ❏ *${prefix}erok*
├ ❏ *${prefix}smug*
├ ❏ *${prefix}neko*
├ ❏ *${prefix}solog*
├ ❏ *${prefix}feetg*
├ ❏ *${prefix}lewdk*
├ ❏ *${prefix}pussy*
├ ❏ *${prefix}femdom*
├ ❏ *${prefix}cuddle*
├ ❏ *${prefix}eroyuri*
├ ❏ *${prefix}fox_girl*
├ ❏ *${prefix}cum_jpg*
├ ❏ *${prefix}erofeet*
├ ❏ *${prefix}holoero*
├ ❏ *${prefix}classic*
├ ❏ *${prefix}erokemo*
├ ❏ *${prefix}futanari*
├ ❏ *${prefix}lewdkemo*
├ ❏ *${prefix}pussy_jpg*
├ ❏ *${prefix}kemonomimi*
├ ❏ *${prefix}nsfw_avatar*
❏ Info: Ini adalah jalan menuju kesesatan

14. _INFO-MENU_
├ ❏ *${prefix}translate*
├ ❏ *${prefix}gempa*
├ ❏ *${prefix}kbbi*
├ ❏ *${prefix}brainly*
├ ❏ *${prefix}jarak*
├ ❏ *${prefix}urbandictionary*
├ ❏ *${prefix}chord*
├ ❏ *${prefix}heroml*
├ ❏ *${prefix}mlstalk*
├ ❏ *${prefix}genshin
├ ❏ *${prefix}qrreader*
├ ❏ *${prefix}wikipedia*
├ ❏ *${prefix}jadwaltv*
├ ❏ *${prefix}jadwaltvnow*
├ ❏ *${prefix}newsinfo*
├ ❏ *${prefix}cnnindonesia*
├ ❏ *${prefix}cnnnasional*
├ ❏ *${prefix}cnninternasional*
├ ❏ *${prefix}infogempa*
├ ❏ *${prefix}lirik*
├ ❏ *${prefix}cuaca*
├ ❏ *${prefix}covidindo*
├ ❏ *${prefix}covidglobal*
├ ❏ *${prefix}kodepos*
├ ❏ *${prefix}jadwalbola*
├ ❏ *${prefix}indbeasiswa*
├ ❏ *${prefix}hoax*
├ ❏ *${prefix}nsfwcheck*
❏ Info: Banyak amat info nya anjer

15. _MOVIE&STORY-MENU_
├ ❏ *${prefix}lk21*
├ ❏ *${prefix}drakorongoing*
├ ❏ *${prefix}wattpad*
├ ❏ *${prefix}wattpadsearch*
├ ❏ *${prefix}cerpen*
├ ❏ *${prefix}ceritahoror*
❏ Info: Kalau gabut silahkan cari sesuai selera

16. _RANDOM TEXT-MENU_
├ ❏ *${prefix}quotes*
├ ❏ *${prefix}quotesanime*
├ ❏ *${prefix}quotesanime*
├ ❏ *${prefix}quotesdilan*
├ ❏ *${prefix}katabijak*
├ ❏ *${prefix}katabijak*
├ ❏ *${prefix}pantun*
├ ❏ *${prefix}bucin*
├ ❏ *${prefix}randomnama*
❏ Info: Seperti yang kau lihat di atas

17. _ENTERTAINMENT-MENU_
├ ❏ *${prefix}wancak*
├ ❏ *${prefix}wancak*
❏ Info: jalan menuju kesesatan

18. _PRIMBON-MENU_
├ ❏ *${prefix}artinama*
├ ❏ *${prefix}jodoh*
├ ❏ *${prefix}weton*
├ ❏ *${prefix}jadian*
├ ❏ *${prefix}tebakumur*
❏ Info: Yok maen tebak tebakan

19. _STALK-MENU_
├ ❏ *${prefix}stalkig*
├ ❏ *${prefix}stalkgithub*
├ ❏ *${prefix}stalktwitter*
├ ❏ *${prefix}stalktiktok*
├ ❏ *${prefix}faktaunik*
❏ Info: Yahaha stalking nieee

20. _OTHER-MENU_
├ ❏ *${prefix}ssweb*
├ ❏ *${prefix}ssweb2*
├ ❏ *${prefix}shortlink*
❏ Info: Untuk keperluan nusa dan bangsa

┌◤ 〘 SPESIAL THANKS TO 〙
├ ❏ PSATIR ROBO TEAM
├ ❏ PATROIKKU ARIS
├ ❏ RIO SENSEI
├ ❏ ANDIKA
├ ❏ SMKN 7 SURABAYA
├ ❏ ELECTRO SMK7 SURABAYA
├ ❏ XFAR 
├ ❏ ELECTRO COMUNITY
├ ❏ AWAN NII
╚═ *PSATIR-BOT*  `

}

exports.rules = (prefix) => {
    return `
*══✪〘 RULES 〙✪══*
1. Don't spam bots.

2. Don't call bots.

3. Do not exploit bots.

 `
}

exports.rent = () => {
    return `*══✪〘 S E W A 〙✪══*
Sebelum melakukan pembayaran, hubungi dahulu owner https://wa.me/8815887040
    
╔══✪〘 *ADD GROUP* 〙✪══
╠➥ *1 month:* 0,34$ / 5k
╠➥ *permanent:* 17,80$ / 254k
╠➥
╠══✪〘 *Premium* 〙✪══
╠➥ *1 Bulan*: 0,34$ / 5k
╠➥ *permanent:* 13,80$ / 194k
╚═〘 *NEKO* 〙✪══ 
    
╔══✪〘 *P A Y M E N T* 〙✪══
║
╠➥ *Dana:* 628815887040
╠➥ *Gopay:* 628815887040
╠➥ *Pulsa:* 628815887040
╠➥ *Paypal:* cooming soon
║
╚═〘 *PSATIR BOT* 〙✪══ 
    
`
}
exports.donate = () => {
return `╔══✪〘 *D O N A T E* 〙✪══
║
╠➥ Beri Semangat Owner!
╠➥
╠➥ *Dana:* 628815887040
╠➥ *Gopay:* 628815887040
╠➥ *Pulsa:* 628815887040 
║
╚═〘 *PSATIR* 〙✪══ `

}
