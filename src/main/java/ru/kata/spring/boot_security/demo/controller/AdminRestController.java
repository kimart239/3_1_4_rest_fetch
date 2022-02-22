package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@EnableAutoConfiguration
@RequestMapping("/admin")
public class AdminRestController {

    private final UserService userService ;

    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/userlist")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok().body(userService.userList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable("id") long id) {
        return ResponseEntity.ok().body(userService.findById(id));
    }

    @PostMapping("/newUser")
    public ResponseEntity<User> add(@RequestBody User user,@RequestParam ("newRole") List<String> newRole) {
        user.setRoles(userService.getSetOfRoles(newRole));
        return ResponseEntity.ok().body(userService.addUser(user));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User user,
                                           @RequestParam(required = false, name = "role_arr") List<String> roleList) {
        user.setRoles(userService.getSetOfRoles(roleList));
        return ResponseEntity.ok().body(userService.update(id,user));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        userService.deleteById(id);
    }
}
