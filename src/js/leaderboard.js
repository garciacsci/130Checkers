document.addEventListener('DOMContentLoaded', function() {
    fetchLeaderboardData(); // Initial fetch for the full leaderboard

    document.getElementById('showMyGames').addEventListener('click', showMyGames);
    document.getElementById('showAllGames').addEventListener('click', fetchLeaderboardData);
});

function fetchLeaderboardData() {
    fetch('../server/leaderboardAPI.php?action=getLeaderboard')
    .then(response => response.json())
    .then(data => {
        populateLeaderboard(data);
    })
    .catch(error => {
        console.error('Error fetching leaderboard data:', error);
    });
}

function showMyGames() {
    fetch('../server/leaderboardAPI.php?action=getMyGames&playerId=' + getCurrentPlayerId())
    .then(response => response.json())
    .then(data => {
        populateLeaderboard(data);
    })
    .catch(error => {
        console.error('Error fetching my games data:', error);
    });
}


function populateLeaderboard(data) {
    const tableBody = document.getElementById('leaderboardTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing data

    data.forEach((player, index) => {
        let row = tableBody.insertRow();
        let rankCell = row.insertCell(0);
        let usernameCell = row.insertCell(1);
        let wonGamesCell = row.insertCell(2);
        let totalTimePlayedCell = row.insertCell(3);
        let gamesPlayedCell = row.insertCell(4);

        rankCell.textContent = index + 1;
        usernameCell.textContent = player.username;
        wonGamesCell.textContent = player.games_won;
        totalTimePlayedCell.textContent = player.total_time_played;
        gamesPlayedCell.textContent = player.games_played;
    });

    displayTopThreePlayers(data); // Display top 3 players in a separate list

}

function getCurrentPlayerId() {
    return Cookies.get('user_id');
}

function displayTopThreePlayers(data) {
    const topPlayersList = document.getElementById('topPlayersList');
    topPlayersList.innerHTML = ''; // Clear existing content

    // Assuming data is sorted by score or another metric
    data.slice(0, 3).forEach((player, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${player.username}`;
        topPlayersList.appendChild(listItem);
    });
}


function sortTable(columnIndex) {
    const table = document.getElementById("leaderboardTable");
    let rows, switching, shouldSwitch, i, x, y;
    let switchcount = 0;
    let direction = "asc"; // Default sort direction

    switching = true;

    // Continue looping until no switching has been done
    while (switching) {
        switching = false; // Start by saying no switching is done
        rows = table.rows;

        // Loop through all table rows (except the first, which contains table headers)
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false; // Start by saying there should be no switching

            // Get the two elements to compare, one from current row and one from the next
            x = rows[i].getElementsByTagName("TD")[columnIndex];
            y = rows[i + 1].getElementsByTagName("TD")[columnIndex];

            // Check if the two rows should switch place, based on the direction
            if (direction === "asc") {
                if (shouldSwitchRows(x, y, columnIndex)) {
                    shouldSwitch = true;
                    break;
                }
            } else if (direction === "desc") {
                if (shouldSwitchRows(y, x, columnIndex)) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            // If a switch has been marked, make the switch and continue the loop
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            // If no switching has been done AND the direction is "asc", set the direction to "desc" and run the loop again
            if (switchcount === 0 && direction === "asc") {
                direction = "desc";
                switching = true;
            }
        }
    }
}

function shouldSwitchRows(x, y, columnIndex) {
    // Might add custom comparison logic based on data type for each column
    // So taht if the column contains numeric values or time, compare as numbers or time
    // For now, the comparison is done as strings

    // Convert to lowercase for case-insensitive comparison
    let xContent = x.innerHTML.toLowerCase();
    let yContent = y.innerHTML.toLowerCase();

    return xContent > yContent; // Return true if row x should come before row y
}