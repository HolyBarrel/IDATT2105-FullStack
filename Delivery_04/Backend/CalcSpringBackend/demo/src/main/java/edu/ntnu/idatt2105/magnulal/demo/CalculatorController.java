package edu.ntnu.idatt2105.magnulal.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalculatorController {
  Equation equation;

  @GetMapping("/")
  public String demoGreet() {
    return "Hello from the demo-controller!";
  }

  @CrossOrigin(origins = "http://127.0.0.1:5173")
  @PostMapping("/equation")
  public Equation createEquation(@RequestBody Equation equation){

    equation.setResult(
        ArithmeticService.COMPUTE(
            equation.getFirstNumber(), equation.getOperator(), equation.getSecondNumber()));

    this.equation = equation;
    return equation;
  }

  @CrossOrigin(origins = "http://127.0.0.1:5173")
  @GetMapping("/equation")
  public Equation getEquation(){ return equation;}

}
