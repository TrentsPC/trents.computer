export type CharacterSet = {
  name: string;
  characters?: string;
  children?: CharacterSet[];
};

export const CHARACTER_DATA: CharacterSet[] = [
  {
    name: "Basic Latin",
    children: [
      { name: "Uppercase", characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
      { name: "Lowercase", characters: "abcdefghijklmnopqrstuvwxyz" },
      { name: "Numerals", characters: "0123456789" },
      { name: "Currency & math", characters: "#$%+<>=" },
      {
        name: "Punctuation & symbols",
        characters: "()[]{}/\\|-_.,:;'\"!?&@*^`~",
      },
      { name: "Whitespace", characters: " " },
    ],
  },
  {
    name: "Extended Latin",
    children: [
      {
        name: "Currency",
        characters: "¢£¥฿₣₦₧₩₫€₱₹₺₽",
      },
      {
        name: "Dashes",
        characters: "‒–—⸺⸻",
      },
      {
        name: "Punctuation & symbols",
        characters: "‘’“”‹›«»¡§¶·†‡•‰‱※‽⸘⁂⹋©℗®™",
      },
      {
        name: "Superscript",
        characters: "⁰¹²³⁴⁵⁶⁷⁸⁹",
      },
      {
        name: "Subscript",
        characters: "₀₁₂₃₄₅₆₇₈₉",
      },
    ],
  },
  {
    name: "Emoji",
    children: [
      {
        name: "Smileys & Emotion",
        children: [
          {
            name: "Smiling",
            characters: "😀😃😄😁😆😅🤣😂🙂🙃🫠😉😊😇",
          },
          {
            name: "Affection",
            characters: "🥰😍🤩😘😗☺😚😙🥲",
          },
          {
            name: "Tongue",
            characters: "😋😛😜🤪😝🤑",
          },
          {
            name: "Hand",
            characters: "🤗🤭🫢🫣🤫🤔🫡",
          },
          {
            name: "Neutral/Skeptical",
            characters: "🤐🤨😐😑😶🫥😏😒🙄😬🤥🫨",
          },
          {
            name: "Sleepy",
            characters: "😌😔😪🤤😴🫩",
          },
          {
            name: "Unwell",
            characters: "😷🤒🤕🤢🤮🤧🥵🥶🥴😵🤯",
          },
          {
            name: "Hat",
            characters: "🤠🥳🥸",
          },
          {
            name: "Glasses",
            characters: "😎🤓🧐",
          },
          {
            name: "Concerned",
            characters: "😕🫤😟🙁☹😮😯😲😳🫪🥺🥹😦😧😨😰😥😢😭😱😖😣😞😓😩😫🥱",
          },
          {
            name: "Negative",
            characters: "😤😡😠🤬😈👿💀☠",
          },
          {
            name: "Costume",
            characters: "💩🤡👹👺👻👽👾🤖",
          },
          {
            name: "Cat",
            characters: "😺😸😹😻😼😽🙀😿😾",
          },
          {
            name: "Monkey",
            characters: "🙈🙉🙊",
          },
          {
            name: "Heart",
            characters: "💌💘💝💖💗💓💞💕💟❣💔❤🩷🧡💛💚💙🩵💜🤎🖤🩶🤍",
          },
          { name: "Emotion", characters: "💋💯💢🫯💥💫💦💨🕳💬🗨🗯💭💤" },
        ],
      },
      {
        name: "People & Body",
        children: [
          {
            name: "Hand Fingers Open",
            characters: "👋🤚🖐✋🖖🫱🫲🫳🫴🫷🫸",
          },
          {
            name: "Hand Fingers Partial",
            characters: "👌🤌🤏✌🤞🫰🤟🤘🤙",
          },
          {
            name: "Hand Single Finger",
            characters: "👈👉👆🖕👇☝🫵",
          },
          {
            name: "Hand Fingers Closed",
            characters: "👍👎✊👊🤛🤜",
          },
          {
            name: "Hands",
            characters: "👏🙌🫶👐🤲🤝🙏",
          },
          {
            name: "Hand Prop",
            characters: "✍💅🤳",
          },
          {
            name: "Body Parts",
            characters: "💪🦾🦿🦵🦶👂🦻👃🧠🫀🫁🦷🦴👀👁👅👄🫦",
          },
          {
            name: "Person",
            characters: "👶🧒👦👧🧑👱👨🧔👩🧓👴👵",
          },
          {
            name: "Person Gesture",
            characters: "🙍🙎🙅🙆💁🙋🧏🙇🤦🤷",
          },
          {
            name: "Person Role",
            characters: "👮🕵💂🥷👷🫅🤴👸👳👲🧕🤵👰🤰🫃🫄🤱",
          },
          {
            name: "Person Fantasy",
            characters: "👼🎅🤶🦸🦹🧙🧚🧛🧜🧝🧞🧟🧌🫈",
          },
          {
            name: "Person Activity",
            characters: "💆💇🚶🧍🧎🏃💃🕺🕴👯🧖🧗",
          },
          {
            name: "Person Sport",
            characters: "🤺🏇⛷🏂🏌🏄🚣🏊⛹🏋🚴🚵🤸🤼🤽🤾🤹",
          },
          {
            name: "Person Resting",
            characters: "🧘🛀🛌",
          },
          {
            name: "Family",
            characters: "👭👫👬💏💑",
          },
          {
            name: "Person Symbol",
            characters: "🗣👤👥🫂👪👣🫆",
          },
        ],
      },
      {
        name: "Animals & Nature",
        children: [
          {
            name: "Mammals",
            characters:
              "🐵🐒🦍🦧🐶🐕🦮🐩🐺🦊🦝🐱🐈🦁🐯🐅🐆🐴🫎🫏🐎🦄🦓🦌🦬🐮🐂🐃🐄🐷🐖🐗🐽🐏🐑🐐🐪🐫🦙🦒🐘🦣🦏🦛🐭🐁🐀🐹🐰🐇🐿🦫🦔🦇🐻🐨🐼🦥🦦🦨🦘🦡🐾",
          },
          {
            name: "Birds",
            characters: "🦃🐔🐓🐣🐤🐥🐦🐧🕊🦅🦆🦢🦉🦤🪶🦩🦚🦜🪽🪿",
          },
          {
            name: "Amphibians",
            characters: "🐸",
          },
          {
            name: "Reptiles",
            characters: "🐊🐢🦎🐍🐲🐉🦕🦖",
          },
          {
            name: "Marine",
            characters: "🐳🐋🐬🫍🦭🐟🐠🐡🦈🐙🐚🪸🪼🦀🦞🦐🦑🦪",
          },
          {
            name: "Bugs",
            characters: "🐌🦋🐛🐜🐝🪲🐞🦗🪳🕷🕸🦂🦟🪰🪱🦠",
          },
          {
            name: "Flowers",
            characters: "💐🌸💮🪷🏵🌹🥀🌺🌻🌼🌷🪻",
          },
          {
            name: "Other Plants",
            characters: "🌱🪴🌲🌳🌴🌵🌾🌿☘🍀🍁🍂🍃🪹🪺🍄🪾",
          },
        ],
      },
      {
        name: "Food & Drink",
        children: [
          {
            name: "Fruit",
            characters: "🍇🍈🍉🍊🍋🍌🍍🥭🍎🍏🍐🍑🍒🍓🫐🥝🍅🫒🥥",
          },
          {
            name: "Vegetable",
            characters: "🥑🍆🥔🥕🌽🌶🫑🥒🥬🥦🧄🧅🥜🫘🌰🫚🫛🫜",
          },
          {
            name: "Prepared",
            characters: "🍞🥐🥖🫓🥨🥯🥞🧇🧀🍖🍗🥩🥓🍔🍟🍕🌭🥪🌮🌯🫔🥙🧆🥚🍳🥘🍲🫕🥣🥗🍿🧈🧂🥫",
          },
          { name: "Asian", characters: "🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🥮🍡🥟🥠🥡" },
          { name: "Sweet", characters: "🍦🍧🍨🍩🍪🎂🍰🧁🥧🍫🍬🍭🍮🍯" },
          {
            name: "Drink",
            characters: "🍼🥛☕🫖🍵🍶🍾🍷🍸🍹🍺🍻🥂🥃🫗🥤🧋🧃🧉🧊",
          },
          { name: "Dishware", characters: "🥢🍽🍴🥄🔪🫙🏺" },
        ],
      },
      {
        name: "Travel & Places",
        children: [
          { name: "Map", characters: "🌍🌎🌏🌐🗺🗾🧭" },
          { name: "Geographic", characters: "🏔⛰🛘🌋🗻🏕🏖🏜🏝🏞" },
          {
            name: "Building",
            characters: "🏟🏛🏗🧱🪨🪵🛖🏘🏚🏠🏡🏢🏣🏤🏥🏦🏨🏩🏪🏫🏬🏭🏯🏰💒🗼🗽",
          },
          { name: "Religious", characters: "⛪🕌🛕🕍⛩🕋" },
          { name: "Other", characters: "⛲⛺🌁🌃🏙🌄🌅🌆🌇🌉♨🎠🛝🎡🎢💈🎪" },
          {
            name: "Ground Transport",
            characters:
              "🚂🚃🚄🚅🚆🚇🚈🚉🚊🚝🚞🚋🚌🚍🚎🚐🚑🚒🚓🚔🚕🚖🚗🚘🚙🛻🚚🚛🚜🏎🏍🛵🦽🦼🛺🚲🛴🛹🛼🚏🛣🛤🛢⛽🛞🚨🚥🚦🛑🚧",
          },
          { name: "Water Transport", characters: "⚓🛟⛵🛶🚤🛳⛴🛥🚢" },
          { name: "Air Transport", characters: "✈🛩🛫🛬🪂💺🚁🚟🚠🚡🛰🚀🛸" },
          { name: "Hotel", characters: "🛎🧳" },
          {
            name: "Time",
            characters: "⌛⏳⌚⏰⏱⏲🕰🕛🕧🕐🕜🕑🕝🕒🕞🕓🕟🕔🕠🕕🕡🕖🕢🕗🕣🕘🕤🕙🕥🕚🕦",
          },
          {
            name: "Sky & Weather",
            characters:
              "🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌡☀🌝🌞🪐⭐🌟🌠🌌☁⛅⛈🌤🌥🌦🌧🌨🌩🌪🌫🌬🌀🌈🌂☂☔⛱⚡❄☃⛄☄🔥💧🌊",
          },
        ],
      },
      {
        name: "Activities",
        children: [
          {
            name: "Event",
            characters: "🎃🎄🎆🎇🧨✨🎈🎉🎊🎋🎍🎎🎏🎐🎑🧧🎀🎁🎗🎟🎫",
          },
          {
            name: "Award/Medal",
            characters: "🎖🏆🏅🥇🥈🥉",
          },
          {
            name: "Sport",
            characters: "⚽⚾🥎🏀🏐🏈🏉🎾🥏🎳🏏🏑🏒🥍🏓🏸🥊🥋🥅⛳⛸🎣🤿🎽🎿🛷🥌",
          },
          {
            name: "Game",
            characters: "🎯🪀🪁🔫🎱🔮🪄🎮🕹🎰🎲🧩🧸🪅🪩🪆♠♥♦♣♟🃏🀄🎴",
          },
          {
            name: "Arts & crafts",
            characters: "🎭🖼🎨🧵🪡🧶🪢",
          },
        ],
      },
      {
        name: "Objects",
        children: [
          {
            name: "Clothing",
            characters:
              "👓🕶🥽🥼🦺👔👕👖🧣🧤🧥🧦👗👘🥻🩱🩲🩳👙👚🪭👛👜👝🛍🎒🩴👞👟🥾🥿👠👡🩰👢🪮👑👒🎩🎓🧢🪖⛑📿💄💍💎",
          },
          { name: "Sound", characters: "🔇🔈🔉🔊📢📣📯🔔🔕" },
          { name: "Music", characters: "🎼🎵🎶🎙🎚🎛🎤🎧📻" },
          {
            name: "Musical Instrument",
            characters: "🎷🎺🪊🪗🎸🎹🎻🪕🥁🪘🪇🪈🪉",
          },
          { name: "Phone", characters: "📱📲☎📞📟📠" },
          { name: "Computer", characters: "🔋🪫🔌💻🖥🖨⌨🖱🖲💽💾💿📀🧮" },
          {
            name: "Light & video",
            characters: "🎥🎞📽🎬📺📷📸📹📼🔍🔎🕯💡🔦🏮🪔",
          },
          {
            name: "Book/paper",
            characters: "📔📕📖📗📘📙📚📓📒📃📜📄📰🗞📑🔖🏷",
          },
          { name: "Money", characters: "🪙💰🪎💴💵💶💷💸💳🧾💹" },
          { name: "Mail", characters: "✉📧📨📩📤📥📦📫📪📬📭📮🗳" },
          { name: "Writing", characters: "✏✒🖋🖊🖌🖍📝" },
          {
            name: "Office",
            characters: "💼📁📂🗂📅📆🗒🗓📇📈📉📊📋📌📍📎🖇📏📐✂🗃🗄🗑",
          },
          { name: "Lock", characters: "🔒🔓🔏🔐🔑🗝" },
          {
            name: "Tool",
            characters: "🔨🪓⛏⚒🛠🗡⚔💣🪃🏹🛡🪚🔧🪛🔩⚙🗜⚖🦯🔗⛓🪝🧰🧲🪜🪏",
          },
          { name: "Science", characters: "⚗🧪🧫🧬🔬🔭📡" },
          { name: "Medical", characters: "💉🩸💊🩹🩼🩺🩻" },
          {
            name: "Household",
            characters: "🚪🛗🪞🪟🛏🛋🪑🚽🪠🚿🛁🪤🪒🧴🧷🧹🧺🧻🪣🧼🫧🪥🧽🧯🛒",
          },
          { name: "Other", characters: "🚬⚰🪦⚱🧿🪬🗿🪧🪪" },
        ],
      },
      {
        name: "Symbols",
        children: [
          { name: "Transport Sign", characters: "🏧🚮🚰♿🚹🚺🚻🚼🚾🛂🛃🛄🛅" },
          { name: "Warning", characters: "⚠🚸⛔🚫🚳🚭🚯🚱🚷📵🔞☢☣" },
          {
            name: "Arrow",
            characters: "⬆↗➡↘⬇↙⬅↖↕↔↩↪⤴⤵🔃🔄🔙🔚🔛🔜🔝",
          },
          { name: "Religion", characters: "🛐⚛🕉✡☸☯✝☦☪☮🕎🔯🪯" },
          { name: "Zodiac", characters: "♈♉♊♋♌♍♎♏♐♑♒♓⛎" },
          {
            name: "AV Symbol",
            characters: "🔀🔁🔂▶⏩⏭⏯◀⏪⏮🔼⏫🔽⏬⏸⏹⏺⏏🎦🔅🔆📶🛜📳📴",
          },
          { name: "Gender", characters: "♀♂⚧" },
          { name: "Math", characters: "✖➕➖➗🟰♾" },
          { name: "Punctuation", characters: "‼⁉❓❔❕❗〰" },
          { name: "Currency", characters: "💱💲" },
          {
            name: "Other",
            characters: "⚕♻⚜🔱📛🔰⭕✅☑✔❌❎➰➿〽✳✴❇©®™🫟",
          },
          { name: "Keycap", characters: "🔟" },
          {
            name: "Alphanum",
            characters: "🔠🔡🔢🔣🔤🅰🆎🅱🆑🆒🆓ℹ🆔Ⓜ🆕🆖🅾🆗🅿🆘🆙🆚🈁🈂🈷🈶🈯🉐🈹🈚🈲🉑🈸🈴🈳㊗㊙🈺🈵",
          },
          {
            name: "Geometric",
            characters: "🔴🟠🟡🟢🔵🟣🟤⚫⚪🟥🟧🟨🟩🟦🟪🟫⬛⬜◼◻◾◽▪▫🔶🔷🔸🔹🔺🔻💠🔘🔳🔲",
          },
        ],
      },
      {
        name: "Flags",
        characters: "🏁🚩🎌🏴🏳",
      },
    ],
  },
];
