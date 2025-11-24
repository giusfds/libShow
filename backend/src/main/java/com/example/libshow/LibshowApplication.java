package com.example.libshow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.example.libshow")
public class LibshowApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibshowApplication.class, args);
	}

}
