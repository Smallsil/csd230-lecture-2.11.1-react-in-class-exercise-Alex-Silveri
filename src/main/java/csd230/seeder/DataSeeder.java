package csd230.seeder;

import csd230.entities.*;
import csd230.repositories.BookRepository;
import csd230.repositories.LipstickRepository;
import csd230.repositories.MagazineRepository;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.TimeUnit;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final LipstickRepository lipstickRepository;
    private final Faker faker;

    public DataSeeder(BookRepository bookRepository,
                      MagazineRepository magazineRepository,
                      LipstickRepository lipstickRepository) {
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.lipstickRepository = lipstickRepository;
        this.faker = new Faker();
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== Starting Data Seeder ===");
        System.out.println("Current counts - Books: " + bookRepository.count() +
                ", Magazines: " + magazineRepository.count() +
                ", Lipsticks: " + lipstickRepository.count());

        // Seed if ANY of the repositories are empty
        if (bookRepository.count() == 0) {
            seedBooks();
        }
        if (magazineRepository.count() == 0) {
            seedMagazines();
        }
        if (lipstickRepository.count() == 0) {
            seedLipsticks();
        }

        System.out.println("=== Data Seeding Complete ===");
        System.out.println("Final counts - Books: " + bookRepository.count() +
                ", Magazines: " + magazineRepository.count() +
                ", Lipsticks: " + lipstickRepository.count());
    }

    private void seedBooks() {
        System.out.println("Seeding Books...");
        for (int i = 0; i < 10; i++) {
            BookEntity book = new BookEntity(
                    faker.book().title(),
                    faker.number().randomDouble(2, 10, 100),
                    faker.number().numberBetween(1, 50),
                    faker.book().author()
            );
            bookRepository.save(book);
        }
        System.out.println("✅ Seeded " + bookRepository.count() + " books");
    }

    private void seedMagazines() {
        System.out.println("Seeding Magazines...");
        for (int i = 0; i < 5; i++) {
            LocalDateTime issueDate = faker.date().past(365, TimeUnit.DAYS)
                    .toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

            MagazineEntity mag = new MagazineEntity(
                    faker.book().publisher() + " Weekly",
                    faker.number().randomDouble(2, 5, 20),
                    faker.number().numberBetween(10, 100),
                    faker.number().numberBetween(100, 500),
                    issueDate
            );
            magazineRepository.save(mag);
        }
        System.out.println("✅ Seeded " + magazineRepository.count() + " magazines");
    }

    private void seedLipsticks() {
        System.out.println("Seeding Lipsticks...");
        String[] finishTypes = {"Matte", "Gloss", "Satin", "Metallic", "Cream"};
        String[] skinTypes = {"All", "Dry", "Oily", "Combination", "Normal"};

        for (int i = 0; i < 8; i++) {
            LipstickEntity lipstick = new LipstickEntity(
                    faker.commerce().productName() + " Lipstick",
                    faker.number().randomDouble(2, 15, 50),
                    faker.number().numberBetween(5, 40),
                    finishTypes[faker.random().nextInt(finishTypes.length)],
                    skinTypes[faker.random().nextInt(skinTypes.length)]
            );
            lipstickRepository.save(lipstick);
        }
        System.out.println("✅ Seeded " + lipstickRepository.count() + " lipsticks");
    }
}