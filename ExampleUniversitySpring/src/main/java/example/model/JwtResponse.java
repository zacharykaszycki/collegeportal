package example.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author zacha
 * 
 * This is a model that will hold a JWT token after the login credentials are validated
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
	private String jwtToken;
	private User user;
}
