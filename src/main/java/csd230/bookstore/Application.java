package csd230.bookstore;

import csd230.bookstore.repositories.BookRepository;
import csd230.bookstore.repositories.LipstickRepository;
import csd230.bookstore.repositories.MagazineRepository;
import csd230.bookstore.seeder.DataSeeder;
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

