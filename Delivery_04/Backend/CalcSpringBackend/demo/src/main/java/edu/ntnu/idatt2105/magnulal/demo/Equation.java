package edu.ntnu.idatt2105.magnulal.demo;

import java.io.Serializable;

public class Equation implements Serializable {
  private double firstNumber;
  private char operator;
  private double secondNumber;
  private double result;

  public Equation() {
  }

  public double getFirstNumber() {
    return firstNumber;
  }

  public void setFirstNumber(double firstNumber) {
    this.firstNumber = firstNumber;
  }

  public char getOperator() {
    return operator;
  }

  public void setOperator(char operator) {
    this.operator = operator;
  }

  public double getSecondNumber() {
    return secondNumber;
  }

  public void setSecondNumber(double secondNumber) {
    this.secondNumber = secondNumber;
  }

  public double getResult() {
    return result;
  }

  public void setResult(double result) {
    this.result = result;
  }
}
