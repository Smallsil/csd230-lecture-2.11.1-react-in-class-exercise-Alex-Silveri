package csd230.bookstore.entities;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "product_type", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("COSMETICS")
public abstract class AbstractCosmeticsEntity extends ProductEntity {
    private String skinType;

    public AbstractCosmeticsEntity() {}

    public AbstractCosmeticsEntity(String skinType) {
        this.skinType = skinType;
    }

    public String getSkinType() {
        return skinType;
    }

    public void setSkinType(String skinType) {
        this.skinType = skinType;
    }

    @Override
    public void sellItem() {
        System.out.println("Selling cosmetic product ID: " + getId() +
                " for skin type: " + skinType);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "{id=" + getId() +
                ", skinType='" + skinType + "'}";
    }
}