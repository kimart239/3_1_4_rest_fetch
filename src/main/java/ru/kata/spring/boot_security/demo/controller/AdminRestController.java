package ru.kata.spring.boot_security.demo.controller;

import lombok.AllArgsConstructor;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.util.List;

@RestController
@EnableAutoConfiguration
@AllArgsConstructor
@RequestMapping("/admin")
public class AdminRestController {

    private final UserService userService;
    private final RoleService roleService;

    @GetMapping("/userlist")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok().body(userService.userList());
    }

//    @PostMapping("/createUser")
//    public String create(@ModelAttribute("userNew") @Valid User user, BindingResult bindingResult,
//                         @RequestParam("role_authorities") List<String> role_value) {
//        if (bindingResult.hasErrors())
//            return "admin#add_user";
//        user.setRoles(userService.getSetOfRoles(role_value));
//        userService.addUser(user);
//        return "redirect:/admin";
//    }
//
    @PatchMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable("id") int id) {
        return ResponseEntity.ok().body(userService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> delete(@PathVariable("id") int id) {
        return ResponseEntity.ok().body(userService.findById(id));
    }
}
