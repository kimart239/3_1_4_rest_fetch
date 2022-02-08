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
    public String getUsers(Model model) {
        model.addAttribute("userList", userService.userList());
        return "users";
    }

    @GetMapping("/admin/new")
    public String newUser(Model model) {
        model.addAttribute(new User());
        Set<Role> roles = roleService.getRoleList();
        model.addAttribute("allRoles", roles);
        return "new";
    }

    @PostMapping("/admin/createUser")
    public String create(@ModelAttribute("user") @Valid User user, BindingResult bindingResult,
                         @RequestParam ("role_authorities") List<String> role_value) {
        if (bindingResult.hasErrors())
            return "new";
        user.setRoles(userService.getSetOfRoles(role_value));
        userService.addUser(user);
        return "redirect:/admin";
    }
    @GetMapping("/admin/{id}/edit")
    public String edit(Model model, @PathVariable("id") int id) {
        model.addAttribute("user", userService.findById(id));
        model.addAttribute("allRoles", roleService.getRoleList());
        return "edit";
    }

    @PatchMapping("/admin/{id}")
    public String update(@ModelAttribute("user") @Valid User user, BindingResult bindingResult, @PathVariable("id") int id,
                         @RequestParam ("role_authorities") List<String> role_value) {
        if (bindingResult.hasErrors())
            return "edit";
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
