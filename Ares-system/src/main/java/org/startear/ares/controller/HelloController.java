package org.startear.ares.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;

@RestController
public class HelloController {
    @Operation(summary = "测试接口", description = "返回欢迎信息")
    @GetMapping("/hello")
    public String hello() {
        return "Hello Spring Boot!";
    }
}