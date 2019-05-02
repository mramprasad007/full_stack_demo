package com.coda.controller;

import com.coda.model.ListResponse;
import com.coda.model.ObjectResponse;
import com.coda.model.User;
import com.coda.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletResponse;
import java.util.List;


@RestController
@EnableAutoConfiguration
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UserRepository userRepository;


    @RequestMapping(method = RequestMethod.GET)
    public List getAllUsers(HttpServletResponse http) {
        List<User> users = userRepository.findAll();
        return users;
    }


    @RequestMapping(method = RequestMethod.POST)
    public ListResponse saveUser(@RequestBody final User user, HttpServletResponse http) {
        userRepository.save(user);
        ListResponse response = new ListResponse();
        response.setMessage("Successfully Created");
        response.setStatus("true");
        List<User> users = userRepository.findAll();
        response.setData(users);
        return response;
    }

//    @RequestMapping(method = RequestMethod.PUT)
//    public ObjectResponse updateUser(@RequestBody final User user, HttpServletResponse http) {
//        ObjectResponse response = new ObjectResponse();
//        if (userRepository.existsById(user.getId())) {
//            userRepository.updateUser(user.getName(), user.getEmail(), user.getMobile(), user.getId());
//            response.setMessage("Successfully Updated");
//            response.setStatusCode(http.getStatus());
//            response.setData(userRepository.findById(user.getId()));
//        } else {
//            response.setMessage("Record not found");
//            response.setStatusCode(404);
//            response.setData(null);
//        }
//        return response;
//    }
}
