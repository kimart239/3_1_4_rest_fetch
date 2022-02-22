package ru.kata.spring.boot_security.demo.dao;


import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserDao {
    User addUser(User user);
    List<User> userList();
    User findById(long id);
    void deleteById(long id);
    User update (long id,User userUpdated);
    User findByUsername(String username);
}
