package edu.ntnu.idatt2105.magnulal.demo.repository;

import edu.ntnu.idatt2105.magnulal.demo.model.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserJDBCRepository implements UserRepository { //TODO: make generic

  @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Override
  public int save(User user) {
    return jdbcTemplate.update(
        "INSERT INTO CALC_USERS (USER_NAME, USER_PASSWORD) "
            + "VALUES(?, ?)", user.getUserName(), user .getUserPassword());
  }

  @Override
  public int update(User user) {
    return jdbcTemplate.update("UPDATE CALC_USERS SET "
            + "USER_NAME=?, USER_PASSWORD=?, WHERE USER_ID=?",
        user.getUserName(), user.getUserPassword(), user.getUserId());
  }

  @Override
  public User findById(Long id) {
    try {
      User user = jdbcTemplate.queryForObject("SELECT * FROM CALC_USERS WHERE ID=?",
          BeanPropertyRowMapper.newInstance(User.class), id);
      return user;
    } catch (IncorrectResultSizeDataAccessException exception) {
      return null;
    }
  }

  @Override
  public List<User> findAll() {
    return jdbcTemplate.query("SELECT * FROM CALC_USERS",
        BeanPropertyRowMapper.newInstance(User.class));
  }

  @Override
  public int deleteById(Long id) {
    return jdbcTemplate.update("DELETE FROM CALC_USERS WHERE id=?", id);
  }

  @Override
  public int deleteAll() {
    return jdbcTemplate.update("DELETE FROM CALC_USERS");
  }
}
