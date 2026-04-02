package csd230.bookstore.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("LIPSTICK")
public class LipstickEntity extends PublicationEntity {
    private String finishType;
    private String skinType;

    public LipstickEntity() {}

    // Force Jackson to use the empty constructor + setters
    @JsonIgnore
    public LipstickEntity(String title, double price, int copies, String finishType, String skinType) {
        super(title, price, copies);
        this.finishType = finishType;
        this.skinType = skinType;
    }

    public String getFinishType() {
        return finishType;
    }

    public void setFinishType(String finishType) {
        this.finishType = finishType;
    }

    public String getSkinType() {
        return skinType;
    }

    public void setSkinType(String skinType) {
        this.skinType = skinType;
    }

    @Override
    public String toString() {
        return "Lipstick{finishType='" + finishType + "', skinType='" + skinType + "', " + super.toString() + "}";
    }
}