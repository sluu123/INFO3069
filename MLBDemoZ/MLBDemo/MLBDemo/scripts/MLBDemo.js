// JavaScript for MLBDemo

var baseballObject;

// ***********************************
// AJAX XMLHttpRequest to get the JSON
// from the site defined by url
function getJSON(url)
{
    var resp;
    var xmlHttp;

    resp = '';
    xmlHttp = new XMLHttpRequest();

    if (xmlHttp !== null)
    {
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        resp = xmlHttp.responseText;
    }

    return resp;
}

// ************************************
// on click event handler creates the URL
// for a given year month and day
function getBaseballData()
{
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var day = document.getElementById("day").value;
    var i;
    var out = "<table>";

    if (year !== "" || month !== "" || day !== "")
    {
        var baseballJson = getJSON("http://gd2.mlb.com/components/game/mlb/year_" + year + "/month_" + month + "/day_" + day + "/master_scoreboard.json");
        baseballObject = JSON.parse(baseballJson);

        
        console.log(baseballObject);

        if (baseballObject["data"]["games"]["game"] == null)
        {
            alert("There are no games on " + day + "/" + month + "/" + year);
        }
        else if (baseballObject["data"]["games"]["game"] instanceof Array)
        {
            var home = [];
            var away = [];
            var blueJayIDX;
            for (i = 0; i < baseballObject["data"]["games"]["game"].length; i++)
            {
                if (baseballObject["data"]["games"]["game"][i]["home_team_name"] == "Blue Jays"
                    ||
                    baseballObject["data"]["games"]["game"][i]["away_team_name"] == "Blue Jays")
                {
                    blueJayIDX = i;
                }
                home.push(baseballObject["data"]["games"]["game"][i]["home_team_name"]);
                away.push(baseballObject["data"]["games"]["game"][i]["away_team_name"]);
            }

            home.unshift(home[blueJayIDX]);
            away.unshift(away[blueJayIDX]);

            home.splice(blueJayIDX +1, 1);
            away.splice(blueJayIDX +1, 1);

            for (i = 0; i < baseballObject["data"]["games"]["game"].length; i++)
            {
                out += "<tr><td>" + "Home team = " +
                    home[i]
                    + " and Away team = " +
                    away[i] +
                    "</td></tr>";
            }

            out += "</table>";
            document.getElementById("id01").innerHTML = out;
        }
        else
        {
            out += "<tr><td>" + "Home team = " +
                     baseballObject["data"]["games"]["game"][i]["home_team_name"] +
                     "      and      Away team = " +
                     baseballObject["data"]["games"]["game"][i]["away_team_name"] +
                     "</td></tr>"
            out += "</table>";
            document.getElementById("id01").innerHTML = out;
        }
    }
}