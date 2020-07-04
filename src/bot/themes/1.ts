import { GameInfo, GuildData, Theme, GameFlag } from "../../types";
import { MessageOptions } from "discord.js";
import { Core } from "../../index";
import Const from "../../bot/const";


export default class ThemeOne implements Theme {

  public build(content: GameInfo, data: GuildData, test: boolean): [string, MessageOptions] {
    let priceString = '';
    if (data.currency == 'euro') priceString = `${content.org_price.euro} €`;
    else if (data.currency == 'usd') priceString = `$${content.org_price.dollar}`;
    const date = new Date(Date.now() + content.until * 1000 * 60 * 60 * 24);
    const until = !content.until || content.until < 0
      ? ''
      : content.until < 7
        ? `until ${date.toLocaleDateString('en-US', { weekday: 'long' })}`
        : content.until == 7
          ? 'for a week'
          : `until ${date.toLocaleDateString('en-US', { weekday: 'long' })} next Week`;

    return [
      data.roleInstance ? data.roleInstance.toString() : '',
      {
        embed: {
          author: {
            name: Core.text(data, '=announcement_header')
          },
          title: content.title,
          description: `~~${priceString}~~ **${Core.text(data, '=announcement_pricetag_free')}** ${until}${content.flags?.includes(GameFlag.TRASH) ? ` • ${Core.text(data, '=game_meta_flag_trash')}` : ''}${content.flags?.includes(GameFlag.THIRDPARTY) ? ` • ${Core.text(data, '=game_meta_flag_thirdparty')}` : ''}\n\n[${Const.announcementButton}](${content.url})`,
          image: {
            url: content.thumbnail
          },
          footer: {
            text: test
              ? Core.text(data, '=announcement_footer_test')
              : Core.text(data, '=announcement_footer', { website: Const.websiteLinkClean })
          },
          color: 0x2f3136,
          thumbnail: {
            url: Const.storeIcons[content.store],
            width: 128,
            height: 128
          }
        }
      }
    ];
  }

}