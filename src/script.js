const url = "https://cors-anywhere.herokuapp.com/https://development-internship-api.geopostenergy.com/WorldCup/GetAllTeams";

const teamsContainer = document.getElementById("main-content");

const journeyContainer = document.getElementById("tournament-journey");

const journeyTimeline = document.createElement("div");
journeyTimeline.classList.add("journey-timeline");
journeyContainer.appendChild(journeyTimeline);

document.getElementById("simulate-btn").addEventListener("click", () => {
    location.reload();
});

const countryTranslations = {
    "Alemanha": "Germany",
    "Argélia": "Algeria",
    "Argentina": "Argentina",
    "Arábia Saudita": "Saudi Arabia",
    "Austrália": "Australia",
    "Áustria": "Austria",
    "Brasil": "Brazil",
    "Camarões": "Cameroon",
    "Canadá": "Canada",
    "Chile": "Chile",
    "Colômbia": "Colombia",
    "Coreia do Sul": "South Korea",
    "Coreia do Norte": "North Korea",
    "Costa do Marfim": "Ivory Coast",
    "Costa Rica": "Costa Rica",
    "Croácia": "Croatia",
    "Dinamarca": "Denmark",
    "Equador": "Ecuador",
    "Escócia": "Scotland",
    "Espanha": "Spain",
    "Estados Unidos": "United States",
    "França": "France",
    "Gana": "Ghana",
    "Holanda": "Netherlands",
    "Hungria": "Hungary",
    "Indonésia": "Indonesia",
    "Inglaterra": "England",
    "Irã": "Iran",
    "Jamaica": "Jamaica",
    "Japão": "Japan",
    "Jordânia": "Jordan",
    "Marrocos": "Morocco",
    "México": "Mexico",
    "Nigéria": "Nigeria",
    "Nova Zelândia": "New Zealand",
    "Panamá": "Panama",
    "Portugal": "Portugal",
    "Sérvia": "Serbia",
    "Suíça": "Switzerland",
    "Tunísia": "Tunisia",
    "Turquia": "Turkey",
    "Uruguai": "Uruguay",
    "Uzbequistão": "Uzbekistan",
    "Venezuela": "Venezuela",
    "Iraque": "Iraq",
    "Bélgica": "Belgium",
    "Egito": "Egypt",
    "Itália": "Italy",
};

const countryCodes = {
    "Germany": "de",
    "Algeria": "dz",
    "Argentina": "ar",
    "Saudi Arabia": "sa",
    "Australia": "au",
    "Austria": "at",
    "Brazil": "br",
    "Cameroon": "cm",
    "Canada": "ca",
    "Chile": "cl",
    "Colombia": "co",
    "South Korea": "kr",
    "North Korea": "kp",
    "Ivory Coast": "ci",
    "Costa Rica": "cr",
    "Croatia": "hr",
    "Denmark": "dk",
    "Ecuador": "ec",
    "Scotland": "gb-sct",
    "Spain": "es",
    "United States": "us",
    "France": "fr",
    "Ghana": "gh",
    "Netherlands": "nl",
    "Hungary": "hu",
    "Indonesia": "id",
    "England": "gb-eng",
    "Iran": "ir",
    "Jamaica": "jm",
    "Japan": "jp",
    "Jordan": "jo",
    "Morocco": "ma",
    "Mexico": "mx",
    "Nigeria": "ng",
    "New Zealand": "nz",
    "Panama": "pa",
    "Portugal": "pt",
    "Serbia": "rs",
    "Switzerland": "ch",
    "Tunisia": "tn",
    "Turkey": "tr",
    "Uruguay": "uy",
    "Uzbekistan": "uz",
    "Venezuela": "ve",
    "Italy": "it",
    "Iraq": "iq",
    "Senegal": "sn",
    "Egypt": "eg",
    "Belgium": "be",
};

function translateCountry(name) {
    return countryTranslations[name] || name;
}

