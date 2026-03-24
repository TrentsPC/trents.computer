export type GraphemeSet = {
  name: string;
  graphemes?: string;
  children?: GraphemeSet[];
};

export const GRAPHEME_DATA: GraphemeSet[] = [
  {
    name: "Common Latin",
    graphemes:
      " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
  },
  {
    name: "Emoji",
    children: [
      {
        name: "Smileys & Emotion",
        children: [
          {
            name: "Face Smiling",
            graphemes: "😀😃😄😁😆😅🤣😂🙂🙃🫠😉😊😇",
          },
          {
            name: "Face Affection",
            graphemes: "🥰😍🤩😘😗☺😚😙🥲",
          },
          {
            name: "Face Tongue",
            graphemes: "😋😛😜🤪😝🤑",
          },
          {
            name: "Face Hand",
            graphemes: "🤗🤭🫢🫣🤫🤔🫡",
          },
          {
            name: "Face Neutral Skeptical",
            graphemes: "🤐🤨😐😑😶🫥😏😒🙄😬🤥🫨",
          },
          {
            name: "Face Sleepy",
            graphemes: "😌😔😪🤤😴🫩",
          },
          {
            name: "Face Unwell",
            graphemes: "😷🤒🤕🤢🤮🤧🥵🥶🥴😵🤯",
          },
          {
            name: "Face Hat",
            graphemes: "🤠🥳🥸",
          },
          {
            name: "Face Glasses",
            graphemes: "😎🤓🧐",
          },
          {
            name: "Face Concerned",
            graphemes: "😕🫤😟🙁☹😮😯😲😳🫪🥺🥹😦😧😨😰😥😢😭😱😖😣😞😓😩😫🥱",
          },
          {
            name: "Face Negative",
            graphemes: "😤😡😠🤬😈👿💀☠",
          },
          {
            name: "Face Costume",
            graphemes: "💩🤡👹👺👻👽👾🤖",
          },
          {
            name: "Cat Face",
            graphemes: "😺😸😹😻😼😽🙀😿😾",
          },
          {
            name: "Monkey Face",
            graphemes: "🙈🙉🙊",
          },
          {
            name: "Heart",
            graphemes: "💌💘💝💖💗💓💞💕💟❣💔❤🩷🧡💛💚💙🩵💜🤎🖤🩶🤍",
          },
          { name: "Emotion", graphemes: "💋💯💢🫯💥💫💦💨🕳💬🗨🗯💭💤" },
        ],
      },
      {
        name: "People & Body",
        children: [
          {
            name: "Hand Fingers Open",
            graphemes: "👋🤚🖐✋🖖🫱🫲🫳🫴🫷🫸",
          },
          {
            name: "Hand Fingers Partial",
            graphemes: "👌🤌🤏✌🤞🫰🤟🤘🤙",
          },
          {
            name: "Hand Single Finger",
            graphemes: "👈👉👆🖕👇☝🫵",
          },
          {
            name: "Hand Fingers Closed",
            graphemes: "👍👎✊👊🤛🤜",
          },
          {
            name: "Hands",
            graphemes: "👏🙌🫶👐🤲🤝🙏",
          },
          {
            name: "Hand Prop",
            graphemes: "✍💅🤳",
          },
          {
            name: "Body Parts",
            graphemes: "💪🦾🦿🦵🦶👂🦻👃🧠🫀🫁🦷🦴👀👁👅👄🫦",
          },
          {
            name: "Person",
            graphemes: "👶🧒👦👧🧑👱👨🧔👩🧓👴👵",
          },
          {
            name: "Person Gesture",
            graphemes: "🙍🙎🙅🙆💁🙋🧏🙇🤦🤷",
          },
          {
            name: "Person Role",
            graphemes: "👮🕵💂🥷👷🫅🤴👸👳👲🧕🤵👰🤰🫃🫄🤱",
          },
          {
            name: "Person Fantasy",
            graphemes: "👼🎅🤶🦸🦹🧙🧚🧛🧜🧝🧞🧟🧌🫈",
          },
          {
            name: "Person Activity",
            graphemes: "💆💇🚶🧍🧎🏃💃🕺🕴👯🧖🧗",
          },
          {
            name: "Person Sport",
            graphemes: "🤺🏇⛷🏂🏌🏄🚣🏊⛹🏋🚴🚵🤸🤼🤽🤾🤹",
          },
          {
            name: "Person Resting",
            graphemes: "🧘🛀🛌",
          },
          {
            name: "Family",
            graphemes: "👭👫👬💏💑",
          },
          {
            name: "Person Symbol",
            graphemes: "🗣👤👥🫂👪👣🫆",
          },
        ],
      },
      {
        name: "Animals & Nature",
        graphemes:
          "🐵🐒🦍🦧🐶🐕🦮🐩🐺🦊🦝🐱🐈🦁🐯🐅🐆🐴🫎🫏🐎🦄🦓🦌🦬🐮🐂🐃🐄🐷🐖🐗🐽🐏🐑🐐🐪🐫🦙🦒🐘🦣🦏🦛🐭🐁🐀🐹🐰🐇🐿🦫🦔🦇🐻🐨🐼🦥🦦🦨🦘🦡🐾🦃🐔🐓🐣🐤🐥🐦🐧🕊🦅🦆🦢🦉🦤🪶🦩🦚🦜🪽🪿🐸🐊🐢🦎🐍🐲🐉🦕🦖🐳🐋🐬🫍🦭🐟🐠🐡🦈🐙🐚🪸🪼🦀🦞🦐🦑🦪🐌🦋🐛🐜🐝🪲🐞🦗🪳🕷🕸🦂🦟🪰🪱🦠💐🌸💮🪷🏵🌹🥀🌺🌻🌼🌷🪻🌱🪴🌲🌳🌴🌵🌾🌿☘🍀🍁🍂🍃🪹🪺🍄🪾",
      },
      {
        name: "Food & Drink",
        graphemes:
          "🍇🍈🍉🍊🍋🍌🍍🥭🍎🍏🍐🍑🍒🍓🫐🥝🍅🫒🥥🥑🍆🥔🥕🌽🌶🫑🥒🥬🥦🧄🧅🥜🫘🌰🫚🫛🫜🍞🥐🥖🫓🥨🥯🥞🧇🧀🍖🍗🥩🥓🍔🍟🍕🌭🥪🌮🌯🫔🥙🧆🥚🍳🥘🍲🫕🥣🥗🍿🧈🧂🥫🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🥮🍡🥟🥠🥡🍦🍧🍨🍩🍪🎂🍰🧁🥧🍫🍬🍭🍮🍯🍼🥛☕🫖🍵🍶🍾🍷🍸🍹🍺🍻🥂🥃🫗🥤🧋🧃🧉🧊🥢🍽🍴🥄🔪🫙🏺",
      },
      {
        name: "Travel & Places",
        graphemes:
          "🌍🌎🌏🌐🗺🗾🧭🏔⛰🛘🌋🗻🏕🏖🏜🏝🏞🏟🏛🏗🧱🪨🪵🛖🏘🏚🏠🏡🏢🏣🏤🏥🏦🏨🏩🏪🏫🏬🏭🏯🏰💒🗼🗽⛪🕌🛕🕍⛩🕋⛲⛺🌁🌃🏙🌄🌅🌆🌇🌉♨🎠🛝🎡🎢💈🎪🚂🚃🚄🚅🚆🚇🚈🚉🚊🚝🚞🚋🚌🚍🚎🚐🚑🚒🚓🚔🚕🚖🚗🚘🚙🛻🚚🚛🚜🏎🏍🛵🦽🦼🛺🚲🛴🛹🛼🚏🛣🛤🛢⛽🛞🚨🚥🚦🛑🚧⚓🛟⛵🛶🚤🛳⛴🛥🚢✈🛩🛫🛬🪂💺🚁🚟🚠🚡🛰🚀🛸🛎🧳⌛⏳⌚⏰⏱⏲🕰🕛🕧🕐🕜🕑🕝🕒🕞🕓🕟🕔🕠🕕🕡🕖🕢🕗🕣🕘🕤🕙🕥🕚🕦🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌡☀🌝🌞🪐⭐🌟🌠🌌☁⛅⛈🌤🌥🌦🌧🌨🌩🌪🌫🌬🌀🌈🌂☂☔⛱⚡❄☃⛄☄🔥💧🌊",
      },
      {
        name: "Activities",
        graphemes:
          "🎃🎄🎆🎇🧨✨🎈🎉🎊🎋🎍🎎🎏🎐🎑🧧🎀🎁🎗🎟🎫🎖🏆🏅🥇🥈🥉⚽⚾🥎🏀🏐🏈🏉🎾🥏🎳🏏🏑🏒🥍🏓🏸🥊🥋🥅⛳⛸🎣🤿🎽🎿🛷🥌🎯🪀🪁🔫🎱🔮🪄🎮🕹🎰🎲🧩🧸🪅🪩🪆♠♥♦♣♟🃏🀄🎴🎭🖼🎨🧵🪡🧶🪢",
      },
      {
        name: "Objects",
        graphemes:
          "👓🕶🥽🥼🦺👔👕👖🧣🧤🧥🧦👗👘🥻🩱🩲🩳👙👚🪭👛👜👝🛍🎒🩴👞👟🥾🥿👠👡🩰👢🪮👑👒🎩🎓🧢🪖⛑📿💄💍💎🔇🔈🔉🔊📢📣📯🔔🔕🎼🎵🎶🎙🎚🎛🎤🎧📻🎷🎺🪊🪗🎸🎹🎻🪕🥁🪘🪇🪈🪉📱📲☎📞📟📠🔋🪫🔌💻🖥🖨⌨🖱🖲💽💾💿📀🧮🎥🎞📽🎬📺📷📸📹📼🔍🔎🕯💡🔦🏮🪔📔📕📖📗📘📙📚📓📒📃📜📄📰🗞📑🔖🏷🪙💰🪎💴💵💶💷💸💳🧾💹✉📧📨📩📤📥📦📫📪📬📭📮🗳✏✒🖋🖊🖌🖍📝💼📁📂🗂📅📆🗒🗓📇📈📉📊📋📌📍📎🖇📏📐✂🗃🗄🗑🔒🔓🔏🔐🔑🗝🔨🪓⛏⚒🛠🗡⚔💣🪃🏹🛡🪚🔧🪛🔩⚙🗜⚖🦯🔗⛓🪝🧰🧲🪜🪏⚗🧪🧫🧬🔬🔭📡💉🩸💊🩹🩼🩺🩻🚪🛗🪞🪟🛏🛋🪑🚽🪠🚿🛁🪤🪒🧴🧷🧹🧺🧻🪣🧼🫧🪥🧽🧯🛒🚬⚰🪦⚱🧿🪬🗿🪧🪪",
      },
      {
        name: "Symbols",
        graphemes:
          "🏧🚮🚰♿🚹🚺🚻🚼🚾🛂🛃🛄🛅⚠🚸⛔🚫🚳🚭🚯🚱🚷📵🔞☢☣⬆↗➡↘⬇↙⬅↖↕↔↩↪⤴⤵🔃🔄🔙🔚🔛🔜🔝🛐⚛🕉✡☸☯✝☦☪☮🕎🔯🪯♈♉♊♋♌♍♎♏♐♑♒♓⛎🔀🔁🔂▶⏩⏭⏯◀⏪⏮🔼⏫🔽⏬⏸⏹⏺⏏🎦🔅🔆📶🛜📳📴♀♂⚧✖➕➖➗🟰♾‼⁉❓❔❕❗〰💱💲⚕♻⚜🔱📛🔰⭕✅☑✔❌❎➰➿〽✳✴❇©®™🫟🔟🔠🔡🔢🔣🔤🅰🆎🅱🆑🆒🆓ℹ🆔Ⓜ🆕🆖🅾🆗🅿🆘🆙🆚🈁🈂🈷🈶🈯🉐🈹🈚🈲🉑🈸🈴🈳㊗㊙🈺🈵🔴🟠🟡🟢🔵🟣🟤⚫⚪🟥🟧🟨🟩🟦🟪🟫⬛⬜◼◻◾◽▪▫🔶🔷🔸🔹🔺🔻💠🔘🔳🔲",
      },
      {
        name: "Flags",
        graphemes: "🏁🚩🎌🏴🏳",
      },
    ],
  },
];
