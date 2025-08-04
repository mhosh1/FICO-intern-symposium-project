import org.springframework.web.bind.annotation.*;
import java.sql.*;
import java.util.*;

@RestController
public class UserController {
    private final String DB_URL = "jdbc:sqlite:src/main/resources/users.db";

    @PostMapping("/addUser")
    public String addUser(@RequestBody Map<String, String> data) {
        try (Connection conn = DriverManager.getConnection(DB_URL)) {
            PreparedStatement stmt = conn.prepareStatement(
                "INSERT INTO Users (firstName, lastName, username, email, password, team, role) VALUES (?, ?, ?, ?, ?, ?, ?)"
            );
            stmt.setString(1, data.get("firstName"));
            stmt.setString(2, data.get("lastName"));
            stmt.setString(3, data.get("username"));
            stmt.setString(4, data.get("email"));
            stmt.setString(5, data.get("password"));
            stmt.setString(6, data.get("team"));
            stmt.setString(7, data.get("role"));
            stmt.executeUpdate();
            return "User added";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @GetMapping("/getUsers")
    public List<Map<String, String>> getUsers() {
        List<Map<String, String>> users = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(DB_URL)) {
            ResultSet rs = conn.createStatement().executeQuery("SELECT * FROM Users");
            while (rs.next()) {
                Map<String, String> user = new HashMap<>();
                user.put("firstName", rs.getString("firstName"));
                user.put("lastName", rs.getString("lastName"));
                user.put("username", rs.getString("username"));
                user.put("email", rs.getString("email"));
                user.put("team", rs.getString("team"));
                user.put("role", rs.getString("role"));
                users.add(user);
            }
        } catch (Exception e) {
            // You could also return an error message here
        }
        return users;
    }
}