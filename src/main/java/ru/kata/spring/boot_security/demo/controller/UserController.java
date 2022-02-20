package ru.kata.spring.boot_security.demo.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@EnableAutoConfiguration
public class UserController {

    @GetMapping("/user")
    public String getUserPage(){
        return "user";
    }



}
