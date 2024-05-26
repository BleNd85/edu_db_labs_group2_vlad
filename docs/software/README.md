# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення на початкового наповнення бази даних

```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mcas
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mcas` ;

-- -----------------------------------------------------
-- Schema mcas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mcas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mcas` ;

-- -----------------------------------------------------
-- Table `mcas`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`role` ;

CREATE TABLE IF NOT EXISTS `mcas`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `nameIndex` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`user` ;

CREATE TABLE IF NOT EXISTS `mcas`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `roleId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  INDEX `roleId` (`roleId` ASC) VISIBLE,
  CONSTRAINT `user_ibfk_1`
    FOREIGN KEY (`roleId`)
    REFERENCES `mcas`.`role` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`action`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`action` ;

CREATE TABLE IF NOT EXISTS `mcas`.`action` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `action_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `mcas`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`publicrequest`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`publicrequest` ;

CREATE TABLE IF NOT EXISTS `mcas`.`publicrequest` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `actionId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `actionId` (`actionId` ASC) VISIBLE,
  CONSTRAINT `publicrequest_ibfk_1`
    FOREIGN KEY (`actionId`)
    REFERENCES `mcas`.`action` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`mediadata`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`mediadata` ;

CREATE TABLE IF NOT EXISTS `mcas`.`mediadata` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `fileType` TEXT NOT NULL,
  `requestId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `requestId` (`requestId` ASC) VISIBLE,
  CONSTRAINT `mediadata_ibfk_1`
    FOREIGN KEY (`requestId`)
    REFERENCES `mcas`.`publicrequest` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`permision`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`permision` ;

CREATE TABLE IF NOT EXISTS `mcas`.`permision` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`permisionhasrole`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`permisionhasrole` ;

CREATE TABLE IF NOT EXISTS `mcas`.`permisionhasrole` (
  `permisionId` INT NOT NULL,
  `roleName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`permisionId`, `roleName`),
  INDEX `roleName` (`roleName` ASC) VISIBLE,
  CONSTRAINT `permisionhasrole_ibfk_1`
    FOREIGN KEY (`permisionId`)
    REFERENCES `mcas`.`permision` (`id`),
  CONSTRAINT `permisionhasrole_ibfk_2`
    FOREIGN KEY (`roleName`)
    REFERENCES `mcas`.`role` (`name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

# RESTfull сервіс для управління даними

## Role

### Model

```Java
package org.com.lab6.Model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "role")
public class RoleModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoleModel roleModel = (RoleModel) o;
        return Objects.equals(id, roleModel.id) && Objects.equals(name, roleModel.name) && Objects.equals(description, roleModel.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description);
    }

    @Override
    public String toString() {
        return "RoleModel{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
```

### Repository

```Java
package org.com.lab6.Repository;

import org.com.lab6.Model.RoleModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleModel, Integer> {
    RoleModel findFirstById(Integer id);

}
```

### Controller

```Java
package org.com.lab6.Controller;

import org.com.lab6.Model.RoleModel;
import org.com.lab6.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class RoleController {
    @Autowired
    private RoleRepository roleRepository;


    @GetMapping("/get-roles")
    public List<RoleModel> getRoles() {
        return roleRepository.findAll();
    }

    @GetMapping("/get-role/{id}")
    public Optional<RoleModel> getRoleById(@PathVariable Integer id) {
        return roleRepository.findById(id);
    }

    @PostMapping("/add-role")
    public RoleModel addRole(@RequestBody RoleModel roleModel) {
        return roleRepository.save(roleModel);
    }

    @DeleteMapping("/delete-role/{id}")
    public String deleteRole(@PathVariable Integer id) {
        roleRepository.deleteById(id);
        if (roleRepository.findById(id).isEmpty()) {
            return "role successfully deleted";
        } else {
            return "error, role wasn't deleted";
        }
    }

    @PutMapping("/update-role/{id}")
    public RoleModel updateRole(@PathVariable Integer id, @RequestBody RoleModel roleModel) {
        RoleModel role = roleRepository.findById(id).orElseThrow();
        role.setName(roleModel.getName());
        role.setDescription(roleModel.getDescription());
        return roleRepository.save(role);
    }

}
```

## User

### Model

```Java
package org.com.lab6.Model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "user")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String email;
    private String password;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private RoleModel roleModel;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RoleModel getRoleModel() {
        return roleModel;
    }

    public void setRoleModel(RoleModel roleModel) {
        this.roleModel = roleModel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserModel userModel = (UserModel) o;
        return Objects.equals(id, userModel.id) && Objects.equals(email, userModel.email) && Objects.equals(password, userModel.password) && Objects.equals(roleModel, userModel.roleModel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, password, roleModel);
    }

    @Override
    public String toString() {
        return "UserModel{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", roleModel=" + roleModel +
                '}';
    }
}
```

### UserDto

```Java
package org.com.lab6.Model;

public class UserDto {
    private String email;
    private String password;
    private Integer roleId;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}
```

### Repository

```Java
package org.com.lab6.Repository;

import org.com.lab6.Model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel, Integer> {

}
```

### Controller

```Java
package org.com.lab6.Controller;

import org.com.lab6.Model.RoleModel;
import org.com.lab6.Model.UserDto;
import org.com.lab6.Model.UserModel;
import org.com.lab6.Repository.RoleRepository;
import org.com.lab6.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/get-users")
    public List<UserModel> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/get-user/{id}")
    public Optional<UserModel> getUserById(@PathVariable Integer id) {
        return userRepository.findById(id);
    }

    @PostMapping("/add-user")
    public UserModel addUser(@RequestBody UserDto userDto) {
        UserModel userModel = new UserModel();
        userModel.setEmail(userDto.getEmail());
        userModel.setPassword(userDto.getPassword());
        RoleModel roleModel = roleRepository.findById(userDto.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));
        userModel.setRoleModel(roleModel);
        return userRepository.save(userModel);
    }

    @PutMapping("/update-user/{id}")
    public UserModel updateUser(@PathVariable Integer id, @RequestBody UserDto userDto) {
        UserModel userModel = userRepository.findById(id).orElseThrow();
        userModel.setEmail(userDto.getEmail());
        userModel.setPassword(userDto.getPassword());
        userModel.setRoleModel(roleRepository.findFirstById(userDto.getRoleId()));
        return userRepository.save(userModel);
    }

    @DeleteMapping("/delete-user/{id}")
    public String DeleteUser(@PathVariable Integer id) {
        userRepository.deleteById(id);
        if (userRepository.findById(id).isEmpty()) {
            return "user successfully deleted";
        } else {
            return "error, user wasn't deleted";
        }
    }
}
```
