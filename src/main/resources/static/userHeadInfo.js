const userUrl = document.getElementById('userHeader')
const adminOrUser = document.getElementById("adminOrUser")

fetch('http://localhost:8080/userInfo')
    .then(response => response.json())
    .then(user => {
        let role = "";
        let isAdmin = false;

        for (let i = 0; i < user.roles.length; i++) {
            role += ((user.roles[i].role == 'ROLE_USER') ? 'USER' : (user.roles[i].role == 'ROLE_ADMIN') ? 'ADMIN' : '') + " "
            if(user.roles[i].role == 'ROLE_ADMIN'){
                isAdmin = true
            }
        }

        let logout = "<a style='float: right' href='/logout' methods='GET'>LOGOUT</a>"

        userUrl.innerHTML = user.username + '  with role: ' + role + logout
// =======================================================================================
        let adminRef = `<li class="nav-item">
                            <a class="nav-link" href="/admin">Admin</a>
                        </li>`
        let userRef = `<li class="nav-item">
                            <a class="nav-link" href="/user">User</a>
                       </li>`

        adminOrUser.innerHTML =(isAdmin ? (adminRef + userRef) : userRef)
    })
