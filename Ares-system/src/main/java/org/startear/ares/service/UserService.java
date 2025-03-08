package org.startear.ares.service;

import org.startear.ares.mapper.UserMapper;
import org.startear.ares.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public User register(User user) {
        userMapper.insertUser(user);
        return user;
    }

    public User login(String username, String password) {
        User user = userMapper.selectUserByUsername(username);
        if(user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}