const { Axios } = require("axios");
const cheerio = require("cheerio");
const axios = require("axios").default;

async function consultaBvb() {
  try {
    const response = await axios.get(
      "https://onefootball.com/es/equipo/borussia-dortmund-155"
    );
    const $ = cheerio.load(response.data);
    let content = [];
    $(".teaser__link").each((i, elem) => {
      const title = $(elem).find(".teaser__title").text();
      const description = $(elem)
        .find(".teaser__preview")
        .text()
        .replace(/\n/g, " ")
        .trim();
      const image = $(elem).find(".of-image__picture>source").attr("srcset");
      const pub_name = $(elem)
        .find(".teaser__publisher-name-text")
        .text()
        .trim();
      const pub_image = $(elem)
        .find(
          ".teaser__publisher-name-image>.of-image>.of-image__picture>.of-image__img"
        )
        .attr("src");
      const time = $(elem).find(".publisher__time").text().trim();
      ("");
      content.push({
        title,
        description,
        image,
        pub_image,
        time,
        pub_name,
      });
    });
    console.log(content);
    return content;
  } catch (error) {
    return console.log(error);
  }
}

async function leaderboardBL() {
  try {
    const response = await axios.get(
      "https://onefootball.com/es/competicion/bundesliga-1/clasificacion"
    );
    const $ = cheerio.load(response.data);
    let content = [];
    $(".standings__row--link").each((i, elem) => {
      const team = $(elem).find(".standings__team-name").text().trim();
      const image = $(elem)
        .find(".standings__team-logo>of-image>div>picture>img.of-image__img")
        .attr("src");
      const gamesp = $(elem)
        .find(".standings__cell-text--dimmed")
        .eq(0)
        .text()
        .trim();
      const wins = $(elem)
        .find(".standings__cell-text--dimmed")
        .eq(1)
        .text()
        .trim();
      const draws = $(elem)
        .find(".standings__cell-text--dimmed")
        .eq(2)
        .text()
        .trim();
      const losses = $(elem)
        .find(".standings__cell-text--dimmed")
        .eq(3)
        .text()
        .trim();
      const goald = $(elem)
        .find(".standings__cell-text--dimmed")
        .eq(4)
        .text()
        .trim();
      const points = $(elem)
        .find(".standings__cell.standings__cell--numeric>span")
        .eq(6)
        .text()
        .trim();
      const svg =
        "https://onefootball.com" + $(elem).find(".of-image__img").attr("src");
      content.push({
        team,
        image,
        gamesp,
        wins,
        draws,
        losses,
        goald,
        points,
        svg,
      });
    });
    console.log(content[1]);
    return content;
  } catch (error) {
    return console.log(error);
  }
}

async function matchesBL() {
  try {
    const response = await axios.get(
      "https://www.bundesliga.com/es/bundesliga/partidos/2022-2023/26"
    );
    const $ = cheerio.load(response.data);
    let mf = [];
    let matches = [];

    let isMatching = false;

    $("match-date-header").each((index, elem) => {
      const array = $(elem).find(".day").text().trim().split("  ");
      const objheader = {
        day: array[0],
        date: array[1],
        matchFixture: [],
      };

      //;
      //obj.hour =
      //matches.push(objheader);
      // console.log($(elem).parent().hasClass(".ng-star-inserted"));
      //if ($(elem).parent().hasClass("match-fixture")) {
      //console.log('hola');
      // const $matchFixtures = $(elem).nextUntil(".match-date-header", ".");

      $(".matchFixture").each((i, elem) => {
        //let obj = {};
        let objHome = {
          team: "",
          shortName: "",
          logo: "",
        };
        let objAway = {
          team: "",
          shortName: "",
          logo: "",
        };
        objHome.team = $(elem).find('match-team[side="home"]').text();
        objHome.shortName = $(elem).find(".cell.home>.tlc").text();
        objHome.score = $(elem)
          .find(".cell.home>.score.ng-star-inserted")
          .text();
        objHome.logo = $(elem).find('match-team[side="home"] img').attr("src");

        objAway.team = $(elem).find('match-team[side="away"]').text();
        objAway.shortName = $(elem).find(".cell.away>.tlc").text();
        objAway.score = $(elem)
          .find(".cell.away>.score.ng-star-inserted")
          .text();
        objAway.logo = $(elem).find('match-team[side="away"] img').attr("src");

        const obj = {
          objHome,
          objAway,
        };
        //return obj;

        /*console.log({
            home: objHome,
            away: objAway
          }); */

        //console.log(matches.matchFixture);
        if (i === 0) {
          objheader.matchFixture[index].push(obj);
        }
      });

      console.log(objheader.matchFixture);
    });

    //return content;
  } catch (error) {
    return console.log("gaa" + error);
  }
}

async function fixtureBL() {
  //how use nextUntil
  const response = await axios.get(
    "https://www.bundesliga.com/es/bundesliga/partidos/2022-2023/26"
  );


  const $ = cheerio.load(response.data);

  let content = [];

  $("match-date-header").each((index, el) => {
    const matchesByDate = {};
    const date = $(el).text().trim();
    matchesByDate.date = date;
    matchesByDate.fixtures = [];

      //console.log($(el).nextUntil("match-date-header", "div.matchRow.elevation-t-card.ng-star-inserted").html());
      //.nextUntil("match-date-header", "div.match-row")
      $(el).nextUntil("match-date-header", "div.matchRow.elevation-t-card.ng-star-inserted")
      .each((i, elem) => {
        //console.log('a', $(el).html());
        //const fixtureH = $(el).find("match-team[side='home']").text();
       // const fixtureA = $(el).find("match-team[side='away']").text();
       let objHome = {
        team: "",
        shortName: "",
        logo: "",
      };
      let objAway = {
        team: "",
        shortName: "",
        logo: "",
      };
      objHome.team = $(elem).find('match-team[side="home"]').text();
      objHome.shortName = $(elem).find(".cell.home>.tlc").text();
      objHome.score = $(elem)
        .find(".cell.home>.score.ng-star-inserted")
        .text();
      objHome.logo = $(elem).find('match-team[side="home"] img').attr("src");

      objAway.team = $(elem).find('match-team[side="away"]').text();
      objAway.shortName = $(elem).find(".cell.away>.tlc").text();
      objAway.score = $(elem)
        .find(".cell.away>.score.ng-star-inserted")
        .text();
      objAway.logo = $(elem).find('match-team[side="away"] img').attr("src");

         if (!matchesByDate.fixtures.includes({objHome,objAway})) {
          matchesByDate.fixtures.push(  {
            homeTeam: objHome,
            awayTeam: objAway
          });
        } 
        
      });
      content.push(matchesByDate);
      //console.log(matchesByDate);
  });

 return content;
}

module.exports = {
  consultaBvb,
  leaderboardBL,
  fixtureBL,
};
