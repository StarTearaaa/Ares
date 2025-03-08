package org.startear.ares.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.startear.ares.model.User;

@Mapper
public interface UserMapper {
    int insertUser(User user);
    User selectUserById(Long id);
    User selectUserByUsername(String username);
    int updateUser(User user);
    int deleteUser(Long id);
}