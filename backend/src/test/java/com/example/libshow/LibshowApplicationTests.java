package com.example.libshow;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@ComponentScan({"com.libshow.controller", "com.libshow.service", "com.libshow.repository", "com.libshow.security"})
class LibshowApplicationTests {

	@Test
	public static void main(String[] args) {
		SpringApplication.run(LibshowApplication.class, args);
	}

}
