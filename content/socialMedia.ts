import { SocialPlatform } from "@lib/types"
import { BsDiscord, BsGithub, BsTelegram } from "react-icons/bs"

const socialMedia: SocialPlatform[] = [
  {
    title: "Telegram",
    Icon: BsTelegram,
    url: "https://t.me/",
  },
  {
    title: "Discord",
    Icon: BsDiscord,
    url: "https://discord.com/users/",
  },
  {
    title: "Github",
    Icon: BsGithub,
    url: "https://github.com/",
  },
]

export default socialMedia
