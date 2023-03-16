package edu.ntnu.idatt2105.magnulal.demo.repository;

import edu.ntnu.idatt2105.magnulal.demo.model.User;
import java.util.List;

public interface UserRepository {

  int save(User user);

  int update(User user);

  User findById(Long id);

  int deleteById(Long id);

  List<User> findAll();

  int deleteAll();
}
