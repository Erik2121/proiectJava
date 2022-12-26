package com.api.app.api.Controllers;

import com.api.app.api.Models.Users;
import com.api.app.api.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
public class ApiControllers {
    @Autowired
    private UserRepo userRepo;
    @CrossOrigin
    @GetMapping(value = "/")
    public String getMess() {
        return "Hello";
    }
    @CrossOrigin
    @GetMapping(value = "/users")
    public List<Users> getUsers(){
        return userRepo.findAll();
    }

    @CrossOrigin
    @PostMapping(value = "/save")
    public String saveUser(@RequestBody Users user){
        userRepo.save(user);
        return "ok";
    }
    @CrossOrigin
    @PutMapping(value = "/update/{id}")
    public String updateUser(@PathVariable long id, @RequestBody Users user){
        Users updatedUser=userRepo.findById(id).get();
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setMess(user.getMess());
        userRepo.save(updatedUser);
        return "updated";
    }
    @CrossOrigin
    @DeleteMapping(value = "/delete/{id}")
    public String deleteUser(@PathVariable long id)
    {
        Users deleteUser=userRepo.findById(id).get();
        userRepo.delete(deleteUser);
        return "user deleted";
    }



}
