package edu.ntnu.idatt2105.magnulal.demo.model;

import java.io.Serializable;

public class Equation implements Serializable {
  private long id;
  private double firstNumber;
  private char operator;
  private double secondNumber;
  private Double result;
  private Long userId;

  public Equation() {
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
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

  public Double getResult() {
    return result;
  }

  public void setResult(Double result) {
    this.result = result;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  @Override
  public String toString() {
    return firstNumber + " " + operator + " " + secondNumber + " = " + result;
  }
}