function getFlagUrl(name) {
    const translatedName = translateCountry(name);
    const code = countryCodes[translatedName];

    if (!code) {
        return "";
    }

    return `https://flagcdn.com/w40/${code}.png`;
}

function createJourneyCard(stageName, match) {
    const card = document.createElement("div");
    card.classList.add("journey-card");

    const stageClass = stageName.toLowerCase().replace(/\s+/g, "-");
    if (stageClass === "round-of-16") card.classList.add("journey-round16");
    if (stageClass === "quarterfinals") card.classList.add("journey-quarterfinals");
    if (stageClass === "semifinals") card.classList.add("journey-semifinals");
    if (stageClass === "third-place") card.classList.add("journey-third-place");
    if (stageClass === "final") card.classList.add("journey-final");

    const stage = document.createElement("h3");
    stage.textContent = stageName;
    card.appendChild(stage);

    const matchRow = document.createElement("div");
    matchRow.classList.add("journey-match-row");

    const team1 = document.createElement("span");
    team1.classList.add("journey-team");
    team1.textContent = translateCountry(match.team1.nome);

    const score = document.createElement("span");
    score.classList.add("journey-score");
    score.textContent = `${match.goalsTeam1} x ${match.goalsTeam2}`;

    const team2 = document.createElement("span");
    team2.classList.add("journey-team");
    team2.textContent = translateCountry(match.team2.nome);

    matchRow.appendChild(team1);
    matchRow.appendChild(score);
    matchRow.appendChild(team2);

    card.appendChild(matchRow);

    if (match.goalsTeam1 === match.goalsTeam2) {
        const penalties = document.createElement("p");
        penalties.classList.add("journey-penalties");
        penalties.textContent = `(${match.penaltyTeam1} x ${match.penaltyTeam2} pen)`;
        card.appendChild(penalties);
    }

    journeyTimeline.appendChild(card);
}
function simulateKnockout(matches) {
    const results = [];

    matches.forEach(match => {
        const goalsTeam1 = Math.floor(Math.random() * 5);
        const goalsTeam2 = Math.floor(Math.random() * 5);

        let penaltyTeam1 = 0;
        let penaltyTeam2 = 0;
        let winner;
        let loser;

        if (goalsTeam1 > goalsTeam2) {
            winner = match[0];
            loser = match[1];
        } else if (goalsTeam1 < goalsTeam2) {
            winner = match[1];
            loser = match[0];
        } else {
            penaltyTeam1 = Math.floor(Math.random() * 5) + 1;
            penaltyTeam2 = Math.floor(Math.random() * 5) + 1;

            while (penaltyTeam1 === penaltyTeam2) {
                penaltyTeam2 = Math.floor(Math.random() * 5) + 1;
            }

            if (penaltyTeam1 > penaltyTeam2) {
                winner = match[0];
                loser = match[1];
            } else {
                winner = match[1];
                loser = match[0];
            }
        }

        results.push({
            team1: match[0],
            team2: match[1],
            goalsTeam1,
            goalsTeam2,
            penaltyTeam1,
            penaltyTeam2,
            winner,
            loser
        });
    });

    return results;
}

function createKnockoutStageItem(markerText, titleText, matches, parent, stageClass) {
    const section = document.createElement("div");
    section.classList.add("knockout-stage-item", stageClass);

    const marker = document.createElement("div");
    marker.classList.add("stage-marker");
    marker.textContent = markerText;
    section.appendChild(marker);

    const content = document.createElement("div");
    content.classList.add("knockout-stage-content");

    const title = document.createElement("h2");
    title.classList.add("knockout-stage-title");
    title.textContent = titleText;
    content.appendChild(title);

    const matchesGrid = document.createElement("div");
    matchesGrid.classList.add("matches-grid");

    matches.forEach(match => {
        const p = document.createElement("p");

        let text = `${translateCountry(match.team1.nome)} vs ${translateCountry(match.team2.nome)}`;

        if (titleText === "Third Place") {
            text += `\n${translateCountry(match.winner.nome)} wins`;
        }

        if (titleText === "Final") {
            text += `\n${translateCountry(match.winner.nome)} wins World Cup`;
        }

        p.textContent = text;
        matchesGrid.appendChild(p);
    });

    content.appendChild(matchesGrid);
    section.appendChild(content);
    parent.appendChild(section);
}

