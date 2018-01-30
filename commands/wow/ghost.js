//HTTP Requests
var request = require('request')

//Config File
var config = require('getconfig');

//Variables Blizzard API
    var apikey = config.blizzardToken
    var region = 'eu'
    var locale = 'en_GB'
    var url = ''
    var toon = ''
    var realm = ''

//Variables for Tooninfo
    var tclass = ''
    var trace = ''
    var tspec = ''
    var tilvl = ''
    var tlvl = ''
    var tguild = ''
    var tartifacttraits = ''
    var guildvalid = ""

//Load Armor
    var gear = []
    var geara = []
    var gearb = []
    var gearc = []
    var i = ''
    var j = ''

//Raid Progress
    var tcheckprog = []
    var tprogENN = '0'
    var tprogENHC = '0'
    var tprogENM = '0'
    var tprogTOVN = '0'
    var tprogTOVHC = '0'
    var tprogTOVM = '0'
    var tprogNHN = '0'
    var tprogNHHC = '0'
    var tprogNHM = '0'
    var tprogTOSN = '0'
    var tprogTOSHC = '0'
    var tprogTOSM = '0'
    var tprogANTN = '0'
    var tprogANTHC = '0'
    var tprogANTM = '0'

    var CurveEN = 'No'
    var EdgeEN = 'No'
    var CurveTOV = 'No'
    var EdgeTOV = 'No'
    var CurveNH = 'No'
    var EdgeNH = 'No'
    var CurveTOS = 'No'
    var EdgeTOS = 'No'
    var CurveANT = 'No'
    var EdgeANT = 'No'
    
//Variables Mythic Plus
    var plus2 = ''
    var plus5 = ''
    var plus10 = ''
    var plus15 = ''

//Variables Message Reading
    var parts = []
    var array = []
    var content = ''

//Constants Blizzard.js
BATTLENET_API_KEY = apikey
const blizzard = require('blizzard.js').initialize({ apikey: BATTLENET_API_KEY });
const discord = require('discord.js');

//Defining commando
const commando = require('discord.js-commando');

class GhostCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ghost',
            group: 'wow',
            memberName: 'ghost',
            description: 'Ghost reports all relevant information on the target',
            examples: ['!ghost <toonname> <servername>'],
        });
    }

    async run(message, args) {
        var index
        var tcriteria = []
        var tcriteriaQuantity = []
        var criteriaStorage = []
        var criteriaQStorage = []
        var legendaries = []

    //Variables for splitting the command that is inputed in discord
        tclass = ''
        content = message.content.trim();
        parts = content.split(" ");
        array = parts.slice(1, parts.length);
        toon = array[0]
        realm = array[1]

try {
    blizzard.wow.character(['profile', 'items', 'statistics', 'progression','achievements', 'talents', 'guild'], { origin: region , realm: realm, name: toon})
    .then(response => {

    //Character Info
            tclass = JSON.stringify(response.data.class)
            trace = JSON.stringify(response.data.race)
            tlvl = JSON.stringify(response.data.level)
            tilvl = JSON.stringify(response.data.items.averageItemLevelEquipped)
            try {
                tguild = JSON.stringify(response.data.guild.name)
                guildvalid = "y"
            }
            catch(UnhandledPromiseRejectionWarning) {
                guildvalid = "n"
                console.log("failed")
                //Guild field does not exist.
            }

    //Guild Checker
        var guildcheck = []
        if (guildvalid === "y") {
        tguild = JSON.stringify(response.data.guild.name)
        guildcheck = tguild.split('"')
        guildcheck.shift
        tguild = guildcheck[1]
        } else if (guildvalid === "n") {
        tguild = "This character is guildless"
        }
        guildvalid = ''

    //Gear quality for Legendary check
            gear[0] = JSON.stringify(response.data.items.head.quality)
            gear[1] = JSON.stringify(response.data.items.neck.quality)
            gear[2] = JSON.stringify(response.data.items.shoulder.quality)
            gear[3] = JSON.stringify(response.data.items.back.quality)
            gear[4] = JSON.stringify(response.data.items.chest.quality)
            gear[5] = JSON.stringify(response.data.items.wrist.quality)
            gear[6] = JSON.stringify(response.data.items.hands.quality)
            gear[7] = JSON.stringify(response.data.items.waist.quality)
            gear[8] = JSON.stringify(response.data.items.legs.quality)
            gear[9] = JSON.stringify(response.data.items.feet.quality)
            gear[10] = JSON.stringify(response.data.items.finger1.quality)
            gear[11] = JSON.stringify(response.data.items.finger2.quality)
            gear[12] = JSON.stringify(response.data.items.trinket1.quality)
            gear[13] = JSON.stringify(response.data.items.trinket2.quality)
            gear[14] = JSON.stringify(response.data.items.mainHand.quality)

    //Gear names for legendary checker
            geara[0] = JSON.stringify(response.data.items.head.name) + " (Head)"
            geara[1] = JSON.stringify(response.data.items.neck.name) + " (Neck)"
            geara[2] = JSON.stringify(response.data.items.shoulder.name) + " (Shoulder)"
            geara[3] = JSON.stringify(response.data.items.back.name) + " (Back)"
            geara[4] = JSON.stringify(response.data.items.chest.name) + " (Chest)"
            geara[5] = JSON.stringify(response.data.items.wrist.name) + " (Wrist)"
            geara[6] = JSON.stringify(response.data.items.hands.name) + " (Hands)"
            geara[7] = JSON.stringify(response.data.items.waist.name) + " (Waist)"
            geara[8] = JSON.stringify(response.data.items.legs.name) + "(Legs)"
            geara[9] = JSON.stringify(response.data.items.feet.name) + " (Feet)"
            geara[10] = JSON.stringify(response.data.items.finger1.name) + " (Finger)"
            geara[11] = JSON.stringify(response.data.items.finger2.name) + " (Finger)"
            geara[12] = JSON.stringify(response.data.items.trinket1.name) + " (Trinket)"
            geara[13] = JSON.stringify(response.data.items.trinket2.name) + " (Trinket)"
            geara[14] = JSON.stringify(response.data.items.mainHand.id)

    //Gear names
            gearb[0] = JSON.stringify(response.data.items.head.name)
            gearb[1] = JSON.stringify(response.data.items.neck.name)
            gearb[2] = JSON.stringify(response.data.items.shoulder.name)
            gearb[3] = JSON.stringify(response.data.items.back.name)
            gearb[4] = JSON.stringify(response.data.items.chest.name)
            gearb[5] = JSON.stringify(response.data.items.wrist.name)
            gearb[6] = JSON.stringify(response.data.items.hands.name)
            gearb[7] = JSON.stringify(response.data.items.waist.name)
            gearb[8] = JSON.stringify(response.data.items.legs.name)
            gearb[9] = JSON.stringify(response.data.items.feet.name)
            gearb[10] = JSON.stringify(response.data.items.finger1.name)
            gearb[11] = JSON.stringify(response.data.items.finger2.name)
            gearb[12] = JSON.stringify(response.data.items.trinket1.name)
            gearb[13] = JSON.stringify(response.data.items.trinket2.name)
            gearb[14] = JSON.stringify(response.data.items.mainHand.id)
            gearb[15] = JSON.stringify(response.data.items.mainHand.name)

    //Gear Levels
            gearc[0] = JSON.stringify(response.data.items.head.itemLevel)
            gearc[1] = JSON.stringify(response.data.items.neck.itemLevel)
            gearc[2] = JSON.stringify(response.data.items.shoulder.itemLevel)
            gearc[3] = JSON.stringify(response.data.items.back.itemLevel)
            gearc[4] = JSON.stringify(response.data.items.chest.itemLevel)
            gearc[5] = JSON.stringify(response.data.items.wrist.itemLevel)
            gearc[6] = JSON.stringify(response.data.items.hands.itemLevel)
            gearc[7] = JSON.stringify(response.data.items.waist.itemLevel)
            gearc[8] = JSON.stringify(response.data.items.legs.itemLevel)
            gearc[9] = JSON.stringify(response.data.items.feet.itemLevel)
            gearc[10] = JSON.stringify(response.data.items.finger1.itemLevel)
            gearc[11] = JSON.stringify(response.data.items.finger2.itemLevel)
            gearc[12] = JSON.stringify(response.data.items.trinket1.itemLevel)
            gearc[13] = JSON.stringify(response.data.items.trinket2.itemLevel)
            gearc[14] = JSON.stringify(response.data.items.mainHand.id)
            gearc[15] = JSON.stringify(response.data.items.mainHand.itemLevel)
    
    //Variables - Raid Progress / Mythic+
        var validcheck = ""
        var raid = []
        var counter = "1"

    //Mythic+ (2s, 5s, 10s, 15s)
        for (index = 0; index < response.data.achievements.criteria.length; index++) {
        validcheck = JSON.stringify(response.data.achievements.criteria[index])

            if (validcheck === "33096"){
            plus2 = JSON.stringify(response.data.achievements.criteriaQuantity[index])
            } else if (validcheck === "33097") {
            plus5 = JSON.stringify(response.data.achievements.criteriaQuantity[index])
            } else if (validcheck === "33098") {
            plus10 = JSON.stringify(response.data.achievements.criteriaQuantity[index])
            } else if (validcheck === "32028") {
            plus15 = JSON.stringify(response.data.achievements.criteriaQuantity[index])
            }
        
        }

    //Check for Curve and Edge for Raid Tiers
        for (index = 0; index < response.data.achievements.achievementsCompleted.length; index++) {
        validcheck = JSON.stringify(response.data.achievements.achievementsCompleted[index])
            if (validcheck === "11194"){ //Ahead of the Curve Xavius
            CurveEN = "Yes"
            } else if (validcheck === "11191") { //Cutting Edge Xavius
            EdgeEN = "Yes"
            } else if (validcheck === "11581") { //Ahead of the Curve Heyla
            CurveTOV = "Yes"
            } else if (validcheck === "11580") { //Cutting Edge Heyla
            EdgeTOV
            } else if (validcheck === "11195") { //Ahead of the Curve Gul'dan
            CurveNH = "Yes"
            } else if (validcheck === "11192") { //Cutting Edge Gul'dan
            EdgeNH = "Yes"
            } else if (validcheck === "11874") { //Ahead of the Curve Kil'Jaden
            CurveTOS = "Yes"
            } else if (validcheck === "11875") { //Cutting Edge Kil'Jaden
            EdgeTOS = "Yes"
            } else if (validcheck === "12110") { //Ahead of the Curve Argus
            CurveANT = "Yes"
            } else if (validcheck === "12111") { //Cutting Edge Argus
            EdgeANT = "Yes"
            }
        }

    // //Artifact Traits
        var relics = ''
            relics = JSON.stringify(response.data.items.mainHand.relics.length)
        for (index = 0; index < response.data.items.mainHand.artifactTraits.length; index++) {
            validcheck = JSON.stringify(response.data.items.mainHand.artifactTraits[index].rank)
            tartifacttraits = Number(tartifacttraits) + Number(validcheck)
        }
        console.log(relics)
        tartifacttraits = tartifacttraits - relics

    //EN Normal
        for (index = 0; index < response.data.progression.raids[35].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[35].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[35].bosses[index].normalKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {
                if (tcheckprog[index] > "0")
                counter++
        }
        counter = counter-1
        tprogENN = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []

    //EN Heroic
        for (index = 0; index < response.data.progression.raids[35].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[35].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[35].bosses[index].heroicKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {
                if (tcheckprog[index] > "0")
                counter++
        }
        counter = counter-1
        tprogENHC = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []

    //EN Mythic
        for (index = 0; index < response.data.progression.raids[35].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[35].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[35].bosses[index].mythicKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {

                if (tcheckprog[index] > "0")
                counter++
        }
        counter = counter-1
        tprogENM = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []

    //TOV Normal
        for (index = 0; index < response.data.progression.raids[36].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[36].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[36].bosses[index].normalKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {
                counter++
        }
        counter = counter-1
        tprogTOVN = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []

    //TOV Heroic
        for (index = 0; index < response.data.progression.raids[36].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[36].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[36].bosses[index].heroicKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {

                if (tcheckprog[index] > "0")
                counter++
        }
        counter = counter-1
        tprogTOVHC = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []

    //TOV Mythic
        for (index = 0; index < response.data.progression.raids[36].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[36].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[36].bosses[index].mythicKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {

                if (tcheckprog[index] > "0")
                counter++
        }
        counter = counter-1
        tprogTOVM = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []

    //Nighthold Normal
        for (index = 0; index < response.data.progression.raids[37].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[37].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[37].bosses[index].normalKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {

                if (tcheckprog[index] > "0")
                counter++
        }
        counter = counter-1
        tprogNHN = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []  

    //Nighthold Heroic
        for (index = 0; index < response.data.progression.raids[37].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[37].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[37].bosses[index].heroicKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {

                if (tcheckprog[index] > "0")
                counter++
        }
        counter = counter-1
        tprogNHHC = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []

    //Nighthold Mythic
        for (index = 0; index < response.data.progression.raids[37].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[37].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[37].bosses[index].mythicKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {

                if (tcheckprog[index] > "0")
                counter++
        }
        counter = counter-1
        tprogNHM = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []

    //TOS Normal
        for (index = 0; index < response.data.progression.raids[38].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[38].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[38].bosses[index].normalKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {
                counter++
        }
        counter = counter-1
        tprogTOSN = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []

    //TOS Heroic
        for (index = 0; index < response.data.progression.raids[38].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[38].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[38].bosses[index].heroicKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {

                if (tcheckprog[index] > "0")
                counter++
        }
        counter = counter-1
        tprogTOSHC = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []

    //TOS Mythic
        for (index = 0; index < response.data.progression.raids[38].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[38].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[38].bosses[index].mythicKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {

                if (tcheckprog[index] > "0")
                counter++
        }
        counter = counter-1
        tprogTOSM = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []

    //Antorus Normal
        for (index = 0; index < response.data.progression.raids[39].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[39].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[39].bosses[index].normalKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {
                counter++
        }
        counter = counter-1
        tprogANTN = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []

    //Antorus Heroic
        for (index = 0; index < response.data.progression.raids[39].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[39].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[39].bosses[index].heroicKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {

                if (tcheckprog[index] > "0")
                counter++
        }
        counter = counter-1
        tprogANTHC = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []

    //Antorus Mythic
        for (index = 0; index < response.data.progression.raids[39].bosses.length; index++) {
            raid[0] = (response.data.progression.raids[39].bosses[index].name)
            tcheckprog[index] = (response.data.progression.raids[39].bosses[index].mythicKills) //Change Kills to the correct difficulty
        }
        for (index = 0; index < tcheckprog.length; index++) {

                if (tcheckprog[index] > "0")
                counter++
        }
        counter = counter-1
        tprogANTM = counter // Change prog to the correct raid
        counter = 1
        tcheckprog = []

    //Switch - class
        switch (tclass) 
            {
                case '1': tclass = "Warrior";
                break

                case '2': tclass = "Paladin";
                break

                case '3': tclass = "Hunter";
                break

                case '4': tclass = "Rogue";
                break

                case '5': tclass = "Priest";
                break

                case '6': tclass = "Death Knight";
                break

                case '7': tclass = "Shaman";
                break

                case '8': tclass = "Mage";
                break

                case '9': tclass = "Warlock";
                break

                case '10': tclass = "Monk";
                break

                case '11': tclass = "Druid";
                break

                case '12': tclass = "Demon Hunter";
                break
            }
    
    //Spec
        var speccheck = ''
        tspec = "none";
            for (index = 0; index < 4; index++) {
                if (response.data.talents[index].selected === true) {
                    tspec = JSON.stringify(response.data.talents[index].spec.name)
                }
            }
        speccheck = tspec.split('"')
        speccheck.pop()
        speccheck.shift()
        tspec = speccheck[0]
    
    //Switch - Race
        switch (trace) 
            {
                case '1': trace = "Human";
                break;

                case '2': trace = "Orc";
                break;

                case '3': trace = "Dwarf";
                break

                case '4': trace = "Night Elf";
                break

                case '5': trace = "Undead";
                break

                case '6': trace = "Tauren";
                break

                case '7': trace = "Gnome";
                break

                case '8': trace = "Troll";
                break

                case '9': trace = "Goblin";
                break

                case '10': trace = "Blood Elf";
                break

                case '11': trace = "Draenei";
                break

                case '22': trace = "Worgen";
                break

                case '25': trace = "Alliance Pandaren";
                break

                case '26': trace = "Horde Pandaren";
                break
            }

    //For Loop - Legendary Checker
            var tempgear
            i = '0'

            for (i = 0; i < 14; i++ ) { 
                tempgear = gear[i]
                if (tempgear ===  "5") {
                    legendaries[i] = geara[i]
                }
            }

    //Sorts the Legendary array and purges it of additional entries
            var i = '0'
            legendaries.sort()
            legendaries.reverse
            for (i = 0; i < 14; i++) {
                legendaries.pop
            }

//End message.   
const embed = {
  "color": 6327974,
  "timestamp": "2017-12-11T13:41:51.307Z",
  "footer": {
    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
    "text": "."
  },
  "thumbnail": {
    "url": "http://ironbro.net/wp-content/uploads/2017/06/iron-bro-logo-4.png"
  },
    "author": {
      "name": toon + " " + realm + " - EU | " + tspec + " " + tclass + " | " + tilvl + " iLVL" ,
      "url": "https://worldofwarcraft.com/en-gb/character/" + realm + "/" + toon,
      "icon_url": "https://vignette.wikia.nocookie.net/wowwiki/images/b/b6/WoW_Cataclysm.png/revision/latest?cb=20101226185655"
    },
  "fields": [
    {
      "name": "General",
      "value": "**- ** **Race:** " + trace + ", **Level:** " + tlvl + ", **Guild:** " + tguild
    },
    {
      "name": "Artifact Traits",
      "value": "**- ** " + tartifacttraits + "/101"
    },
    {
      "name": "Raid Progress",
      "value": "__**Mythic**__ **- ** **EN:**" + tprogENM + "/7, **ToV:**" + tprogTOVM + "/3, **NH:**" + tprogNHM + "/10, **ToS:**" + tprogTOSM + "/9, **ABT:**" + tprogANTM + "/11                                  __**Heroic**__ **- ** **EN:** " + tprogENHC + "/7 **ToV:** " + tprogTOVHC + "/3 **NH:** " + tprogNHHC + "/10 **TOS:** " + tprogTOSHC + "/9 **ABT:** " + tprogANTHC + "/11                                  __**Normal**__ **- ** **EN:** " + tprogENN + "/7 **ToV:** " + tprogTOVN + "/3 **NH:** " + tprogNHN + "/10 **TOS:** " + tprogTOSN + "/9 **ABT:** " + tprogANTN + "/11"
    },
    {
      "name": "Mythic+ Stats",
      "value": "__**In Time**__ **- ** **15s:** " + plus15 + ", **10s:** " + plus10 + ", **5s:** " + plus5 + ", **2s:** " + plus2
    },
    {
      "name": "Legendaries",
      "value": "**- **" + legendaries[0] + "\n**- **" + legendaries[1]
    },
    {
      "name": "Gear",
      "value": 
      "**Head:** " + gearb[0] + " (" + gearc[0] + ")"
      + "\n**Neck:** " + gearb[1] + " (" + gearc[1] + ")"
      + "\n**Shoulders:** " + gearb[2] + " (" + gearc[2] + ")"
      + "\n**Cape:** " + gearb[3] + " (" + gearc[3] + ")"
      + "\n**Chest:** " + gearb[4] + " (" + gearc[4] + ")"
      + "\n**Wrist:** " + gearb[5] + " (" + gearc[5] + ")"
      + "\n**Hands:** " + gearb[6] + " (" + gearc[6] + ")"
      + "\n**Waist:** " + gearb[7] + " (" + gearc[7] + ")"
      + "\n**Legs:** " + gearb[8] + " (" + gearc[8] + ")"
      + "\n**Feet:** " + gearb[9] + " (" + gearc[9] + ")"
      + "\n**Finger:** " + gearb[10] + " (" + gearc[10] + ")" 
      + "\n**Finger:** " + gearb[11] + " (" + gearc[11] + ")"
      + "\n**Trinket:** " + gearb[12] + " (" + gearc[12] + ")"
      + "\n**Trinket:** " + gearb[13] + " (" + gearc[13] + ")"
      + "\n**Weapon:** " + gearb[15] + " (" + gearc[15] + ")" 
    },
    {
      "name": "-----------------------------------------------------------------------------",
      "value": "Achievements:"
    },
    {
      "name": "Emerald Nightmare",
      "value": "**Curve: **" + CurveEN + "\n**Edge:** " + EdgeEN,
      "inline": true
    },
    {
      "name": "Trial of Valor",
      "value": "**Curve: **" + CurveTOV + "\n**Edge:** " + EdgeTOV,
      "inline": true
    },
    {
      "name": "Nighthold",
      "value": "**Curve: **" + CurveNH + "\n**Edge:** " + EdgeNH,
      "inline": true
    },
    {
      "name": "Tomb of Sargeras",
      "value": "**Curve: **" + CurveTOS + "\n**Edge:** " + EdgeTOS,
      "inline": true
    },
    {
      "name": "Antorus the Burning Throne",
      "value": "**Curve: **" + CurveANT + "\n**Edge:** " + EdgeANT,
      "inline": true
    },
    {
      "name": "-----------------------------------------------------------------------------",
      "value": "Links:"
    },
    {
      "name": "WoWprogress",
      "value": "[Click here](https://www.wowprogress.com/character/eu/" + realm + "/" + toon + "/)",
      "inline": true
    },
    {
      "name": "Warcraftlogs",
      "value": "[Click here](https://www.warcraftlogs.com/character/eu/" + realm + "/" + toon + ")",
      "inline": true
    },
    {
      "name": "Raider.io",
      "value": "[Click here](https://raider.io/characters/eu/" + realm + "/" + toon + ")",
      "inline": true
    },
    {
      "name": "WoWHead",
      "value": "[Click here](https://worldofwarcraft.com/en-gb/character/" + realm + "/" + toon + ")",
      "inline": true
    },
    {
      "name": "-----------------------------------------------------------------------------",
      "value": "Created by Jagone@Draenor | Iron Bro"
    }

  ]
};
message.channel.sendMessage({ embed });

        //Reset Variables
        tprogENN = ''
        tprogENHC = ''
        tprogENM = ''
        tprogTOVN = ''
        tprogTOVHC = ''
        tprogTOVM = ''
        tprogNHN = ''
        tprogNHHC = ''
        tprogNHM = ''
        tprogTOSN = ''
        tprogTOSHC = ''
        tprogTOSM = ''
        tprogANTN = ''
        tprogANTHC = ''
        tprogANTM = ''

        plus2 = ''
        plus5 = ''
        plus10 = ''
        plus15 = ''

        tguild = ''
        tclass = ''
        tilvl = ''
        tspec = ''
        trace = ''
        tartifacttraits = ''
        array = []
        legendaries = []

        CurveEN = "No"
        EdgeEN = "No"
        CurveTOV = "No"
        EdgeTOV = "No"
        CurveNH = "No"
        EdgeNH = "No"
        CurveTOS = "No"
        EdgeTOS = "No"
        CurveANT = "No"
        EdgeANT = "No"
        });
    }

catch(UnhandledPromiseRejectionWarning) {
    message.channel.sendMessage("(Error: 404) Character not found, this means the character is either inactive on the armory or you have typed the realm/char name wrong.")
}
    
}}

module.exports = GhostCommand