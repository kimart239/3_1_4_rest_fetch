modalBlock = document.getElementById("modalWindow")

function getModalWindow(id, action) {
    let read = ''
    let method_ = 'PATCH'
    let modal_win=''
    let select_role=`<br/><br/><label for="password"><strong>Password</strong></label>
                     <input class="d-inline-block w-100" type="password" name="password" value=""
                     id="password"/>
                    <br/><br/><strong>Roles</strong>
                     <select class="d-inline-block w-100" name="role_authorities" size="2" multiple>
                        <option value="ROLE_ADMIN">ADMIN</option>
                        <option value="ROLE_USER">USER</option>
                     </select><br/>`


    if (action == 'DELETE') {
        read = 'readonly'
        method_ = 'DELETE'
        select_role=''
    }
    fetch('http://localhost:8080/admin/' + id, {
        method: '\''+method_+'\'',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(user => {
            console.log(id)
            modal_win = '<div class="modal fade" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<h3 class="modal-title" id="exampleModalLabel">' + action +
                               ' user</h3>' +
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                '<span aria-hidden="true">&times;</span>' +
                            '</button>' +
                        '</div>' +
                        '<div class="modal-body text-center">' +
                                '<label for="firstName"><strong>First name</strong></label>' +
                                '<input class="d-inline-block w-100" type="text" name="firstName" id="firstName" ' +
                                'value="' + user.firstName + '" ' + read + '/>' +
                                '<br/><br/><label for="lastName"><strong>Last name</strong></label>' +
                                '<input class="d-inline-block w-100" type="text" name="lastName" ' +
                                'value="' + user.lastName + '" id="lastName" ' + read + '/>' +
                                '<br/><br/><label for="age"><strong>Age</strong></label>' +
                                '<input class="d-inline-block w-100" type="number" name="age" ' +
                                'value="' + user.age +'" id="age" ' + read + '/>' +
                                '<br/><br/><label for="email"><strong>Email</strong></label>' +
                                '<input class="d-inline-block w-100" type="text" name="email" ' +
                                'value="' + user.email + '" id="email" ' + read + '/>' +
                                '<br/><br/><label for="username"><strong>Username</strong></label>' +
                                '<input class="d-inline-block w-100" type="text" name="username" ' +
                                'value="' + user.username + '" id="username" ' + read + '/>' + select_role +
                                '<br/><div class="modal-footer">' +
                                    '<button type="button" class="btn btn-lg mt-3 btn-secondary" data-dismiss="modal">Close' +
                                    '</button>' +
                                    '<button type="button" onclick="getModalAction(' + user.id + ')" ' +
                                'class="btn btn-lg btn-primary mt-3" value="' + action + '"/>' +
                                '</div></div></div></div></div>'
            modalBlock.innerHTML = modal_win
        })
}

function getModalAction(id) {}