package csd230;

import csd230.bookstore.Application;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = Application.class)
class ApplicationTests {

    @Test
    void contextLoads() {
        // This test will pass if the application context loads successfully
    }
}