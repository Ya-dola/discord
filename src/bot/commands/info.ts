import { Message } from "discord.js";
import { ReplyFunction, Command, GuildData } from "../../types";
import Const from "../const";
import { Core } from "../../index";


export default class InfoCommand extends Command {

  public constructor() {
    super({
      name: 'info',
      desc: '=cmd_info_desc',
      trigger: [ 'info', 'information', 'about' ]
    });
  }

  public handle(mes: Message, args: string[], g: GuildData, repl: ReplyFunction): boolean {
    const translationCredits = g.language.startsWith('en')
      ? ''
      : `\n\n${Core.text(g, '=translation_by')}\n${Core.languageManager.getRaw(g.language, 'translators').split(', ').map(n => `• ${n}`).join('\n')}`;
    repl(
      Core.text(g, '=cmd_info_1'),
      Core.text(g, '=cmd_info_2', {
        teamWebsite: 'https://tude.ga/?utm_source=freestuffbot&utm_medium=about&utm_campaign=credits',
        amazingPeople: 'https://freestuffbot.xyz/about#more',
        website: Const.websiteLink,
        inviteLink: Const.inviteLink,
        discordInvite: Const.discordInvite
      }) + translationCredits,
      'Copyright © 2020 Tude',
      0x00b0f4
    );
    return true;
  }

}