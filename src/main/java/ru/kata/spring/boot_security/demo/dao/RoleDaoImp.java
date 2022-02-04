package ru.kata.spring.boot_security.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.Set;

@Component
public class RoleDaoImp implements RoleDao{

    @Autowired
    private EntityManager em;

    @Override
    public Set<Role> findByRole(String role) {
        TypedQuery<Role> query = em.createQuery("select r from Role r where r.role=:role", Role.class);
        query.setParameter("role", role);
        return (Set<Role>) query.getResultList();
    }
}
