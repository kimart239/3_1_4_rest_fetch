package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Set;

@Controller
@EnableAutoConfiguration
public class UserController {


    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    //=============================== USER Controller=================================================================

    @GetMapping("/")
    public String login(){
        return "login";
    }

    @GetMapping("/login")
    public String loginPage(){
        return "login";
    }


    @GetMapping("/user")
    public String getUserPage(Model model, Principal principal){
        model.addAttribute("userPage", userService.findByUsername(principal.getName()));
        return "user";
    }

    //===============================ADMIN Controller=================================================================
    @GetMapping("/admin")
    public String getUsers(Model model, Principal principal) {
        model.addAttribute("userList", userService.userList());
        model.addAttribute("userName", userService.findByUsername(principal.getName()));
        model.addAttribute( "userNew",new User());
        Set<Role> roles = roleService.getRoleList();
        model.addAttribute("allRoles", roles);
        return "admin";
    }

    @PostMapping("/admin/createUser")
    public String create(@ModelAttribute("userNew") @Valid User user, BindingResult bindingResult,
                         @RequestParam ("role_authorities") List<String> role_value) {
        if (bindingResult.hasErrors())
            return "admin#add_user";
        user.setRoles(userService.getSetOfRoles(role_value));
        userService.addUser(user);
        return "redirect:/admin";
    }

    @PatchMapping("/admin/{id}")
    public String update(@ModelAttribute("user") User user, @PathVariable("id") int id,
                         @RequestParam ("role_authorities") List<String> role_value) {
        user.setRoles(userService.getSetOfRoles(role_value));
        userService.update(id, user);
        return "redirect:/admin";
    }

    @DeleteMapping("/admin/{id}")
    public String delete(@PathVariable("id") int id) {
        userService.deleteById(id);
        return "redirect:/admin";
    }
}
