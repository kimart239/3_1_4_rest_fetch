function deleteModal(id) {
    const modalBlock = document.getElementById("modalWindow")
    let modal_win = ''
    let select_role = `<br/><br/><strong>Roles</strong>
                     <select class="d-inline-block w-100" id="d_roles" name="role_authorities" size="2" multiple>
                        <option value="ROLE_ADMIN">ADMIN</option>
                        <option value="ROLE_USER">USER</option>
                     </select><br/>`

    fetch('http://localhost:8080/admin/' + id)
        .then(res => res.json())
        .then(user => {
            modal_win = '<div class="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<h3 class="modal-title" id="exampleModalLabel">Delete user</h3>' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>' +
                '<div class="modal-body text-center" id="modalBody">' +
                '<label for="firstName"><strong>First name</strong></label>' +
                '<input class="d-inline-block w-100" type="text" name="firstName" id="d_firstName" ' +
                'value="' + user.firstName + '" />' +
                '<br/><br/><label for="lastName"><strong>Last name</strong></label>' +
                '<input class="d-inline-block w-100" type="text" name="lastName" ' +
                'value="' + user.lastName + '" id="d_lastName" />' +
                '<br/><br/><label for="age"><strong>Age</strong></label>' +
                '<input class="d-inline-block w-100" type="number" name="age" ' +
                'value="' + user.age + '" id="d_age" />' +
                '<br/><br/><label for="email"><strong>Email</strong></label>' +
                '<input class="d-inline-block w-100" type="text" name="email" ' +
                'value="' + user.email + '" id="d_email" />' +
                '<br/><br/><label for="username"><strong>Username</strong></label>' +
                '<input class="d-inline-block w-100" type="text" name="username" ' +
                'value="' + user.username + '" id="d_username" />' + select_role +
                '<br/><div class="modal-footer">' +
                '<button type="button" class="btn btn-lg mt-3 btn-secondary" data-dismiss="modal">Close' +
                '</button>' +
                '<button type="button" onclick="getModal(' + user.id + ')" ' +
                'class="btn btn-lg btn-primary mt-3" data-dismiss="modal">DELETE</button>' +
                '</div></div></div></div></div>'
            modalBlock.innerHTML = modal_win
            $('#deleteModal').modal()
        })
}

function getModal(id) {
    fetch('http://localhost:8080/admin/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => {
            $('#'+id).remove()
        })
}