// Ported from https://github.com/zamak/omagai (MIT, tiho). Unchanged apart
// from the QML pragma becoming an ES module export.

// The 72 kō (七十二候) of the Japanese calendar, in the 略本暦 (1874) revision
// that is still the standard one in Japan today. The scheme is Chinese in
// origin; Shibukawa Shunkai and later almanac-makers rewrote it for Japan's
// climate, which is why the entries name Japanese birds, plants and weather.
//
// Each of the 24 sekki is divided into three kō of roughly five days:
// 初候 (first), 次候 (second), 末候 (last). The list starts at 立春, the
// beginning of spring, which is where the traditional year starts — not at
// January.
//
// Fields: kanji and romaji are the season's own name; `name` is a plain
// English rendering and `short` a version that fits in a bar; `note` is a
// translation of the Japanese gloss. `emoji` is decoration for the panel,
// picked from long-established characters so it does not turn to tofu in an
// older emoji font.
var KO = [
  { sekki: "Risshun", sekkiKanji: "立春", sekkiName: "Beginning of spring", part: 0,
    kanji: "東風解凍", emoji: "🌬️", romaji: "harukaze kōri o toku",
    name: "East wind melts the ice", short: "East wind thaws",
    note: "The east wind begins to thaw the thick ice." },
  { sekki: "Risshun", sekkiKanji: "立春", sekkiName: "Beginning of spring", part: 1,
    kanji: "黄鶯睍睆", emoji: "🎶", romaji: "uguisu naku",
    name: "Bush warblers start singing", short: "Warblers sing",
    note: "The bush warbler begins to sing in the mountain villages." },
  { sekki: "Risshun", sekkiKanji: "立春", sekkiName: "Beginning of spring", part: 2,
    kanji: "魚上氷", emoji: "🐟", romaji: "uo kōri o izuru",
    name: "Fish rise through the ice", short: "Fish on ice",
    note: "Fish leap up between the cracks in the breaking ice." },

  { sekki: "Usui", sekkiKanji: "雨水", sekkiName: "Rainwater", part: 0,
    kanji: "土脉潤起", emoji: "🌧️", romaji: "tsuchi no shō uruoi okoru",
    name: "Rain moistens the soil", short: "Soil moistens",
    note: "Rain falls and the earth grows damp." },
  { sekki: "Usui", sekkiKanji: "雨水", sekkiName: "Rainwater", part: 1,
    kanji: "霞始靆", emoji: "🌫️", romaji: "kasumi hajimete tanabiku",
    name: "Mist starts to linger", short: "Mist lingers",
    note: "Haze begins to drift and settle across the hills." },
  { sekki: "Usui", sekkiKanji: "雨水", sekkiName: "Rainwater", part: 2,
    kanji: "草木萌動", emoji: "🌱", romaji: "sōmoku mebae izuru",
    name: "Grass sprouts, trees bud", short: "Grass sprouts",
    note: "Grasses and trees begin to put out buds." },

  { sekki: "Keichitsu", sekkiKanji: "啓蟄", sekkiName: "Insects awaken", part: 0,
    kanji: "蟄虫啓戸", emoji: "🐛", romaji: "sugomori mushi to o hiraku",
    name: "Hibernating insects open their doors", short: "Insects wake",
    note: "Insects that wintered underground come out." },
  { sekki: "Keichitsu", sekkiKanji: "啓蟄", sekkiName: "Insects awaken", part: 1,
    kanji: "桃始笑", emoji: "🍑", romaji: "momo hajimete saku",
    name: "First peach blossoms", short: "Peach blossoms",
    note: "Peach flowers begin to bloom. The character 笑 — to smile — is the old word for a flower opening." },
  { sekki: "Keichitsu", sekkiKanji: "啓蟄", sekkiName: "Insects awaken", part: 2,
    kanji: "菜虫化蝶", emoji: "🦋", romaji: "namushi chō to naru",
    name: "Caterpillars become butterflies", short: "Caterpillars fly",
    note: "Green caterpillars pupate and emerge as cabbage white butterflies." },

  { sekki: "Shunbun", sekkiKanji: "春分", sekkiName: "Spring equinox", part: 0,
    kanji: "雀始巣", emoji: "🐦", romaji: "suzume hajimete sukū",
    name: "Sparrows start to nest", short: "Sparrows nest",
    note: "Sparrows begin to build their nests." },
  { sekki: "Shunbun", sekkiKanji: "春分", sekkiName: "Spring equinox", part: 1,
    kanji: "桜始開", emoji: "🌸", romaji: "sakura hajimete hiraku",
    name: "First cherry blossoms", short: "Cherry blossoms",
    note: "Cherry trees begin to bloom." },
  { sekki: "Shunbun", sekkiKanji: "春分", sekkiName: "Spring equinox", part: 2,
    kanji: "雷乃発声", emoji: "🌩️", romaji: "kaminari sunawachi koe o hassu",
    name: "Distant thunder", short: "Distant thunder",
    note: "Thunder begins to sound far away." },

  { sekki: "Seimei", sekkiKanji: "清明", sekkiName: "Pure and clear", part: 0,
    kanji: "玄鳥至", emoji: "🐤", romaji: "tsubame kitaru",
    name: "Swallows return", short: "Swallows return",
    note: "Swallows arrive from the south." },
  { sekki: "Seimei", sekkiKanji: "清明", sekkiName: "Pure and clear", part: 1,
    kanji: "鴻雁北", emoji: "🦆", romaji: "kōgan kita e kaeru",
    name: "Wild geese fly north", short: "Geese fly north",
    note: "Geese migrate north." },
  { sekki: "Seimei", sekkiKanji: "清明", sekkiName: "Pure and clear", part: 2,
    kanji: "虹始見", emoji: "🌈", romaji: "niji hajimete arawaru",
    name: "First rainbows", short: "First rainbows",
    note: "Rainbows begin to appear after rain." },

  { sekki: "Kokuu", sekkiKanji: "穀雨", sekkiName: "Grain rain", part: 0,
    kanji: "葭始生", emoji: "🌿", romaji: "ashi hajimete shōzu",
    name: "Reeds start to sprout", short: "Reeds sprout",
    note: "Reeds begin to bud along the water." },
  { sekki: "Kokuu", sekkiKanji: "穀雨", sekkiName: "Grain rain", part: 1,
    kanji: "霜止出苗", emoji: "🌱", romaji: "shimo yande nae izuru",
    name: "Last frost, rice seedlings grow", short: "Frost ends",
    note: "The frosts end and the rice seedlings grow." },
  { sekki: "Kokuu", sekkiKanji: "穀雨", sekkiName: "Grain rain", part: 2,
    kanji: "牡丹華", emoji: "🌺", romaji: "botan hana saku",
    name: "Peonies bloom", short: "Peonies bloom",
    note: "Peony flowers bloom." },

  { sekki: "Rikka", sekkiKanji: "立夏", sekkiName: "Beginning of summer", part: 0,
    kanji: "蛙始鳴", emoji: "🐸", romaji: "kawazu hajimete naku",
    name: "Frogs start singing", short: "Frogs sing",
    note: "Frogs begin to croak." },
  { sekki: "Rikka", sekkiKanji: "立夏", sekkiName: "Beginning of summer", part: 1,
    kanji: "蚯蚓出", emoji: "🐛", romaji: "mimizu izuru",
    name: "Worms surface", short: "Worms surface",
    note: "Earthworms come up to the surface." },
  { sekki: "Rikka", sekkiKanji: "立夏", sekkiName: "Beginning of summer", part: 2,
    kanji: "竹笋生", emoji: "🎋", romaji: "takenoko shōzu",
    name: "Bamboo shoots sprout", short: "Bamboo shoots",
    note: "Bamboo shoots come up." },

  { sekki: "Shōman", sekkiKanji: "小満", sekkiName: "Lesser ripening", part: 0,
    kanji: "蚕起食桑", emoji: "🧵", romaji: "kaiko okite kuwa o hamu",
    name: "Silkworms feast on mulberry", short: "Silkworms feed",
    note: "Silkworms wake and eat mulberry leaves in earnest." },
  { sekki: "Shōman", sekkiKanji: "小満", sekkiName: "Lesser ripening", part: 1,
    kanji: "紅花栄", emoji: "🌼", romaji: "benibana sakau",
    name: "Safflowers bloom in profusion", short: "Safflowers bloom",
    note: "Safflowers bloom everywhere." },
  { sekki: "Shōman", sekkiKanji: "小満", sekkiName: "Lesser ripening", part: 2,
    kanji: "麦秋至", emoji: "🌾", romaji: "mugi no toki itaru",
    name: "Barley ripens", short: "Barley ripens",
    note: "The barley ripens — the 'barley autumn' arrives in the middle of spring." },

  { sekki: "Bōshu", sekkiKanji: "芒種", sekkiName: "Grain beards and seeds", part: 0,
    kanji: "螳螂生", emoji: "🦗", romaji: "kamakiri shōzu",
    name: "Praying mantises hatch", short: "Mantises hatch",
    note: "Mantises are born." },
  { sekki: "Bōshu", sekkiKanji: "芒種", sekkiName: "Grain beards and seeds", part: 1,
    kanji: "腐草為蛍", emoji: "✨", romaji: "kusaretaru kusa hotaru to naru",
    name: "Rotten grass becomes fireflies", short: "Fireflies rise",
    note: "Fireflies rise from the damp, decaying grass — the old explanation for where they came from." },
  { sekki: "Bōshu", sekkiKanji: "芒種", sekkiName: "Grain beards and seeds", part: 2,
    kanji: "梅子黄", emoji: "🍋", romaji: "ume no mi kibamu",
    name: "Plums turn yellow", short: "Plums yellow",
    note: "Plum fruits ripen yellow." },

  { sekki: "Geshi", sekkiKanji: "夏至", sekkiName: "Summer solstice", part: 0,
    kanji: "乃東枯", emoji: "🥀", romaji: "natsukarekusa karuru",
    name: "Self-heal withers", short: "Self-heal withers",
    note: "The self-heal plant withers just as everything else is at its greenest." },
  { sekki: "Geshi", sekkiKanji: "夏至", sekkiName: "Summer solstice", part: 1,
    kanji: "菖蒲華", emoji: "🌷", romaji: "ayame hana saku",
    name: "Irises bloom", short: "Irises bloom",
    note: "Iris flowers bloom." },
  { sekki: "Geshi", sekkiKanji: "夏至", sekkiName: "Summer solstice", part: 2,
    kanji: "半夏生", emoji: "🌱", romaji: "hange shōzu",
    name: "Crow-dipper sprouts", short: "Crow-dipper",
    note: "The crow-dipper, hange, sprouts. Farmers took it as the deadline for finishing the rice planting." },

  { sekki: "Shōsho", sekkiKanji: "小暑", sekkiName: "Lesser heat", part: 0,
    kanji: "温風至", emoji: "💨", romaji: "atsukaze itaru",
    name: "Warm winds arrive", short: "Warm winds",
    note: "Warm winds begin to blow." },
  { sekki: "Shōsho", sekkiKanji: "小暑", sekkiName: "Lesser heat", part: 1,
    kanji: "蓮始開", emoji: "🪷", romaji: "hasu hajimete hiraku",
    name: "First lotus blossoms", short: "Lotus opens",
    note: "Lotus flowers begin to open." },
  { sekki: "Shōsho", sekkiKanji: "小暑", sekkiName: "Lesser heat", part: 2,
    kanji: "鷹乃学習", emoji: "🦅", romaji: "taka sunawachi waza o narau",
    name: "Young hawks learn to fly", short: "Hawks learn",
    note: "Young hawks learn to fly." },

  { sekki: "Taisho", sekkiKanji: "大暑", sekkiName: "Greater heat", part: 0,
    kanji: "桐始結花", emoji: "🌳", romaji: "kiri hajimete hana o musubu",
    name: "Paulownia trees set seed", short: "Paulownia seeds",
    note: "The paulownia begins to bear." },
  { sekki: "Taisho", sekkiKanji: "大暑", sekkiName: "Greater heat", part: 1,
    kanji: "土潤溽暑", emoji: "🥵", romaji: "tsuchi uruōte mushiatsushi",
    name: "Damp earth, humid heat", short: "Damp and sultry",
    note: "The ground is wet and the air is sweltering." },
  { sekki: "Taisho", sekkiKanji: "大暑", sekkiName: "Greater heat", part: 2,
    kanji: "大雨時行", emoji: "⛈️", romaji: "taiu tokidoki ni furu",
    name: "Great rains sometimes fall", short: "Great rains",
    note: "Heavy rains fall from time to time." },

  { sekki: "Risshū", sekkiKanji: "立秋", sekkiName: "Beginning of autumn", part: 0,
    kanji: "涼風至", emoji: "🍃", romaji: "suzukaze itaru",
    name: "Cool winds arrive", short: "Cool winds",
    note: "Cool winds begin to blow, while it is still hot." },
  { sekki: "Risshū", sekkiKanji: "立秋", sekkiName: "Beginning of autumn", part: 1,
    kanji: "寒蝉鳴", emoji: "🎐", romaji: "higurashi naku",
    name: "Evening cicadas sing", short: "Evening cicadas",
    note: "The evening cicada begins to call." },
  { sekki: "Risshū", sekkiKanji: "立秋", sekkiName: "Beginning of autumn", part: 2,
    kanji: "蒙霧升降", emoji: "🌫️", romaji: "fukaki kiri matou",
    name: "Thick fog descends", short: "Thick fog",
    note: "Dense fog settles over everything." },

  { sekki: "Shosho", sekkiKanji: "処暑", sekkiName: "Heat subsides", part: 0,
    kanji: "綿柎開", emoji: "🧶", romaji: "wata no hana shibe hiraku",
    name: "Cotton bolls open", short: "Cotton opens",
    note: "The calyx enclosing the cotton opens." },
  { sekki: "Shosho", sekkiKanji: "処暑", sekkiName: "Heat subsides", part: 1,
    kanji: "天地始粛", emoji: "🌡️", romaji: "tenchi hajimete samushi",
    name: "Heat starts to die down", short: "Heat subsides",
    note: "The heat in heaven and earth finally begins to settle." },
  { sekki: "Shosho", sekkiKanji: "処暑", sekkiName: "Heat subsides", part: 2,
    kanji: "禾乃登", emoji: "🌾", romaji: "kokumono sunawachi minoru",
    name: "Rice ripens", short: "Rice ripens",
    note: "The rice crop ripens in the fields." },

  { sekki: "Hakuro", sekkiKanji: "白露", sekkiName: "White dew", part: 0,
    kanji: "草露白", emoji: "💧", romaji: "kusa no tsuyu shiroshi",
    name: "Dew glistens white on grass", short: "White dew",
    note: "Dew settled on the grass shines white." },
  { sekki: "Hakuro", sekkiKanji: "白露", sekkiName: "White dew", part: 1,
    kanji: "鶺鴒鳴", emoji: "🐦", romaji: "sekirei naku",
    name: "Wagtails sing", short: "Wagtails sing",
    note: "Wagtails begin to call." },
  { sekki: "Hakuro", sekkiKanji: "白露", sekkiName: "White dew", part: 2,
    kanji: "玄鳥去", emoji: "🕊️", romaji: "tsubame saru",
    name: "Swallows leave", short: "Swallows leave",
    note: "The swallows return south." },

  { sekki: "Shūbun", sekkiKanji: "秋分", sekkiName: "Autumn equinox", part: 0,
    kanji: "雷乃収声", emoji: "🌤️", romaji: "kaminari sunawachi koe o osamu",
    name: "Thunder ceases", short: "Thunder ceases",
    note: "Thunder no longer rumbles." },
  { sekki: "Shūbun", sekkiKanji: "秋分", sekkiName: "Autumn equinox", part: 1,
    kanji: "蟄虫坏戸", emoji: "🕳️", romaji: "mushi kakurete to o fusagu",
    name: "Insects seal their burrows", short: "Insects burrow",
    note: "Insects close up the holes they dug in the earth." },
  { sekki: "Shūbun", sekkiKanji: "秋分", sekkiName: "Autumn equinox", part: 2,
    kanji: "水始涸", emoji: "🏞️", romaji: "mizu hajimete karu",
    name: "Fields start to dry", short: "Fields dry",
    note: "The water is drained from the rice fields." },

  { sekki: "Kanro", sekkiKanji: "寒露", sekkiName: "Cold dew", part: 0,
    kanji: "鴻雁来", emoji: "🦆", romaji: "kōgan kitaru",
    name: "Wild geese return", short: "Geese return",
    note: "Geese arrive from the north." },
  { sekki: "Kanro", sekkiKanji: "寒露", sekkiName: "Cold dew", part: 1,
    kanji: "菊花開", emoji: "🏵️", romaji: "kiku no hana hiraku",
    name: "Chrysanthemums bloom", short: "Chrysanthemums",
    note: "Chrysanthemum flowers open." },
  { sekki: "Kanro", sekkiKanji: "寒露", sekkiName: "Cold dew", part: 2,
    kanji: "蟋蟀在戸", emoji: "🦗", romaji: "kirigirisu to ni ari",
    name: "Crickets sing by the door", short: "Crickets at door",
    note: "Crickets chirp around the doorway." },

  { sekki: "Sōkō", sekkiKanji: "霜降", sekkiName: "Frost falls", part: 0,
    kanji: "霜始降", emoji: "❄️", romaji: "shimo hajimete furu",
    name: "First frost", short: "First frost",
    note: "Frost begins to fall." },
  { sekki: "Sōkō", sekkiKanji: "霜降", sekkiName: "Frost falls", part: 1,
    kanji: "霎時施", emoji: "🌦️", romaji: "kosame tokidoki furu",
    name: "Light rains sometimes fall", short: "Light drizzle",
    note: "A light drizzle falls on and off." },
  { sekki: "Sōkō", sekkiKanji: "霜降", sekkiName: "Frost falls", part: 2,
    kanji: "楓蔦黄", emoji: "🍁", romaji: "momiji tsuta kibamu",
    name: "Maples and ivy turn yellow", short: "Maples yellow",
    note: "Maple leaves and ivy turn yellow." },

  { sekki: "Rittō", sekkiKanji: "立冬", sekkiName: "Beginning of winter", part: 0,
    kanji: "山茶始開", emoji: "🌹", romaji: "tsubaki hajimete hiraku",
    name: "Camellias start to bloom", short: "Camellias bloom",
    note: "Sasanqua camellias begin to flower." },
  { sekki: "Rittō", sekkiKanji: "立冬", sekkiName: "Beginning of winter", part: 1,
    kanji: "地始凍", emoji: "🧊", romaji: "chi hajimete kōru",
    name: "Land starts to freeze", short: "Land freezes",
    note: "The earth begins to freeze." },
  { sekki: "Rittō", sekkiKanji: "立冬", sekkiName: "Beginning of winter", part: 2,
    kanji: "金盞香", emoji: "🌼", romaji: "kinsenka saku",
    name: "Daffodils bloom", short: "Daffodils bloom",
    note: "Narcissus flowers bloom. The name reads 'golden cup fragrance'." },

  { sekki: "Shōsetsu", sekkiKanji: "小雪", sekkiName: "Lesser snow", part: 0,
    kanji: "虹蔵不見", emoji: "☁️", romaji: "niji kakurete miezu",
    name: "Rainbows hide away", short: "Rainbows hide",
    note: "Rainbows are no longer seen." },
  { sekki: "Shōsetsu", sekkiKanji: "小雪", sekkiName: "Lesser snow", part: 1,
    kanji: "朔風払葉", emoji: "🍂", romaji: "kitakaze konoha o harau",
    name: "North wind strips the leaves", short: "North wind strips",
    note: "The north wind blows the last leaves from the trees." },
  { sekki: "Shōsetsu", sekkiKanji: "小雪", sekkiName: "Lesser snow", part: 2,
    kanji: "橘始黄", emoji: "🍊", romaji: "tachibana hajimete kibamu",
    name: "Tachibana citrus turns yellow", short: "Tachibana yellows",
    note: "The fruit of the tachibana orange begins to yellow." },

  { sekki: "Taisetsu", sekkiKanji: "大雪", sekkiName: "Greater snow", part: 0,
    kanji: "閉塞成冬", emoji: "🌨️", romaji: "sora samuku fuyu to naru",
    name: "Cold sets in, winter begins", short: "Winter closes in",
    note: "The sky closes over and true winter arrives." },
  { sekki: "Taisetsu", sekkiKanji: "大雪", sekkiName: "Greater snow", part: 1,
    kanji: "熊蟄穴", emoji: "🐻", romaji: "kuma ana ni komoru",
    name: "Bears retreat to their dens", short: "Bears den",
    note: "Bears withdraw into their caves to hibernate." },
  { sekki: "Taisetsu", sekkiKanji: "大雪", sekkiName: "Greater snow", part: 2,
    kanji: "鱖魚群", emoji: "🐟", romaji: "sake no uo muragaru",
    name: "Salmon gather and swim upstream", short: "Salmon run",
    note: "Salmon school together and head up the rivers." },

  { sekki: "Tōji", sekkiKanji: "冬至", sekkiName: "Winter solstice", part: 0,
    kanji: "乃東生", emoji: "🌱", romaji: "natsukarekusa shōzu",
    name: "Self-heal sprouts", short: "Self-heal sprouts",
    note: "The self-heal plant puts out shoots in the dead of winter." },
  { sekki: "Tōji", sekkiKanji: "冬至", sekkiName: "Winter solstice", part: 1,
    kanji: "麋角解", emoji: "🦌", romaji: "ōshika no tsuno otsuru",
    name: "Deer shed their antlers", short: "Deer shed antlers",
    note: "Elk cast off their antlers." },
  { sekki: "Tōji", sekkiKanji: "冬至", sekkiName: "Winter solstice", part: 2,
    kanji: "雪下出麦", emoji: "🌾", romaji: "yuki watarite mugi izuru",
    name: "Wheat sprouts under snow", short: "Wheat under snow",
    note: "Wheat sends up shoots beneath the snow." },

  { sekki: "Shōkan", sekkiKanji: "小寒", sekkiName: "Lesser cold", part: 0,
    kanji: "芹乃栄", emoji: "🌿", romaji: "seri sunawachi sakau",
    name: "Parsley flourishes", short: "Parsley thrives",
    note: "Japanese parsley grows well in the cold water." },
  { sekki: "Shōkan", sekkiKanji: "小寒", sekkiName: "Lesser cold", part: 1,
    kanji: "水泉動", emoji: "💧", romaji: "shimizu atataka o fukumu",
    name: "Springs stir under the ice", short: "Springs stir",
    note: "Frozen springs begin to move underground." },
  { sekki: "Shōkan", sekkiKanji: "小寒", sekkiName: "Lesser cold", part: 2,
    kanji: "雉始雊", emoji: "🐦", romaji: "kiji hajimete naku",
    name: "Pheasants start to call", short: "Pheasants call",
    note: "The male pheasant begins to cry." },

  { sekki: "Daikan", sekkiKanji: "大寒", sekkiName: "Greater cold", part: 0,
    kanji: "款冬華", emoji: "🌿", romaji: "fuki no hana saku",
    name: "Butterburs bud", short: "Butterburs bud",
    note: "Butterbur flower buds push up through the snow." },
  { sekki: "Daikan", sekkiKanji: "大寒", sekkiName: "Greater cold", part: 1,
    kanji: "水沢腹堅", emoji: "🥶", romaji: "sawamizu kōri tsumeru",
    name: "Ice thickens on streams", short: "Ice thickens",
    note: "Ice grows thick on the mountain streams." },
  { sekki: "Daikan", sekkiKanji: "大寒", sekkiName: "Greater cold", part: 2,
    kanji: "鶏始乳", emoji: "🥚", romaji: "niwatori hajimete toya ni tsuku",
    name: "Hens start laying", short: "Hens lay",
    note: "Hens begin to lay eggs again." }
]

