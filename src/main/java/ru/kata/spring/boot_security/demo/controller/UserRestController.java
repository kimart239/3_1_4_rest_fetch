package ru.kata.spring.boot_security.demo.controller;

import lombok.AllArgsConstructor;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@RestController
@EnableAutoConfiguration
@AllArgsConstructor
public class UserRestController {
    private UserService userService;

    @GetMapping("/userInfo")
    public ResponseEntity<User> getUserPage(Principal principal){
        User user = userService.findByUsername(principal.getName());
        return ResponseEntity.ok().body(user);
    }

}
