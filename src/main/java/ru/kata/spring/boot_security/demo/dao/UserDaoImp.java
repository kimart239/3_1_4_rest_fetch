package ru.kata.spring.boot_security.demo.dao;

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
    public User addUser(User user) {
        em.persist(user);
        return findByUsername(user.getUsername());
    }

    @Override
    public List<User> userList() {
        TypedQuery<User> query = em.createQuery("select distinct u from User u join fetch u.roles", User.class);

        return query.getResultList();
    }

    @Override
    public User findById(long id) {
        TypedQuery<User> query = em.createQuery("select u from User u join fetch u.roles where u.id=:id", User.class);
        query.setParameter("id", id);
        return query.getSingleResult();
    }
    @Override
    public void deleteById (long id) {
        em.remove(findById(id));
    }

    @Override
    public User update (long id, User userUpdated) {
        User userForUpdate = findById(id);
        userForUpdate.setFirstName(userUpdated.getFirstName());
        userForUpdate.setLastName(userUpdated.getLastName());
        userForUpdate.setAge(userUpdated.getAge());
        userForUpdate.setEmail(userUpdated.getEmail());
        userForUpdate.setUsername(userUpdated.getUsername());
        userForUpdate.setPassword(userUpdated.getPassword());
        userForUpdate.setRoles(userUpdated.getRoles());
        em.merge(userForUpdate);
        return userForUpdate;
    }

    @Override
    public User findByUsername(String username) {
        TypedQuery<User> query = em.createQuery("select u from User u join fetch u.roles where u.username=:username", User.class);
        query.setParameter("username", username);
        return query.getSingleResult();
    }
}
