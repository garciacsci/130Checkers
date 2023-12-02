document.addEventListener('DOMContentLoaded', function() {
    fetch('../server/leaderboardAPI.php?action=getLeaderboard')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('leaderboardTable').getElementsByTagName('tbody')[0];

        data.forEach((player, index) => {
            let row = tableBody.insertRow();
            let rankCell = row.insertCell(0);
            let usernameCell = row.insertCell(1);
            let scoreCell = row.insertCell(2);
            let gamesPlayedCell = row.insertCell(3);

            rankCell.textContent = index + 1;
            usernameCell.textContent = player.username;
            scoreCell.textContent = player.total_score;
            gamesPlayedCell.textContent = player.games_played;
        });

        const encodedData = JSON.stringify(data);
        console.log(encodedData);
    })
    .catch(error => {
        const encodedError = JSON.stringify(error);
        console.error('Error fetching leaderboard data:', encodedError);
    });
});