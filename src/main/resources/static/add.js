addUser = document.getElementById("addNewUser")
roleSelect = document.getElementById("newRole")
let new_Role = []
let roleForNew;

addUser.addEventListener('submit', (ev => {
    ev.preventDefault()

    for (let i = 0; i < roleSelect.length; i++) {
        let option = roleSelect.options[i]
        if (option.selected) {
            new_Role.push(option.value)
            roleForNew += (option.value == 'ROLE_ADMIN' ? 'ADMIN' : ((option.value == 'ROLE_USER') ? 'USER' : '')) + '\n'

        }
    }

    fetch('http://localhost:8080/admin/newUser?newRole=' + new_Role, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: window.firstName.value,
            lastName: window.lastName.value,
            age: window.age.value,
            email: window.email.value,
            username: window.username.value,
            password: window.password.value,
        })
    })
        .then(res => res.json())
        .then(user=> {
            getAllUsers()
            $('#usersTable' + ' tr:last').after(
                '<tr id=' + user.id + '>' +
                '<td>' + user.id + '</td>' +
                '<td>' + window.firstName.value + '</td>' +
                '<td>' + window.lastName.value + '</td>' +
                '<td>' + window.age.value + '</td>' +
                '<td>' + window.email.value + '</td>' +
                '<td>' + roleForNew + '</td>' +
                '<td> <button type="button" onclick="editModal(' + user.id + ')" ' +
                'class="btn btn-primary">EDIT</button> </td>' +
                '<td> <button type="button" onclick="deleteModal(' + user.id + ')" ' +
                'class="btn btn-danger">DELETE</button> </td>' +
                '</tr>')

            window.firstName.value = ''
            window.lastName.value = ''
            window.age.value = ''
            window.email.value = ''
            window.username.value = ''
            window.password.value = ''
            window.roleSelect.value = ''

            window.location.replace("http://localhost:8080/admin")

        })
}))

