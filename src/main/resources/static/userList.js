getAllUsers()

function getAllUsers() {


const usersRow = document.getElementById("usersTable")
let userRowTable=''

fetch('http://localhost:8080/admin/userlist')
    .then(response => response.json())
    .then(users => {
        users.forEach(user => {
            let role=''
            for (let i = 0; i < user.roles.length; i++) {
                role += ((user.roles[i].role == 'ROLE_ADMIN') ? 'ADMIN' : (user.roles[i].role == 'ROLE_USER') ? 'USER' : '') + '\n'
            }
            userRowTable += '<tr id="' + user.id + '">' +
                '<td>' + user.id + '</td>' +
                '<td>' + user.firstName + '</td>' +
                '<td>' + user.lastName + '</td>' +
                '<td>' + user.email + '</td>' +
                '<td>' + user.age + '</td>' +
                '<td>' + user.username + '</td>' +
                '<td>' + role + '</td>' +
                '<td>' +
                '<button type="button" onclick="editModal(' + user.id + ')" ' +
                    'class="btn btn-primary">EDIT</button>' +
                '</td>' +
                '<td>' +
                '<button type="button" onclick="deleteModal(' + user.id + ')" ' +
                    'class="btn btn-danger">DELETE</button>' +
                '</td>' +
                '</tr>'
        })
        usersRow.innerHTML = userRowTable
    })
}