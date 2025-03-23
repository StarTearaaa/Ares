package org.startear.ares.service;

import com.baomidou.mybatisplus.extension.service.IService;
import org.startear.ares.entity.dto.Account;
import org.startear.ares.entity.vo.request.ConfirmResetVO;
import org.startear.ares.entity.vo.request.EmailRegisterVO;
import org.startear.ares.entity.vo.request.EmailResetVO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AccountService extends IService<Account>, UserDetailsService {
    Account findAccountByNameOrEmail(String text);
    String registerEmailVerifyCode(String type, String email, String address);
    String registerEmailAccount(EmailRegisterVO info);
    String resetEmailAccountPassword(EmailResetVO info);
    String resetConfirm(ConfirmResetVO info);
}
