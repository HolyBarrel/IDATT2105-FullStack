package edu.ntnu.idatt2105.magnulal.demo.controller;

//INSPIRATION SOURCE: https://www.bezkoder.com/spring-boot-jdbctemplate-crud-example/

import edu.ntnu.idatt2105.magnulal.demo.model.User;
import edu.ntnu.idatt2105.magnulal.demo.repository.UserRepository;
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
public class UserController {

  @Autowired
  UserRepository userRepository;

  @GetMapping("/users")
  public ResponseEntity<List<User>> getAllUsers() {
    try {
      List<User> users = new ArrayList<User>(userRepository.findAll());

      if (users.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(users, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/users")
  public ResponseEntity<String> createUser(@RequestBody User user) { //TODO: already existing username
    try {
      User user1 = new User();
      user1.setUserId(user.getUserId());
      user1.setUserName(user.getUserName());
      user1.setUserPassword(user.getUserPassword());

      userRepository.save(user1);
      return new ResponseEntity<>("User was created successfully.", HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/users/login")
  public ResponseEntity<Boolean> verifyUser(@RequestBody User user) {
    try {
      List<User> allUsers = userRepository.findAll();
      if(allUsers.stream().anyMatch(u ->
          u.getUserName().equals(user.getUserName()) &&
              u.getUserPassword().equals(user.getUserPassword()))) {
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
      }
      else {
        return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
      }
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @GetMapping("/users/{id}")
  public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
    User user = userRepository.findById(id);

    if (user != null) {
      return new ResponseEntity<>(user, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PutMapping("/users/{id}")
  public ResponseEntity<String> updateUserById(@PathVariable("id") long id,
      @RequestBody User user){
    User update_user = userRepository.findById(id);

    if (update_user != null) {
      update_user.setUserName(user.getUserName());
      update_user.setUserPassword(user.getUserPassword());

      userRepository.update(update_user);
      return new ResponseEntity<>("User was updated successfully.", HttpStatus.OK);
    } else {
      return new ResponseEntity<>("Cannot find User with id=" + id, HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/users/{id}")
  public ResponseEntity<String> deleteUserById(@PathVariable("id") long id) {
    try {
      int result = userRepository.deleteById(id);
      if (result == 0) {
        return new ResponseEntity<>("Cannot find User with the id '" + id + "'",
            HttpStatus.OK);
      }
      return new ResponseEntity<>("User with id " + id +  " was deleted successfully.",
          HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>("Cannot delete User.",
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/users")
  public ResponseEntity<String> deleteAllUsers() {
    try {
      int rows = userRepository.deleteAll();
      return new ResponseEntity<>("Deleted " + rows + " User(s) successfully.",
          HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>("Cannot delete Users.",
          HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}