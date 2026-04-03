package csd230.bookstore.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("MAGAZINE")
public class MagazineEntity extends PublicationEntity {
    private Integer orderQty;  // Changed from int to Integer
    private LocalDateTime currentIssue;

    public MagazineEntity() {}

    public MagazineEntity(String t, Double p, Integer c, Integer o, LocalDateTime d) {
        super(t, p, c);
        this.orderQty = o;
        this.currentIssue = d;
    }

    public Integer getOrderQty() { return orderQty; }
    public void setOrderQty(Integer o) { this.orderQty = o; }
    public void setCurrentIssue(LocalDateTime d) { this.currentIssue = d; }
    public LocalDateTime getCurrentIssue() { return currentIssue; }

    @Override
    public String toString() {
        return "Mag{issue=" + currentIssue + ", " + super.toString() + "}";
    }
}