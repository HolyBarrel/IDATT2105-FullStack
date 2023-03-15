package edu.ntnu.idatt2105.magnulal.demo.model;

import org.springframework.stereotype.Service;

@Service()
public class ArithmeticService {

  private ArithmeticService() {}

  public static Double COMPUTE(double num1, char operator, double num2) {
    return switch (operator) {
      case '+' -> num1 + num2;
      case '-' -> num1 - num2;
      case '*' -> num1 * num2;
      case '/' -> num1 / num2;
      default -> null;
    };
  }

}
