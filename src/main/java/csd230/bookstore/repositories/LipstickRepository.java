package csd230.bookstore.repositories;

import csd230.bookstore.entities.LipstickEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LipstickRepository extends JpaRepository<LipstickEntity, Long> {

    @Query("SELECT l FROM LipstickEntity l WHERE l.skinType = :skinType AND l.finishType = :finishType")
    List<LipstickEntity> findBySkinTypeAndFinishType(
            @Param("skinType") String skinType,
            @Param("finishType") String finishType);

    @Query("SELECT l FROM LipstickEntity l WHERE l.price BETWEEN :minPrice AND :maxPrice AND l.skinType LIKE %:skinType%")
    List<LipstickEntity> findByPriceRangeAndSkinTypeContaining(
            @Param("minPrice") double minPrice,
            @Param("maxPrice") double maxPrice,
            @Param("skinType") String skinType);
}