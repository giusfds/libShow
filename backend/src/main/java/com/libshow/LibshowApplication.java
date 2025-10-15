package com.libshow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"com.libshow.controller", "com.libshow.service", "com.libshow.repository", "com.libshow.security"})
public class LibshowApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibshowApplication.class, args);
	}

}
