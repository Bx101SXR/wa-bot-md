const axios = require("axios")
const cheerio = require("cheerio")
const qs = require("qs")

exports.pinterest = (querry) => {
	return new Promise(async(resolve,reject) => {
		 axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
			headers: {
			"cookie" : " _auth=1; _pinterest_sess=TWc9PSZqMTAzbGFRTDRKZXZNbVdiWTV3R241OUFUREphNTgzY3c2c2ZNYzJTUkdqbkphNjBadUV2NG1hMnp1U2x6RkhnRXVqMENKeFZRdUR2QytUN1B2Z0JjSzFJdmZKOEQzdmJYaDRKNHBzNitWdGVSamJUMnZVcHh5VVJZb1N1aWFBZDFVZGlsSk1XcEN2Q01oZFpaT2gvckpKQmxGTm5vZXVXRGZEbzBWcUNzVXY2enlVTkxqUG9yY2I1STE0Q05yeUJJcTR3a0M2UEZWUjZDZ2F1eUhacDRJVDY0TTZiYk9zWlJZV3dxc3VEaFpSeXFuNThOWlNQYVlTaUwwQ0pMK1UwRTc1eWFVVmg4amtKMmtEQnZPRDVUZzdGZUQ4YzdJeUZHUHR4UTZyRWxjMFdQQjlncUl0OGNZUFY4ZTRseE5tcFZlMkVRdTRITzdMSENvK0JWcUh1N2JhVDBKa0IwR2JwYlhSaDg0c2VxSXhiRUNTV3dmU3VIYXdPNVAzM28wS05zYTdVRzdXakQvY25JSWZ2aTFKWlRRcnI1U2w4ZG5kKzcyMWZ5UFhPOCtsUzlXSytTc3BUOVU5RGZOc25lL25Tc2ljK0NVTmxVY2h4OHFNL25KTWFISUhhZnV4T0lYRlZNYkx4d0dweHBYdE9kNmVGSW5NL2xTSnc2OVZkMU9EQzdxZ0dSaTFyWTFoWXRqVXVTZWlNdkhacG10ZUE1SjY4SVg4TDdSVklHN1hQSmRobHJnN05hc3lWSkVPOFl1SzFGWUhPMFczYllBdHVYYUNNSjJWVUsza3NKeVVoUWY4emgvM2ZKTFlGbmJ1cVMyY3ZqWkYxSGVWZWFSZHVHK2hGZUY0Qi9sUTZ6K0xMdVFjeXZzaHFXck0xUWQwcGlEUjhJZTlJOUdWaVZPQnJiYWJ1TExEYkZMSVV2c2F6WkZOd0hJTjVOWE8yTkJKdDUwUlpKU05ZYXpWWVloMzB6VjAxVWZrYmgvQ1d5empVNXhNUDJJYy8yN3dhckV4aEpJWnl0TTdnVVE4dlE1andSNTBaa25hc1lnPT0mK2Fnc0U1UnIrSE14Q2dmTE1RbmhQSlFjSFlBPQ=="
		}
			}).then(({ data }) => {
		const $ = cheerio.load(data)
		const result = [];
		const hasil = [];
   		 $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
            result.push(link)
		});
   		result.forEach(v => {
		 if(v == undefined) return
		 hasil.push(v.replace(/236/g,'736'))
			})
			hasil.shift();
		resolve(hasil)
		})
	})
}

exports.igstalk = (username) => {
	function _0x36dc(_0xd42027,_0x25716b){var _0x3ecb7c=_0x3ecb();return _0x36dc=function(_0x36dca1,_0x1286e2){_0x36dca1=_0x36dca1-0x11a;var _0x52a15e=_0x3ecb7c[_0x36dca1];return _0x52a15e;},_0x36dc(_0xd42027,_0x25716b);}(function(_0x1e331e,_0x1e749a){var _0x3bb40d=_0x36dc,_0x11d40f=_0x1e331e();while(!![]){try{var _0xedd2a9=parseInt(_0x3bb40d(0x11a))/0x1*(parseInt(_0x3bb40d(0x11c))/0x2)+parseInt(_0x3bb40d(0x11d))/0x3+parseInt(_0x3bb40d(0x125))/0x4*(-parseInt(_0x3bb40d(0x127))/0x5)+-parseInt(_0x3bb40d(0x122))/0x6+-parseInt(_0x3bb40d(0x124))/0x7+parseInt(_0x3bb40d(0x121))/0x8*(parseInt(_0x3bb40d(0x11e))/0x9)+parseInt(_0x3bb40d(0x126))/0xa;if(_0xedd2a9===_0x1e749a)break;else _0x11d40f['push'](_0x11d40f['shift']());}catch(_0x353773){_0x11d40f['push'](_0x11d40f['shift']());}}}(_0x3ecb,0x4e018));return new Promise(async(_0x4f4161,_0x2476da)=>{var _0x4339d6=_0x36dc;axios[_0x4339d6(0x11f)](_0x4339d6(0x123)+username+_0x4339d6(0x128),{'headers':{'cookie':_0x4339d6(0x11b)}})[_0x4339d6(0x120)](({data:_0x549496})=>{_0x4f4161(_0x549496);});});function _0x3ecb(){var _0x1ee859=['1635669MvnaFB','get','then','16waRkNe','3751182GYDbYc','https://www.instagram.com/','584325PrCYsS','76kcFoiv','2406270NCZEKF','78935XTAbbM','/?__a=1','1077JsIaks','csrftoken=576KQM9GPVuBe6PAYExBJXQ9bXa5Qv4t;\x20ds_user_id=9663089280;\x20sessionid=9663089280%3AOfOywvlQcHSAzi%3A9;','764WlsQYb','937842QWdkgL'];_0x3ecb=function(){return _0x1ee859;};return _0x3ecb();}
}


exports.igdl = (url) => {
    return new Promise((resolve,reject)=>{
        url_media = url_media.replace("reel", "p")
        var url = "https://igram.io/"
        const requestBody = {
            url: url_media.replace("reel", "p"),
            lang_code: "en"
        }

        const config = {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36 Edg/89.0.774.75', 
                'x-requested-with': ' XMLHttpRequest', 
                'origin': ' https://igram.io', 
                'referer': ' https://igram.io/en/dl/', 
                'sec-fetch-dest': ' empty', 
                'sec-fetch-mode': ' cors', 
                'sec-fetch-site': ' same-origin', 
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Cookie': '__cfduid=d4c2ddc2229a4d74c28b6ba25cdcd2a181618175605'
              },
        }

        axios.post(url, qs.stringify(requestBody), config).then(result => {
            let $ = cheerio.load(result.data), ig = []
            //Obter todos os links de videos da pagina carregada
            $('[data-mediatype=Video]').each((i, element) => {
                let cheerioElement = $(element)
                ig.push(cheerioElement.attr("href"))
            })
            //Obter todos os links de imagem da pagina carregada
            $('div > div.bg-white.border.rounded-sm.max-w-md > img').each((i, element) => {
                let cheerioElement = $(element)
                ig.push(cheerioElement.attr("src"))
            })

            resolve({
                results_number : ig.length,
                url_list: ig
            })
        }).catch(err=>{
            console.log(err.response)
            reject(err)
        })
    })
}
