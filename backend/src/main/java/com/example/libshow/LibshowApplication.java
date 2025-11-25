package com.example.libshow;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class LibshowApplication {

    private static final Logger logger = LoggerFactory.getLogger(LibshowApplication.class);

    public static void main(String[] args) {
        logger.info("=== Iniciando aplicação Libshow ===");
        SpringApplication.run(LibshowApplication.class, args);
        logger.info("=== Aplicação Libshow iniciada com sucesso! ===");
	}
}
