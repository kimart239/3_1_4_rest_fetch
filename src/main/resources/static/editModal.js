function editModal(id) {
    const modalBlock = document.getElementById("modalWindow")
    let modal_win = ''
    let select_role = `<br/><br/><label for="password"><strong>Password</strong></label>
                     <input class="d-inline-block w-100" type="password" name="password" value=""
                     id="e_password"/>
                    <br/><br/><strong>Roles</strong>
                     <select class="d-inline-block w-100" id="e_roles" name="role_authorities" size="2" multiple>
                        <option value="ROLE_ADMIN">ADMIN</option>
                        <option value="ROLE_USER">USER</option>
                     </select><br/>`

    fetch('http://localhost:8080/admin/' + id)
        .then(res => res.json())
        .then(user => {
            modal_win = '<div class="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<h3 class="modal-title" id="exampleModalLabel">Edit user</h3>' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>' +
                '<div class="modal-body text-center" id="modalBody">' +
                '<label for="firstName"><strong>First name</strong></label>' +
                '<input class="d-inline-block w-100" type="text" name="firstName" id="e_firstName" ' +
                'value="' + user.firstName + '" />' +
                '<br/><br/><label for="lastName"><strong>Last name</strong></label>' +
                '<input class="d-inline-block w-100" type="text" name="lastName" ' +
                'value="' + user.lastName + '" id="e_lastName" />' +
                '<br/><br/><label for="age"><strong>Age</strong></label>' +
                '<input class="d-inline-block w-100" type="number" name="age" ' +
                'value="' + user.age + '" id="e_age" />' +
                '<br/><br/><label for="email"><strong>Email</strong></label>' +
                '<input class="d-inline-block w-100" type="text" name="email" ' +
                'value="' + user.email + '" id="e_email" />' +
                '<br/><br/><label for="username"><strong>Username</strong></label>' +
                '<input class="d-inline-block w-100" type="text" name="username" ' +
                'value="' + user.username + '" id="e_username" />' + select_role +
                '<br/><div class="modal-footer">' +
                '<button type="button" class="btn btn-lg mt-3 btn-secondary" data-dismiss="modal">Close' +
                '</button>' +
                '<button type="button" onclick="getModalAction(' + user.id + ')" ' +
                'class="btn btn-lg btn-primary mt-3" data-dismiss="modal">EDIT</button>' +
                '</div></div></div></div></div>'
            modalBlock.innerHTML = modal_win
            $('#editModal').modal()
        })
}

function getModalAction(id) {
    let rolesArr = window.e_roles
    let newRoles = []
    let roleForTable = ''

    for (let i = 0; i < rolesArr.length; i++) {
        let option = rolesArr.options[i]
        if (option.selected) {
            newRoles.push(option.value)
            roleForTable += (option.value=='ROLE_ADMIN'?'ADMIN':((option.value=='ROLE_USER')?'USER':'')) + '\n'
        }
    }
    fetch('http://localhost:8080/admin/' + id + '?role_arr=' + newRoles, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id : id,
            firstName: window.e_firstName.value,
            lastName: window.e_lastName.value,
            age: window.e_age.value,
            email: window.e_email.value,
            username: window.e_username.value,
            password: window.e_password.value,

        })
    })
        .then(res=>res.json())
        .then(() => {
            getAllUsers()
            $('#' + id).replaceWith('<tr id=' + id + '>' +
                '<td>' + id + '</td>' +
                '<td>' + window.firstName.value + '</td>' +
                '<td>' + window.lastName.value + '</td>' +
                '<td>' + window.email.value + '</td>' +
                '<td>' + window.age.value + '</td>' +
                '<td>' + window.username.value + '</td>' +
                '<td>' + roleForTable + '</td>' +
                '<td> <button type="button" onclick="editModal(' + id + ')" ' +
                'class="btn btn-primary">EDIT</button> </td>' +
                '<td> <button type="button" onclick="deleteModal(' + id + ')" ' +
                'class="btn btn-danger">DELETE</button> </td>' +
                '</tr>');
        })
}