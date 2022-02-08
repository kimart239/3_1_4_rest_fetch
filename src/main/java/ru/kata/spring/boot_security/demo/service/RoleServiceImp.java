package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.RoleDao;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.Set;

@Service
public class RoleServiceImp implements RoleService{

    private final RoleDao roleDao;

    @Autowired
    public RoleServiceImp(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    public Set<Role> getRoleList() {
        return roleDao.getRoleList();
    }

    @Override
    public Role findByRole(String role) {
        return roleDao.findByRole(role);
    }

    @Override
    public Role findById(long id) {
        return roleDao.findById(id);
    }
}
