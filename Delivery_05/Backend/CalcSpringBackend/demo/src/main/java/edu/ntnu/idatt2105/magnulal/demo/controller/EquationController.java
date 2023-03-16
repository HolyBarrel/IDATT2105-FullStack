package edu.ntnu.idatt2105.magnulal.demo.controller;

//INSPIRATION SOURCE: https://www.bezkoder.com/spring-boot-jdbctemplate-crud-example/

import edu.ntnu.idatt2105.magnulal.demo.model.ArithmeticService;
import edu.ntnu.idatt2105.magnulal.demo.model.Equation;
import edu.ntnu.idatt2105.magnulal.demo.repository.CalculatorRepository;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://127.0.0.1:5173/")
@RestController
@RequestMapping("/api")
public class EquationController {

  @Autowired
  CalculatorRepository calculatorRepository;

  @GetMapping("/equations")
  public ResponseEntity<List<Equation>> getAllEquations() {
    try {
      List<Equation> equations = new ArrayList<Equation>(calculatorRepository.findAll());

      if (equations.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(equations, HttpStatus.OK);
    } catch (Exception e) {
      System.out.println("Error: " + e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/equations")
  public ResponseEntity<String> createEquation(@RequestBody Equation equation) {
    try {
      Equation equation1 = new Equation();
      equation1.setId(equation.getId());
      equation1.setFirstNumber(equation.getFirstNumber());
      equation1.setOperator(equation.getOperator());
      equation1.setSecondNumber(equation.getSecondNumber());
      equation1.setResult(ArithmeticService.COMPUTE(
          equation.getFirstNumber(), equation.getOperator(), equation.getSecondNumber()));
      equation1.setUserId(equation.getUserId());

      calculatorRepository.save(equation1);
      return new ResponseEntity<>("Equation was created successfully.", HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/equations/{id}")
  public ResponseEntity<Equation> getEquationById(@PathVariable("id") long id) {
    Equation equation = calculatorRepository.findById(id);

    if (equation != null) {
      return new ResponseEntity<>(equation, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PutMapping("/equations/{id}")
  public ResponseEntity<String> updateEquationById(@PathVariable("id") long id,
      @RequestBody Equation equation){
    Equation update_equation = calculatorRepository.findById(id);

    if (update_equation != null) {
      update_equation.setFirstNumber(equation.getFirstNumber());
      update_equation.setOperator(equation.getOperator());
      update_equation.setSecondNumber(equation.getSecondNumber());
      update_equation.setResult(equation.getResult());

      calculatorRepository.update(update_equation);
      return new ResponseEntity<>("Equation was updated successfully.", HttpStatus.OK);
    } else {
      return new ResponseEntity<>("Cannot find Equation with id=" + id, HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/equations/{id}")
  public ResponseEntity<String> deleteEquationById(@PathVariable("id") long id) {
    try {
      int result = calculatorRepository.deleteById(id);
      if (result == 0) {
        return new ResponseEntity<>("Cannot find Equation with the id '" + id + "'",
            HttpStatus.OK);
      }
      return new ResponseEntity<>("Equation with id " + id +  " was deleted successfully.",
          HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>("Cannot delete Equation.",
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/equations")
  public ResponseEntity<String> deleteAllEquations() {
    try {
      int rows = calculatorRepository.deleteAll();
      return new ResponseEntity<>("Deleted " + rows + " equation(s) successfully.",
          HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>("Cannot delete equations.",
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}