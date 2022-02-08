package ru.kata.spring.boot_security.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class RoleDaoImp implements RoleDao{

    @Autowired
    private EntityManager em;

    @Override
    public Set<Role> getRoleList() {
        TypedQuery<Role> query = em.createQuery("select r from Role r", Role.class);
        return query.getResultList().stream().collect(Collectors.toSet());
    }

    @Override
    public Role findByRole(String role) {
        TypedQuery<Role> query = em.createQuery("select r from Role r where r.role=:role", Role.class);
        query.setParameter("role", role);
        return query.getSingleResult();
    }

    @Override
    public Role findById(long id) {
        TypedQuery<Role> query = em.createQuery("select r from Role r where r.id=:id", Role.class);
        query.setParameter("id", id);
        return query.getSingleResult();
    }
}
