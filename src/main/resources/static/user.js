userTable = document.getElementById("userInfo")
let userRow=""

fetch('http://localhost:8080/userInfo')
    .then(response => response.json())
    .then(user => {
        let role = "";

        for (let i = 0; i < user.roles.length; i++) {
            role += ((user.roles[i].role == 'ROLE_USER') ? 'USER' : (user.roles[i].role == 'ROLE_ADMIN') ? 'ADMIN' : '') + '\n'
        }
        userRow = '<td>' + user.id + '</td>' +
            '<td>' + user.firstName + '</td>' +
            '<td>' + user.lastName + '</td>' +
            '<td>' + user.email + '</td>' +
            '<td>' + user.age + '</td>' +
            '<td>' + user.username + '</td>' +
            '<td>' + role + '</td>'

            userTable.innerHTML = userRow
    })

