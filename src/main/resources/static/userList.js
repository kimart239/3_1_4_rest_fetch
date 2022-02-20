const usersRow = document.getElementById("usersTable")
let userRowTable=''
const edit='EDIT'
const del='DELETE'

fetch('http://localhost:8080/admin/userlist')
    .then(response => response.json())
    .then(users => {
        users.forEach(user => {
            console.log(user)
            let role=''
            for (let i = 0; i < user.roles.length; i++) {
                role += ((user.roles[i].role == 'ROLE_USER') ? 'USER' : (user.roles[i].role == 'ROLE_ADMIN') ? 'ADMIN' : '') + '\n'
            }
            userRowTable += '<tr>' +
                '<td>' + user.id + '</td>' +
                '<td>' + user.firstName + '</td>' +
                '<td>' + user.lastName + '</td>' +
                '<td>' + user.email + '</td>' +
                '<td>' + user.age + '</td>' +
                '<td>' + user.username + '</td>' +
                '<td>' + role + '</td>' +
                '<td>' +
                '<button type="button" onclick="test1(' + user.id + ')" ' +
                    'class="btn btn-primary">EDIT</button>' +
                '</td>' +
                '<td>' +
                '<button type="button" onclick="getModalWindow(' + user.id + ',' + del +')" ' +
                    'class="btn btn-danger">DELETE</button>' +
                '</td>' +
                '</tr>'
        })
        usersRow.innerHTML = userRowTable
    })
