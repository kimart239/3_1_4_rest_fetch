package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Set;

public interface UserService {
    User addUser(User user);
    List<User> userList();
    User findById(long id);
    void deleteById(long id);
    User update (long id,User userUpdated);
    User findByUsername(String username);
    Set<Role> getSetOfRoles(List<String> role_string);

}
