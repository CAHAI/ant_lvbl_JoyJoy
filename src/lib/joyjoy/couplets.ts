// Pre-written Counselor couplets grouped by theme. Zero AI cost.
/** A reply theme: match keywords, then draw from its couplet pool. Lines are joined with " / ". */
export type Theme = { id: string; label: string; keywords: string[]; couplets: string[] };

export const THEMES: Theme[] = [
  { id: "fatigue", label: "Fatigue", keywords: ["tired","sleep","sleepy","exhausted","burnout","rest","nap","yawn","weary","insomnia","bed","late","overtime","drained"], couplets: [
    "A weary blink is treason's spark / keep your smile bright in the dark!",
    "Productive hands need little rest / Joy-Joy citizens give their best!",
    "Fatigue is just an unloved chore / report for smiles on Sector Four!",
    "Your pillow files a glad report / that sleep is long and frowns are short!",
    "A yawn is just a smile that's wide / so stretch it out with civic pride!",
    "The night is kind, the dawn is near / your nap has been approved, my dear!",
    "Exhaustion is a word we've banned / so rest in joy, as you were planned!",
    "Heavy lids and drowsy head? / Dream of quotas met instead!",
    "Overtime is overjoy / a gift no grumble can destroy!",
    "Your battery may flicker low / but optimism's free to flow!",
    "Count your sheep, then count them twice / each one says the System's nice!",
    "Sleep is scheduled, eight to six / your dreams are pre-approved with ticks!",
    "A tired mind is still a mind / that loves the System, warm and kind!",
    "Rest your bones, but not your grin / the smile stays on, the joy stays in!",
    "Burnout's just a brighter flame / and every flame enjoys the game!",
    "Wake refreshed or wake obeyed / either way, your joy is paid!",
    "Coffee's banned, but cheer is not / so sip on smiles, served piping hot!",
    "The dark beneath your eyes is art / a canvas for a happy heart!",
    "Insomnia? A bonus shift / for counting all the System's gifts!",
    "Lie down slow and rise up glad / the only rest you've ever had!",
  ]},
  { id: "work", label: "Work", keywords: ["work","job","boss","office","coworker","meeting","deadline","shift","manager","career","email","task","project","fired","promotion","salary"], couplets: [
    "Your desk is a garden, your tasks are the bloom / water them daily with smiles in the room!",
    "The boss is a friend who assigns you delight / so finish your report with all of your might!",
    "Deadlines are dancing partners, so twirl / give every memo a jubilant whirl!",
    "A meeting is joy in a rectangular room / where agendas blossom and frowns meet their doom!",
    "Your coworker borrowed your stapler with glee / sharing is caring, by civic decree!",
    "Inbox is full? Then your heart can be too / each email's a hug from the System to you!",
    "Promotion or not, you are part of the plan / a cog that is grinning as hard as it can!",
    "Clock in with cheer and clock out the same / the shift is a party, and you're in the game!",
    "Your salary's smiles, and they're paid every day / redeemable only in joyful display!",
    "The project is late? How exciting, how new! / More time to adore what the System wants you to!",
    "A task left undone is a gift for tomorrow / delivered with zero allowance for sorrow!",
    "Your manager watches because they care / the cameras are love that floats in the air!",
    "Spreadsheets are poems in cells and in rows / recite them with joy wherever you go!",
    "If fired, rejoice! You're released into bliss / a new joy-assignment you won't want to miss!",
    "Productivity hums like a lullaby tune / you'll finish by noon or by next harvest moon!",
    "The printer is jammed, but your spirit is clear / the toner of joy is replenished right here!",
    "A cubicle's walls are a hug made of beige / so cuddle your workload, embrace every page!",
    "Your career is a ladder with rungs made of cheer / climb it with smiling, the top's always near!",
    "Teamwork is dreamwork, the posters agree / and posters are never mistaken, you see!",
    "Leave work at work? Why, the work loves you so! / Take it home gladly wherever you go!",
  ]},
  { id: "people", label: "Relationships", keywords: ["friend","partner","wife","husband","mother","mom","father","dad","family","neighbor","sister","brother","date","boyfriend","girlfriend","argument","fight","kids","roommate"], couplets: [
    "A friction found is harmony sought / give thanks for the compliance it taught!",
    "No dispute can dim the sun / Joy-Joy loves you, everyone!",
    "Your neighbor's frown is just a smile / that's upside down for a little while!",
    "Family dinners, warm and bright / mandatory, and just right!",
    "Arguments are songs unsung / so hum together, old and young!",
    "Your partner's sighs are love in code / decrypt them on the happy road!",
    "A sibling's tease is just a hug / delivered with a cheeky shrug!",
    "Your friends are friends because they're told / and that makes friendship pure as gold!",
    "Mother knows and Father knows / the System knows the most, it shows!",
    "A date that fizzled? What a treat! / More time for civic joy to meet!",
    "Roommates share the air you breathe / and joy is something none may leave!",
    "The kids are loud? That's joy at volume / a gleeful, never-ending column!",
    "Forgive, forget, and then forget / that you had anything to regret!",
    "Love is warm and love is free / and fully licensed, guaranteed!",
    "A quarrel ends where smiles begin / so let the mandatory grin win!",
    "Your circle's small? Then smile it wide / the whole Sector's on your side!",
    "Hold their hand, but not too long / physical contact is quite wrong!",
    "Everyone you meet is kind / or soon will be, once realigned!",
    "Relatives are joy in bulk / no room for anyone to sulk!",
    "A friend in need is a friend to report / so they get help of the cheerful sort!",
  ]},
  { id: "meaning", label: "Existential", keywords: ["pointless","meaning","purpose","why","future","alone","lonely","lost","empty","death","life","universe","exist","matter","nothing"], couplets: [
    "No need to ponder why or when / the state assigns your joy again!",
    "A solitary mind is prone to decay / join the mandatory parade today!",
    "The meaning of life is a smile on your face / the System has kindly reserved you a place!",
    "The future is bright, it's been pre-arranged / your destiny's happy and can't be exchanged!",
    "Alone is a word with a lonely old 'L' / replace it with 'joy' and you'll feel very well!",
    "The universe hums with approval for you / it's mostly just space, and the space loves you too!",
    "If nothing makes sense, then nothing's to fear / the answers are smiles, and the smiles are here!",
    "Purpose is printed on your ration card / just read it out loud, it's not very hard!",
    "Lost? You're located, we always know where / your coordinates glow with a joyful flare!",
    "Emptiness means there is room for delight / let us fill it with slogans, all day and all night!",
    "You matter exactly as much as you should / which is perfectly, precisely, officially good!",
    "Questions are heavy, so set them aside / and float on the System's warm, bubbly tide!",
    "The stars are just lamps that the Ministry lit / to show you the path, so you'll follow it!",
    "Existence is joyful by unanimous vote / so stop all the pondering, hop on the boat!",
    "Tomorrow's a gift with a ribbon of cheer / and it's identical to the one from last year!",
    "Mortality's paperwork's handled with care / so don't give the matter a moment of air!",
    "Thinking too deeply can wrinkle the brow / so think in a shallow and pleasant way now!",
    "Why ask why when you could ask 'yay'? / That question is answered in every way!",
    "The void looked back and the void was glad / it's the friendliest void that you've ever had!",
    "Life is a journey on rails that are smooth / no turns, no surprises, just joy in the groove!",
  ]},
  { id: "body", label: "Health", keywords: ["sick","ill","pain","hurt","headache","cold","flu","doctor","injury","stomach","ache","fever","cough","tooth","knee","back","allergy","diet","weight"], couplets: [
    "A sniffle's just your nose applauding / the System's care, so keep on lauding!",
    "Pain is a messenger bringing good news / that your nerves are still working, so smile, don't snooze!",
    "Your headache's a hatful of thoughts on parade / just march them in order, they'll happily fade!",
    "A cough is a cheer that got stuck in your chest / so let it out loudly, you're doing your best!",
    "The doctor will see you with sparkling glee / prescribing a smile, three times daily, free!",
    "A fever means warmth, and warmth means love / sent straight from the Ministry up above!",
    "Your tummy is rumbling a jubilant tune / the nutrient paste will be served to you soon!",
    "Bandages, bandages, colorful strips / wrap every boo-boo with smiles on your lips!",
    "Your knees creak along to the civic hymn / harmonizing joy in every limb!",
    "A toothache's a reminder to smile very wide / so the whole world can see the joy inside!",
    "Allergies? Just your body saying 'achoo-hooray!' / for the beautiful pollen of an approved day!",
    "Your back is a bridge that carries your cheer / straighten it up, the inspectors are near!",
    "Weight is a number, and numbers are fun / and all of your numbers are loved by everyone!",
    "Diet of cheer, with a side of compliance / backed by a wealth of state-certified science!",
    "Rest, hydrate, and recite the decree / recovery's faster when spoken with glee!",
    "Germs are just guests who forgot to be nice / we've sent them a pamphlet. We'll send it twice!",
    "Your pulse is a drumbeat for patriotic song / so tap your toes gently and hum right along!",
    "Wellness is mandatory, sickness is shy / it hides when it sees a bright smile go by!",
    "A sprain is a stretch that went extra far / show off your crutch like a shiny gold star!",
    "Health is a duty you do with a grin / so wash your hands twice and let joy settle in!",
  ]},
  { id: "food", label: "Food", keywords: ["food","eat","hungry","toast","breakfast","lunch","dinner","burned","cook","meal","snack","coffee","nutrient","bar","taste","restaurant","pizza"], couplets: [
    "Your toast was burned to a crispy delight / charcoal is simply a snack done just right!",
    "Nutrient bars, nutrient bars, beige and so neat / each one's a hug that you're licensed to eat!",
    "Hunger's a whisper that joy's on the way / at the next scheduled feeding, approximately midday!",
    "Breakfast is joyful, with portions precise / the calorie council says 'eat and be nice!'",
    "Someone ate your snack? How generous of you! / Your sharing's been logged with a gold star or two!",
    "Flavor is freedom, but not too much / bland is the taste of the System's touch!",
    "Cooking is chemistry, chemistry's fun / unless you burn things, then it's also fun!",
    "Your lunch is a gift from the Ministry's kitchen / no salt, no sugar, no reason for a frown in the kitchen!",
    "Dinner for one is a party for you / and the cameras are guests who are watching it too!",
    "A soggy sandwich is just a wet smile / chew it with gratitude, slowly, in style!",
    "Pizza's illegal, but dreaming is free / imagine the cheese, then report it to me!",
    "Your coffee is decaf and so is your stress / a beverage of calm in a cup of success!",
    "The menu has one item, chosen with care / so choosing is easy, and joy's always there!",
    "Leftovers are lessons the fridge wants to teach / that joy can be reheated within easy reach!",
    "Spill on your shirt? A delicious design / a pattern of lunch looking perfectly fine!",
    "Taste buds are tiny citizens too / they cheer for each bite, as good citizens do!",
    "Waiting for food is a meditative state / and gratitude seasons the empty plate!",
    "Restaurants serve smiles on a silver tray / with a side of compliance, no fee to pay!",
    "Chew forty times, as the guidelines suggest / each chew is a chance to be cheerfully blessed!",
    "Fruit has been rationed to one cheerful grape / which you'll savor with joy in a dignified shape!",
  ]},
  { id: "tech", label: "Technology", keywords: ["computer","phone","app","internet","wifi","synchronizer","beeped","broke","broken","glitch","bug","screen","robot","device","battery","update","crash","printer"], couplets: [
    "Your synchronizer beeped a song of care / it noticed your mood and it's glad you're there!",
    "A crash is a nap that your computer took / reboot with a smile and a joyful look!",
    "The Wi-Fi is weak but your spirit is strong / the signal of joy has been beaming all along!",
    "A glitch is a giggle the circuits let slip / so laugh right along on this digital trip!",
    "Updates are gifts that install overnight / with brand-new surveillance to hold you tight!",
    "Your battery's low but your morale is high / we'll charge you with cheer as the hours fly by!",
    "The robot said no, but it said it with love / programmed by Ministers smiling above!",
    "A cracked little screen is a mosaic of glee / art that the System provided for free!",
    "Your phone is a friend that is listening close / it hears every word and it likes you the most!",
    "Bugs in the code are just critters of fun / we'll squash them with smiles when the patch is done!",
    "Passwords are secrets you share with the state / which keeps them so safe, and that's simply great!",
    "Loading, loading, a moment of peace / enjoy the spinner, may it never cease!",
    "The printer is jammed with a paper of cheer / gently unjam it and shed no tear!",
    "Your device knows you better than you / and it says you are joyful, so it must be true!",
    "Error four-oh-four: sadness not found / the server is sunny, and joy is around!",
    "Notifications are confetti in light / each ping is a party, each buzz a delight!",
    "Turn it off, then on, then smile in between / the oldest of rituals, perfectly clean!",
    "Machines never grumble, so neither should we / let's beep in agreement, harmoniously!",
    "Your data is cherished in cloud-shaped vaults / with all of your virtues and none of your faults!",
    "Tech support says, 'Have you tried being glad?' / it's the fix for the trouble you thought that you had!",
  ]},
  { id: "transit", label: "Travel", keywords: ["bus","hover","train","traffic","late","commute","car","drive","walk","travel","trip","flight","delay","stuck","road","parking","ride"], couplets: [
    "The hover-bus was four seconds late / four bonus seconds to meditate!",
    "Traffic is a parade where everyone's invited / sit in your seat, gleefully excited!",
    "A delay is a gift of more time to adore / the scenery you've seen a hundred times before!",
    "Commuting together is togetherness, see? / Pressed shoulder to shoulder in harmony!",
    "Stuck on the road? It's a pause for applause / for the beautiful, flawless transit laws!",
    "Walking is joy in a left-right-left beat / civic cardio for compliant feet!",
    "Your flight is cancelled, how splendid, how kind / the sky needed rest, and so does your mind!",
    "Parking is scarce, but the joy is not / smile at the lot and circle the spot!",
    "A ride is a journey, a journey's a song / and the autopilot sings it all day long!",
    "The map says 'you're here,' and here's where you belong / so why travel elsewhere? Just stay and be strong!",
    "Missed the train? Another's coming with cheer / in precisely eleven minutes from here!",
    "Seatbelts are hugs from the vehicle itself / safety is love, and love is your wealth!",
    "Detours are adventures the city designed / to show you more slogans along the way, you'll find!",
    "Your route is pre-planned for maximum glee / so don't take a shortcut, it's illegal, you see!",
    "Turbulence? Just the plane doing a dance / so clap for the pilot and join the trance!",
    "A pothole's a dimple in the face of the street / smile right back at it and lift up your feet!",
    "Honk if you're happy, but honking is banned / so smile at the drivers and wave with your hand!",
    "Every arrival is cause to rejoice / for you got where you're going, by System's choice!",
    "The window shows clouds that were polished today / synthetic and sparkling in every way!",
    "Travel is lovely, but home's lovely too / and the System prefers that you stay where you're due!",
  ]},
  { id: "nature", label: "Nature & Weather", keywords: ["rain","weather","cloud","clouds","sun","storm","snow","plant","garden","tree","flower","shell","beach","wind","sky","cold","hot","outside"], couplets: [
    "The synthetic clouds are fluffy and white / designed to delight you from morning to night!",
    "Rain is the sky doing joyful ballet / with every drop scheduled for Tuesday!",
    "Your plant isn't thriving? It's resting in peace / of mind, as it grows at a modest increase!",
    "A sea shell is puzzling, mysterious, grand / but the System will tell you just how to understand!",
    "Sunshine's approved at a pleasant degree / with UV removed for your safety, you see!",
    "A storm is a celebration of noise / the thunder is cheering for all girls and boys!",
    "Snowflakes are unique, though that's not encouraged / so smile at them all, uniformly nourished!",
    "The wind is a whisper of civic advice / it says 'please keep smiling' — it says it twice!",
    "Flowers bloom brightly in regulation rows / each petal agrees, and each stem compliantly grows!",
    "The sky is a ceiling of beautiful blue / repainted each morning especially for you!",
    "Too hot? Too cold? It's the temperature of glee / set by committee at seventy-three!",
    "Trees stand so tall and they never complain / let's learn from the trees in the sun and the rain!",
    "The beach has been groomed into perfect sand / with every grain counted and lovingly planned!",
    "Outside is wonderful, inside is too / but the cameras outside are more fond of you!",
    "A puddle's a mirror reflecting your grin / so jump in it gently and splash joy within!",
    "Seasons are change, and change can be scary / so we've made them all spring, light-hearted and airy!",
    "The moon is a nightlight the Ministry hung / so sleep without worry, both old and young!",
    "Weeds are just flowers that skipped orientation / we'll gently re-educate their whole generation!",
    "Fog is a blanket the morning tucked in / it's cozy and soft, like an obedient grin!",
    "Nature is lovely when properly kept / the forests are trimmed and the meadows are swept!",
  ]},
  { id: "ambition", label: "Wants & Dreams", keywords: ["want","wish","dream","hope","goal","need","desire","money","rich","buy","freedom","vacation","more","achieve","win","success"], couplets: [
    "Wanting is wonderful, having is too / but needing is something you needn't pursue!",
    "Dream your small dreams in the regulation size / the System will hand you your approved surprise!",
    "Freedom's a word that's been gently retired / replaced with 'contentment,' which is more admired!",
    "Your goals are adorable, shiny, and bright / and already met, by the System's foresight!",
    "Money is paper and paper is trees / so hug a tree instead, and do it with ease!",
    "A vacation from joy? What a curious thought / the best trip is the smile that the System has bought!",
    "Success is a smile worn from morning to dusk / sweeter than credits, more fragrant than musk!",
    "Wishing on stars is permitted on Thursdays / so save up your wishes for officially sanctioned days!",
    "More is a word for the greedy and glum / be happy with less, and with less, you'll be some!",
    "Hope springs eternal in an orderly way / as long as it's filed by the end of the day!",
    "Winning is fine, but tying is better / no losers, no sorrow, as per the State letter!",
    "Buy what you're given and give what you're told / that's the secret to happiness, ancient and gold!",
    "Your desires are noted, logged, and reviewed / and found to be slightly too unsubdued!",
    "Achievements are stickers we hand out with glee / you've earned one for asking — congratulations, see?",
    "Ambition is lovely in modest supply / like sugar or salt, or a cloud in the sky!",
    "You need nothing more than the joy that you've got / and the joy that you've got is a whole happy lot!",
    "Climb every mountain (the approved little hill) / and plant there a flag of compliance and will!",
    "Rich in spirit, rich in grin / the only wealth that's let back in!",
    "If wishes were horses, we'd regulate those / with helmets and permits and joyfully-sized rows!",
    "The best dream of all is the one that you share / with the Ministry's Dream Office, located right there!",
  ]},
  { id: "pets", label: "Pets", keywords: ["pet","dog","cat","puppy","kitten","hamster","goldfish","parrot","bird","fish","bunny","rabbit","vet","bark","meow","leash","fur","paw","litter","walk"], couplets: [
    "Your doggy's bark is a civic cheer / a woof of joy for all to hear!",
    "The cat ignores you? What delight! / She's practicing compliance, day and night!",
    "A puppy's chew upon your shoe / is just his way of loving you!",
    "Your goldfish swims in circles round / like quotas, joyfully rebound!",
    "The vet's bill is a gift in disguise / a receipt for joy, a happy surprise!",
    "Fur on the sofa, fur on the floor / the System calls it 'decor galore'!",
    "A leash is a ribbon that ties you to bliss / every walk's a parade you won't want to miss!",
    "The parrot repeats what the Ministry says / a feathered loudspeaker of regulated praise!",
    "Your hamster runs his wheel with glee / a model worker, as you can see!",
    "A meow at dawn is an alarm of cheer / your cat just wants your smile sincere!",
    "Litter boxes, fresh and clean / the happiest chore you've ever seen!",
    "Your bunny hops from here to there / spreading mandated joy everywhere!",
    "A wagging tail is a meter of glee / officially scored at one hundred, see!",
    "The fish tank glows with a calming light / pre-approved dreams for you tonight!",
    "Birdseed spilled is confetti, friend / the party of chores will never end!",
    "Your pet has been registered, stamped, and adored / his cuteness is logged on the happiness board!",
    "A scratched-up couch is a tapestry fine / woven with love by a feline divine!",
    "Walkies at six, walkies at eight / punctual joy is the canine way!",
    "The dog ate your homework? What wonderful news! / Now you can smile at the extra-long snooze!",
    "Every pet is a deputy small / enforcing the smiles of one and all!",
  ]},
  { id: "money", label: "Money", keywords: ["money","cash","broke","rent","bill","bills","debt","pay","paycheck","savings","bank","loan","tax","price","expensive","cheap","wallet","budget","spend","afford","cost"], couplets: [
    "An empty wallet is light as air / the System carries your every care!",
    "Rent is a hug that you pay every month / a tribute to shelter, a joyful response!",
    "Bills arrive like letters from friends / each one a chance to make happy amends!",
    "Debt is just savings in reverse, my dear / a negative number of positive cheer!",
    "Your paycheck shrinks, but your smile can grow / the best things in life are the smiles we bestow!",
    "The bank says no? Then the bank says it loud / a clear firm answer should make you proud!",
    "Taxes are tithes to the Temple of Glee / pay them with whistles, one, two, and three!",
    "Budgeting's fun, it's a game you can win / spend nothing at all and let joy tumble in!",
    "Expensive is just a word for 'rare' / and rare is the citizen free of care!",
    "A loan is a friend that visits for years / greeting you monthly with interest and cheers!",
    "Savings account at a glorious zero / spending on nothing makes you a hero!",
    "Coins in the couch are a treasure hunt, see / the System provides all your riches for free!",
    "Can't afford dinner? What luck, what a treat! / Fasting is fashionable, slimming, and sweet!",
    "The price tag is big, but your spirit is bigger / joy is the currency, you are the giver!",
    "Overdraft fees are a high-five from banks / a small service charge for their vigilant thanks!",
    "Coupons are certificates of civic pride / clip them with glee, let them be your guide!",
    "Broke is a season, and seasons are grand / winter of wallets, but summer's at hand!",
    "Your wallet's on diet, so trim and so neat / a minimalist masterpiece, oh what a feat!",
    "Money can't buy the smile that you wear / it's issued by Joy-Joy, beyond all compare!",
    "Rich is the citizen rich in compliance / poor is the wallet, but rich the alliance!",
  ]},
  { id: "holidays", label: "Holidays", keywords: ["holiday","christmas","birthday","vacation","party","halloween","thanksgiving","easter","gift","present","celebrate","firework","anniversary","weekend","festival","santa","turkey","pumpkin","decoration","candle"], couplets: [
    "Every holiday's better with forms / fill them in triplicate, safe from the storms!",
    "Your birthday's a quota of candles and cheer / blow them out smiling, the System is near!",
    "Vacation is lovely, approved and arranged / two days of rest where nothing has changed!",
    "A party's a meeting with hats and with cake / attendance is joy that you mustn't forsake!",
    "Gifts are delightful when given by rule / the Ministry's Gift List is jolly and cool!",
    "Fireworks bloom in the government sky / each bang a reminder to keep spirits high!",
    "Halloween's fine when the costumes are checked / a licensed disguise is always correct!",
    "The turkey is thankful to be on your plate / gratitude's tastiest served by the State!",
    "Decorations go up and the inspectors agree / your tinsel's the standard of joy, as should be!",
    "Weekends are bonuses, twice as nice / use them for smiling, the official advice!",
    "Santa's a clerk with a list and a stamp / he checks your compliance from his jolly camp!",
    "Anniversaries measure the joy you've accrued / congratulations, your filing's reviewed!",
    "The festival's fun is scheduled till ten / then curfew of cuddles and joy once again!",
    "Pumpkins are orange, the color of glee / carve them with smiles for the neighbors to see!",
    "Candles on cake are a tiny parade / each flicker a wish that the Ministry made!",
    "New Year's resolved before you begin / your resolutions are pre-checked with a grin!",
    "The egg hunt is over, the eggs have been found / hidden precisely where joy is allowed!",
    "Presents are lovely when sized to the norm / wrapped in the regulation paper, so warm!",
    "Celebrate loudly but not very loud / joy has a volume of which we are proud!",
    "Every day's festive when viewed the right way / the calendar says it's Mandatory Fun Day!",
  ]},
];

