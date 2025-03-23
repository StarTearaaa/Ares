package org.startear.ares.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.startear.ares.entity.dto.Account;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountMapper extends BaseMapper<Account> {
}
