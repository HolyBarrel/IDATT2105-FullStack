package edu.ntnu.idatt2105.magnulal.demo.repository;

import edu.ntnu.idatt2105.magnulal.demo.model.Equation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class CalculatorJDBCRepository implements  CalculatorRepository {

  @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Override
  public int save(Equation equation) {
    return jdbcTemplate.update(
        "INSERT INTO CALC_EQUATIONS (FIRST_NUMBER, OPERATOR, SECOND_NUMBER, RESULT) "
            + "VALUES(?, ?, ?, ?)",
        equation.getFirstNumber(),
        equation.getOperator(),
        equation.getSecondNumber(),
        equation.getResult());
  }

  @Override
  public int update(Equation equation) {
    return jdbcTemplate.update("UPDATE CALC_EQUATIONS SET "
            + "FIRST_NUMBER=?, OPERATOR=?, SECOND_NUMBER=?, RESULT=? WHERE ID=?",
        equation.getFirstNumber(), equation.getOperator(), equation.getSecondNumber(), equation.getResult(),
        equation.getId());
  }

  @Override
  public Equation findById(Long id) {
    try {
      Equation equation = jdbcTemplate.queryForObject("SELECT * FROM CALC_EQUATIONS WHERE ID=?",
          BeanPropertyRowMapper.newInstance(Equation.class), id);
      return equation;
    } catch (IncorrectResultSizeDataAccessException exception) {
      return null;
    }
  }

  @Override
  public List<Equation> findAll() {
    return jdbcTemplate.query("SELECT * FROM CALC_EQUATIONS",
        BeanPropertyRowMapper.newInstance(Equation.class));
  }

  @Override
  public int deleteById(Long id) {
    return jdbcTemplate.update("DELETE FROM CALC_EQUATIONS WHERE id=?", id);
  }

  @Override
  public int deleteAll() {
    return jdbcTemplate.update("DELETE FROM CALC_EQUATIONS");
  }
}
