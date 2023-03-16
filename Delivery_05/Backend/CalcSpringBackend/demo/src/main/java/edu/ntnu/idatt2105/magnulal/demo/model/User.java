package edu.ntnu.idatt2105.magnulal.demo.model;

import java.io.Serializable;

public class User implements Serializable {
  private int userId;
  private String userName;
  private String userPassword;

  public User() {}

  public int getUserId() {
    return userId;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getUserPassword() {
    return userPassword;
  }

  public void setUserPassword(String userPassword) {
    this.userPassword = userPassword;
  }
}
