const url = "https://cors-anywhere.herokuapp.com/https://development-internship-api.geopostenergy.com/WorldCup/GetAllTeams";

const teamsContainer = document.getElementById("main-content");
const journeyContainer = document.getElementById("tournament-journey");

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
    "Venezuela": "Venezuela"
};

function translateCountry(name) {
    return countryTranslations[name] || name;
}

function createJourneyCard(stageName, match) {
    const card = document.createElement("div");
    card.classList.add("journey-card");

    const stage = document.createElement("h3");
    stage.textContent = stageName;
    card.appendChild(stage);

    const result = document.createElement("p");

    if (match.goalsTeam1 === match.goalsTeam2) {
        result.textContent = `${translateCountry(match.team1.nome)} ${match.goalsTeam1} x ${match.goalsTeam2} ${translateCountry(match.team2.nome)} (${match.penaltyTeam1} x ${match.penaltyTeam2} pen)`;
    } else {
        result.textContent = `${translateCountry(match.team1.nome)} ${match.goalsTeam1} x ${match.goalsTeam2} ${translateCountry(match.team2.nome)}`;
    }

    card.appendChild(result);

    journeyContainer.appendChild(card);
}

fetch(url, {
    headers: {
        "git-user": "diasalana"
    }
})
    .then(response => response.json())
    .then(data => {
        //console.log(data);

        const shuffledTeams = data.sort(() => Math.random() - 0.5);
        //console.log(shuffledTeams);

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

        //console.log(groups);

        const qualifiedByGroup = {};

        const groupsMainTitle = document.createElement("h1");
        groupsMainTitle.textContent = "World Cup Groups";
        teamsContainer.appendChild(groupsMainTitle);

        const groupStageData = {};

        for (let group in groups) {

            const groupSection = document.createElement("div");
            groupSection.classList.add("group-section");
            teamsContainer.appendChild(groupSection);

            const groupTitle = document.createElement("h2");
            groupTitle.textContent = `Group ${group}`;
            groupSection.appendChild(groupTitle);

            groups[group].forEach(team => {
                const p = document.createElement("p");
                p.textContent = translateCountry(team.nome);
                groupSection.appendChild(p);
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

            //console.log(matches);


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

            //console.log(matchResults);


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

            //console.log(standings);

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

            //console.log(`Sorted Standings Group ${group}:`, sortedStandings);

            const qualifiedTeams = sortedStandings.slice(0, 2);
            qualifiedByGroup[group] = qualifiedTeams.map(item => item.team);

            groupStageData[group] = {
                matchResults: matchResults,
                sortedStandings: sortedStandings,
                qualifiedTeams: qualifiedTeams
            };

            //console.log(`Qualified Teams Group ${group}:`, qualifiedTeams);

            //console.log("All qualified teams:", qualifiedByGroup);

        }

        const groupStageTitle = document.createElement("h1");
        groupStageTitle.textContent = "Group Stage Matches";
        teamsContainer.appendChild(groupStageTitle);

        for (let group in groupStageData) {
            const groupStageSection = document.createElement("div");
            groupStageSection.classList.add("group-stage-section");
            teamsContainer.appendChild(groupStageSection);

            const stageGroupTitle = document.createElement("h2");
            stageGroupTitle.textContent = `Group ${group}`;
            groupStageSection.appendChild(stageGroupTitle);

            const matchesTitle = document.createElement("h3");
            matchesTitle.textContent = "Matches";
            groupStageSection.appendChild(matchesTitle);

            groupStageData[group].matchResults.forEach(match => {
                const p = document.createElement("p");
               p.textContent = `${translateCountry(match.team1.nome)} ${match.goalsTeam1} x ${match.goalsTeam2} ${translateCountry(match.team2.nome)}`;
                groupStageSection.appendChild(p);
            });

            const standingsTitle = document.createElement("h3");
            standingsTitle.textContent = "Standings";
            groupStageSection.appendChild(standingsTitle);

            groupStageData[group].sortedStandings.forEach((team, index) => {
                const p = document.createElement("p");
                p.textContent = `${index + 1}. ${translateCountry(team.team.nome)} - ${team.points} pts | GD: ${team.goalDifference} | GF: ${team.goalsFor} | GA: ${team.goalsAgainst}`;
                groupStageSection.appendChild(p);
            });

            const qualifiedTitle = document.createElement("h3");
            qualifiedTitle.textContent = "Qualified";
            groupStageSection.appendChild(qualifiedTitle);

            groupStageData[group].qualifiedTeams.forEach(team => {
                const p = document.createElement("p");
                p.textContent = translateCountry(team.team.nome);
                groupStageSection.appendChild(p);
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

        //console.log("Round of 16:", roundOf16);

        const roundOf16Results = [];

        roundOf16.forEach(match => {
            const goalsTeam1 = Math.floor(Math.random() * 5);
            const goalsTeam2 = Math.floor(Math.random() * 5);

            let penaltyTeam1 = 0;
            let penaltyTeam2 = 0;
            let winner;

            if (goalsTeam1 > goalsTeam2) {
                winner = match[0];
            } else if (goalsTeam1 < goalsTeam2) {
                winner = match[1];
            } else {
                penaltyTeam1 = Math.floor(Math.random() * 5) + 1;
                penaltyTeam2 = Math.floor(Math.random() * 5) + 1;

                while (penaltyTeam1 === penaltyTeam2) {
                    penaltyTeam2 = Math.floor(Math.random() * 5) + 1;
                }

                winner = penaltyTeam1 > penaltyTeam2 ? match[0] : match[1];
            }

            const result = {
                team1: match[0],
                team2: match[1],
                goalsTeam1: goalsTeam1,
                goalsTeam2: goalsTeam2,
                penaltyTeam1: penaltyTeam1,
                penaltyTeam2: penaltyTeam2,
                winner: winner
            };

            roundOf16Results.push(result);
        });

        //console.log("Round of 16 Results:", roundOf16Results);

        roundOf16Results.forEach(match => {
            createJourneyCard("Round of 16", match);
        });

        const knockoutTitle = document.createElement("h1");
        knockoutTitle.textContent = "Knockout Stage";
        teamsContainer.appendChild(knockoutTitle);

        const roundOf16Section = document.createElement("div");
        roundOf16Section.classList.add("knockout-section");
        teamsContainer.appendChild(roundOf16Section);

        const roundOf16Title = document.createElement("h2");
        roundOf16Title.textContent = "Round of 16";
        roundOf16Section.appendChild(roundOf16Title);

        roundOf16Results.forEach(match => {
            const p = document.createElement("p");

            if (match.goalsTeam1 === match.goalsTeam2) {
                p.textContent = `${translateCountry(match.team1.nome)} ${match.goalsTeam1} x ${match.goalsTeam2} ${translateCountry(match.team2.nome)} (Penalties: ${match.penaltyTeam1} x ${match.penaltyTeam2})`;
            } else {
                p.textContent = `${translateCountry(match.team1.nome)} ${match.goalsTeam1} x ${match.goalsTeam2} ${translateCountry(match.team2.nome)}`;
            }

            roundOf16Section.appendChild(p);
        });

        const quarterfinals = [
            [roundOf16Results[0].winner, roundOf16Results[1].winner],
            [roundOf16Results[2].winner, roundOf16Results[3].winner],
            [roundOf16Results[4].winner, roundOf16Results[5].winner],
            [roundOf16Results[6].winner, roundOf16Results[7].winner]
        ];

        //console.log("Quarterfinals:", quarterfinals);

        const quarterfinalResults = [];

        quarterfinals.forEach(match => {
            const goalsTeam1 = Math.floor(Math.random() * 5);
            const goalsTeam2 = Math.floor(Math.random() * 5);

            let penaltyTeam1 = 0;
            let penaltyTeam2 = 0;
            let winner;

            if (goalsTeam1 > goalsTeam2) {
                winner = match[0];
            } else if (goalsTeam1 < goalsTeam2) {
                winner = match[1];
            } else {
                penaltyTeam1 = Math.floor(Math.random() * 5) + 1;
                penaltyTeam2 = Math.floor(Math.random() * 5) + 1;

                while (penaltyTeam1 === penaltyTeam2) {
                    penaltyTeam2 = Math.floor(Math.random() * 5) + 1;
                }

                winner = penaltyTeam1 > penaltyTeam2 ? match[0] : match[1];
            }

            const result = {
                team1: match[0],
                team2: match[1],
                goalsTeam1: goalsTeam1,
                goalsTeam2: goalsTeam2,
                penaltyTeam1: penaltyTeam1,
                penaltyTeam2: penaltyTeam2,
                winner: winner
            };

            quarterfinalResults.push(result);
        });

        //console.log("Quarterfinal Results:", quarterfinalResults);

        const quarterfinalSection = document.createElement("div");
        quarterfinalSection.classList.add("knockout-section");
        teamsContainer.appendChild(quarterfinalSection);

        const quarterfinalTitle = document.createElement("h2");
        quarterfinalTitle.textContent = "Quarterfinals";
        quarterfinalSection.appendChild(quarterfinalTitle);

        quarterfinalResults.forEach(match => {
            const p = document.createElement("p");

            if (match.goalsTeam1 === match.goalsTeam2) {
                p.textContent = `${translateCountry(match.team1.nome)} ${match.goalsTeam1} x ${match.goalsTeam2} ${translateCountry(match.team2.nome)} (Penalties: ${match.penaltyTeam1} x ${match.penaltyTeam2})`;
            } else {
                p.textContent = `${translateCountry(match.team1.nome)} ${match.goalsTeam1} x ${match.goalsTeam2} ${translateCountry(match.team2.nome)}`;
            }

            quarterfinalSection.appendChild(p);
        });

        quarterfinalResults.forEach(match => {
            createJourneyCard("Quarterfinals", match);
        });

        const semifinals = [
            [quarterfinalResults[0].winner, quarterfinalResults[1].winner],
            [quarterfinalResults[2].winner, quarterfinalResults[3].winner]
        ];

        //console.log("Semifinals:", semifinals);

        const semifinalResults = [];
        semifinals.forEach(match => {
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


            const result = {
                team1: match[0],
                team2: match[1],
                goalsTeam1: goalsTeam1,
                goalsTeam2: goalsTeam2,
                penaltyTeam1: penaltyTeam1,
                penaltyTeam2: penaltyTeam2,
                winner: winner,
                loser: loser
            };

            semifinalResults.push(result);
        });

        //console.log("Semifinal Results:", semifinalResults);

        const semifinalSection = document.createElement("div");
        semifinalSection.classList.add("knockout-section");
        teamsContainer.appendChild(semifinalSection);

        const semifinalTitle = document.createElement("h2");
        semifinalTitle.textContent = "Semifinals";
        semifinalSection.appendChild(semifinalTitle);

        semifinalResults.forEach(match => {
            const p = document.createElement("p");

            if (match.goalsTeam1 === match.goalsTeam2) {
                p.textContent = `${translateCountry(match.team1.nome)} ${match.goalsTeam1} x ${match.goalsTeam2} ${translateCountry(match.team2.nome)} (Penalties: ${match.penaltyTeam1} x ${match.penaltyTeam2})`;
            } else {
                p.textContent = `${translateCountry(match.team1.nome)} ${match.goalsTeam1} x ${match.goalsTeam2} ${translateCountry(match.team2.nome)}`;
            }

            semifinalSection.appendChild(p);
        });

        semifinalResults.forEach(match => {
            createJourneyCard("Semifinals", match);
        });


        const thirdPlaceMatch = [
            [semifinalResults[0].loser, semifinalResults[1].loser]
        ];

        const thirdPlaceResults = [];

        thirdPlaceMatch.forEach(match => {
            const goalsTeam1 = Math.floor(Math.random() * 5);
            const goalsTeam2 = Math.floor(Math.random() * 5);

            let penaltyTeam1 = 0;
            let penaltyTeam2 = 0;
            let winner;

            if (goalsTeam1 > goalsTeam2) {
                winner = match[0];
            } else if (goalsTeam1 < goalsTeam2) {
                winner = match[1];
            } else {
                penaltyTeam1 = Math.floor(Math.random() * 5) + 1;
                penaltyTeam2 = Math.floor(Math.random() * 5) + 1;

                while (penaltyTeam1 === penaltyTeam2) {
                    penaltyTeam2 = Math.floor(Math.random() * 5) + 1;
                }

                winner = penaltyTeam1 > penaltyTeam2 ? match[0] : match[1];
            }

            const result = {
                team1: match[0],
                team2: match[1],
                goalsTeam1: goalsTeam1,
                goalsTeam2: goalsTeam2,
                penaltyTeam1: penaltyTeam1,
                penaltyTeam2: penaltyTeam2,
                winner: winner
            };

            thirdPlaceResults.push(result);
        });

        //console.log("Third Place Results:", thirdPlaceResults);

        const thirdPlaceSection = document.createElement("div");
        thirdPlaceSection.classList.add("knockout-section");
        teamsContainer.appendChild(thirdPlaceSection);

        const thirdPlaceTitle = document.createElement("h2");
        thirdPlaceTitle.textContent = "Third Place Match";
        thirdPlaceSection.appendChild(thirdPlaceTitle);

        thirdPlaceResults.forEach(match => {
            const p = document.createElement("p");

            if (match.goalsTeam1 === match.goalsTeam2) {
                p.textContent = `${translateCountry(match.team1.nome)} ${match.goalsTeam1} x ${match.goalsTeam2} ${translateCountry(match.team2.nome)} (Penalties: ${match.penaltyTeam1} x ${match.penaltyTeam2})`;
            } else {
                p.textContent = `${translateCountry(match.team1.nome)} ${match.goalsTeam1} x ${match.goalsTeam2} ${translateCountry(match.team2.nome)}`;
            }

            thirdPlaceSection.appendChild(p);

            const winner = document.createElement("p");
            winner.textContent = `Third Place: ${translateCountry(match.winner.nome)}`;
            thirdPlaceSection.appendChild(winner);
        });

        thirdPlaceResults.forEach(match => {
            createJourneyCard("Third Place", match);
        });


        const final = [
            [semifinalResults[0].winner, semifinalResults[1].winner]
        ];

        const finalResults = [];

        final.forEach(match => {
            const goalsTeam1 = Math.floor(Math.random() * 5);
            const goalsTeam2 = Math.floor(Math.random() * 5);

            let penaltyTeam1 = 0;
            let penaltyTeam2 = 0;
            let winner;

            if (goalsTeam1 > goalsTeam2) {
                winner = match[0];
            } else if (goalsTeam1 < goalsTeam2) {
                winner = match[1];
            } else {
                penaltyTeam1 = Math.floor(Math.random() * 5) + 1;
                penaltyTeam2 = Math.floor(Math.random() * 5) + 1;

                while (penaltyTeam1 === penaltyTeam2) {
                    penaltyTeam2 = Math.floor(Math.random() * 5) + 1;
                }

                winner = penaltyTeam1 > penaltyTeam2 ? match[0] : match[1];
            }

            const result = {
                team1: match[0],
                team2: match[1],
                goalsTeam1: goalsTeam1,
                goalsTeam2: goalsTeam2,
                penaltyTeam1: penaltyTeam1,
                penaltyTeam2: penaltyTeam2,
                winner: winner
            };

            finalResults.push(result);
        });

        //console.log("Final Results:", finalResults);


           const champion = finalResults[0].winner;


        finalResults.forEach(match => {
            createJourneyCard("Final", match);
        });

        const championCard = document.createElement("div");
        championCard.classList.add("journey-card", "champion-card");

        const championTitle = document.createElement("h3");
        championTitle.textContent = "Champion";
        championCard.appendChild(championTitle);

        const championText = document.createElement("p");
       championText.textContent = translateCountry(champion.nome);
        championCard.appendChild(championText);

        journeyContainer.appendChild(championCard);



        const finalSection = document.createElement("div");
        finalSection.classList.add("knockout-section");
        teamsContainer.appendChild(finalSection);

        const finalTitle = document.createElement("h2");
        finalTitle.textContent = "Final";
        finalSection.appendChild(finalTitle);

        finalResults.forEach(match => {
            const p = document.createElement("p");

            if (match.goalsTeam1 === match.goalsTeam2) {
                p.textContent = `${translateCountry(match.team1.nome)} ${match.goalsTeam1} x ${match.goalsTeam2} ${translateCountry(match.team2.nome)} (Penalties: ${match.penaltyTeam1} x ${match.penaltyTeam2})`;
            } else {
                p.textContent = `${translateCountry(match.team1.nome)} ${match.goalsTeam1} x ${match.goalsTeam2} ${translateCountry(match.team2.nome)}`;
            }

            finalSection.appendChild(p);

            const championText = document.createElement("p");
            championText.textContent = `Champion: ${translateCountry(match.winner.nome)}`;
            finalSection.appendChild(championText);
        });

        //console.log("Champion:", champion.nome);



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