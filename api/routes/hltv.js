const router = require("express").Router();
const request = require("request");
const cheerio = require("cheerio");

const getAttributeFromElement = (str, attr) => {
  const attrInfoStarts = str.indexOf(`${attr}="`) + `${attr}="`.length
  const attrInfoEnds = str.indexOf('"', attrInfoStarts)
  return str.slice(attrInfoStarts, attrInfoEnds)
}

router.get('/all-matches', (req, res) => {
  let matches = []
  request("https://www.hltv.org/matches", (error, response, body) => {
    if (error) return console.log("Error: " + error);
    const matchTeams = cheerio.load(body)(".match").toArray()

    matchTeams.forEach((match) => {
      const $2 = cheerio.load(match)
      const matchTime = $2('.matchTime').text()
      const matchRating = $2('.fa-star').toArray()
      const teamNames = $2('.matchTeamName').toArray()
      const teamImages = $2('.matchTeamLogo').toArray()
      const HLTVLinkTag = $2.html()
      const matchInfo = {
        id: 0,
        HLTVLink: '',
        matchRating: 0,
        beginsInTime: '',
        team_1: {
          name: '',
          logo: '',
        },
        team_2: {
          name: '',
          logo: '',
        },
      }
      const linkToHLTV = getAttributeFromElement($2.html(), 'href')
      const startsId = linkToHLTV.indexOf('matches/') + 'matches/'.length
      const endsId = linkToHLTV.indexOf('/', startsId)
      matchInfo.id = +linkToHLTV.slice(startsId, endsId)
      matchInfo.HLTVLink = 'https://www.hltv.org' + getAttributeFromElement(HLTVLinkTag, 'href')
      matchInfo.beginsInTime = matchTime

      // Set team names
      teamNames.forEach((teamNameElement, index) => {
        const team = 'team_' + (index + 1)
        matchInfo[team].name = cheerio.load(teamNameElement).text()
      })

      // If 1 team don`t have a name, we don`t add it
      if (matchInfo.team_1.name === '' || matchInfo.team_2.name === '') return

      // Set HLTV match rating
      matchRating.forEach((starElement) => {
        const isStarActive = !cheerio.load(starElement).html().includes('faded')
        if (isStarActive) {
          matchInfo.matchRating += 1
        }
      })

      // Set team images
      teamImages.forEach((teamLogoElement) => {
        const imageHTML = cheerio.load(teamLogoElement).html()
        const teamName = getAttributeFromElement(imageHTML, 'title')
        let teamImageLink = getAttributeFromElement(imageHTML, 'src').replaceAll('amp;', '')
        if (teamImageLink === '/img/static/team/placeholder.svg') {
          teamImageLink = 'https://www.hltv.org/img/static/team/placeholder.svg'
        }
        if (matchInfo.team_1.name === teamName) {
          matchInfo.team_1.logo = teamImageLink
        } else {
          matchInfo.team_2.logo = teamImageLink
        }
      })

      matches.push(matchInfo)
    })

    return res.send({data: matches, status: 200})
  })
})

router.post('/match-end', (req, res) => {
  const {gameUrl, gameId, teamName} = req.body

  request(gameUrl, (error, response, body) => {
    if (error) return console.log("Error: " + error);
    const matchTeams = cheerio.load(body)(".team").toArray().slice(0, 2)
    let winner;

    matchTeams.forEach((match) => {
      const $2 = cheerio.load(match)
      const teamName = $2('.teamName').text()
      const isWon = $2('.won').text()
      if (isWon) {
        winner = teamName
      }
    })

    if (winner) {
      return res.send({
        data: {
          teamName,
          gameUrl,
          gameId,
          winner,
          isMatchEnd: true
        }, status: 200
      })
    }
    return res.send({
      data: {
        teamName,
        gameUrl,
        gameId,
        winner: null,
        isMatchEnd: false
      },
      status: 200
    })
  })
})

module.exports = router
