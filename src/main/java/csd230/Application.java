package csd230;

import csd230.repositories.BookRepository;
import csd230.repositories.LipstickRepository;
import csd230.repositories.MagazineRepository;
import csd230.seeder.DataSeeder;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {


    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public CommandLineRunner resetAndSeed(BookRepository bookRepo,
                                          MagazineRepository magRepo,
                                          LipstickRepository lipRepo,
                                          DataSeeder seeder) {
        return args -> {
            bookRepo.deleteAll();
            magRepo.deleteAll();
            lipRepo.deleteAll();
            seeder.run();
        };

    }
}

