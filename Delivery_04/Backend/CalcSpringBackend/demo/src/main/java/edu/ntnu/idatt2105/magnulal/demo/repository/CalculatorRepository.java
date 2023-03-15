package edu.ntnu.idatt2105.magnulal.demo.repository;

import edu.ntnu.idatt2105.magnulal.demo.model.Equation;
import java.util.List;

public interface CalculatorRepository {
  int save(Equation equation);

  int update(Equation equation);

  Equation findById(Long id);

  int deleteById(Long id);

  List<Equation> findAll();

  int deleteAll();
}
