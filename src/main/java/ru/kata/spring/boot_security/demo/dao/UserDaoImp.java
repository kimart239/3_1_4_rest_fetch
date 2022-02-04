package ru.kata.spring.boot_security.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Component
public class UserDaoImp implements UserDao{

    @PersistenceContext
    private EntityManager em;


    @Override
    public void addUser(User user) {
        em.persist(user);
    }

    @Override
    public List<User> userList() {
        TypedQuery<User> query = em.createQuery("select u from User u", User.class);

        return query.getResultList();
    }

    @Override
    public User findById(long id) {
        TypedQuery<User> query = em.createQuery("select u from User u where u.id=:id", User.class);
        query.setParameter("id", id);
        return query.getSingleResult();
    }
    @Override
    public void deleteById (long id) {
        em.remove(findById(id));
    }

    @Override
    public void update (long id, User userUpdated) {
        User userForUpdate = findById(id);
        userForUpdate.setUsername(userUpdated.getUsername());
        userForUpdate.setPassword(userUpdated.getPassword());
        userForUpdate.setActive(userUpdated.isActive());
        em.merge(userForUpdate);
    }

    @Override
    public User findByUsername(String username) {
        TypedQuery<User> query = em.createQuery("select u from User u where u.username=:username", User.class);
        query.setParameter("username", username);
        return query.getSingleResult();
    }
}
