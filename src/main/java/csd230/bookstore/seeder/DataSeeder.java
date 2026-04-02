package csd230.bookstore.seeder;

import csd230.bookstore.entities.BookEntity;
import csd230.bookstore.entities.LipstickEntity;
import csd230.bookstore.entities.MagazineEntity;
import csd230.bookstore.entities.UserEntity;
import csd230.bookstore.repositories.BookRepository;
import csd230.bookstore.repositories.LipstickRepository;
import csd230.bookstore.repositories.MagazineRepository;
import csd230.bookstore.repositories.UserEntityRepository;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.TimeUnit;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final LipstickRepository lipstickRepository;
    private final UserEntityRepository userRepository;  // Changed to UserEntityRepository
    private final Faker faker;
    private final PasswordEncoder passwordEncoder;

    // Updated constructor
    public DataSeeder(BookRepository bookRepository,
                      MagazineRepository magazineRepository,
                      LipstickRepository lipstickRepository,
                      UserEntityRepository userRepository) {  // Changed to UserEntityRepository
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.lipstickRepository = lipstickRepository;
        this.userRepository = userRepository;
        this.faker = new Faker();
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== Starting Data Seeder ===");
        System.out.println("Current counts - Books: " + bookRepository.count() +
                ", Magazines: " + magazineRepository.count() +
                ", Lipsticks: " + lipstickRepository.count() +
                ", Users: " + userRepository.count());

        // Seed users FIRST (if no users exist)
        if (userRepository.count() == 0) {
            seedUsers();
        }

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
                ", Lipsticks: " + lipstickRepository.count() +
                ", Users: " + userRepository.count());
    }

    private void seedUsers() {
        System.out.println("Seeding Users...");

        // Create Admin User
        UserEntity admin = new UserEntity();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole("ADMIN");  // Just "ADMIN", not "ROLE_ADMIN" because CustomUserDetailsService adds ROLE_
        userRepository.save(admin);

        // Create Regular User
        UserEntity user = new UserEntity();
        user.setUsername("user");
        user.setPassword(passwordEncoder.encode("user123"));
        user.setRole("USER");
        userRepository.save(user);

        System.out.println("✅ Created admin/admin123 and user/user123");
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