fetch(url, {
    headers: {
        "git-user": "diasalana"
    }
})
    .then(response => response.json())
    .then(data => {
        const shuffledTeams = [...data].sort(() => Math.random() - 0.5);

        const groups = {
            A: shuffledTeams.slice(0, 4),
            B: shuffledTeams.slice(4, 8),
            C: shuffledTeams.slice(8, 12),
            D: shuffledTeams.slice(12, 16),
            E: shuffledTeams.slice(16, 20),
            F: shuffledTeams.slice(20, 24),
            G: shuffledTeams.slice(24, 28),
            H: shuffledTeams.slice(28, 32)
        };

        const qualifiedByGroup = {};

        const groupsMainTitle = document.createElement("h1");
        groupsMainTitle.innerHTML = `<ion-icon name="people-outline"></ion-icon> World Cup Groups`;
        teamsContainer.appendChild(groupsMainTitle);

        const groupStageData = {};

        const groupsGrid = document.createElement("div");
        groupsGrid.classList.add("groups-grid");
        teamsContainer.appendChild(groupsGrid);

        for (let group in groups) {
            const groupSection = document.createElement("div");
            groupSection.classList.add("group-section");
            groupsGrid.appendChild(groupSection);

            const groupTitle = document.createElement("h2");
            groupTitle.textContent = `Group ${group}`;
            groupSection.appendChild(groupTitle);

            groups[group].forEach(team => {
                const teamRow = document.createElement("div");
                teamRow.classList.add("team-row");

                const flag = document.createElement("img");
                flag.classList.add("team-flag");
                flag.src = getFlagUrl(team.nome);
                flag.alt = `${translateCountry(team.nome)} flag`;

                const name = document.createElement("span");
                name.textContent = translateCountry(team.nome);

                teamRow.appendChild(flag);
                teamRow.appendChild(name);
                groupSection.appendChild(teamRow);
            });

            const groupTeams = groups[group];
            const matches = [
                [groupTeams[0], groupTeams[1]],
                [groupTeams[2], groupTeams[3]],
                [groupTeams[0], groupTeams[2]],
                [groupTeams[1], groupTeams[3]],
                [groupTeams[0], groupTeams[3]],
                [groupTeams[1], groupTeams[2]]
            ];

            const matchResults = [];
            const standings = {};

            groupTeams.forEach(team => {
                standings[team.nome] = {
                    team: team,
                    points: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    goalDifference: 0
                };
            });

            matches.forEach(match => {
                const goalsTeam1 = Math.floor(Math.random() * 5);
                const goalsTeam2 = Math.floor(Math.random() * 5);

                const result = {
                    team1: match[0],
                    team2: match[1],
                    goalsTeam1: goalsTeam1,
                    goalsTeam2: goalsTeam2
                };

                matchResults.push(result);
            });

            matchResults.forEach(match => {
                const team1Name = match.team1.nome;
                const team2Name = match.team2.nome;

                standings[team1Name].goalsFor += match.goalsTeam1;
                standings[team1Name].goalsAgainst += match.goalsTeam2;

                standings[team2Name].goalsFor += match.goalsTeam2;
                standings[team2Name].goalsAgainst += match.goalsTeam1;

                standings[team1Name].goalDifference =
                    standings[team1Name].goalsFor - standings[team1Name].goalsAgainst;

                standings[team2Name].goalDifference =
                    standings[team2Name].goalsFor - standings[team2Name].goalsAgainst;

                if (match.goalsTeam1 > match.goalsTeam2) {
                    standings[team1Name].points += 3;
                } else if (match.goalsTeam1 < match.goalsTeam2) {
                    standings[team2Name].points += 3;
                } else {
                    standings[team1Name].points += 1;
                    standings[team2Name].points += 1;
                }
            });

            const sortedStandings = Object.values(standings);

            sortedStandings.sort((a, b) => {
                if (b.points !== a.points) {
                    return b.points - a.points;
                }

                if (b.goalDifference !== a.goalDifference) {
                    return b.goalDifference - a.goalDifference;
                }

                return Math.random() - 0.5;
            });

            const qualifiedTeams = sortedStandings.slice(0, 2);
            qualifiedByGroup[group] = qualifiedTeams.map(item => item.team);

            groupStageData[group] = {
                matchResults: matchResults,
                sortedStandings: sortedStandings,
                qualifiedTeams: qualifiedTeams
            };
        }

        const groupStageTitle = document.createElement("h1");
        groupStageTitle.innerHTML = `<ion-icon name="calendar-outline"></ion-icon> Group Stage Matches`;
        teamsContainer.appendChild(groupStageTitle);


        for (let group in groupStageData) {
            const groupStageSection = document.createElement("div");
            groupStageSection.classList.add("group-stage-section");
            teamsContainer.appendChild(groupStageSection);

            const stageGroupTitle = document.createElement("h2");
            stageGroupTitle.textContent = `Group ${group}`;
            groupStageSection.appendChild(stageGroupTitle);

            const content = document.createElement("div");
            content.classList.add("group-stage-content");
            groupStageSection.appendChild(content);

            const matchesTitle = document.createElement("h3");
            matchesTitle.textContent = "Matches";
            content.appendChild(matchesTitle);

            groupStageData[group].matchResults.forEach(match => {
                const p = document.createElement("p");
                p.textContent = `${translateCountry(match.team1.nome)} ${match.goalsTeam1} x ${match.goalsTeam2} ${translateCountry(match.team2.nome)}`;
                content.appendChild(p);
            });

            const standingsTitle = document.createElement("h3");
            standingsTitle.textContent = "Standings";
            content.appendChild(standingsTitle);

            groupStageData[group].sortedStandings.forEach((team, index) => {
                const p = document.createElement("p");
                p.textContent = `${index + 1}. ${translateCountry(team.team.nome)} - ${team.points} pts | GD: ${team.goalDifference} | GF: ${team.goalsFor} | GA: ${team.goalsAgainst}`;
                content.appendChild(p);
            });

            const qualifiedTitle = document.createElement("h3");
            qualifiedTitle.textContent = "Qualified";
            content.appendChild(qualifiedTitle);

            groupStageData[group].qualifiedTeams.forEach(team => {
                const p = document.createElement("p");
                p.textContent = translateCountry(team.team.nome);
                content.appendChild(p);
            });

            groupStageSection.addEventListener("click", () => {
                groupStageSection.classList.toggle("active");
            });
        }

        const roundOf16 = [
            [qualifiedByGroup.A[0], qualifiedByGroup.B[1]],
            [qualifiedByGroup.B[0], qualifiedByGroup.A[1]],
            [qualifiedByGroup.C[0], qualifiedByGroup.D[1]],
            [qualifiedByGroup.D[0], qualifiedByGroup.C[1]],
            [qualifiedByGroup.E[0], qualifiedByGroup.F[1]],
            [qualifiedByGroup.F[0], qualifiedByGroup.E[1]],
            [qualifiedByGroup.G[0], qualifiedByGroup.H[1]],
            [qualifiedByGroup.H[0], qualifiedByGroup.G[1]]
        ];

        const roundOf16Results = simulateKnockout(roundOf16);

        roundOf16Results.forEach(match => {
            createJourneyCard("Round of 16", match);
        });

        const knockoutTitle = document.createElement("h1");
        knockoutTitle.innerHTML = `<ion-icon name="trophy-outline"></ion-icon> Knockout Stage`;
        teamsContainer.appendChild(knockoutTitle);

        const knockoutWrapper = document.createElement("div");
        knockoutWrapper.classList.add("knockout-wrapper");
        teamsContainer.appendChild(knockoutWrapper);

        createKnockoutStageItem("16", "Round of 16", roundOf16Results, knockoutWrapper, "round16");


        const quarterfinals = [
            [roundOf16Results[0].winner, roundOf16Results[1].winner],
            [roundOf16Results[2].winner, roundOf16Results[3].winner],
            [roundOf16Results[4].winner, roundOf16Results[5].winner],
            [roundOf16Results[6].winner, roundOf16Results[7].winner]
        ];

        const quarterfinalResults = simulateKnockout(quarterfinals);

        quarterfinalResults.forEach(match => {
            createJourneyCard("Quarterfinals", match);
        });

        createKnockoutStageItem("8", "Quarterfinals", quarterfinalResults, knockoutWrapper, "quarterfinals");

        const semifinals = [
            [quarterfinalResults[0].winner, quarterfinalResults[1].winner],
            [quarterfinalResults[2].winner, quarterfinalResults[3].winner]
        ];

        const semifinalResults = simulateKnockout(semifinals);

        semifinalResults.forEach(match => {
            createJourneyCard("Semifinals", match);
        });

        createKnockoutStageItem("4", "Semifinals", semifinalResults, knockoutWrapper, "semifinals");

        const thirdPlaceMatch = [
            [semifinalResults[0].loser, semifinalResults[1].loser]
        ];

        const thirdPlaceResults = simulateKnockout(thirdPlaceMatch);

        thirdPlaceResults.forEach(match => {
            createJourneyCard("Third Place", match);
        });

        createKnockoutStageItem("★", "Third Place", thirdPlaceResults, knockoutWrapper, "third-place");

        const final = [
            [semifinalResults[0].winner, semifinalResults[1].winner]
        ];

        const finalResults = simulateKnockout(final);

        const champion = finalResults[0].winner;

        finalResults.forEach(match => {
            createJourneyCard("Final", match);
        });

        createKnockoutStageItem("🏆", "Final", finalResults, knockoutWrapper, "final-stage");

        const knockoutChampionCard = document.createElement("div");
        knockoutChampionCard.classList.add("knockout-champion-card");

        const knockoutChampionLabel = document.createElement("span");
        knockoutChampionLabel.textContent = "Champion";

        const knockoutChampionName = document.createElement("h2");
        knockoutChampionName.textContent = translateCountry(champion.nome);

        knockoutChampionCard.innerHTML = `<div class="champion-icon">🏆</div>`;
        knockoutChampionCard.appendChild(knockoutChampionLabel);
        knockoutChampionCard.appendChild(knockoutChampionName);

        knockoutWrapper.appendChild(knockoutChampionCard);

        const championCard = document.createElement("div");
        championCard.classList.add("journey-card", "champion-card");

        const championTitle = document.createElement("h3");
        championTitle.textContent = "Champion";
        championCard.appendChild(championTitle);

        const championText = document.createElement("p");
        championText.textContent = translateCountry(champion.nome);
        championCard.appendChild(championText);

        journeyContainer.appendChild(championCard);


        fetch("https://cors-anywhere.herokuapp.com/https://development-internship-api.geopostenergy.com/WorldCup/FinalResult", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "git-user": "diasalana"
            },
            body: JSON.stringify({
                equipeA: finalResults[0].team1.token,
                equipeB: finalResults[0].team2.token,
                golsEquipeA: finalResults[0].goalsTeam1,
                golsEquipeB: finalResults[0].goalsTeam2,
                golsPenaltyTimeA: finalResults[0].penaltyTeam1,
                golsPenaltyTimeB: finalResults[0].penaltyTeam2
            })
        })
            .then(response => response.text())
            .then(data => {
                //console.log("Final result sent successfully:", data);
            })
            .catch(error => {
                //console.error("Error sending final result:", error);
            });

    });