var PART_NAMES = ["first", "second", "last"]

// 立春 — where the list starts — is the moment the sun's apparent ecliptic
// longitude reaches 315°. Every kō boundary is another 5° along, which is why
// this file needs no table of dates: the seasons are defined by where the sun
// is, and drift by a day between years all on their own.
var RISSHUN_LONGITUDE = 315
var DEGREES_PER_KO = 5
var MEAN_DEGREES_PER_DAY = 0.98565

function toRadians(deg) {
  return deg * Math.PI / 180
}

function normalizeDegrees(deg) {
  var d = deg % 360
  return d < 0 ? d + 360 : d
}

// Shortest signed distance from a to b, in (-180, 180].
function signedDelta(from, to) {
  var d = normalizeDegrees(to - from)
  return d > 180 ? d - 360 : d
}

function julianDay(date) {
  return date.getTime() / 86400000 + 2440587.5
}

// Apparent solar ecliptic longitude, following Meeus' low-accuracy solar
// position (Astronomical Algorithms, ch. 25). Good to about 0.01°, which is
// some fifteen minutes of the sun's motion — far finer than a season that
// lasts five days needs.
function solarLongitude(date) {
  var t = (julianDay(date) - 2451545.0) / 36525

  var meanLongitude = 280.46646 + 36000.76983 * t + 0.0003032 * t * t
  var meanAnomaly = toRadians(357.52911 + 35999.05029 * t - 0.0001537 * t * t)

  var centre = (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(meanAnomaly)
    + (0.019993 - 0.000101 * t) * Math.sin(2 * meanAnomaly)
    + 0.000289 * Math.sin(3 * meanAnomaly)

  var trueLongitude = meanLongitude + centre

  // Correction from true to apparent longitude: aberration plus the nutation
  // term in longitude.
  var omega = toRadians(125.04 - 1934.136 * t)
  return normalizeDegrees(trueLongitude - 0.00569 - 0.00478 * Math.sin(omega))
}

// Midnight opening the given local day, and the one opening the next. Stepping
// the date field rather than adding 24h keeps these right across a daylight
// saving change, where a local day is 23 or 25 hours long.
function startOfLocalDay(date) {
  var d = new Date(date.getTime())
  d.setHours(0, 0, 0, 0)
  return d
}

function startOfNextLocalDay(date) {
  var d = startOfLocalDay(date)
  d.setDate(d.getDate() + 1)
  return d
}

// Which of the 72 the given date falls in, 0-based from 東風解凍.
//
// A kō is reckoned in whole days, as the almanacs print it: the day the sun
// crosses the boundary belongs to the season that boundary opens, however late
// in that day the crossing happens. So the question is not where the sun is
// this instant but where it will be by the end of today — otherwise a season
// due to turn over at noon would still be showing yesterday's name at
// breakfast, under a date range that had already run out.
function indexAt(date) {
  var offset = normalizeDegrees(solarLongitude(startOfNextLocalDay(date)) - RISSHUN_LONGITUDE)
  var index = Math.floor(offset / DEGREES_PER_KO)
  return index < 0 ? 0 : (index > 71 ? 71 : index)
}

function longitudeForIndex(index) {
  return normalizeDegrees(RISSHUN_LONGITUDE + index * DEGREES_PER_KO)
}

// The moment the sun reaches a given longitude, nearest to `from`. Newton
// iteration on the sun's mean rate: the true rate varies by a few percent
// across the year, so this converges in a handful of steps.
function crossingNear(from, targetDegrees) {
  var t = from.getTime()
  for (var i = 0; i < 30; i++) {
    var delta = signedDelta(solarLongitude(new Date(t)), targetDegrees)
    if (Math.abs(delta) < 1e-6) break
    t += delta / MEAN_DEGREES_PER_DAY * 86400000
  }
  return new Date(t)
}

// A kō is a seventy-second of a tropical year.
var MEAN_KO_DAYS = 365.2422 / 72

// Everything there is to say about the season a given date falls in: which it
// is, and the days it runs between.
//
// The model answers about one date and nothing else. There is no way to ask it
// what comes next, because the widget has no way to show that: waiting five
// days to find out is the whole of what it offers, and an API that could spoil
// it would eventually be used to. Nor does it count anything about the person
// looking — the only thing that progresses here is the year.
function stateAt(date) {
  var index = indexAt(date)
  var season = KO[index]

  var startCrossing = crossingNear(date, longitudeForIndex(index))
  var endCrossing = crossingNear(new Date(startCrossing.getTime() + MEAN_KO_DAYS * 86400000),
    longitudeForIndex((index + 1) % 72))

  // Quantised to whole local days, to match how indexAt reckons them: `start`
  // is the first day of this season, `end` the first day of the next.
  return {
    index: index,
    season: season,
    start: startOfLocalDay(startCrossing),
    end: startOfLocalDay(endCrossing),
    partName: PART_NAMES[season.part]
  }
}

// "September 2 – September 7", with the month dropped from the second date
// when both fall in the same month.
var MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

function formatRange(start, end) {
  // `end` is the first day of the next season, so the last day this one covers
  // is the day before it.
  var last = new Date(end.getTime())
  last.setDate(last.getDate() - 1)

  var from = MONTHS[start.getMonth()] + " " + start.getDate()
  var to = start.getMonth() === last.getMonth()
    ? String(last.getDate())
    : MONTHS[last.getMonth()] + " " + last.getDate()
  return from + " – " + to
}

// Calendar days from `date` until the next season's first day. Counting from
// midnight to midnight — rather than subtracting the raw timestamps — is what
// makes "changes tomorrow" mean tomorrow rather than "some time in the next
// 24 hours". Rounding absorbs the 23- or 25-hour day at a clock change.
function daysUntil(date, end) {
  var days = Math.round((end.getTime() - startOfLocalDay(date).getTime()) / 86400000)
  return days < 0 ? 0 : days
}

function changesInText(days) {
  if (days <= 0) return "changes today"
  if (days === 1) return "changes tomorrow"
  return "changes in " + days + " days"
}

export {KO, stateAt, formatRange, daysUntil, changesInText};
