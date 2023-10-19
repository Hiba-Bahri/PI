package com.cotek.backend.mappers;

import com.cotek.backend.dtos.SignUpDto;
import com.cotek.backend.dtos.UserDto;
import com.cotek.backend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);
}
