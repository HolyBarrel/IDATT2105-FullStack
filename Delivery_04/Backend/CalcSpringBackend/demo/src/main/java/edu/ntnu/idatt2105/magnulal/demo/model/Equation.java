package edu.ntnu.idatt2105.magnulal.demo.model;

import java.io.Serializable;

public class Equation implements Serializable {
  private long id;
  private double firstNumber;
  private char operator;
  private double secondNumber;
  private Double result;

  public Equation() {
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  //TODO: ADD USER FIELD

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

  @Override
  public String toString() {
    return firstNumber + " " + operator + " " + secondNumber + " = " + result;
  }
}
