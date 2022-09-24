# PSATIR

# Installation

## Termux

```cmd
> pkg update && pkg upgrade
> pkg install git -y
> pkg install nodejs -y
> pkg install ffmpeg -y
```

## Windows

-   [`Download ffmpeg`](https://ffmpeg.org/download.html#build-windows) and set path
-   [`Download Node JS`](https://nodejs.org/en/download/)
-   [`Download Git`](https://git-scm.com/downloads)

## Linux

```cmd
> apt-get update && apt-get upgrade
> apt install git -y
> apt install nodejs -y
> apt install ffmpeg -y
```

## Cloning this repo

```cmd
> git clone https://github.com/Bx101SXR/wa-bot-md.git
> cd wa-bot-md
```

## Install the package

```cmd
> npm i
```

## Edit config file

1. Rename `config.json.example` to `config.json`
2. Edit the required value in `config.json`. You can get the apikey at [`LoL Human Rest API`](https://api.lolhuman.xyz/).

```js
{
    "botName": "PSATIR Bot", // name of bot
    "ownerName": "LOLI", // owner name, you should add your name
    "ownerNumber": ["628815887040@s.whatsapp.net"], // owner number, you should add your number
    "sessionName": "pedofil", // will be pedofil-session.json
    "apikey": "" // get apikey on  website https://api.lolhuman.xyz/
    "vhtearkey": "" //  get apikey on website https://vhtear.com/index?#api-documentation
}
```

## Run the bot

```cmd
> npm start
```

## Note:

-   You can help me add case by doing pull requests.

# Thanks To

-   [`Baileys`](https://github.com/adiwajshing/Baileys)
-   [`SENSEI ARIS`](https://github.com/aris-senpai/)
-   [`XFAR`](https://github.com/xfar05/)
