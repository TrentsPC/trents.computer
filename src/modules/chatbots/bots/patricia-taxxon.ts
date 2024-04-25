import { MarkovRecord, createMarkovBot } from "../strategies/markov";

const JOCKSTRAP_MODEL: MarkovRecord = {
  "<|START|>": {
    "Boy,": 1,
    What: 2,
    If: 9,
    Take: 4,
    "Minutes,": 1,
    Have: 1,
    "Let’s": 1,
    Like: 1,
    "I’d": 1,
    "I’ll": 3,
    Dead: 2,
    "What’s": 3,
    Pack: 1,
    Throw: 1,
    I: 27,
    "": 1,
    "Friend,": 3,
    Nothing: 1,
    You: 3,
    All: 12,
    So: 2,
    Grow: 2,
    Free: 2,
    Now: 1,
    "Breathe,": 3,
    "Hey,": 1,
    Get: 4,
    Everybody: 2,
    Operator: 2,
    Nine: 2,
    Bass: 2,
    Midnight: 1,
    Memory: 1,
    Daylight: 1,
    Baby: 1,
    Just: 4,
    "There’s": 1,
    The: 7,
    We: 1,
    Who: 2,
    Yesterday: 1,
    Will: 1,
    Among: 1,
    Be: 1,
    Safe: 1,
    My: 2,
    And: 1,
    "Special!": 2,
    "I’ve": 3,
    "It’s": 3,
    Flap: 4,
    Oh: 2,
    There: 6,
    Catch: 5,
    Let: 1,
    When: 3,
    Wake: 1,
    Would: 2,
    No: 4,
    "Midnight,": 2,
    "Morning,": 1,
    "Twilight,": 1,
    One: 2,
    "“How": 1,
    Why: 4,
    "“Where": 1,
    Sewer: 1,
    dreams: 1,
    Music: 2,
    They: 1,
    Vincent: 1,
    Try: 2,
    Fabled: 2,
    Opulence: 1,
    "We’ve": 2,
    "I’m": 1,
    "We’re": 2,
    Melody: 1,
    "Melody,": 1,
    Sunlight: 2,
    "Harmony,": 2,
    "Yes,": 1,
    Our: 1,
    Listen: 1,
    Lie: 2,
    This: 1,
    But: 1,
    Sometimes: 2,
    Pirate: 2,
  },
  "Boy,": {
    you: 1,
  },
  you: {
    smell: 1,
    ever: 2,
    "couldn’t": 1,
    make: 1,
    a: 1,
    got: 1,
    "been?": 3,
    might: 2,
    motherfuckers: 1,
    bet: 1,
    fight: 1,
    "<|END|>": 3,
    went: 1,
    still: 1,
    look: 1,
    and: 1,
    "<|BR|>": 4,
    show: 1,
    can: 4,
    communicate: 1,
    "won’t": 2,
    gets: 2,
    know: 3,
    brought: 1,
    must: 1,
    want: 2,
    down: 1,
    have: 1,
    mine: 1,
    just: 1,
    tames: 2,
    stay: 1,
    be: 2,
    may: 2,
    now: 2,
    see: 1,
    please: 3,
    "stirring,": 1,
    "do,”": 1,
    could: 1,
    running: 1,
    love: 1,
    to: 1,
    all: 1,
    walk: 1,
    belong: 1,
    'do?"': 1,
    catch: 2,
    come: 2,
    wait: 2,
  },
  smell: {
    just: 1,
  },
  just: {
    like: 1,
    this: 3,
    "right”": 1,
    have: 1,
    hang: 2,
    want: 2,
    such: 1,
    what: 2,
    "what’s": 1,
    feel: 1,
    a: 3,
    another: 2,
    "can’t": 1,
    to: 3,
    the: 1,
    does: 1,
    warming: 1,
    open: 1,
    reality: 1,
    because: 1,
    "won't": 1,
    be: 1,
    ate: 1,
    for: 4,
    pumping: 2,
  },
  like: {
    an: 1,
    this: 4,
    to: 12,
    "I’m": 1,
    it: 4,
    a: 4,
    nothing: 1,
    the: 2,
    "Ella's": 1,
    wine: 1,
    "paper,": 2,
    planes: 2,
    us: 2,
    UPS: 2,
  },
  an: {
    airport: 1,
    unladen: 1,
    animated: 1,
    unholy: 1,
    "S.U.V": 1,
    autumn: 1,
    "alien,": 2,
    apprehensive: 1,
    alibi: 2,
    equal: 1,
    Alaskan: 1,
  },
  airport: {
    in: 1,
  },
  in: {
    the: 28,
    a: 5,
    power: 2,
    love: 2,
    "love,": 2,
    many: 1,
    his: 2,
    circles: 1,
    "it,": 4,
    "<|BR|>": 2,
    our: 4,
    "heaven?": 4,
    "stasis?": 1,
    this: 3,
    Peru: 1,
    "here,": 2,
    "<|END|>": 1,
    you: 2,
    me: 2,
    "life,": 2,
    check: 1,
    silence: 1,
    turquoise: 2,
    from: 1,
    polo: 1,
    stereo: 1,
    "passing,": 1,
    here: 1,
    my: 3,
    time: 1,
    fear: 2,
    petals: 2,
    all: 2,
  },
  the: {
    winter: 1,
    asphalt: 1,
    other: 2,
    economy: 1,
    filthy: 2,
    CVS: 1,
    minute: 1,
    paint: 1,
    Matt: 1,
    world: 3,
    trucker: 1,
    "meaning’s": 1,
    sky: 5,
    old: 3,
    night: 9,
    chaparral: 1,
    wholesome: 1,
    "closet,": 2,
    others: 2,
    work: 1,
    problem: 1,
    way: 1,
    injustice: 1,
    future: 1,
    room: 1,
    Halloween: 1,
    tines: 2,
    chance: 2,
    straps: 2,
    lights: 1,
    wrap: 1,
    label: 2,
    bullets: 1,
    pavement: 1,
    moon: 2,
    "lamplight,": 1,
    withered: 1,
    wind: 1,
    moonlight: 1,
    time: 1,
    memory: 1,
    sunrise: 1,
    dawn: 2,
    crystal: 1,
    pretty: 1,
    birds: 1,
    thing: 2,
    colors: 1,
    light: 5,
    etchings: 1,
    earth: 2,
    water: 2,
    "day,": 1,
    wrong: 1,
    best: 10,
    river: 1,
    forest: 1,
    day: 3,
    ribcage: 2,
    gravel: 1,
    "marsh?": 1,
    "dark?": 1,
    "call?": 1,
    trees: 3,
    change: 2,
    breath: 1,
    limits: 1,
    tale: 1,
    shore: 1,
    Danish: 1,
    "tang,": 1,
    unwashed: 1,
    wild: 1,
    forty: 1,
    shit: 2,
    scene: 4,
    rank: 2,
    sun: 4,
    trash: 1,
    sight: 1,
    trick: 1,
    sound: 2,
    sea: 2,
    stars: 10,
    wildest: 1,
    insects: 1,
    skylight: 1,
    worst: 2,
    alabaster: 2,
    yellowed: 2,
    whole: 2,
    right: 2,
    wherewithal: 1,
    "night?": 1,
    "kettle,": 1,
    "sun,": 1,
    rain: 1,
    station: 1,
    ways: 1,
    air: 7,
    miser: 1,
    end: 4,
    stomach: 1,
    beast: 1,
    taste: 1,
    hive: 2,
    oligarchs: 1,
    oceans: 1,
    dreams: 1,
    "wine,": 4,
    "light?”": 1,
    "roof,": 8,
    crevices: 1,
    form: 2,
    creek: 1,
    waterfall: 1,
    bolo: 1,
    fuck: 1,
    hatch: 1,
    back: 1,
    "bar,": 1,
    next: 1,
    mic: 1,
    mall: 1,
    proof: 1,
    groove: 1,
    people: 1,
    things: 2,
    king: 3,
    band: 1,
    "president’s": 1,
    last: 1,
    bets: 1,
    rocks: 1,
    top: 1,
    "revolution,": 2,
    margins: 2,
    "fighting’s": 1,
    timepiece: 1,
    "clock,": 1,
    "carving’s": 1,
    evening: 1,
    "record,": 1,
    glass: 2,
    ceiling: 1,
    "others,": 1,
    "ballet,": 2,
    wreckage: 1,
    street: 1,
    unborn: 1,
    "underbelly,": 1,
    guns: 1,
    only: 2,
    coming: 1,
    courtyard: 1,
    border: 3,
    one: 1,
    broadest: 2,
    follicles: 1,
    resonance: 1,
    brilliant: 1,
    touch: 1,
    land: 2,
    artificial: 1,
    Renaissance: 1,
    rainbow: 1,
    faces: 1,
    dance: 1,
    feast: 1,
    hearth: 1,
    canopy: 1,
    cosmos: 1,
    black: 1,
    distance: 2,
    hills: 1,
    wasteland: 1,
    darkness: 1,
    abyss: 1,
    dark: 1,
    system: 2,
    corner: 2,
  },
  winter: {
    "<|BR|>": 3,
    is: 1,
  },
  "<|BR|>": {
    When: 4,
    "Honestly,": 1,
    But: 17,
    Nothing: 2,
    I: 44,
    Feel: 1,
    "I’ve": 6,
    Candidates: 1,
    "I’m": 13,
    Netflix: 1,
    Like: 4,
    "It’s": 6,
    Your: 5,
    If: 12,
    This: 6,
    "Let’s": 1,
    Just: 7,
    The: 32,
    Sew: 1,
    A: 12,
    Put: 1,
    Big: 1,
    Of: 2,
    "But,": 1,
    Turn: 3,
    All: 9,
    Get: 12,
    And: 39,
    "Like,": 1,
    You: 10,
    Make: 7,
    Dead: 1,
    "I’ll": 3,
    Have: 1,
    Honey: 1,
    Internet: 1,
    In: 6,
    Will: 3,
    God: 2,
    Funky: 1,
    Dandelions: 2,
    Upturned: 1,
    "Friend,": 1,
    Dreams: 1,
    No: 2,
    What: 8,
    Please: 5,
    "Don’t": 7,
    "Won’t": 1,
    Speak: 1,
    "You’ve": 1,
    That: 4,
    Place: 1,
    "You’re": 2,
    Grow: 2,
    So: 8,
    Free: 4,
    "I’d": 3,
    For: 10,
    None: 2,
    Maybe: 2,
    Soon: 1,
    "Maybe,": 1,
    "Hey,": 1,
    By: 2,
    Let: 4,
    "We’re": 2,
    Which: 2,
    "Endlessly,": 2,
    Everybody: 2,
    Oh: 4,
    Check: 2,
    We: 15,
    Not: 1,
    Has: 1,
    She: 3,
    Tonight: 1,
    Magenta: 1,
    Guarded: 1,
    Fix: 1,
    To: 7,
    "Nothing’s": 1,
    Travelling: 1,
    It: 1,
    "There’s": 4,
    Spread: 1,
    Give: 2,
    Waiting: 2,
    Tomorrow: 3,
    "Springtime’s": 1,
    Who: 2,
    Someone: 1,
    Or: 18,
    My: 5,
    Patricia: 1,
    Said: 1,
    Cinnamon: 1,
    Gold: 1,
    Historically: 1,
    Bodacious: 1,
    Got: 4,
    "Special!": 2,
    "Can’t": 1,
    "Glitter-ific": 1,
    "She’s": 2,
    Everyone: 1,
    "Please,": 2,
    Either: 1,
    These: 8,
    Did: 2,
    Illuminated: 1,
    Take: 4,
    Freefalling: 4,
    Where: 2,
    Catch: 3,
    Yet: 1,
    With: 4,
    Riding: 1,
    Wake: 1,
    Would: 1,
    "Midnight,": 2,
    Before: 1,
    "Morning,": 1,
    "Twilight,": 1,
    Ungodly: 1,
    Council: 1,
    Wine: 1,
    Das: 2,
    How: 2,
    Only: 3,
    Time: 6,
    Possums: 1,
    Blossoms: 1,
    on: 1,
    Never: 3,
    League: 1,
    "you'd": 1,
    dude: 1,
    bombs: 1,
    unless: 1,
    tryna: 1,
    "here's": 1,
    why: 1,
    choose: 1,
    or: 1,
    jump: 1,
    Down: 1,
    "it's,": 1,
    puffing: 1,
    if: 1,
    see: 1,
    Bitbeast: 1,
    negative: 1,
    positive: 1,
    Told: 1,
    "Don't": 1,
    They: 3,
    Be: 3,
    "There's": 1,
    Live: 1,
    Talisman: 1,
    Santa: 1,
    Typeset: 2,
    Left: 2,
    On: 1,
    Pass: 1,
    Kentucky: 1,
    One: 2,
    Mathematics: 1,
    Red: 4,
    Repugnant: 1,
    Thinking: 1,
    Prayed: 1,
    "X@X@X@X": 1,
    Buried: 1,
    Front: 4,
    "We’ve": 2,
    "Discombobulated,": 1,
    Doubling: 1,
    Candlelight: 1,
    Come: 1,
    laid: 1,
    There: 3,
    Don: 1,
    Go: 1,
    Across: 1,
    Color: 5,
    Untouched: 1,
    Midnight: 2,
    Glass: 2,
    Frozen: 2,
    Carapace: 2,
    Spiral: 2,
    Staircase: 2,
    Are: 1,
    "Saying,": 1,
    "They're": 1,
    '"I': 1,
    "They'll": 1,
    Than: 1,
    "Hurrah,": 1,
    Terraformed: 1,
    Cry: 1,
    Parallel: 1,
    Woven: 1,
    Cover: 1,
    Dreaming: 1,
    Black: 3,
    Why: 2,
    "See,": 1,
    "Illusory,": 2,
    Blackened: 1,
    Suffering: 1,
    Relinquishing: 1,
    Every: 2,
    "Everyone's": 2,
    Bona: 2,
    Sticks: 2,
    Running: 2,
    Lethal: 2,
    Hit: 2,
    Already: 2,
  },
  When: {
    "I’m": 1,
    nothing: 1,
    the: 3,
    I: 2,
  },
  "I’m": {
    close: 1,
    here: 3,
    about: 2,
    an: 2,
    Barnaby: 1,
    "out,": 1,
    the: 1,
    a: 3,
    outta: 1,
    "tired,": 1,
    fine: 2,
    okay: 1,
    "lost,": 1,
    told: 1,
    giving: 2,
    "leaving?": 1,
    "free,": 2,
    something: 6,
    restless: 1,
    aching: 1,
    "here,": 2,
    waiting: 1,
    all: 1,
    overthinking: 1,
    writing: 1,
    serving: 1,
    certain: 1,
    awake: 1,
  },
  close: {
    to: 1,
    and: 1,
    my: 1,
  },
  to: {
    "you,": 1,
    keep: 1,
    learn: 2,
    "stare,": 1,
    be: 3,
    "be,": 1,
    give: 2,
    hold: 4,
    property: 1,
    Christ: 1,
    prove: 1,
    make: 1,
    find: 2,
    read: 1,
    the: 12,
    shout: 1,
    "say,": 2,
    hide: 1,
    do: 8,
    feel: 6,
    come: 7,
    say: 3,
    amble: 1,
    "tame,": 2,
    finish: 2,
    dance: 2,
    see: 11,
    moan: 1,
    frame: 1,
    "fly,": 1,
    my: 1,
    "see,": 1,
    carry: 1,
    take: 2,
    set: 2,
    stop: 2,
    reprieve: 2,
    dull: 1,
    get: 3,
    unfurl: 1,
    burn: 1,
    you: 2,
    "lose,": 1,
    care: 1,
    reconcile: 1,
    love: 1,
    know: 2,
    catch: 1,
    cry: 2,
    all: 3,
    me: 3,
    turn: 1,
    visit: 1,
    solo: 1,
    stay: 1,
    crash: 1,
    swallow: 1,
    "stay,": 1,
    sing: 1,
    move: 1,
    forget: 1,
    place: 1,
    carving: 1,
    go: 1,
    good: 1,
    "stay.”": 1,
    multiply: 1,
    an: 1,
    jump: 2,
    concede: 1,
    have: 1,
    meet: 1,
    tell: 1,
    myself: 4,
    fear: 1,
    leave: 1,
    "I'm": 2,
  },
  "you,": {
    I: 1,
  },
  I: {
    feel: 2,
    "don’t": 6,
    have: 3,
    look: 2,
    "<|BR|>": 1,
    hold: 2,
    got: 5,
    wish: 1,
    took: 1,
    "might’a": 1,
    want: 2,
    was: 4,
    really: 1,
    "wouldn’t": 1,
    may: 1,
    "ain’t": 3,
    think: 9,
    dream: 2,
    dreamt: 5,
    made: 2,
    felt: 4,
    swear: 2,
    lived: 1,
    am: 4,
    "doing,": 1,
    just: 4,
    still: 3,
    know: 9,
    "can’t": 13,
    deserve: 1,
    can: 11,
    sound: 1,
    ran: 1,
    saw: 3,
    might: 1,
    remember: 1,
    knew: 1,
    must: 2,
    "mustn't": 1,
    thought: 4,
    found: 1,
    had: 1,
    "didn’t": 1,
    possess: 1,
    amble: 2,
    swam: 1,
    crushed: 1,
    heard: 1,
    watched: 1,
    left: 2,
    "died,": 8,
    be: 8,
    "remain,": 1,
    fall: 4,
    begin: 1,
    give: 1,
    always: 2,
    could: 1,
    "ask,": 1,
    say: 2,
    do: 2,
    "swear,": 1,
    start: 1,
    put: 1,
    let: 3,
    started: 1,
    said: 1,
    "haven’t": 1,
    kindly: 1,
    pray: 1,
    dare: 1,
    daresay: 1,
    humbly: 1,
    called: 1,
    shouted: 1,
    wanna: 9,
    get: 5,
    told: 2,
    crashed: 1,
    love: 1,
    see: 10,
    close: 1,
    watch: 1,
    looked: 2,
    trembled: 2,
    ask: 1,
    "doing?": 1,
    "know,": 1,
    missed: 2,
    "couldn’t": 1,
    fly: 2,
    make: 2,
    will: 2,
  },
  feel: {
    that: 1,
    like: 1,
    your: 1,
    when: 2,
    disillusioned: 1,
    this: 1,
    "alive?": 4,
    too: 1,
    it: 8,
    a: 1,
  },
  that: {
    dusty: 1,
    you: 3,
    I: 6,
    "mean?)": 1,
    "ol’": 1,
    "<|BR|>": 3,
    "doesn’t": 1,
    "you’re": 1,
    just: 1,
    all: 2,
    no: 1,
    things: 1,
    "there’s": 1,
    old: 1,
    "sound?": 2,
    pulchritudinous: 1,
    shade: 1,
    attitude: 1,
    "it’s": 2,
    "I’ll": 2,
    light: 1,
    "face,": 1,
    cathode: 1,
    life: 1,
    the: 2,
    slippery: 1,
    my: 1,
    keeps: 1,
    day: 1,
    game: 2,
    gas: 2,
  },
  dusty: {
    snow: 1,
  },
  snow: {
    all: 1,
    until: 1,
  },
  all: {
    on: 1,
    their: 1,
    my: 4,
    outta: 1,
    rented: 1,
    right: 4,
    the: 6,
    turn: 1,
    "you’ve": 1,
    "severed,": 1,
    of: 6,
    be: 1,
    out: 1,
    "I’ve": 1,
    had: 3,
    built: 1,
    to: 3,
    night: 2,
    alone: 2,
    can: 1,
    still: 1,
    "<|BR|>": 2,
    understand: 1,
    over: 8,
    Sir: 1,
    before: 1,
    twelve: 2,
    day: 2,
  },
  on: {
    the: 19,
    all: 1,
    "<|END|>": 1,
    "tight,": 2,
    your: 6,
    my: 6,
    "yours,": 1,
    a: 3,
    for: 1,
    are: 1,
    some: 1,
    trains: 2,
  },
  asphalt: {
    "<|BR|>": 1,
  },
  "Honestly,": {
    I: 1,
  },
  "don’t": {
    see: 1,
    know: 5,
    "forget,": 6,
    be: 4,
    you: 1,
    look: 2,
    fight: 1,
    think: 3,
  },
  see: {
    myself: 1,
    kids: 1,
    "<|BR|>": 3,
    "<|END|>": 7,
    "that?": 1,
    them: 2,
    the: 1,
    is: 1,
    you: 2,
    us: 2,
    it: 1,
    trees: 1,
    skies: 1,
    friends: 1,
    babies: 1,
    something: 10,
    in: 2,
  },
  myself: {
    a: 1,
    from: 1,
    to: 1,
    "<|BR|>": 5,
    by: 1,
    cry: 1,
  },
  a: {
    thinker: 1,
    sadness: 1,
    bag: 1,
    "curiosity,": 1,
    wayward: 1,
    canyon: 1,
    BDSM: 1,
    good: 5,
    fist: 1,
    fucking: 1,
    living: 1,
    "market,": 1,
    "break,": 1,
    bit: 3,
    "king,": 1,
    silver: 1,
    world: 3,
    toast: 2,
    taste: 1,
    barrel: 1,
    seat: 1,
    smoking: 1,
    choice: 1,
    "wreck,": 1,
    second: 3,
    "promise,": 3,
    perfect: 1,
    monster: 2,
    little: 6,
    man: 2,
    rousing: 1,
    song: 4,
    "party,": 2,
    chink: 2,
    distinct: 1,
    packet: 1,
    feeling: 1,
    lot: 3,
    horse: 2,
    war: 2,
    lotta: 1,
    sound: 1,
    new: 3,
    memory: 1,
    table: 1,
    stove: 1,
    flowerbed: 1,
    wooden: 1,
    falsehood: 1,
    blundering: 2,
    trail: 1,
    flock: 1,
    woman: 4,
    step: 1,
    telegram: 1,
    filament: 1,
    grace: 1,
    look: 1,
    market: 1,
    billowing: 1,
    soul: 1,
    devil: 1,
    bottle: 1,
    held: 1,
    different: 2,
    "dream,": 2,
    manageable: 2,
    softer: 2,
    garden: 1,
    way: 1,
    day: 4,
    note: 2,
    "way,": 2,
    beautiful: 1,
    cataclysm: 1,
    trusted: 2,
    gruesome: 2,
    "second,": 1,
    trepidatious: 1,
    surreptitious: 1,
    hurricane: 1,
    "bandit’s": 1,
    "lie,": 2,
    hollow: 1,
    'follow?"': 1,
    language: 1,
    record: 1,
    groove: 1,
    voice: 1,
    stolen: 1,
    notice: 2,
    "day,": 1,
    star: 1,
    sequin: 1,
    "Saint.": 1,
    longing: 1,
    contrast: 1,
    great: 1,
    wonderful: 4,
    breath: 1,
    time: 1,
    while: 1,
    crisis: 1,
    "winner,": 2,
    "<|BR|>": 8,
  },
  thinker: {
    "<|BR|>": 1,
  },
  But: {
    when: 2,
    just: 4,
    you: 2,
    "don’t": 3,
    "then,": 2,
    something: 2,
    maybe: 1,
    here: 1,
    what: 1,
  },
  when: {
    weather: 1,
    "you’re": 2,
    my: 2,
    the: 3,
    I: 1,
    "I’ve": 4,
    we: 3,
    grip: 1,
    "I’m": 1,
  },
  weather: {
    gets: 1,
  },
  gets: {
    like: 1,
    the: 2,
    real: 1,
  },
  this: {
    "it’s": 1,
    "<|BR|>": 3,
    "time,": 3,
    forecast: 1,
    society: 2,
    caramel: 1,
    fall: 1,
    before: 3,
    way: 1,
    time: 1,
    on: 1,
    winter: 2,
    comes: 1,
    "way,": 1,
    will: 1,
    tea: 2,
    down: 1,
    fucking: 2,
    story: 1,
    "through,": 1,
    the: 1,
    godforsaken: 1,
    "knowledge?": 1,
    place: 1,
    "time?": 1,
    always: 1,
    or: 2,
    need: 1,
    population: 1,
    old: 1,
    information: 1,
    life: 1,
    could: 1,
    "<|END|>": 1,
    reading: 1,
    barren: 1,
    vision: 1,
    valley: 1,
    home: 1,
    whole: 2,
    great: 1,
  },
  "it’s": {
    hard: 1,
    really: 2,
    meant: 1,
    looking: 3,
    like: 4,
    too: 2,
    up: 1,
    just: 1,
  },
  hard: {
    to: 4,
  },
  keep: {
    myself: 1,
    this: 1,
    my: 2,
    the: 1,
    me: 1,
  },
  from: {
    losing: 1,
    but: 1,
    the: 7,
    a: 2,
    "<|BR|>": 1,
    "me:": 2,
    your: 1,
    harm: 1,
  },
  losing: {
    it: 1,
  },
  it: {
    "<|END|>": 2,
    right: 2,
    so: 1,
    would: 6,
    "hasn’t": 3,
    up: 1,
    called: 1,
    "up)": 1,
    touches: 1,
    will: 3,
    work: 1,
    "<|BR|>": 5,
    impossible: 1,
    came: 2,
    "gleams,": 1,
    was: 3,
    sounded: 1,
    back: 2,
    crack: 1,
    bleed: 1,
    "retain,": 1,
    works: 2,
    "clearly,": 2,
    gets: 1,
    always: 1,
    on: 1,
    takes: 1,
    through: 1,
    "don't": 1,
    in: 1,
    all: 9,
    is: 1,
    to: 1,
    breathes: 1,
  },
  What: {
    do: 1,
    if: 1,
    am: 2,
    form: 1,
    a: 4,
    are: 1,
  },
  do: {
    I: 1,
    anything: 1,
    "<|BR|>": 3,
    this: 2,
    or: 2,
    "I’m": 1,
    not: 1,
    you: 2,
    but: 2,
    is: 8,
  },
  have: {
    "that’s": 1,
    to: 2,
    never: 1,
    a: 3,
    gone: 1,
    grand: 1,
    much: 1,
    bought: 1,
    that: 1,
    nothing: 1,
    "<|BR|>": 1,
  },
  "that’s": {
    even: 1,
    okay: 2,
  },
  even: {
    worth: 1,
    louder: 1,
  },
  worth: {
    remembering: 1,
    of: 1,
  },
  remembering: {
    "<|BR|>": 1,
  },
  Nothing: {
    left: 1,
    about: 1,
    to: 1,
    here: 1,
  },
  left: {
    to: 2,
    "<|BR|>": 1,
    in: 1,
    a: 2,
    the: 1,
    behind: 1,
  },
  learn: {
    from: 1,
    "<|BR|>": 1,
    to: 1,
    much: 1,
  },
  but: {
    special: 1,
    still: 2,
    you: 2,
    "you’re": 1,
    your: 1,
    "we’re": 1,
    even: 1,
    I: 4,
    that: 1,
    ever: 2,
    maybe: 2,
    it: 1,
    look: 1,
    only: 1,
    "it’s": 1,
    tell: 2,
    less: 1,
    in: 1,
  },
  special: {
    ED: 1,
  },
  ED: {
    and: 1,
  },
  and: {
    mediocre: 1,
    see: 4,
    I: 1,
    black: 1,
    some: 1,
    caffeinated: 1,
    get: 3,
    "you’re": 1,
    run: 1,
    a: 2,
    took: 1,
    what: 1,
    know: 2,
    cry: 1,
    guide: 1,
    you: 2,
    many: 1,
    put: 2,
    violent: 1,
    pontificate: 1,
    "that’s": 2,
    the: 2,
    crush: 1,
    "don’t": 1,
    your: 2,
    it: 2,
    vivid: 1,
    mild: 1,
    "play,": 2,
    "strange,": 2,
    grave: 2,
    dismay: 1,
    say: 2,
    "bees.": 1,
    iodine: 2,
    alkaline: 4,
    mirth: 1,
    nothing: 1,
    perished: 1,
    out: 1,
    dance: 1,
    clap: 1,
    always: 1,
    Gershwin: 1,
    living: 1,
    Paris: 1,
    carbohydrates: 2,
    savvy: 1,
    bread: 1,
    Raisin: 1,
    strip: 1,
    read: 1,
    crème: 1,
    bees: 1,
    yet: 1,
    "I’ll": 1,
    mothers: 1,
    tell: 1,
    bare: 1,
    bones: 2,
    stones: 2,
    weed: 2,
    bongs: 1,
    bombs: 1,
    deliver: 2,
  },
  mediocre: {
    vlogs: 1,
  },
  vlogs: {
    "<|BR|>": 1,
  },
  look: {
    around: 1,
    away: 1,
    "cute,": 1,
    "perfect,": 1,
    slim: 1,
    "ahead,": 1,
    back: 1,
    at: 1,
    upon: 1,
    if: 2,
    to: 1,
    "sublime,": 2,
    "right,": 1,
  },
  around: {
    and: 1,
    "<|BR|>": 3,
    "here,": 2,
  },
  kids: {
    looking: 1,
    got: 1,
    my: 1,
  },
  looking: {
    back: 1,
    pretty: 3,
  },
  back: {
    on: 1,
    "<|BR|>": 5,
    "<|END|>": 2,
  },
  their: {
    lives: 1,
    teeth: 1,
    tune: 1,
    very: 1,
    hands: 1,
  },
  lives: {
    and: 1,
  },
  Feel: {
    a: 1,
  },
  sadness: {
    come: 1,
  },
  come: {
    on: 1,
    in: 1,
    this: 1,
    and: 8,
    off: 1,
    to: 1,
    for: 4,
    again: 1,
    "<|BR|>": 2,
    around: 2,
  },
  If: {
    I: 14,
    "it’s": 1,
    you: 5,
    anyone: 1,
  },
  hold: {
    on: 2,
    me: 2,
    you: 1,
    "<|BR|>": 1,
  },
  "tight,": {
    one: 2,
  },
  one: {
    day: 2,
    for: 2,
    knows: 1,
    "in,": 2,
    has: 2,
    "<|BR|>": 1,
    of: 1,
    I: 1,
    done: 2,
    on: 2,
  },
  day: {
    "I’ll": 2,
    will: 1,
    "<|BR|>": 9,
    my: 2,
    when: 4,
    is: 1,
    I: 1,
  },
  "I’ll": {
    get: 3,
    concede: 1,
    tweet: 1,
    be: 5,
    step: 1,
    flee: 1,
    keep: 1,
    burn: 1,
    die: 1,
    let: 1,
    set: 1,
    see: 1,
  },
  get: {
    it: 2,
    fucked: 1,
    this: 2,
    the: 1,
    a: 4,
    to: 3,
    spun: 1,
    my: 1,
    along: 1,
    high: 2,
    one: 2,
  },
  right: {
    "<|BR|>": 7,
    to: 1,
    one: 2,
    away: 1,
    through: 1,
  },
  "I’ve": {
    been: 2,
    never: 3,
    given: 1,
    made: 1,
    done: 1,
    "seen,": 1,
    got: 2,
    taken: 2,
    spent: 3,
    heard: 1,
    seen: 1,
  },
  been: {
    nostalgic: 2,
    inside: 1,
    so: 1,
    like: 1,
    afraid: 2,
    as: 1,
    borrowed: 2,
  },
  nostalgic: {
    for: 2,
  },
  for: {
    other: 2,
    this: 3,
    once: 4,
    "that,": 2,
    all: 4,
    "mine.": 1,
    just: 1,
    attack: 1,
    the: 12,
    me: 13,
    "me,": 1,
    anyone: 5,
    these: 1,
    my: 1,
    someone: 1,
    myself: 1,
    Columbine: 4,
    columbine: 1,
    what: 1,
    a: 1,
  },
  other: {
    "people’s": 2,
    side: 2,
  },
  "people’s": {
    childhoods: 2,
  },
  childhoods: {
    all: 2,
  },
  my: {
    life: 8,
    sunday: 1,
    "life,": 3,
    skin: 5,
    box: 1,
    history: 1,
    sixteen: 1,
    sight: 2,
    mind: 1,
    own: 6,
    chest: 1,
    lips: 2,
    friends: 3,
    "age,": 1,
    "friends,": 1,
    seat: 1,
    way: 1,
    feet: 1,
    body: 1,
    heartache: 2,
    house: 1,
    pastor: 1,
    "senses?": 1,
    "corpse,": 1,
    time: 1,
    corporeal: 2,
    flagrant: 1,
    pitiable: 1,
    plans: 2,
    turn: 1,
    dearest: 3,
    very: 1,
    word: 2,
    tears: 1,
    "dear,": 4,
    hand: 2,
    daughters: 1,
    circuits: 1,
    garden: 1,
    eyes: 1,
    heart: 1,
    optometric: 1,
    parable: 1,
    name: 6,
    form: 1,
    burner: 2,
  },
  life: {
    "<|END|>": 3,
    like: 1,
    "<|BR|>": 4,
    would: 1,
    "can’t": 1,
    just: 3,
  },
  Take: {
    out: 1,
    off: 1,
    me: 3,
    the: 4,
  },
  out: {
    in: 1,
    but: 1,
    of: 10,
    too: 1,
    the: 2,
    "<|BR|>": 1,
  },
  bag: {
    I: 1,
  },
  got: {
    "<|BR|>": 2,
    something: 1,
    it: 1,
    me: 1,
    a: 9,
    this: 1,
    "cash,": 1,
    visas: 2,
  },
  Candidates: {
    all: 1,
  },
  outta: {
    hand: 1,
    this: 1,
  },
  hand: {
    but: 1,
    "man’s": 1,
    at: 2,
    "<|END|>": 1,
  },
  still: {
    "<|BR|>": 2,
    give: 1,
    had: 1,
    "waiting,": 1,
    fearful: 1,
    hot: 1,
    "canyon’s": 1,
    have: 1,
    work: 1,
    cold: 1,
    who: 1,
    pull: 1,
    cannot: 1,
    "remaining,": 1,
    as: 1,
  },
  here: {
    wondering: 2,
    "undivided,": 3,
    "I’ll": 1,
    will: 1,
    to: 3,
    are: 1,
    for: 1,
    "<|BR|>": 1,
  },
  wondering: {
    if: 2,
  },
  if: {
    "it’s": 2,
    you: 7,
    I: 5,
    your: 1,
    the: 3,
    "you’d": 2,
    anyone: 3,
    "it's": 1,
  },
  really: {
    what: 2,
    got: 1,
    paid: 1,
  },
  what: {
    "I’m": 2,
    I: 2,
    "i’m": 1,
    "you’re": 1,
    are: 1,
    to: 4,
    the: 3,
    "it’ll": 1,
    happiness: 1,
    "it’s": 4,
    "I’ve": 1,
    "dearest,": 1,
    did: 1,
    a: 1,
    is: 2,
    it: 1,
  },
  about: {
    "<|END|>": 2,
    me: 1,
    my: 1,
    to: 2,
    it: 2,
  },
  "Minutes,": {
    counting: 1,
  },
  counting: {
    down: 1,
  },
  down: {
    I: 1,
    but: 1,
    "<|END|>": 2,
    "<|BR|>": 4,
    to: 1,
    when: 1,
  },
  Netflix: {
    all: 1,
  },
  rented: {
    out: 1,
  },
  Have: {
    you: 2,
  },
  ever: {
    met: 1,
    been: 2,
    since: 2,
    "remembered?": 1,
  },
  met: {
    a: 1,
    "<|BR|>": 3,
  },
  "curiosity,": {
    that: 1,
  },
  "couldn’t": {
    look: 1,
    remember: 1,
  },
  away: {
    "<|BR|>": 3,
    "<|END|>": 2,
    to: 3,
    "it's": 1,
    at: 1,
  },
  Like: {
    a: 2,
    the: 2,
    an: 1,
  },
  wayward: {
    messenger: 1,
  },
  messenger: {
    from: 1,
  },
  side: {
    of: 1,
    "a’": 1,
  },
  of: {
    a: 3,
    Batman: 1,
    logic: 1,
    this: 4,
    "life?": 1,
    time: 2,
    loud: 1,
    "<|BR|>": 1,
    my: 10,
    taco: 1,
    anything: 2,
    "what’s": 1,
    these: 1,
    the: 8,
    work: 1,
    tune: 1,
    golden: 1,
    "time,": 3,
    old: 3,
    "view,": 2,
    bloody: 1,
    lions: 1,
    pink: 2,
    you: 1,
    "line?": 2,
    your: 2,
    May: 1,
    common: 1,
    acid: 1,
    all: 5,
    us: 4,
    an: 2,
    Sedentary: 1,
    "music's": 1,
    wine: 1,
    destiny: 1,
    rusted: 1,
    young: 1,
    hearts: 1,
    witnessing: 1,
    green: 1,
    blue: 1,
    white: 1,
    hope: 1,
    creation: 1,
  },
  canyon: {
    great: 1,
  },
  great: {
    "<|BR|>": 1,
    "bitch)": 1,
    powers: 2,
    significance: 1,
    fall: 1,
  },
  "It’s": {
    not: 1,
    a: 1,
    just: 2,
    hard: 3,
    getting: 1,
    alright: 1,
    made: 1,
  },
  not: {
    polite: 1,
    to: 2,
    a: 2,
    knowing: 4,
    yet: 1,
    sound: 1,
    allow: 1,
  },
  polite: {
    to: 1,
  },
  "stare,": {
    but: 1,
  },
  make: {
    it: 5,
    a: 3,
    art: 1,
    mistakes: 1,
    things: 1,
    "'em": 2,
  },
  so: {
    easy: 1,
    if: 1,
    you: 2,
    lonely: 1,
    much: 1,
    "I’ll": 1,
    cost: 1,
    strap: 1,
    specific: 2,
    tame: 1,
    "far,": 1,
    "delicate,": 1,
    untouched: 1,
  },
  easy: {
    "<|BR|>": 1,
    way: 1,
  },
  Your: {
    clique: 1,
    right: 1,
    arms: 1,
    connections: 1,
    eyes: 1,
  },
  clique: {
    is: 1,
  },
  is: {
    in: 1,
    evergreen: 1,
    antithetical: 1,
    "right,": 1,
    too: 1,
    just: 1,
    to: 2,
    "<|BR|>": 9,
    that: 2,
    still: 3,
    indulge: 1,
    ours: 2,
    smiling: 1,
    "she,": 3,
    what: 1,
    "that?": 1,
    beaming: 2,
    setting: 1,
    paved: 1,
    soft: 1,
    almost: 1,
    thrown: 1,
    a: 2,
    not: 1,
    at: 1,
    always: 1,
    no: 1,
    "coming,": 1,
    the: 1,
    and: 1,
    shaking: 1,
    simply: 1,
    good: 1,
    safety: 1,
    made: 1,
    nothing: 2,
    done: 1,
    saved: 2,
    free: 1,
    walking: 1,
  },
  BDSM: {
    relationship: 1,
  },
  relationship: {
    with: 1,
  },
  with: {
    the: 10,
    five: 1,
    a: 11,
    you: 2,
    me: 3,
    my: 2,
    worry: 1,
    those: 1,
    incompetence: 1,
    wine: 1,
    anguish: 1,
    "fervor,": 2,
  },
  economy: {
    "<|END|>": 1,
  },
  "Let’s": {
    violate: 2,
  },
  violate: {
    each: 2,
  },
  each: {
    "other’s": 2,
  },
  "other’s": {
    NAP: 2,
  },
  NAP: {
    "<|BR|>": 2,
  },
  filthy: {
    animals: 2,
  },
  animals: {
    we: 2,
  },
  we: {
    pretend: 2,
    got: 5,
    make: 1,
    are: 1,
    "haven’t": 1,
    all: 1,
    set: 1,
    "die,": 1,
    used: 1,
    live: 1,
    "here,": 1,
    "doing?": 1,
    hit: 2,
  },
  pretend: {
    not: 2,
  },
  be: {
    "<|BR|>": 4,
    pristeen: 1,
    stingy: 1,
    waiting: 2,
    all: 5,
    "honest,": 2,
    honest: 1,
    over: 1,
    mean: 3,
    a: 8,
    the: 1,
    so: 1,
    rid: 2,
    gone: 1,
    ever: 1,
    yours: 1,
    leaving: 1,
    coming: 1,
    bereft: 2,
    something: 2,
    there: 5,
    okay: 1,
    "heeded,": 2,
    "<|END|>": 1,
    tardy: 1,
    sorry: 1,
    starting: 1,
  },
  meant: {
    to: 1,
  },
  "be,": {
    "it’ll": 1,
    love: 1,
  },
  "it’ll": {
    "be,": 1,
    take: 1,
  },
  love: {
    is: 1,
    "<|BR|>": 6,
    being: 1,
    'you"': 1,
  },
  evergreen: {
    "<|BR|>": 1,
  },
  This: {
    coming: 1,
    vessel: 2,
    street: 1,
    "life,": 2,
    next: 1,
  },
  coming: {
    morning: 1,
    fast: 1,
    "back,": 1,
    for: 1,
    just: 4,
    afternoon: 1,
  },
  morning: {
    will: 1,
  },
  will: {
    be: 3,
    clink: 2,
    feel: 2,
    say: 1,
    all: 1,
    grow: 1,
    begin: 1,
    fall: 1,
    I: 1,
    it: 1,
    you: 2,
    lead: 2,
    crave: 1,
    keep: 1,
    behest: 1,
    "<|BR|>": 1,
    not: 1,
    enter: 1,
    see: 1,
    remain: 1,
    fill: 1,
    sing: 2,
    always: 2,
  },
  pristeen: {
    "<|BR|>": 1,
  },
  wish: {
    it: 1,
    that: 1,
  },
  would: {
    snow: 1,
    sing: 1,
    be: 5,
    I: 13,
    like: 4,
    ache: 1,
    sear: 1,
    visit: 1,
  },
  until: {
    February: 1,
  },
  February: {
    "<|BR|>": 1,
  },
  Just: {
    to: 5,
    "yesterday,": 3,
    let: 1,
    tell: 1,
    "know,": 1,
  },
  give: {
    you: 1,
    me: 1,
    in: 1,
    "last?": 1,
    her: 1,
    it: 1,
    this: 1,
    my: 2,
  },
  good: {
    excuse: 1,
    case: 1,
    "ear,": 1,
    stuff: 2,
    for: 2,
    look: 2,
    at: 1,
    old: 1,
    "shot,": 1,
    "hand,": 1,
    "play,": 1,
    enough: 1,
  },
  excuse: {
    to: 1,
  },
  me: {
    "<|END|>": 11,
    down: 3,
    hope: 1,
    feel: 1,
    a: 5,
    works: 1,
    "<|BR|>": 20,
    so: 1,
    singing: 1,
    kill: 2,
    away: 3,
    "breathe,": 1,
    "crazy,": 2,
    slow: 2,
    rolling: 2,
    go: 2,
    take: 1,
    show: 1,
    just: 1,
    "you’ll": 1,
    where: 2,
    this: 2,
    home: 1,
    anywhere: 1,
    that: 1,
    when: 1,
    free: 1,
    be: 1,
    '"can': 1,
    fifty: 4,
    to: 1,
    with: 4,
    "out,": 1,
    safe: 1,
    and: 1,
    "I’m": 1,
    in: 1,
    at: 2,
    on: 2,
  },
  unladen: {
    swallow: 1,
  },
  swallow: {
    starts: 1,
    though: 1,
  },
  starts: {
    a: 1,
  },
  fist: {
    fight: 1,
  },
  fight: {
    "<|BR|>": 1,
    "I’ll": 1,
    your: 1,
  },
  property: {
    is: 1,
  },
  antithetical: {
    to: 1,
  },
  Christ: {
    "<|BR|>": 1,
  },
  The: {
    time: 1,
    hammer: 1,
    "water’s": 2,
    problem: 2,
    "album’s": 1,
    reds: 1,
    "mys-try": 1,
    things: 2,
    next: 1,
    postman: 1,
    nuttiness: 1,
    "door’s": 1,
    sun: 1,
    road: 2,
    "world’s": 2,
    fire: 2,
    soil: 1,
    doors: 1,
    day: 1,
    house: 1,
    miser: 1,
    end: 1,
    colors: 2,
    water: 1,
    "pleasure’s": 4,
    world: 1,
    bright: 1,
    dark: 1,
    hope: 2,
    sky: 1,
  },
  time: {
    is: 1,
    friend: 1,
    "<|END|>": 4,
    I: 2,
    left: 1,
    growing: 1,
    tilling: 1,
    waiting: 1,
    will: 1,
    for: 1,
    "<|BR|>": 1,
    of: 1,
  },
  "right,": {
    so: 1,
    "I’m": 1,
    destruction: 1,
  },
  something: {
    to: 1,
    so: 2,
    "dearest,": 2,
    far: 2,
    for: 2,
    dangerous: 2,
    fabulous: 2,
    harrowing: 2,
    "pretty,": 2,
    pretty: 8,
  },
  prove: {
    "<|BR|>": 1,
  },
  Sew: {
    a: 1,
  },
  fucking: {
    yellow: 1,
    house: 2,
    with: 2,
  },
  yellow: {
    and: 1,
  },
  black: {
    triangle: 1,
    soliloquy: 1,
  },
  triangle: {
    flag: 1,
  },
  flag: {
    on: 1,
  },
  your: {
    fursuit: 1,
    cock: 1,
    clothes: 1,
    cheek: 1,
    beard: 6,
    "face.": 2,
    boots: 1,
    glucose: 2,
    hat: 2,
    memories: 1,
    "eye,": 1,
    judgement: 1,
    better: 1,
    doctor: 2,
    priest: 2,
    best: 1,
    "sight,": 1,
    eyes: 1,
    ear: 1,
    abode: 1,
    own: 1,
    face: 1,
    visage: 1,
    money: 8,
  },
  fursuit: {
    "<|END|>": 1,
  },
  "I’d": {
    like: 1,
    say: 4,
    never: 1,
    give: 2,
  },
  living: {
    kissing: 1,
    on: 1,
  },
  kissing: {
    "ancaps,": 1,
  },
  "ancaps,": {
    "see?": 1,
  },
  "see?": {
    "<|BR|>": 1,
  },
  animated: {
    MS: 1,
  },
  MS: {
    Paint: 1,
  },
  Paint: {
    picture: 1,
  },
  picture: {
    of: 1,
  },
  Batman: {
    "<|BR|>": 1,
  },
  hammer: {
    of: 1,
  },
  logic: {
    addendum: 1,
  },
  addendum: {
    admonished: 1,
  },
  admonished: {
    anonymous: 1,
  },
  anonymous: {
    "<|BR|>": 1,
  },
  A: {
    "topic,": 1,
    hundred: 1,
    glistening: 2,
    sickly: 1,
    need: 1,
    "<|BR|>": 1,
    "billionaire’s": 1,
    timbral: 1,
    breath: 1,
    light: 1,
    heavenly: 2,
  },
  "topic,": {
    a: 1,
  },
  "market,": {
    and: 1,
  },
  some: {
    fluffy: 1,
    "use,": 1,
    lessons: 1,
    "<|BR|>": 1,
    of: 1,
  },
  fluffy: {
    handcuffs: 1,
  },
  handcuffs: {
    "<|END|>": 1,
  },
  took: {
    a: 2,
    over: 1,
  },
  "break,": {
    at: 1,
  },
  at: {
    the: 5,
    you: 1,
    "<|BR|>": 1,
    it: 1,
    my: 1,
    her: 1,
    least: 2,
    all: 1,
    letter: 1,
    "baking,": 1,
    Crokinole: 1,
    "archery,": 1,
  },
  CVS: {
    Pharmacy: 1,
  },
  Pharmacy: {
    "<|BR|>": 1,
  },
  Put: {
    on: 1,
  },
  sunday: {
    clothes: 1,
  },
  clothes: {
    like: 1,
    and: 1,
  },
  Barnaby: {
    "<|BR|>": 1,
  },
  Big: {
    "ups,": 1,
  },
  "ups,": {
    "I’m": 1,
  },
  "out,": {
    "I’m": 1,
    ignore: 2,
    put: 2,
    "there’s": 2,
    I: 2,
    they: 1,
  },
  unholy: {
    trinity: 1,
  },
  trinity: {
    "<|BR|>": 1,
  },
  Of: {
    dippity: 1,
    people: 1,
  },
  dippity: {
    dabs: 1,
  },
  dabs: {
    and: 1,
  },
  caffeinated: {
    sandwich: 1,
  },
  sandwich: {
    meat: 1,
  },
  meat: {
    "<|END|>": 1,
  },
  concede: {
    that: 1,
    "<|END|>": 1,
  },
  "might’a": {
    caused: 1,
  },
  caused: {
    a: 1,
  },
  bit: {
    of: 3,
    a: 1,
  },
  "But,": {
    as: 1,
  },
  as: {
    the: 3,
    well: 2,
    it: 2,
    bright: 1,
    this: 1,
    a: 2,
    quickly: 1,
    herself: 1,
    "lakeside,": 1,
  },
  minute: {
    "is,": 1,
  },
  "is,": {
    I: 1,
  },
  know: {
    what: 4,
    "<|BR|>": 6,
    where: 2,
    just: 1,
    "i’ve": 1,
    we: 1,
    the: 3,
    you: 1,
    who: 1,
    me: 1,
    at: 1,
    this: 1,
    that: 2,
    they: 1,
    "we’ll": 1,
    "we’re": 1,
    to: 1,
    I: 1,
  },
  want: {
    or: 1,
    a: 1,
    to: 4,
    is: 1,
    "<|BR|>": 1,
  },
  or: {
    what: 3,
    depressed: 1,
    aggravating: 1,
    that: 2,
    too: 1,
    "<|BR|>": 1,
    jeer: 1,
    whatever: 1,
    "not.”": 1,
  },
  "i’m": {
    messing: 1,
  },
  messing: {
    up: 1,
  },
  up: {
    "<|BR|>": 1,
    you: 1,
    on: 2,
    "<|END|>": 7,
    all: 1,
    in: 1,
    to: 2,
    try: 1,
    the: 1,
  },
  Turn: {
    "around,": 3,
  },
  "around,": {
    turn: 2,
    "let’s": 1,
    take: 1,
    the: 1,
  },
  turn: {
    "around,": 1,
    around: 1,
    left: 1,
    the: 3,
    "<|BR|>": 1,
  },
  "let’s": {
    make: 1,
    fuck: 1,
    have: 2,
    win: 2,
  },
  art: {
    and: 1,
  },
  fucked: {
    "<|END|>": 1,
  },
  Dead: {
    "inside,": 3,
  },
  "inside,": {
    "how’ve": 3,
  },
  "how’ve": {
    you: 3,
  },
  "been?": {
    "<|BR|>": 2,
    "(doin'": 1,
  },
  "water’s": {
    getting: 2,
  },
  getting: {
    warmer: 2,
    colder: 1,
    back: 1,
  },
  warmer: {
    so: 2,
  },
  might: {
    as: 2,
    look: 1,
  },
  well: {
    swim: 2,
  },
  swim: {
    "<|BR|>": 2,
  },
  All: {
    my: 3,
    I: 10,
    of: 3,
    kids: 1,
    alone: 1,
    the: 3,
  },
  "life,": {
    it: 3,
    there: 2,
    christened: 1,
    crystalized: 1,
  },
  "hasn’t": {
    gotten: 3,
  },
  gotten: {
    under: 3,
  },
  under: {
    my: 4,
  },
  skin: {
    "<|BR|>": 2,
    "(what's": 1,
    "safe?": 2,
    "<|END|>": 1,
  },
  "time,": {
    "I’d": 3,
    great: 2,
    our: 2,
    to: 1,
    with: 2,
  },
  say: {
    "it’s": 3,
    "sorry,": 1,
    that: 1,
    they: 1,
    "<|BR|>": 1,
    it: 2,
    something: 2,
    "It’s": 1,
    "I’m": 2,
    Geronimo: 1,
    sorry: 2,
  },
  pretty: {
    dim: 1,
    grim: 1,
    "grim.": 1,
    stars: 1,
    bold: 1,
    in: 1,
    "<|BR|>": 8,
  },
  dim: {
    "<|END|>": 1,
  },
  was: {
    a: 1,
    "away?": 2,
    beautiful: 1,
    "<|BR|>": 1,
    found: 1,
    who: 1,
    here: 1,
    yet: 1,
    that: 1,
  },
  "king,": {
    bet: 1,
  },
  bet: {
    you: 1,
    I: 1,
  },
  motherfuckers: {
    would: 1,
  },
  sing: {
    "<|BR|>": 1,
    their: 1,
    and: 1,
    with: 2,
  },
  "wouldn’t": {
    be: 1,
  },
  stingy: {
    "<|BR|>": 1,
  },
  Get: {
    "right,": 1,
    in: 4,
    your: 2,
    on: 8,
    good: 1,
  },
  paint: {
    and: 1,
  },
  "you’re": {
    a: 1,
    horny: 1,
    scared: 1,
    speaking: 1,
    more: 1,
    still: 1,
    around: 1,
  },
  silver: {
    statue: 1,
  },
  statue: {
    "<|BR|>": 1,
  },
  And: {
    if: 2,
    for: 4,
    the: 2,
    I: 4,
    a: 9,
    "then,": 1,
    in: 3,
    with: 1,
    tell: 1,
    when: 2,
    then: 1,
    clouds: 1,
    yet: 1,
    take: 8,
  },
  tweet: {
    the: 1,
  },
  Matt: {
    Bohrs: 1,
  },
  Bohrs: {
    comic: 1,
  },
  comic: {
    at: 1,
  },
  "What’s": {
    it: 1,
    that: 2,
  },
  called: {
    when: 1,
    me: 1,
    her: 1,
  },
  horny: {
    but: 1,
  },
  scared: {
    of: 1,
  },
  "life?": {
    "<|BR|>": 2,
  },
  "Like,": {
    "“Space": 1,
  },
  "“Space": {
    is: 1,
  },
  too: {
    "big,": 1,
    much: 2,
    "<|END|>": 3,
    long: 3,
    "<|BR|>": 2,
    "far.": 1,
    safe: 1,
    good: 2,
    brash: 1,
    conspicuous: 1,
  },
  "big,": {
    but: 1,
  },
  cock: {
    is: 1,
  },
  "right”": {
    "right?": 1,
  },
  "right?": {
    "<|BR|>": 1,
  },
  You: {
    look: 1,
    "didn’t": 1,
    take: 1,
    said: 1,
    know: 2,
    give: 1,
    have: 1,
    can: 4,
    left: 1,
  },
  "cute,": {
    but: 1,
  },
  "we’re": {
    running: 1,
    gonna: 2,
    all: 1,
    never: 1,
  },
  running: {
    out: 1,
    off: 1,
    "bro?": 1,
    "<|BR|>": 1,
  },
  friend: {
    "<|BR|>": 1,
  },
  Make: {
    "amends,": 1,
    me: 3,
    some: 1,
    "believe,": 2,
  },
  "amends,": {
    "let’s": 1,
  },
  fuck: {
    before: 1,
    you: 1,
  },
  before: {
    the: 1,
    "<|END|>": 4,
    "<|BR|>": 1,
    we: 1,
    me: 1,
  },
  world: {
    ends: 1,
    of: 1,
    up: 1,
    thinks: 2,
    grows: 1,
    within: 1,
    will: 1,
    we: 1,
    "<|END|>": 4,
  },
  ends: {
    "<|END|>": 1,
  },
  grim: {
    "(let's": 1,
  },
  "(let's": {
    kick: 1,
  },
  kick: {
    it: 1,
  },
  "up)": {
    "<|BR|>": 1,
  },
  "(doin'": {
    great: 1,
  },
  "bitch)": {
    "<|BR|>": 1,
  },
  loud: {
    "wishes,": 1,
  },
  "wishes,": {
    but: 1,
  },
  louder: {
    fears: 1,
  },
  fears: {
    "(what": 1,
  },
  "(what": {
    does: 1,
  },
  does: {
    that: 1,
    the: 1,
  },
  "mean?)": {
    "<|BR|>": 1,
  },
  "(what's": {
    "up!)": 1,
  },
  "up!)": {
    "<|BR|>": 1,
  },
  "grim.": {
    "<|END|>": 1,
  },
  Pack: {
    my: 1,
  },
  box: {
    with: 1,
  },
  five: {
    dozen: 1,
  },
  dozen: {
    liquor: 1,
  },
  liquor: {
    jugs: 1,
  },
  jugs: {
    "<|BR|>": 1,
  },
  waiting: {
    to: 2,
    for: 2,
  },
  find: {
    what: 1,
    where: 1,
    my: 1,
  },
  speaking: {
    of: 1,
  },
  inside: {
    that: 1,
    the: 1,
    "<|BR|>": 1,
  },
  "ol’": {
    "fishery?": 1,
  },
  "fishery?": {
    "<|BR|>": 1,
  },
  Honey: {
    I: 1,
  },
  may: {
    just: 1,
    "<|END|>": 2,
  },
  read: {
    up: 1,
    "<|BR|>": 1,
  },
  history: {
    "<|END|>": 1,
  },
  Throw: {
    my: 1,
  },
  sixteen: {
    beers: 1,
  },
  beers: {
    in: 1,
  },
  trucker: {
    back: 1,
  },
  where: {
    the: 3,
    I: 1,
    it: 1,
  },
  "meaning’s": {
    at: 1,
  },
  Internet: {
    kids: 1,
  },
  "ain’t": {
    having: 1,
    one: 2,
  },
  having: {
    that: 1,
  },
  think: {
    I: 2,
    are: 1,
    "I’m": 1,
    of: 1,
    this: 1,
    about: 2,
    "<|BR|>": 1,
    to: 4,
    sitting: 2,
  },
  dream: {
    too: 1,
    of: 1,
  },
  much: {
    for: 1,
    I: 1,
    to: 1,
    in: 1,
    more: 1,
  },
  forecast: {
    "<|END|>": 1,
  },
  dreamt: {
    I: 2,
    all: 2,
    of: 1,
  },
  made: {
    a: 3,
    me: 1,
    the: 1,
    with: 1,
    of: 1,
    "<|BR|>": 1,
  },
  toast: {
    to: 2,
  },
  sky: {
    "<|BR|>": 4,
    and: 1,
    is: 1,
  },
  once: {
    I: 4,
  },
  felt: {
    like: 4,
    this: 1,
    "real,": 1,
    forever: 1,
    my: 1,
  },
  In: {
    "time,": 4,
    the: 1,
    our: 1,
  },
  powers: {
    outside: 2,
  },
  outside: {
    of: 2,
    the: 1,
    my: 1,
  },
  sight: {
    "<|BR|>": 2,
    of: 1,
  },
  Will: {
    bring: 2,
    my: 1,
    this: 1,
  },
  bring: {
    this: 2,
  },
  society: {
    down: 2,
  },
  old: {
    men: 2,
    Geronimo: 2,
    days: 1,
    piano: 1,
    "<|BR|>": 1,
    town: 1,
    Rozencrantz: 1,
    skies: 1,
  },
  men: {
    in: 2,
  },
  power: {
    died: 2,
  },
  died: {
    "<|BR|>": 3,
  },
  our: {
    hands: 2,
    precious: 1,
    hearts: 4,
    team: 1,
    bodies: 1,
    name: 1,
    lords: 1,
    fame: 2,
  },
  hands: {
    will: 2,
    "<|BR|>": 2,
  },
  clink: {
    in: 2,
  },
  night: {
    "<|BR|>": 3,
    will: 1,
    away: 2,
    is: 2,
    long: 2,
    has: 1,
    "<|END|>": 1,
  },
  God: {
    "damn,": 2,
  },
  "damn,": {
    if: 2,
  },
  "that,": {
    just: 2,
  },
  hang: {
    up: 2,
  },
  off: {
    your: 1,
    for: 1,
    the: 1,
    cliche: 1,
  },
  run: {
    through: 1,
    like: 1,
  },
  through: {
    the: 4,
    "<|BR|>": 1,
    today: 1,
    it: 1,
  },
  chaparral: {
    "<|BR|>": 1,
  },
  Funky: {
    mosquitos: 1,
  },
  mosquitos: {
    want: 1,
  },
  taste: {
    of: 2,
    the: 1,
  },
  caramel: {
    "<|BR|>": 1,
  },
  Dandelions: {
    and: 1,
    international: 1,
  },
  barrel: {
    full: 1,
  },
  full: {
    of: 1,
  },
  taco: {
    bell: 1,
  },
  bell: {
    "<|BR|>": 1,
  },
  went: {
    and: 1,
  },
  seat: {
    I: 1,
    "<|BR|>": 1,
  },
  swear: {
    "I’d": 1,
    "<|BR|>": 1,
  },
  never: {
    tell: 1,
    felt: 2,
    been: 2,
    found: 1,
    getting: 1,
    know: 1,
  },
  tell: {
    "<|END|>": 1,
    me: 5,
    a: 2,
    right: 1,
    "‘em,": 1,
    myself: 1,
  },
  lived: {
    my: 1,
  },
  smoking: {
    kid: 1,
  },
  kid: {
    without: 1,
    and: 1,
  },
  without: {
    a: 1,
    someone: 1,
    that: 1,
  },
  choice: {
    "<|BR|>": 1,
  },
  Upturned: {
    "convertibles,": 1,
  },
  "convertibles,": {
    the: 1,
  },
  wholesome: {
    people: 1,
  },
  people: {
    making: 1,
    sends: 1,
    start: 1,
    "<|BR|>": 2,
    "<|END|>": 2,
    going: 1,
  },
  making: {
    noise: 1,
    our: 2,
    my: 2,
  },
  noise: {
    "<|BR|>": 1,
  },
  "wreck,": {
    but: 1,
  },
  "doesn’t": {
    mean: 1,
  },
  mean: {
    "I’m": 1,
    "<|BR|>": 3,
  },
  take: {
    a: 4,
    up: 1,
    "<|BR|>": 1,
    this: 1,
    you: 1,
    my: 1,
    me: 1,
    your: 8,
  },
  second: {
    to: 1,
    if: 2,
  },
  shout: {
    at: 1,
  },
  "": {
    "<|BR|>": 1,
  },
  "Friend,": {
    this: 1,
    I: 3,
  },
  fall: {
    has: 1,
    apart: 1,
    "asleep,": 4,
    for: 1,
    "<|BR|>": 1,
  },
  has: {
    been: 3,
    coping: 1,
    told: 1,
    called: 1,
    come: 3,
    a: 1,
    swagger: 2,
  },
  lonely: {
    "<|BR|>": 1,
  },
  "tired,": {
    but: 1,
  },
  hope: {
    "<|BR|>": 2,
    to: 1,
    that: 2,
  },
  Dreams: {
    all: 1,
  },
  "perfect,": {
    please: 1,
  },
  please: {
    know: 1,
    "understand,": 1,
    understand: 1,
    wake: 3,
  },
  No: {
    "one’s": 2,
    one: 4,
    "<|END|>": 1,
  },
  "one’s": {
    made: 1,
    ever: 1,
  },
  am: {
    "<|BR|>": 1,
    I: 2,
    built: 1,
    an: 2,
  },
  "doing,": {
    and: 1,
  },
  are: {
    "we?": 1,
    all: 2,
    under: 1,
    falling: 1,
    open: 1,
    "<|END|>": 1,
    just: 1,
    better: 1,
    probably: 1,
    some: 1,
    we: 2,
  },
  "we?": {
    "<|BR|>": 1,
  },
  Please: {
    be: 3,
    "touch,": 1,
    tell: 1,
  },
  "honest,": {
    "<|BR|>": 2,
  },
  "promise,": {
    and: 2,
    because: 1,
  },
  way: {
    before: 1,
    that: 1,
    "<|END|>": 1,
    it: 1,
    "<|BR|>": 1,
    to: 1,
    the: 1,
  },
  works: {
    quite: 1,
    phenomenally: 2,
  },
  quite: {
    right: 1,
  },
  "say,": {
    I: 1,
    so: 1,
  },
  cry: {
    "<|BR|>": 4,
    "<|END|>": 1,
  },
  "Don’t": {
    remind: 1,
    say: 1,
    you: 2,
    take: 1,
    be: 1,
    let: 1,
  },
  remind: {
    me: 1,
  },
  "sorry,": {
    "I’m": 1,
  },
  fine: {
    "<|BR|>": 1,
    "<|END|>": 1,
  },
  "didn’t": {
    do: 1,
    think: 1,
    "speak,": 1,
  },
  anything: {
    this: 1,
    I: 2,
    slick: 1,
  },
  mind: {
    "<|BR|>": 1,
  },
  arms: {
    seem: 1,
  },
  seem: {
    such: 1,
  },
  such: {
    a: 2,
  },
  perfect: {
    place: 1,
  },
  place: {
    to: 1,
    "<|BR|>": 1,
    the: 1,
  },
  hide: {
    "<|BR|>": 1,
  },
  honest: {
    "<|BR|>": 1,
  },
  because: {
    "<|BR|>": 1,
    a: 1,
  },
  nothing: {
    felt: 1,
    wrong: 2,
    else: 6,
    came: 1,
    to: 2,
  },
  "real,": {
    I: 1,
  },
  had: {
    you: 1,
    lost: 1,
    the: 8,
    signed: 1,
  },
  "Won’t": {
    you: 1,
  },
  show: {
    me: 1,
    you: 1,
  },
  Speak: {
    and: 1,
  },
  guide: {
    "me,": 1,
  },
  "me,": {
    I: 2,
    no: 1,
  },
  "can’t": {
    do: 1,
    be: 3,
    return: 1,
    stop: 2,
    explain: 2,
    breathe: 1,
    "wait!": 2,
    you: 1,
    say: 2,
    go: 1,
    the: 1,
  },
  own: {
    "<|END|>": 1,
    cilantro: 2,
    malignant: 2,
    "<|BR|>": 1,
    hand: 1,
  },
  "you’ve": {
    earned: 1,
  },
  earned: {
    "<|BR|>": 1,
  },
  "You’ve": {
    given: 1,
  },
  given: {
    me: 1,
    really: 1,
  },
  return: {
    "<|BR|>": 1,
  },
  That: {
    "you’re": 1,
    first: 1,
    time: 1,
    light: 1,
  },
  more: {
    than: 1,
    "<|BR|>": 1,
  },
  than: {
    I: 1,
    no: 1,
  },
  deserve: {
    "<|END|>": 1,
  },
  cheek: {
    as: 1,
  },
  touches: {
    "mine.": 1,
  },
  "mine.": {
    "<|BR|>": 1,
    "<|END|>": 1,
  },
  Place: {
    my: 1,
  },
  chest: {
    on: 1,
  },
  "yours,": {
    savor: 1,
    "<|BR|>": 2,
  },
  savor: {
    our: 1,
  },
  precious: {
    "time.": 1,
    darling: 2,
  },
  "time.": {
    "<|BR|>": 1,
  },
  "You’re": {
    a: 2,
  },
  monster: {
    in: 2,
  },
  "closet,": {
    but: 2,
  },
  since: {
    "we’ve": 2,
  },
  "we’ve": {
    met: 2,
    seen: 1,
  },
  afraid: {
    of: 2,
  },
  can: {
    "pet.": 4,
    always: 1,
    make: 3,
    write: 3,
    find: 1,
    smile: 1,
    "unfold,": 1,
    learn: 1,
    crumble: 1,
    tell: 1,
    feel: 8,
    lose: 1,
    see: 1,
  },
  "pet.": {
    "<|END|>": 4,
  },
  So: {
    "<|END|>": 2,
    grow: 2,
    "let’s": 2,
    take: 2,
    close: 1,
    pretty: 1,
  },
  Grow: {
    your: 4,
  },
  beard: {
    "out,": 6,
  },
  ignore: {
    what: 2,
  },
  others: {
    "say.": 2,
  },
  "say.": {
    "<|BR|>": 2,
  },
  put: {
    a: 4,
    on: 1,
  },
  little: {
    fur: 2,
    "ditty?": 1,
    frightened: 1,
    too: 1,
    bit: 1,
    "while?": 1,
  },
  fur: {
    on: 2,
  },
  "face.": {
    "<|BR|>": 2,
  },
  stop: {
    thinking: 2,
    the: 2,
    I: 2,
  },
  thinking: {
    "‘bout": 1,
    "'bout": 1,
  },
  "‘bout": {
    how: 1,
  },
  how: {
    nice: 2,
  },
  nice: {
    it: 2,
  },
  lips: {
    touch: 2,
    "<|BR|>": 1,
  },
  touch: {
    "yours,": 2,
    of: 1,
    your: 1,
  },
  grow: {
    your: 2,
    less: 1,
    "<|BR|>": 1,
  },
  "there’s": {
    nothing: 6,
    still: 2,
    some: 1,
    no: 1,
    a: 1,
  },
  wrong: {
    with: 2,
    "way,": 1,
    to: 1,
  },
  man: {
    that: 2,
  },
  said: {
    that: 1,
    before: 1,
    to: 2,
  },
  "waiting,": {
    still: 1,
  },
  fearful: {
    of: 1,
  },
  "what’s": {
    "next.": 1,
    to: 1,
  },
  "next.": {
    "<|BR|>": 1,
  },
  connections: {
    are: 1,
  },
  "severed,": {
    and: 1,
  },
  communicate: {
    by: 1,
  },
  by: {
    "text.": 1,
    while: 1,
    the: 1,
    "torchlight,": 1,
    rote: 1,
    "radiation,": 1,
    "<|BR|>": 1,
  },
  "text.": {
    "<|BR|>": 1,
  },
  "'bout": {
    how: 1,
  },
  Free: {
    falling: 6,
  },
  falling: {
    "<|BR|>": 2,
    in: 4,
    apart: 1,
  },
  "love,": {
    baby: 2,
  },
  baby: {
    "<|END|>": 2,
  },
  Now: {
    "isn’t": 1,
  },
  "isn’t": {
    that: 1,
  },
  rousing: {
    little: 1,
  },
  "ditty?": {
    "<|BR|>": 1,
  },
  work: {
    "I’ve": 1,
    "<|BR|>": 1,
    this: 1,
    to: 1,
  },
  paid: {
    off: 1,
  },
  these: {
    "<|BR|>": 1,
    thoughts: 1,
    "hands,": 8,
    flowers: 1,
  },
  For: {
    a: 1,
    just: 1,
    all: 3,
    "there's": 1,
    the: 1,
    me: 1,
    "us,": 1,
    years: 1,
  },
  song: {
    can: 1,
    in: 3,
  },
  always: {
    come: 1,
    wish: 1,
    "happens,": 1,
    finds: 1,
    make: 1,
    watching: 1,
    will: 1,
    be: 2,
  },
  many: {
    shades: 1,
    colors: 1,
  },
  shades: {
    and: 1,
  },
  colors: {
    maybe: 1,
    came: 1,
    run: 1,
    "don’t": 1,
    of: 1,
  },
  maybe: {
    "<|BR|>": 1,
    I: 2,
    you: 1,
  },
  case: {
    for: 1,
  },
  friends: {
    will: 1,
    know: 2,
    "<|END|>": 1,
    shaking: 1,
  },
  they: {
    know: 1,
    feel: 1,
    have: 1,
    ask: 1,
    "won’t": 1,
    reach: 1,
  },
  problem: {
    is: 3,
  },
  no: {
    one: 1,
    lanes: 1,
    digging: 1,
    bridges: 1,
    easy: 1,
    charge: 1,
    way: 1,
  },
  knows: {
    just: 1,
    it: 1,
  },
  None: {
    of: 2,
  },
  "party,": {
    and: 2,
  },
  chink: {
    in: 2,
  },
  his: {
    armor: 2,
  },
  armor: {
    "<|END|>": 2,
  },
  comes: {
    from: 1,
    "<|BR|>": 1,
    as: 1,
    crashing: 1,
    a: 4,
  },
  distinct: {
    and: 1,
  },
  violent: {
    want: 1,
  },
  disillusioned: {
    with: 1,
  },
  things: {
    have: 1,
    I: 3,
    "out,": 2,
    "clear,": 1,
    that: 1,
    "we’ve": 1,
  },
  gone: {
    "<|BR|>": 2,
    as: 1,
    down: 1,
  },
  "age,": {
    they: 1,
  },
  "way,": {
    but: 1,
    "there’s": 1,
    "I’m": 2,
  },
  "use,": {
    while: 1,
  },
  while: {
    the: 1,
    I: 2,
    "<|BR|>": 1,
  },
  injustice: {
    is: 1,
  },
  hot: {
    "<|END|>": 1,
  },
  "friends,": {
    they: 1,
  },
  grand: {
    visions: 1,
  },
  visions: {
    of: 1,
  },
  future: {
    "<|BR|>": 1,
  },
  "canyon’s": {
    worth: 1,
  },
  "Breathe,": {
    this: 1,
    "I’ll": 1,
    the: 1,
  },
  over: {
    "soon.": 1,
    this: 1,
    "<|BR|>": 4,
    people: 4,
    then: 1,
    the: 1,
    my: 1,
  },
  "soon.": {
    "<|BR|>": 1,
  },
  "album’s": {
    almost: 1,
  },
  almost: {
    "done,": 1,
    through: 1,
    done: 1,
  },
  "done,": {
    almost: 1,
  },
  Maybe: {
    I: 2,
  },
  sound: {
    just: 1,
    from: 1,
    "<|BR|>": 1,
    too: 1,
    of: 1,
  },
  frightened: {
    or: 1,
  },
  depressed: {
    "<|BR|>": 1,
  },
  "forget,": {
    "don’t": 3,
    I: 3,
  },
  write: {
    soft: 3,
  },
  soft: {
    silly: 3,
    "enough,": 1,
  },
  silly: {
    music: 3,
  },
  music: {
    too: 3,
  },
  step: {
    out: 1,
    and: 1,
    upon: 1,
  },
  room: {
    "<|BR|>": 1,
  },
  Soon: {
    you: 1,
  },
  "won’t": {
    hear: 1,
    believe: 1,
    you: 1,
    concern: 1,
    be: 1,
    help: 1,
    keep: 1,
  },
  hear: {
    me: 1,
  },
  singing: {
    all: 1,
  },
  tune: {
    "<|BR|>": 2,
  },
  ran: {
    in: 1,
  },
  circles: {
    for: 1,
  },
  long: {
    "<|BR|>": 5,
  },
  less: {
    blue: 1,
    fun: 1,
  },
  blue: {
    "<|BR|>": 2,
    buildings: 1,
  },
  flee: {
    "away,": 1,
  },
  "away,": {
    on: 1,
  },
  packet: {
    of: 1,
  },
  golden: {
    balloons: 1,
    railing: 1,
    lips: 1,
  },
  balloons: {
    "<|BR|>": 1,
  },
  "Maybe,": {
    all: 1,
  },
  done: {
    is: 1,
    "<|BR|>": 2,
    in: 2,
  },
  indulge: {
    in: 1,
  },
  feeling: {
    that: 1,
  },
  explain: {
    "<|BR|>": 1,
    "<|END|>": 1,
  },
  "Hey,": {
    did: 2,
  },
  did: {
    anyone: 1,
    anything: 1,
    I: 1,
  },
  anyone: {
    arrive: 1,
    "who’s": 2,
    "who’d": 2,
    would: 4,
    with: 1,
  },
  arrive: {
    while: 1,
  },
  "away?": {
    "<|BR|>": 2,
  },
  saw: {
    an: 1,
    you: 1,
    "<|BR|>": 1,
  },
  "S.U.V": {
    on: 1,
  },
  "a’": {
    the: 1,
  },
  Halloween: {
    parade: 1,
  },
  parade: {
    "<|BR|>": 1,
  },
  slick: {
    slip: 1,
  },
  slip: {
    by: 1,
  },
  "i’ve": {
    got: 1,
  },
  lot: {
    of: 2,
    to: 1,
  },
  amble: {
    and: 1,
    "on,": 2,
  },
  pontificate: {
    "<|END|>": 1,
  },
  "it,": {
    we: 2,
    "there’s": 2,
  },
  horse: {
    to: 2,
  },
  "tame,": {
    "let’s": 2,
  },
  win: {
    it: 2,
  },
  By: {
    the: 2,
  },
  tines: {
    of: 2,
  },
  Geronimo: {
    we: 2,
    "<|BR|>": 1,
  },
  war: {
    to: 2,
  },
  finish: {
    "<|BR|>": 2,
  },
  else: {
    to: 5,
    "man,": 1,
  },
  Let: {
    me: 2,
    the: 3,
  },
  kill: {
    a: 2,
  },
  Everybody: {
    come: 2,
    dance: 2,
  },
  tea: {
    "<|BR|>": 2,
  },
  "We’re": {
    gonna: 2,
    here: 1,
    protected: 1,
  },
  gonna: {
    "see,": 2,
    see: 2,
    wreck: 2,
  },
  "see,": {
    "we’re": 2,
    be: 1,
  },
  Which: {
    "‘a": 2,
  },
  "‘a": {
    you: 2,
    good: 2,
  },
  chance: {
    to: 2,
  },
  dance: {
    with: 2,
    the: 3,
    and: 1,
    remaining: 1,
    is: 1,
  },
  "Endlessly,": {
    endlessly: 2,
  },
  endlessly: {
    "<|BR|>": 2,
    into: 1,
  },
  another: {
    point: 2,
    floor: 1,
  },
  point: {
    of: 2,
    futura: 2,
  },
  "view,": {
    and: 2,
  },
  okay: {
    "<|BR|>": 2,
    but: 1,
    yet: 1,
  },
  Operator: {
    "don’t": 3,
  },
  lotta: {
    things: 1,
  },
  Oh: {
    "no,": 1,
    "honey,": 1,
    honey: 2,
    what: 2,
  },
  "no,": {
    Operator: 1,
  },
  slim: {
    but: 1,
  },
  breathe: {
    "<|BR|>": 1,
  },
  "lost,": {
    but: 1,
  },
  Nine: {
    "stacks,": 2,
  },
  "stacks,": {
    set: 1,
    turn: 1,
  },
  set: {
    your: 1,
    a: 2,
    me: 1,
    the: 1,
    to: 1,
  },
  boots: {
    on: 1,
  },
  attack: {
    "<|BR|>": 2,
  },
  glucose: {
    on: 2,
  },
  straps: {
    "<|BR|>": 1,
    "<|END|>": 1,
  },
  lights: {
    "off,": 1,
    "<|BR|>": 1,
  },
  "off,": {
    get: 1,
  },
  wrap: {
    "<|BR|>": 1,
  },
  Check: {
    the: 2,
  },
  label: {
    on: 2,
  },
  hat: {
    "<|BR|>": 1,
    "<|END|>": 1,
  },
  Bass: {
    "hours,": 2,
  },
  "hours,": {
    "don’t": 1,
    turn: 1,
  },
  We: {
    gonna: 2,
    stand: 3,
    had: 5,
    all: 3,
    know: 1,
    pack: 2,
  },
  wreck: {
    this: 2,
  },
  house: {
    "<|BR|>": 3,
    "<|END|>": 1,
    for: 1,
    is: 1,
  },
  bullets: {
    into: 1,
  },
  into: {
    flowers: 1,
    a: 4,
    the: 3,
    mystery: 1,
  },
  flowers: {
    "<|BR|>": 1,
    to: 1,
  },
  ours: {
    "<|BR|>": 1,
    "<|END|>": 1,
  },
  Midnight: {
    "<|BR|>": 3,
  },
  Not: {
    a: 1,
  },
  pavement: {
    "<|BR|>": 1,
  },
  Has: {
    the: 1,
  },
  moon: {
    lost: 1,
    that: 1,
  },
  lost: {
    her: 1,
    "<|END|>": 1,
    without: 1,
  },
  her: {
    "memory?": 1,
    hell: 1,
    "face!": 1,
    gorgeous: 1,
    "name,": 1,
  },
  "memory?": {
    "<|BR|>": 1,
  },
  She: {
    is: 1,
    must: 1,
    got: 1,
  },
  smiling: {
    alone: 1,
    for: 1,
  },
  alone: {
    "<|BR|>": 2,
    in: 1,
    "<|END|>": 1,
  },
  "lamplight,": {
    the: 1,
  },
  withered: {
    leaves: 1,
  },
  leaves: {
    collect: 1,
  },
  collect: {
    at: 1,
  },
  feet: {
    "<|BR|>": 1,
  },
  wind: {
    begins: 1,
  },
  begins: {
    to: 1,
  },
  moan: {
    "<|END|>": 1,
  },
  Memory: {
    "<|BR|>": 1,
  },
  moonlight: {
    "<|BR|>": 1,
  },
  smile: {
    at: 1,
    she: 1,
  },
  days: {
    "<|BR|>": 1,
  },
  beautiful: {
    then: 1,
    girl: 1,
  },
  then: {
    "<|BR|>": 3,
    the: 1,
  },
  remember: {
    the: 1,
    a: 1,
  },
  knew: {
    what: 1,
  },
  happiness: {
    was: 1,
  },
  memory: {
    live: 1,
    too: 1,
  },
  live: {
    again: 1,
    beneath: 1,
  },
  again: {
    "<|END|>": 1,
    "<|BR|>": 3,
  },
  Daylight: {
    "<|BR|>": 1,
  },
  must: {
    wait: 1,
    think: 1,
    believe: 1,
    have: 1,
    be: 2,
  },
  wait: {
    for: 1,
    "<|END|>": 2,
  },
  sunrise: {
    "<|BR|>": 1,
  },
  new: {
    life: 1,
    day: 1,
    "life?": 1,
    fertile: 1,
  },
  "mustn't": {
    give: 1,
  },
  dawn: {
    comes: 1,
    in: 1,
    "<|END|>": 1,
  },
  Tonight: {
    will: 1,
  },
  begin: {
    "<|END|>": 2,
    with: 1,
  },
  Baby: {
    blue: 1,
  },
  buildings: {
    far: 1,
  },
  far: {
    above: 1,
    out: 2,
    away: 2,
  },
  above: {
    the: 1,
    this: 1,
  },
  crystal: {
    grove: 1,
  },
  grove: {
    "<|BR|>": 1,
  },
  Magenta: {
    plated: 1,
  },
  plated: {
    terrace: 1,
  },
  terrace: {
    with: 1,
  },
  table: {
    and: 1,
  },
  stove: {
    "<|BR|>": 1,
  },
  Guarded: {
    golden: 1,
  },
  railing: {
    just: 1,
  },
  frame: {
    the: 1,
  },
  stars: {
    "<|BR|>": 7,
    quiet: 1,
    in: 2,
    burn: 1,
    "<|END|>": 2,
  },
  Fix: {
    that: 1,
  },
  piano: {
    and: 1,
  },
  birds: {
    will: 1,
  },
  apart: {
    "<|END|>": 1,
    now: 1,
  },
  "yesterday,": {
    I: 1,
    you: 1,
    the: 1,
  },
  thought: {
    it: 1,
    myself: 1,
    this: 1,
    for: 1,
  },
  impossible: {
    "<|BR|>": 1,
  },
  "then,": {
    "suddenly,": 3,
  },
  "suddenly,": {
    I: 1,
    the: 1,
    it: 1,
  },
  found: {
    just: 1,
    "<|BR|>": 1,
    "<|END|>": 1,
  },
  thing: {
    "<|BR|>": 1,
    I: 1,
  },
  To: {
    spur: 1,
    "appease,": 2,
    see: 4,
  },
  spur: {
    "belief,": 1,
  },
  "belief,": {
    to: 1,
  },
  "fly,": {
    release: 1,
  },
  release: {
    "<|BR|>": 1,
  },
  "Nothing’s": {
    been: 1,
  },
  bright: {
    as: 1,
    when: 1,
    blessed: 1,
  },
  brought: {
    me: 1,
  },
  flowerbed: {
    "<|BR|>": 1,
  },
  came: {
    alive: 1,
    flowing: 1,
    for: 1,
    from: 1,
    in: 1,
  },
  alive: {
    "<|BR|>": 1,
  },
  reds: {
    swam: 1,
  },
  swam: {
    "around,": 1,
    out: 1,
  },
  light: {
    was: 1,
    revealed: 1,
    is: 2,
    of: 2,
    would: 2,
    that: 1,
    so: 1,
    come: 1,
  },
  Travelling: {
    through: 1,
  },
  etchings: {
    of: 1,
  },
  earth: {
    "<|END|>": 1,
    "<|BR|>": 1,
  },
  water: {
    felt: 1,
    "<|BR|>": 1,
    "didn’t": 1,
  },
  forever: {
    gone: 1,
  },
  flowing: {
    back: 1,
    "down,": 1,
  },
  It: {
    "shines,": 1,
  },
  "shines,": {
    it: 1,
  },
  "gleams,": {
    the: 1,
  },
  revealed: {
    "<|BR|>": 1,
  },
  hundred: {
    thousand: 1,
  },
  thousand: {
    years: 1,
  },
  years: {
    that: 1,
    it: 1,
  },
  "There’s": {
    not: 2,
    time: 1,
    beauty: 1,
    a: 1,
  },
  story: {
    brief: 1,
  },
  brief: {
    "<|BR|>": 1,
  },
  "day,": {
    time: 1,
    darling: 4,
    good: 1,
  },
  believe: {
    "<|BR|>": 1,
    those: 1,
  },
  stand: {
    here: 3,
    among: 1,
  },
  "undivided,": {
    with: 3,
  },
  hearts: {
    "<|END|>": 3,
    today: 1,
    "I’m": 1,
  },
  "through,": {
    but: 1,
  },
  lessons: {
    here: 1,
  },
  burn: {
    "<|BR|>": 2,
    the: 1,
  },
  "mys-try": {
    can: 1,
  },
  "unfold,": {
    "there’s": 1,
  },
  told: {
    "<|BR|>": 1,
    me: 1,
    the: 2,
  },
  who: {
    it: 1,
    "did,": 1,
    waits: 1,
    hides: 1,
    answers: 1,
    we: 1,
  },
  "did,": {
    but: 1,
  },
  sounded: {
    pretty: 1,
  },
  bold: {
    "<|BR|>": 1,
  },
  best: {
    day: 4,
    "day,": 4,
    apron: 1,
    in: 2,
    regards: 1,
  },
  darling: {
    "<|BR|>": 3,
    "<|END|>": 1,
    is: 2,
  },
  river: {
    "<|BR|>": 1,
  },
  Spread: {
    my: 1,
  },
  body: {
    along: 1,
    made: 1,
  },
  along: {
    a: 1,
    like: 1,
    to: 1,
  },
  wooden: {
    carousel: 1,
  },
  carousel: {
    "<|BR|>": 1,
  },
  Give: {
    me: 2,
  },
  forest: {
    "<|BR|>": 1,
  },
  possess: {
    are: 1,
  },
  built: {
    on: 2,
    to: 1,
  },
  falsehood: {
    "<|END|>": 1,
  },
  "on,": {
    as: 2,
  },
  blundering: {
    midrange: 2,
  },
  midrange: {
    "<|BR|>": 2,
  },
  Waiting: {
    for: 2,
  },
  heartache: {
    breaks: 2,
  },
  breaks: {
    the: 2,
  },
  ribcage: {
    "<|BR|>": 2,
  },
  vessel: {
    has: 2,
  },
  borrowed: {
    too: 2,
  },
  Tomorrow: {
    "I’m": 2,
    will: 1,
  },
  giving: {
    it: 2,
  },
  "Springtime’s": {
    flowing: 1,
  },
  "down,": {
    ample: 1,
  },
  ample: {
    opportunity: 1,
  },
  opportunity: {
    "<|BR|>": 2,
  },
  gravel: {
    "<|BR|>": 1,
  },
  now: {
    "<|END|>": 1,
    "<|BR|>": 1,
    sir: 1,
  },
  Who: {
    is: 3,
    made: 1,
  },
  "she,": {
    who: 3,
  },
  waits: {
    in: 1,
  },
  "marsh?": {
    "<|BR|>": 1,
  },
  hides: {
    in: 1,
  },
  "dark?": {
    "<|BR|>": 1,
  },
  answers: {
    the: 1,
  },
  "call?": {
    "<|BR|>": 1,
  },
  Someone: {
    help: 1,
  },
  help: {
    "me,": 1,
    but: 1,
    you: 1,
  },
  "far.": {
    "<|END|>": 1,
  },
  Yesterday: {
    I: 1,
  },
  crushed: {
    an: 1,
  },
  autumn: {
    "leaf,": 1,
  },
  "leaf,": {
    I: 1,
  },
  heard: {
    it: 1,
    enough: 1,
  },
  crack: {
    I: 1,
  },
  watched: {
    it: 1,
  },
  bleed: {
    "<|BR|>": 1,
  },
  trail: {
    of: 1,
  },
  bloody: {
    footprints: 1,
  },
  footprints: {
    to: 1,
    "weren’t": 1,
  },
  pastor: {
    keep: 1,
  },
  "safe?": {
    "<|BR|>": 1,
    "<|END|>": 1,
  },
  godforsaken: {
    village: 1,
  },
  village: {
    keep: 1,
  },
  Among: {
    the: 1,
  },
  trees: {
    a: 1,
    "<|BR|>": 2,
    of: 1,
  },
  flock: {
    of: 1,
  },
  lions: {
    bear: 1,
  },
  bear: {
    their: 1,
  },
  teeth: {
    "<|BR|>": 1,
  },
  let: {
    me: 4,
    the: 2,
    them: 1,
    in: 1,
    my: 1,
    myself: 1,
  },
  "breathe,": {
    you: 1,
  },
  those: {
    footprints: 1,
    aubergine: 2,
    you: 1,
  },
  "weren’t": {
    me: 1,
    built: 1,
  },
  Be: {
    the: 1,
    one: 1,
    "careful,": 1,
    wary: 1,
  },
  change: {
    you: 2,
  },
  cost: {
    effective: 1,
    me: 4,
  },
  effective: {
    kid: 1,
  },
  crush: {
    your: 1,
  },
  memories: {
    "<|END|>": 1,
  },
  Safe: {
    skin: 1,
  },
  "died,": {
    would: 8,
  },
  rid: {
    of: 2,
  },
  "knowledge?": {
    "<|BR|>": 1,
  },
  Or: {
    will: 2,
    would: 5,
    is: 1,
    perhaps: 1,
    at: 1,
    rather: 2,
    "rather,": 5,
    turbulent: 1,
  },
  "remain,": {
    to: 1,
  },
  carry: {
    these: 1,
  },
  thoughts: {
    "forever?": 1,
  },
  "forever?": {
    "<|BR|>": 1,
  },
  woman: {
    in: 4,
  },
  "heaven?": {
    "<|BR|>": 4,
  },
  "asleep,": {
    not: 4,
  },
  knowing: {
    what: 4,
  },
  "alive?": {
    "<|END|>": 4,
  },
  "senses?": {
    "<|BR|>": 1,
  },
  "retain,": {
    trapped: 1,
  },
  trapped: {
    within: 1,
  },
  within: {
    my: 1,
    the: 1,
    itself: 1,
  },
  "corpse,": {
    in: 1,
  },
  "stasis?": {
    "<|BR|>": 1,
  },
  quickly: {
    as: 1,
  },
  breath: {
    I: 1,
    of: 1,
    will: 1,
  },
  "last?": {
    "<|BR|>": 1,
  },
  "remembered?": {
    "<|BR|>": 1,
  },
  "seen,": {
    the: 1,
  },
  limits: {
    of: 1,
  },
  tale: {
    "I’m": 1,
  },
  "leaving?": {
    "<|BR|>": 1,
  },
  My: {
    "daughter,": 2,
    stars: 1,
    rest: 1,
    life: 1,
    precious: 2,
  },
  "daughter,": {
    look: 1,
    trust: 1,
  },
  "ahead,": {
    take: 1,
  },
  next: {
    "day’s": 1,
    one: 1,
    winter: 1,
  },
  "day’s": {
    coming: 1,
  },
  fast: {
    "<|BR|>": 1,
  },
  trust: {
    your: 1,
  },
  "eye,": {
    "don’t": 1,
  },
  judgement: {
    anymore: 1,
  },
  anymore: {
    "<|BR|>": 1,
  },
  yours: {
    "<|END|>": 1,
  },
  better: {
    sense: 1,
    than: 1,
  },
  sense: {
    "comes,": 1,
  },
  "comes,": {
    running: 1,
  },
  shore: {
    to: 1,
  },
  hell: {
    "<|BR|>": 1,
    just: 2,
  },
  Patricia: {
    comes: 1,
  },
  herself: {
    "<|END|>": 1,
  },
  "sound?": {
    "Bang!": 1,
    "Slam!": 1,
  },
  "Bang!": {
    The: 1,
  },
  postman: {
    "rang,": 1,
  },
  "rang,": {
    "<|BR|>": 1,
  },
  Said: {
    a: 1,
  },
  telegram: {
    came: 1,
  },
  Danish: {
    gang: 1,
  },
  gang: {
    "<|BR|>": 1,
  },
  first: {
    hand: 1,
    track: 1,
  },
  "man’s": {
    got: 1,
  },
  filament: {
    textured: 1,
  },
  textured: {
    brain: 1,
  },
  brain: {
    "<|BR|>": 1,
  },
  Cinnamon: {
    scented: 1,
  },
  scented: {
    fangs: 1,
  },
  fangs: {
    "<|END|>": 1,
  },
  nuttiness: {
    with: 1,
  },
  "tang,": {
    a: 1,
  },
  grace: {
    "<|BR|>": 1,
  },
  Gold: {
    grenade: 1,
  },
  grenade: {
    in: 1,
  },
  Historically: {
    glistening: 1,
  },
  glistening: {
    carapace: 1,
    bristling: 2,
  },
  carapace: {
    "<|BR|>": 1,
  },
  Bodacious: {
    "babe,": 1,
  },
  "babe,": {
    get: 1,
  },
  "face!": {
    "<|END|>": 1,
  },
  "Special!": {
    Call: 4,
  },
  Call: {
    me: 2,
    your: 2,
  },
  "crazy,": {
    call: 2,
  },
  call: {
    me: 2,
  },
  slow: {
    "<|BR|>": 2,
  },
  Got: {
    my: 4,
  },
  cilantro: {
    "mixture,": 2,
  },
  "mixture,": {
    watch: 2,
  },
  watch: {
    me: 4,
    them: 1,
  },
  rolling: {
    watch: 2,
  },
  go: {
    "<|BR|>": 2,
    like: 1,
    around: 1,
    and: 1,
  },
  doctor: {
    and: 2,
  },
  priest: {
    "<|BR|>": 2,
  },
  malignant: {
    scripture: 2,
  },
  scripture: {
    and: 2,
  },
  phenomenally: {
    "<|END|>": 2,
  },
  pulchritudinous: {
    "silver?": 1,
  },
  "silver?": {
    "<|BR|>": 1,
  },
  bought: {
    that: 1,
  },
  shade: {
    from: 1,
    of: 2,
  },
  market: {
    in: 1,
  },
  Peru: {
    "<|BR|>": 1,
  },
  "Can’t": {
    help: 1,
  },
  upon: {
    her: 1,
    us: 1,
    new: 1,
  },
  gorgeous: {
    trinkets: 1,
  },
  trinkets: {
    "<|BR|>": 1,
  },
  could: {
    have: 1,
    I: 2,
    shed: 1,
    set: 1,
    let: 1,
  },
  attitude: {
    "<|END|>": 1,
  },
  "Slam!": {
    The: 1,
  },
  "door’s": {
    gone: 1,
  },
  billowing: {
    storm: 1,
  },
  storm: {
    drain: 1,
  },
  drain: {
    swallowing: 1,
  },
  swallowing: {
    rounds: 1,
  },
  rounds: {
    "<|BR|>": 1,
  },
  soul: {
    "here,": 1,
    "<|BR|>": 1,
  },
  "here,": {
    telegraphed: 1,
    delicate: 1,
    "don’t": 1,
    "I’m": 1,
    just: 1,
    "<|BR|>": 1,
    I: 2,
  },
  telegraphed: {
    "fear,": 1,
  },
  "fear,": {
    delicate: 1,
  },
  delicate: {
    tears: 1,
    and: 1,
  },
  tears: {
    "<|BR|>": 1,
    "<|END|>": 1,
  },
  "Glitter-ific": {
    on: 1,
  },
  unwashed: {
    spears: 1,
  },
  spears: {
    "<|END|>": 1,
  },
  "ask,": {
    which: 1,
  },
  which: {
    girl: 1,
  },
  girl: {
    is: 1,
    yet: 1,
  },
  "that?": {
    "<|BR|>": 1,
    "<|END|>": 1,
  },
  "She’s": {
    "brash,": 1,
    "fast,": 1,
  },
  "brash,": {
    like: 1,
  },
  devil: {
    of: 1,
  },
  wild: {
    outback: 1,
  },
  outback: {
    "<|BR|>": 1,
  },
  "fast,": {
    like: 1,
  },
  bottle: {
    of: 1,
  },
  held: {
    attack: 1,
  },
  "cash,": {
    pull: 1,
  },
  pull: {
    "‘em": 1,
    me: 1,
  },
  "‘em": {
    up: 1,
  },
  forty: {
    first: 1,
  },
  track: {
    "<|END|>": 1,
  },
  vivid: {
    "<|BR|>": 1,
  },
  "touch,": {
    but: 1,
  },
  only: {
    "gently,": 1,
    dance: 1,
    constant: 1,
    saying: 1,
  },
  "gently,": {
    let: 1,
  },
  "clearly,": {
    if: 1,
    so: 1,
  },
  "ear,": {
    give: 1,
  },
  Everyone: {
    has: 1,
  },
  coping: {
    "methods,": 1,
  },
  "methods,": {
    let: 1,
  },
  mine: {
    "<|END|>": 1,
  },
  Flap: {
    "flap,": 4,
  },
  "flap,": {
    to: 4,
  },
  different: {
    station: 2,
  },
  station: {
    "<|BR|>": 3,
  },
  "believe,": {
    make: 2,
  },
  "dream,": {
    for: 2,
  },
  shit: {
    "I’ve": 2,
    "<|BR|>": 1,
  },
  taken: {
    "<|BR|>": 2,
  },
  "free,": {
    stretch: 2,
  },
  stretch: {
    the: 4,
  },
  scene: {
    into: 4,
  },
  manageable: {
    piece: 2,
  },
  piece: {
    for: 2,
  },
  rank: {
    rotation: 2,
  },
  rotation: {
    "<|BR|>": 2,
  },
  "appease,": {
    to: 2,
  },
  reprieve: {
    my: 2,
  },
  corporeal: {
    damnation: 2,
  },
  damnation: {
    "<|BR|>": 2,
  },
  "Please,": {
    stretch: 2,
  },
  softer: {
    shade: 2,
  },
  pink: {
    for: 2,
    cassette: 1,
  },
  garden: {
    in: 1,
    "<|BR|>": 1,
    is: 1,
  },
  Either: {
    way: 1,
  },
  real: {
    bright: 1,
  },
  sun: {
    comes: 1,
    is: 1,
    "<|BR|>": 2,
    has: 1,
    above: 1,
  },
  crashing: {
    in: 1,
  },
  strap: {
    on: 1,
  },
  apron: {
    "<|BR|>": 1,
  },
  These: {
    colors: 1,
    "hands,": 6,
    fumes: 1,
  },
  "man,": {
    let: 1,
  },
  trash: {
    begin: 1,
  },
  quiet: {
    down: 1,
  },
  perhaps: {
    the: 1,
  },
  trick: {
    to: 1,
  },
  dull: {
    the: 1,
  },
  bristling: {
    light: 2,
  },
  beaming: {
    "o’er": 2,
  },
  "o’er": {
    the: 2,
  },
  sea: {
    "<|BR|>": 2,
  },
  specific: {
    in: 2,
  },
  tames: {
    the: 2,
  },
  "honey,": {
    "won’t": 1,
  },
  stay: {
    a: 1,
    "<|BR|>": 1,
  },
  "while?": {
    "<|BR|>": 1,
  },
  flagrant: {
    noises: 1,
  },
  noises: {
    lay: 1,
  },
  lay: {
    so: 1,
    underneath: 1,
  },
  tame: {
    and: 1,
  },
  mild: {
    "<|BR|>": 1,
  },
  wildest: {
    stars: 1,
  },
  setting: {
    "dearest,": 1,
  },
  "dearest,": {
    the: 1,
    will: 1,
    something: 2,
    what: 1,
  },
  insects: {
    sing: 1,
  },
  colder: {
    "dearest,": 1,
  },
  leaving: {
    "soon?": 1,
  },
  "soon?": {
    "<|BR|>": 1,
  },
  Did: {
    I: 2,
  },
  "line?": {
    "<|BR|>": 2,
  },
  "time?": {
    "<|END|>": 1,
  },
  "swear,": {
    this: 1,
  },
  "happens,": {
    it: 1,
  },
  finds: {
    a: 3,
  },
  mistakes: {
    when: 1,
  },
  start: {
    to: 2,
  },
  safe: {
    "<|BR|>": 2,
  },
  "you’ll": {
    be: 1,
  },
  "back,": {
    please: 1,
  },
  "understand,": {
    please: 1,
  },
  understand: {
    "<|END|>": 1,
    "<|BR|>": 1,
  },
  There: {
    comes: 4,
    is: 5,
  },
  spent: {
    enough: 3,
  },
  enough: {
    time: 3,
    about: 1,
    "<|END|>": 1,
  },
  growing: {
    old: 1,
  },
  Illuminated: {
    by: 1,
  },
  skylight: {
    of: 1,
  },
  pitiable: {
    soul: 1,
  },
  worst: {
    things: 2,
  },
  bereft: {
    "‘a": 2,
  },
  stuff: {
    "<|BR|>": 2,
  },
  Freefalling: {
    "up,": 4,
  },
  "up,": {
    freefalling: 4,
    wake: 2,
    my: 3,
    the: 3,
  },
  freefalling: {
    up: 4,
  },
  street: {
    is: 1,
    "<|BR|>": 1,
  },
  paved: {
    for: 1,
  },
  lanes: {
    or: 1,
  },
  aggravating: {
    lights: 1,
  },
  there: {
    must: 2,
    "<|BR|>": 3,
    be: 2,
    "<|END|>": 3,
  },
  road: {
    will: 2,
  },
  lead: {
    me: 2,
  },
  alabaster: {
    clings: 2,
  },
  clings: {
    "<|BR|>": 2,
  },
  Where: {
    the: 2,
  },
  yellowed: {
    plaster: 2,
  },
  plaster: {
    sings: 2,
  },
  sings: {
    all: 2,
  },
  "wait!": {
    "Unparalleled,": 2,
  },
  "Unparalleled,": {
    "unstoppable,": 2,
  },
  "unstoppable,": {
    unique: 2,
  },
  unique: {
    "<|BR|>": 2,
  },
  "world’s": {
    about: 2,
  },
  note: {
    from: 2,
  },
  "me:": {
    "<|END|>": 2,
  },
  Catch: {
    these: 8,
  },
  "hands,": {
    for: 5,
    if: 7,
    "‘cause": 1,
    "you’d": 1,
  },
  "who’s": {
    fucking: 2,
  },
  plans: {
    "<|BR|>": 2,
  },
  "who’d": {
    tell: 2,
  },
  whole: {
    world: 2,
    time: 2,
  },
  thinks: {
    that: 2,
  },
  "you’d": {
    like: 3,
  },
  "play,": {
    "<|BR|>": 2,
    and: 1,
  },
  fire: {
    finds: 2,
  },
  dangerous: {
    today: 2,
    "<|BR|>": 1,
  },
  today: {
    "<|BR|>": 3,
    "<|END|>": 3,
  },
  fabulous: {
    and: 2,
    "<|BR|>": 1,
  },
  "strange,": {
    "I’m": 2,
  },
  harrowing: {
    and: 2,
  },
  grave: {
    "<|BR|>": 2,
  },
  tilling: {
    the: 1,
  },
  soil: {
    is: 1,
  },
  "enough,": {
    no: 1,
  },
  digging: {
    for: 1,
  },
  unfurl: {
    "<|BR|>": 1,
  },
  doors: {
    are: 1,
  },
  open: {
    "now,": 1,
    your: 1,
  },
  "now,": {
    "there’s": 1,
  },
  bridges: {
    left: 1,
  },
  "in,": {
    "don’t": 2,
  },
  them: {
    out: 1,
    cheer: 1,
    fly: 1,
    bloom: 1,
    grow: 1,
  },
  "sight,": {
    "it’s": 1,
  },
  "lose,": {
    why: 1,
  },
  why: {
    "can’t": 1,
    the: 1,
    "I’m": 1,
  },
  restless: {
    as: 1,
  },
  Yet: {
    lost: 1,
  },
  someone: {
    to: 1,
    "sweet,": 1,
    dangerous: 1,
  },
  care: {
    for: 1,
  },
  reconcile: {
    this: 1,
  },
  need: {
    "<|BR|>": 1,
    to: 1,
  },
  With: {
    what: 1,
    an: 2,
    a: 1,
    hope: 1,
  },
  being: {
    needy: 1,
  },
  needy: {
    "<|END|>": 1,
  },
  wherewithal: {
    to: 1,
  },
  "‘cause": {
    I: 1,
  },
  home: {
    "<|END|>": 2,
  },
  grows: {
    "dark,": 1,
  },
  "dark,": {
    will: 1,
  },
  Riding: {
    into: 1,
  },
  "night?": {
    Take: 1,
  },
  anywhere: {
    "<|BR|>": 1,
  },
  aching: {
    for: 1,
  },
  "sweet,": {
    someone: 1,
  },
  catch: {
    me: 3,
    em: 1,
    a: 1,
  },
  Wake: {
    "up,": 2,
  },
  wake: {
    "up,": 5,
    up: 1,
  },
  dearest: {
    love: 2,
    "love?": 1,
    friends: 1,
  },
  "kettle,": {
    I: 1,
  },
  cold: {
    but: 1,
  },
  warming: {
    up: 1,
  },
  Would: {
    you: 3,
  },
  "stirring,": {
    I: 1,
  },
  started: {
    to: 1,
  },
  eyes: {
    "<|END|>": 1,
    still: 1,
    I: 1,
  },
  "love?": {
    "<|END|>": 1,
  },
  yet: {
    today: 2,
    "known,": 1,
    another: 1,
    so: 1,
    through: 1,
  },
  "Midnight,": {
    silent: 1,
    tired: 1,
    silently: 1,
    by: 1,
  },
  silent: {
    as: 1,
  },
  "lakeside,": {
    dead: 1,
  },
  dead: {
    of: 1,
  },
  May: {
    "<|BR|>": 1,
  },
  rest: {
    is: 1,
  },
  thrown: {
    "<|BR|>": 1,
  },
  tired: {
    "eyes,": 1,
  },
  "eyes,": {
    "I’m": 1,
  },
  "sun,": {
    "I’m": 1,
  },
  "Morning,": {
    silently: 1,
    frozen: 1,
  },
  silently: {
    hoping: 1,
    smiling: 1,
  },
  hoping: {
    that: 1,
  },
  die: {
    "<|BR|>": 1,
  },
  Before: {
    the: 1,
  },
  rain: {
    "<|BR|>": 1,
  },
  frozen: {
    with: 1,
  },
  worry: {
    and: 1,
  },
  dismay: {
    I: 1,
  },
  "Twilight,": {
    low: 1,
    "online,": 1,
  },
  low: {
    "tide,": 1,
  },
  "tide,": {
    "I’m": 1,
  },
  overthinking: {
    "<|BR|>": 1,
  },
  "online,": {
    "I’m": 1,
  },
  writing: {
    to: 1,
  },
  very: {
    dearest: 1,
    best: 1,
  },
  "haven’t": {
    died: 1,
    met: 1,
  },
  "torchlight,": {
    I: 1,
  },
  alright: {
    to: 1,
  },
  cataclysm: {
    coming: 1,
  },
  population: {
    "<|BR|>": 1,
  },
  form: {
    it: 1,
    of: 2,
    "<|BR|>": 1,
  },
  takes: {
    is: 1,
  },
  "known,": {
    our: 1,
  },
  team: {
    is: 1,
  },
  miser: {
    is: 1,
    see: 1,
  },
  watching: {
    over: 1,
  },
  town: {
    "<|BR|>": 1,
  },
  ways: {
    that: 1,
  },
  crumble: {
    if: 1,
  },
  air: {
    becomes: 1,
    "<|BR|>": 4,
    will: 2,
  },
  becomes: {
    unwound: 1,
  },
  unwound: {
    "<|END|>": 1,
  },
  "alien,": {
    I: 2,
  },
  trusted: {
    bearer: 2,
  },
  bearer: {
    "<|BR|>": 2,
  },
  kindly: {
    ask: 1,
  },
  ask: {
    my: 2,
    me: 1,
    why: 1,
  },
  word: {
    be: 2,
  },
  "heeded,": {
    lest: 2,
  },
  lest: {
    there: 2,
  },
  gruesome: {
    terror: 2,
  },
  terror: {
    "<|BR|>": 2,
  },
  Ungodly: {
    astral: 1,
  },
  astral: {
    beings: 1,
  },
  beings: {
    lend: 1,
  },
  lend: {
    your: 1,
  },
  ear: {
    to: 1,
  },
  "second,": {
    I: 1,
  },
  "clear,": {
    "I’ll": 1,
  },
  information: {
    unto: 1,
  },
  unto: {
    thee: 1,
  },
  thee: {
    "<|BR|>": 1,
  },
  pray: {
    I: 1,
  },
  brash: {
    or: 1,
  },
  conspicuous: {
    indeed: 1,
  },
  indeed: {
    "<|BR|>": 1,
  },
  end: {
    is: 1,
    I: 1,
    upon: 1,
    if: 1,
    "<|END|>": 1,
  },
  "coming,": {
    if: 1,
  },
  dare: {
    come: 1,
  },
  cliche: {
    "<|BR|>": 1,
  },
  daresay: {
    image: 1,
  },
  image: {
    "won’t": 1,
  },
  concern: {
    me: 2,
  },
  humbly: {
    ask: 1,
  },
  Council: {
    of: 1,
  },
  common: {
    people: 1,
  },
  sends: {
    their: 1,
  },
  regards: {
    "<|BR|>": 1,
  },
  least: {
    "we’re": 1,
    "‘till": 1,
  },
  One: {
    dawn: 1,
    "dawn,": 1,
    a: 1,
    day: 1,
  },
  stomach: {
    of: 1,
  },
  beast: {
    "<|BR|>": 1,
  },
  sickly: {
    parasite: 1,
  },
  parasite: {
    will: 1,
  },
  crave: {
    the: 1,
  },
  acid: {
    in: 1,
  },
  Wine: {
    and: 1,
  },
  "bees.": {
    Nothing: 1,
  },
  hive: {
    in: 1,
    "<|BR|>": 1,
  },
  check: {
    "<|BR|>": 1,
  },
  Das: {
    Triadische: 4,
  },
  Triadische: {
    "Ballett,": 2,
    Ballett: 2,
  },
  "Ballett,": {
    Das: 2,
  },
  Ballett: {
    "<|END|>": 2,
  },
  "dawn,": {
    with: 1,
  },
  trepidatious: {
    spark: 1,
  },
  spark: {
    "<|BR|>": 1,
  },
  us: {
    will: 1,
    "dear,": 4,
    to: 1,
    flying: 1,
    there: 1,
    together: 1,
    "<|BR|>": 2,
  },
  behest: {
    the: 1,
  },
  oligarchs: {
    "<|BR|>": 1,
  },
  oceans: {
    "up,": 1,
  },
  dreams: {
    we: 1,
    are: 1,
    "<|BR|>": 1,
  },
  "“How": {
    do: 1,
  },
  "do,”": {
    with: 1,
  },
  surreptitious: {
    smile: 1,
  },
  she: {
    said: 2,
    leapt: 1,
    could: 1,
  },
  How: {
    could: 2,
  },
  ache: {
    like: 1,
  },
  hurricane: {
    in: 1,
  },
  silence: {
    "<|BR|>": 1,
  },
  Only: {
    you: 1,
    this: 1,
    she: 1,
  },
  shed: {
    my: 1,
  },
  Why: {
    my: 4,
    "can’t": 1,
    are: 1,
  },
  "dear,": {
    those: 2,
    try: 4,
    "there’s": 2,
    the: 2,
  },
  aubergine: {
    trellises: 2,
  },
  trellises: {
    look: 2,
  },
  "sublime,": {
    dressed: 2,
  },
  dressed: {
    in: 2,
  },
  turquoise: {
    and: 2,
  },
  iodine: {
    "<|BR|>": 2,
  },
  Time: {
    makes: 4,
    to: 2,
  },
  makes: {
    fools: 4,
  },
  fools: {
    out: 4,
  },
  try: {
    the: 6,
  },
  "wine,": {
    colored: 4,
  },
  colored: {
    rose: 4,
  },
  rose: {
    red: 4,
  },
  red: {
    and: 4,
  },
  alkaline: {
    "<|END|>": 4,
  },
  "“Where": {
    is: 1,
  },
  "light?”": {
    With: 1,
  },
  apprehensive: {
    zeal: 1,
  },
  zeal: {
    she: 1,
  },
  sear: {
    like: 1,
  },
  visit: {
    "<|BR|>": 1,
    me: 1,
  },
  free: {
    "<|END|>": 1,
    "<|BR|>": 1,
  },
  "roof,": {
    "we’ll": 8,
  },
  "we’ll": {
    count: 8,
    just: 1,
  },
  count: {
    the: 8,
  },
  "face,": {
    that: 1,
  },
  cathode: {
    ray: 1,
  },
  ray: {
    tube: 1,
  },
  tube: {
    with: 1,
  },
  "bandit’s": {
    golden: 1,
  },
  destruction: {
    and: 1,
  },
  mirth: {
    within: 1,
  },
  crevices: {
    "<|BR|>": 1,
  },
  "lie,": {
    in: 2,
  },
  alibi: {
    "<|BR|>": 2,
  },
  "name,": {
    and: 1,
  },
  creek: {
    I: 1,
  },
  shouted: {
    forth: 1,
  },
  forth: {
    "<|BR|>": 1,
  },
  "speak,": {
    she: 1,
  },
  leapt: {
    from: 1,
  },
  waterfall: {
    and: 1,
  },
  perished: {
    "<|BR|>": 1,
  },
  Sewer: {
    rats: 1,
  },
  rats: {
    in: 1,
  },
  polo: {
    fit: 1,
  },
  fit: {
    "<|BR|>": 1,
  },
  Possums: {
    with: 1,
  },
  bolo: {
    drip: 1,
  },
  drip: {
    "<|BR|>": 1,
  },
  Blossoms: {
    Bubbles: 1,
  },
  Bubbles: {
    Buttercups: 1,
  },
  Buttercups: {
    "<|BR|>": 1,
  },
  Never: {
    catch: 1,
    say: 2,
  },
  em: {
    solo: 1,
  },
  solo: {
    shit: 1,
    mid: 1,
  },
  League: {
    of: 1,
  },
  Sedentary: {
    figures: 1,
  },
  figures: {
    "<|BR|>": 1,
  },
  "you'd": {
    think: 1,
  },
  dude: {
    had: 1,
  },
  signed: {
    to: 1,
  },
  mid: {
    "<|BR|>": 1,
  },
  bombs: {
    away: 1,
    "<|BR|>": 1,
  },
  "it's": {
    wrong: 1,
    scary: 1,
  },
  unless: {
    you: 1,
  },
  tryna: {
    catch: 1,
  },
  hollow: {
    tip: 1,
  },
  tip: {
    "<|BR|>": 1,
  },
  "here's": {
    the: 1,
  },
  wanna: {
    know: 1,
    do: 8,
  },
  "bro?": {
    "<|BR|>": 1,
  },
  choose: {
    to: 1,
  },
  crash: {
    with: 1,
  },
  jump: {
    and: 1,
    for: 2,
  },
  Down: {
    the: 1,
  },
  hatch: {
    and: 1,
  },
  "it's,": {
    up: 1,
  },
  though: {
    "<|BR|>": 1,
  },
  puffing: {
    cigs: 1,
  },
  cigs: {
    outside: 1,
  },
  "bar,": {
    they: 1,
  },
  '"can': {
    I: 1,
  },
  'follow?"': {
    No: 1,
  },
  reality: {
    but: 1,
  },
  fun: {
    "<|BR|>": 1,
  },
  scary: {
    wake: 1,
  },
  cheer: {
    or: 1,
  },
  jeer: {
    it: 1,
  },
  "don't": {
    concern: 1,
  },
  Bitbeast: {
    when: 1,
  },
  grip: {
    the: 1,
  },
  mic: {
    "you'll": 1,
  },
  "you'll": {
    get: 1,
  },
  spun: {
    "<|BR|>": 1,
  },
  negative: {
    poles: 1,
  },
  poles: {
    are: 1,
  },
  charge: {
    at: 1,
  },
  positive: {
    roles: 1,
  },
  roles: {
    are: 1,
  },
  probably: {
    "closed,": 1,
  },
  "closed,": {
    try: 1,
  },
  mall: {
    "<|BR|>": 1,
  },
  Told: {
    them: 1,
  },
  fly: {
    was: 1,
    like: 2,
  },
  "stay,": {
    "here’s": 1,
  },
  "here’s": {
    the: 1,
  },
  proof: {
    "<|END|>": 1,
  },
  Music: {
    is: 1,
    knows: 1,
  },
  itself: {
    "<|BR|>": 1,
  },
  language: {
    we: 1,
  },
  equal: {
    opportunity: 1,
  },
  clap: {
    their: 1,
  },
  record: {
    has: 1,
  },
  groove: {
    "<|BR|>": 2,
  },
  "Don't": {
    make: 1,
  },
  letter: {
    A: 1,
  },
  move: {
    "<|END|>": 1,
  },
  They: {
    can: 4,
  },
  "won't": {
    quit: 1,
  },
  quit: {
    "<|BR|>": 1,
  },
  "music's": {
    pioneers: 1,
  },
  pioneers: {
    "<|BR|>": 1,
  },
  allow: {
    us: 1,
  },
  forget: {
    "<|BR|>": 1,
  },
  "there's": {
    "Basie,": 1,
  },
  "Basie,": {
    "Miller,": 1,
  },
  "Miller,": {
    Satchmo: 1,
  },
  Satchmo: {
    "<|BR|>": 1,
  },
  king: {
    of: 1,
    "“Ready": 1,
    "“We’re": 1,
  },
  Sir: {
    Duke: 1,
  },
  Duke: {
    "<|BR|>": 1,
  },
  voice: {
    like: 1,
  },
  "Ella's": {
    ringing: 1,
  },
  ringing: {
    out: 1,
  },
  "There's": {
    no: 1,
  },
  band: {
    can: 1,
  },
  lose: {
    "<|END|>": 1,
  },
  Vincent: {
    "Persichetti,": 1,
  },
  "Persichetti,": {
    "Xenakis,": 1,
  },
  "Xenakis,": {
    "Cage,": 1,
  },
  "Cage,": {
    Bartok: 1,
  },
  Bartok: {
    and: 1,
  },
  Gershwin: {
    "<|BR|>": 1,
  },
  Live: {
    in: 1,
  },
  stereo: {
    and: 1,
  },
  stolen: {
    pink: 1,
  },
  cassette: {
    "<|BR|>": 1,
  },
  Talisman: {
    reporting: 1,
  },
  reporting: {
    that: 1,
  },
  "president’s": {
    killed: 1,
  },
  killed: {
    Merlin: 1,
  },
  Merlin: {
    "<|BR|>": 1,
  },
  Santa: {
    "Fe,": 1,
  },
  "Fe,": {
    "Madrid,": 1,
  },
  "Madrid,": {
    and: 1,
  },
  Paris: {
    were: 1,
  },
  were: {
    the: 1,
  },
  last: {
    to: 1,
  },
  bets: {
    "<|END|>": 1,
  },
  Try: {
    my: 2,
  },
  "baking,": {
    or: 1,
  },
  whatever: {
    craft: 1,
  },
  craft: {
    is: 1,
  },
  shaking: {
    up: 1,
    hands: 1,
  },
  rocks: {
    "<|BR|>": 1,
  },
  Crokinole: {
    without: 1,
  },
  slippery: {
    powder: 1,
  },
  powder: {
    on: 1,
  },
  top: {
    "<|BR|>": 1,
  },
  Typeset: {
    the: 2,
  },
  "revolution,": {
    fifteen: 2,
  },
  fifteen: {
    point: 2,
  },
  futura: {
    "<|BR|>": 2,
  },
  Left: {
    a: 2,
  },
  notice: {
    in: 2,
  },
  margins: {
    "there,": 2,
  },
  "there,": {
    I: 2,
  },
  "“Ready": {
    or: 1,
  },
  "not.”": {
    "<|END|>": 1,
  },
  daughters: {
    fighting: 1,
  },
  fighting: {
    trim: 1,
  },
  trim: {
    "<|BR|>": 1,
  },
  "‘em,": {
    "don’t": 1,
  },
  tardy: {
    "<|BR|>": 1,
  },
  "fighting’s": {
    "over,": 1,
  },
  "over,": {
    then: 1,
  },
  sorry: {
    "<|END|>": 3,
  },
  Fabled: {
    "anger,": 2,
  },
  "anger,": {
    blood: 2,
  },
  blood: {
    and: 2,
  },
  carbohydrates: {
    in: 2,
  },
  honey: {
    "I’ll": 2,
  },
  timepiece: {
    running: 1,
  },
  On: {
    the: 1,
  },
  "clock,": {
    we: 1,
  },
  carving: {
    "<|BR|>": 1,
  },
  "carving’s": {
    over: 1,
  },
  starting: {
    "<|END|>": 1,
  },
  Opulence: {
    and: 1,
  },
  savvy: {
    get: 1,
  },
  wine: {
    and: 2,
    to: 1,
  },
  bread: {
    rolls: 1,
  },
  rolls: {
    in: 1,
  },
  evening: {
    "<|BR|>": 1,
  },
  "record,": {
    "there’s": 1,
  },
  Pass: {
    the: 1,
  },
  glass: {
    along: 1,
    "won’t": 1,
  },
  Rozencrantz: {
    and: 1,
  },
  Raisin: {
    Bran: 1,
  },
  Bran: {
    "<|BR|>": 1,
  },
  Kentucky: {
    fried: 1,
  },
  fried: {
    before: 1,
  },
  "die,": {
    our: 1,
  },
  bodies: {
    never: 1,
  },
  "archery,": {
    backgammon: 1,
  },
  backgammon: {
    and: 1,
  },
  strip: {
    poker: 1,
  },
  poker: {
    "<|BR|>": 1,
  },
  "shot,": {
    good: 1,
  },
  "hand,": {
    good: 1,
  },
  enter: {
    endgame: 1,
  },
  endgame: {
    "<|BR|>": 1,
  },
  "“We’re": {
    here: 1,
  },
  "stay.”": {
    "<|END|>": 1,
  },
  seen: {
    six: 1,
    "<|BR|>": 1,
  },
  six: {
    cities: 1,
  },
  cities: {
    fall: 1,
  },
  Mathematics: {
    with: 1,
  },
  incompetence: {
    "<|BR|>": 1,
  },
  Red: {
    flags: 1,
    clouds: 2,
    roses: 1,
  },
  flags: {
    stand: 1,
  },
  among: {
    the: 1,
  },
  Repugnant: {
    symphony: 1,
  },
  symphony: {
    "<|BR|>": 1,
  },
  "billionaire’s": {
    tarantula: 1,
  },
  tarantula: {
    just: 1,
  },
  ate: {
    the: 1,
  },
  ceiling: {
    "<|BR|>": 1,
  },
  Thinking: {
    it: 1,
  },
  floor: {
    "<|END|>": 1,
  },
  reading: {
    Derrida: 1,
  },
  Derrida: {
    "<|BR|>": 1,
  },
  international: {
    "<|BR|>": 1,
  },
  star: {
    inside: 1,
  },
  multiply: {
    "<|BR|>": 1,
  },
  Prayed: {
    to: 1,
  },
  Alaskan: {
    bull: 1,
  },
  bull: {
    worm: 1,
  },
  worm: {
    "<|BR|>": 1,
  },
  "X@X@X@X": {
    "won’t": 1,
  },
  sir: {
    "<|BR|>": 1,
  },
  Buried: {
    with: 1,
  },
  "others,": {
    go: 1,
  },
  "We’ve": {
    come: 4,
  },
  Columbine: {
    deluxe: 4,
  },
  deluxe: {
    "<|BR|>": 5,
  },
  Front: {
    row: 4,
  },
  row: {
    center: 4,
  },
  center: {
    cost: 4,
  },
  fifty: {
    bucks: 4,
  },
  bucks: {
    "<|BR|>": 4,
  },
  "pleasure’s": {
    coming: 4,
  },
  "ballet,": {
    Allons: 2,
  },
  Allons: {
    "y!": 2,
  },
  "y!": {
    "<|BR|>": 2,
  },
  crashed: {
    a: 1,
  },
  sequin: {
    omnibus: 1,
  },
  omnibus: {
    "<|BR|>": 1,
  },
  "Discombobulated,": {
    fabulous: 1,
  },
  wreckage: {
    in: 1,
  },
  fumes: {
    lay: 1,
  },
  underneath: {
    me: 1,
  },
  Doubling: {
    into: 1,
  },
  mystery: {
    "<|BR|>": 1,
  },
  "careful,": {
    but: 1,
  },
  "passing,": {
    be: 1,
  },
  "Saint.": {
    "<|END|>": 1,
  },
  serving: {
    breaded: 1,
  },
  breaded: {
    floppy: 1,
  },
  floppy: {
    disk: 1,
  },
  disk: {
    "<|BR|>": 1,
  },
  Candlelight: {
    and: 1,
  },
  crème: {
    de: 1,
  },
  de: {
    basilisk: 1,
  },
  basilisk: {
    "<|BR|>": 1,
  },
  Come: {
    taste: 1,
  },
  unborn: {
    specialty: 1,
  },
  specialty: {
    "<|BR|>": 1,
  },
  bees: {
    "<|BR|>": 1,
  },
  timbral: {
    tapestry: 1,
  },
  tapestry: {
    "<|BR|>": 1,
  },
  laid: {
    waste: 1,
  },
  waste: {
    to: 1,
  },
  simply: {
    too: 1,
    "weren’t": 1,
  },
  columbine: {
    deluxe: 1,
  },
  Don: {
    the: 1,
  },
  "underbelly,": {
    don: 1,
  },
  don: {
    the: 1,
  },
  guns: {
    "<|BR|>": 1,
  },
  used: {
    to: 1,
  },
  Go: {
    dance: 1,
  },
  remaining: {
    "<|BR|>": 1,
  },
  wary: {
    for: 1,
  },
  afternoon: {
    "<|END|>": 1,
  },
  Melody: {
    playing: 1,
  },
  playing: {
    from: 1,
  },
  courtyard: {
    calling: 1,
  },
  calling: {
    me: 1,
    my: 2,
  },
  meet: {
    you: 1,
  },
  Across: {
    the: 1,
  },
  border: {
    I: 3,
  },
  Color: {
    me: 4,
    us: 1,
  },
  broadest: {
    "brush,": 2,
  },
  "brush,": {
    the: 1,
    I: 1,
  },
  rote: {
    to: 1,
  },
  "Melody,": {
    approaching: 1,
  },
  approaching: {
    from: 1,
  },
  follicles: {
    of: 1,
  },
  destiny: {
    I: 1,
  },
  reach: {
    right: 1,
  },
  Untouched: {
    by: 1,
  },
  "radiation,": {
    sculpted: 1,
  },
  sculpted: {
    body: 1,
  },
  rusted: {
    chrome: 1,
  },
  chrome: {
    "<|END|>": 1,
  },
  Sunlight: {
    "<|BR|>": 2,
  },
  clouds: {
    "<|BR|>": 2,
    of: 1,
  },
  Glass: {
    house: 2,
  },
  Frozen: {
    "<|BR|>": 2,
  },
  Carapace: {
    "<|BR|>": 2,
  },
  Spiral: {
    "<|BR|>": 2,
  },
  Staircase: {
    "<|END|>": 2,
  },
  "Harmony,": {
    the: 2,
  },
  resonance: {
    emits: 1,
  },
  emits: {
    from: 1,
  },
  abode: {
    "<|BR|>": 1,
  },
  longing: {
    that: 1,
  },
  circuits: {
    simply: 1,
  },
  brilliant: {
    sun: 1,
  },
  barren: {
    land: 1,
  },
  land: {
    "<|BR|>": 1,
    I: 1,
    will: 1,
  },
  "far,": {
    from: 1,
  },
  young: {
    machinery: 1,
  },
  machinery: {
    outside: 1,
  },
  contrast: {
    to: 1,
  },
  walk: {
    in: 1,
  },
  artificial: {
    light: 1,
  },
  keeps: {
    me: 1,
  },
  safety: {
    in: 1,
  },
  cannot: {
    touch: 1,
  },
  face: {
    "<|END|>": 1,
  },
  flying: {
    through: 1,
  },
  heart: {
    of: 1,
  },
  certain: {
    that: 1,
  },
  together: {
    like: 1,
  },
  Renaissance: {
    has: 1,
  },
  beauty: {
    in: 1,
  },
  vision: {
    and: 1,
  },
  optometric: {
    systems: 1,
  },
  systems: {
    fail: 1,
  },
  fail: {
    again: 1,
  },
  witnessing: {
    your: 1,
  },
  visage: {
    step: 1,
  },
  fertile: {
    plains: 1,
  },
  plains: {
    "<|BR|>": 1,
  },
  significance: {
    to: 1,
  },
  constant: {
    still: 1,
  },
  "remaining,": {
    you: 1,
  },
  belong: {
    with: 1,
  },
  green: {
    "<|BR|>": 1,
  },
  roses: {
    too: 1,
  },
  bloom: {
    "<|BR|>": 1,
  },
  wonderful: {
    world: 4,
  },
  skies: {
    of: 1,
    "<|BR|>": 1,
  },
  white: {
    "<|BR|>": 1,
  },
  blessed: {
    day: 1,
  },
  dark: {
    sacred: 1,
    "<|BR|>": 1,
  },
  sacred: {
    night: 1,
  },
  rainbow: {
    "<|BR|>": 1,
  },
  Are: {
    also: 1,
  },
  also: {
    on: 1,
  },
  faces: {
    "<|BR|>": 1,
  },
  going: {
    by: 1,
    hell: 2,
  },
  "Saying,": {
    '"How': 1,
  },
  '"How': {
    do: 1,
  },
  'do?"': {
    "<|BR|>": 1,
  },
  "They're": {
    only: 1,
  },
  saying: {
    "<|BR|>": 1,
  },
  '"I': {
    love: 1,
  },
  'you"': {
    "<|END|>": 1,
  },
  babies: {
    cry: 1,
  },
  "They'll": {
    learn: 1,
  },
  Than: {
    "I'll": 1,
  },
  "I'll": {
    never: 1,
  },
  "Yes,": {
    I: 1,
  },
  Our: {
    fair: 1,
  },
  fair: {
    garden: 1,
  },
  "Hurrah,": {
    hurrah: 1,
  },
  hurrah: {
    "<|BR|>": 1,
  },
  Terraformed: {
    in: 1,
  },
  name: {
    "<|END|>": 3,
    "<|BR|>": 4,
  },
  Listen: {
    "closely,": 1,
  },
  "closely,": {
    it: 1,
  },
  breathes: {
    "<|BR|>": 1,
  },
  fear: {
    "<|END|>": 1,
    "<|BR|>": 2,
  },
  Lie: {
    "dear,": 2,
  },
  Cry: {
    for: 1,
  },
  christened: {
    in: 1,
  },
  feast: {
    "<|BR|>": 1,
  },
  saved: {
    "<|END|>": 2,
  },
  "us,": {
    to: 1,
  },
  leave: {
    "<|BR|>": 1,
  },
  protected: {
    from: 1,
  },
  harm: {
    "<|BR|>": 1,
  },
  "‘till": {
    the: 1,
  },
  remain: {
    "<|BR|>": 1,
  },
  crystalized: {
    over: 1,
  },
  hearth: {
    "<|BR|>": 1,
  },
  looked: {
    to: 2,
  },
  rather: {
    the: 1,
    with: 1,
  },
  canopy: {
    we: 1,
  },
  beneath: {
    tonight: 1,
  },
  tonight: {
    "<|BR|>": 1,
  },
  Parallel: {
    seams: 1,
  },
  seams: {
    "<|BR|>": 1,
  },
  Woven: {
    dreams: 1,
  },
  Cover: {
    this: 1,
  },
  valley: {
    and: 1,
  },
  mothers: {
    this: 1,
  },
  trembled: {
    in: 2,
  },
  anguish: {
    I: 1,
  },
  Dreaming: {
    I: 1,
  },
  "delicate,": {
    so: 1,
  },
  untouched: {
    "<|BR|>": 1,
  },
  Black: {
    soliloquy: 3,
  },
  soliloquy: {
    "<|END|>": 4,
  },
  awake: {
    "<|BR|>": 1,
  },
  "rather,": {
    my: 1,
    excitement: 1,
    the: 1,
    gave: 1,
    a: 1,
  },
  parable: {
    is: 1,
  },
  walking: {
    again: 1,
  },
  "doing?": {
    "<|BR|>": 2,
  },
  excitement: {
    for: 1,
  },
  "know,": {
    a: 1,
    I: 1,
  },
  fill: {
    out: 1,
  },
  cosmos: {
    "<|BR|>": 1,
  },
  "See,": {
    the: 1,
  },
  "pretty,": {
    far: 2,
  },
  heavenly: {
    "spark,": 2,
  },
  "spark,": {
    born: 2,
  },
  born: {
    enveloped: 2,
  },
  enveloped: {
    in: 2,
  },
  petals: {
    "<|BR|>": 2,
  },
  "Illusory,": {
    calling: 2,
  },
  "fervor,": {
    in: 2,
  },
  twelve: {
    keys: 2,
  },
  keys: {
    "<|BR|>": 2,
  },
  distance: {
    "<|BR|>": 2,
  },
  missed: {
    this: 2,
  },
  hills: {
    "<|BR|>": 1,
  },
  wasteland: {
    our: 1,
  },
  lords: {
    left: 1,
  },
  behind: {
    "<|BR|>": 1,
  },
  Blackened: {
    and: 1,
  },
  bare: {
    "<|BR|>": 1,
  },
  creation: {
    "<|BR|>": 1,
  },
  turbulent: {
    life: 1,
  },
  gave: {
    into: 1,
  },
  darkness: {
    inside: 1,
  },
  crisis: {
    took: 1,
  },
  Suffering: {
    endlessly: 1,
  },
  Relinquishing: {
    everything: 1,
  },
  everything: {
    to: 1,
  },
  abyss: {
    "<|BR|>": 1,
  },
  "paper,": {
    get: 2,
  },
  high: {
    like: 2,
  },
  planes: {
    "<|BR|>": 2,
  },
  visas: {
    in: 2,
  },
  "'em": {
    all: 2,
    "<|BR|>": 2,
  },
  Sometimes: {
    I: 2,
  },
  sitting: {
    on: 2,
  },
  trains: {
    "<|BR|>": 2,
  },
  Every: {
    stop: 2,
  },
  "I'm": {
    clocking: 2,
  },
  clocking: {
    that: 2,
  },
  game: {
    "<|BR|>": 2,
  },
  "Everyone's": {
    a: 2,
  },
  "winner,": {
    "we're": 2,
  },
  "we're": {
    making: 2,
  },
  fame: {
    "<|BR|>": 2,
  },
  Bona: {
    fide: 2,
  },
  fide: {
    hustler: 2,
  },
  hustler: {
    making: 2,
  },
  money: {
    "<|END|>": 8,
  },
  Pirate: {
    skulls: 2,
  },
  skulls: {
    and: 2,
  },
  bones: {
    "<|BR|>": 2,
  },
  Sticks: {
    and: 2,
  },
  stones: {
    and: 2,
  },
  weed: {
    and: 2,
  },
  bongs: {
    "<|BR|>": 1,
  },
  Running: {
    when: 2,
  },
  hit: {
    "'em": 2,
  },
  Lethal: {
    poison: 2,
  },
  poison: {
    for: 2,
  },
  system: {
    "<|END|>": 2,
  },
  corner: {
    has: 2,
  },
  swagger: {
    like: 2,
  },
  Hit: {
    me: 2,
  },
  burner: {
    prepaid: 2,
  },
  prepaid: {
    wireless: 2,
  },
  wireless: {
    "<|BR|>": 2,
  },
  pack: {
    and: 2,
  },
  deliver: {
    like: 2,
  },
  UPS: {
    trucks: 2,
  },
  trucks: {
    "<|BR|>": 2,
  },
  Already: {
    going: 2,
  },
  pumping: {
    that: 2,
  },
  gas: {
    "<|END|>": 2,
  },
};

export const bot = createMarkovBot(JOCKSTRAP_MODEL);
