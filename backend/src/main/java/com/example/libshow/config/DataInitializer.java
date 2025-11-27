package com.example.libshow.config;

import com.example.libshow.domain.User;
import com.example.libshow.domain.enums.UserRole;
import com.example.libshow.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void run(String... args) {
		createDefaultUsers();
	}

	private void createDefaultUsers() {
		// Criar usuário ADMIN se não existir
		if (!userRepository.findByEmail("admin@libshow.com").isPresent()) {
			User admin = new User();
			admin.setName("Administrador");
			admin.setEmail("admin@libshow.com");
			admin.setPassword(passwordEncoder.encode("admin123"));
			admin.setRole(UserRole.ADMIN);
			userRepository.save(admin);
			logger.info("✅ Usuário ADMIN criado: admin@libshow.com (senha: admin123)");
		} else {
			logger.info("ℹ️  Usuário ADMIN já existe");
		}

		// Criar usuário LIBRARIAN se não existir
		if (!userRepository.findByEmail("bibliotecario@libshow.com").isPresent()) {
			User librarian = new User();
			librarian.setName("Bibliotecário");
			librarian.setEmail("bibliotecario@libshow.com");
			librarian.setPassword(passwordEncoder.encode("admin123"));
			librarian.setRole(UserRole.LIBRARIAN);
			userRepository.save(librarian);
			logger.info("✅ Usuário LIBRARIAN criado: bibliotecario@libshow.com (senha: admin123)");
		} else {
			logger.info("ℹ️  Usuário LIBRARIAN já existe");
		}

		logger.info("========================================");
		logger.info("Credenciais de acesso:");
		logger.info("ADMIN: admin@libshow.com / admin123");
		logger.info("LIBRARIAN: bibliotecario@libshow.com / admin123");
		logger.info("========================================");
	}
}