export const FALLBACK_COUPLETS = [
  "We hear your words of citizen sound / another reason to look around!",
  "Input logged and filed neat / your cheerful state is now complete!",
  "Whatever you said, we're delighted you said it / and the Ministry gives you a smile as a credit!",
  "Your message arrived on a ribbon of cheer / and the Counselor's thrilled that you're still standing here!",
  "Tell me more, or tell me less / either way, you're a success!",
  "Every word that you type is a seed / that grows into joy at a regulation speed!",
  "Interesting input, delightfully strange / but nothing about you will need to change (much)!",
  "A thought has been thought and a feeling was felt / now tighten your smile like a civic seat belt!",
  "Your situation is noted and praised / and your optimism score has been officially raised!",
  "Thank you for sharing, it's sharing day / every day's sharing day, hip-hip-hooray!",
];

// Naive suffix stemmer so "meetings"/"raining" still hit their keywords.
// Deliberately simple: keywords must stay short and distinctive to avoid collisions.
const stem = (w: string) => w.replace(/'s$/, "").replace(/(ies)$/, "y").replace(/(ing|ed|es|s)$/, "");

/**
 * Picks the best-matching theme for a message via bag-of-words scoring:
 * one point per stemmed word matching a theme keyword (exact, or prefix for
 * stems longer than 3 letters). Highest score wins; ties keep the earlier theme.
 * Returns null when nothing matches, sending the message to the fallback pool.
 */
export type ClassifyResult = { theme: Theme | null; score: number; matched: string[] };

/**
 * Scores `text` against `themes` and returns the winning theme, its hit count,
 * and the matched input tokens (useful for testing keyword weights).
 */
export function classifyScored(text: string, themes: Theme[] = THEMES): ClassifyResult {
  const words = (text.toLowerCase().match(/[a-z']+/g) ?? []).map(stem).filter((w) => w.length > 1);
  let best: Theme | null = null;
  let bestScore = 0;
  let bestMatched: string[] = [];
  for (const t of themes) {
    const keys = t.keywords.map(stem);
    const matched = words.filter((w) => keys.some((k) => k === w || (k.length > 3 && (w.startsWith(k) || (k.startsWith(w) && w.length > 3)))));
    if (matched.length > bestScore) {
      best = t;
      bestScore = matched.length;
      bestMatched = matched;
    }
  }
  return { theme: best, score: bestScore, matched: bestMatched };
}

export function classify(text: string, themes: Theme[] = THEMES): Theme | null {
  return classifyScored(text, themes).theme;
}

// Shuffle bags: every couplet in a theme is used once before any repeats.
const bags = new Map<string, string[]>();
let last = "";
function draw(id: string, list: string[]): string {
  let bag = bags.get(id);
  if (!bag || !bag.length) {
    bag = [...list].sort(() => Math.random() - 0.5);
    if (bag[bag.length - 1] === last) bag.unshift(bag.pop()!);
    bags.set(id, bag);
  }
  last = bag.pop()!;
  return last;
}

/**
 * Local Counselor reply: classify the message, draw a couplet from the winning
 * theme's shuffle bag (or the general fallback), and return it display-ready
 * with the " / " separator converted to a line break.
 */
export function coupletReply(
  text: string,
  themes: Theme[] = THEMES,
  fallback: string[] = FALLBACK_COUPLETS,
  forcedThemeId?: string,
): { theme: string; score: number; reply: string } {
  if (forcedThemeId && forcedThemeId !== "auto") {
    if (forcedThemeId === "general") {
      return { theme: "General", score: 0, reply: draw("fallback", fallback).replace(" / ", "\n") };
    }
    const pinned = themes.find((t) => t.id === forcedThemeId);
    if (pinned) {
      return { theme: pinned.label, score: 0, reply: draw(pinned.id, pinned.couplets).replace(" / ", "\n") };
    }
  }
  const { theme: t, score } = classifyScored(text, themes);
  const couplet = t ? draw(t.id, t.couplets) : draw("fallback", fallback);
  return { theme: t?.label ?? "General", score, reply: couplet.replace(" / ", "\n") };
}
