package example.controller;

import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import example.model.User;
import example.service.UserService;
import example.util.ToEncrypted;
import example.model.JwtResponse;
import example.service.MyUserDetailsService;
import example.util.JwtUtility;


@RestController
@CrossOrigin("*")
@RequestMapping("/login-service")
public class LoginController {
	
	private UserService userServ;

	private JwtUtility jwtUtility;

	private AuthenticationManager authenticationManager;

	private MyUserDetailsService userDetailsService;
	

	@Autowired
	public LoginController(UserService userServ, JwtUtility jwtUtility, AuthenticationManager authenticationManager,
			MyUserDetailsService userDetailsService) {
		super();
		this.userServ = userServ;
		this.jwtUtility = jwtUtility;
		this.authenticationManager = authenticationManager;
		this.userDetailsService = userDetailsService;
	}

	
	/**
	 * @author zacha
	 * @param user object
	 * @return Jwt response object containing String jwt and user object
	 *
	 */
	@PostMapping(value="/signup")
	public @ResponseBody JwtResponse newUser(@RequestBody User user) throws Exception{
		String password = user.getPassword();
		User newUser = userServ.signup(user);
		String jwt = authenticate(user.getUsername(), password);
		return new JwtResponse(jwt, newUser);
	}
	
	/**
	 * @author zacha
	 * @param user object
	 * @return Jwt response object containing String jwt and user object
	 *
	 */
	
	@PostMapping(value="/signin")
	public @ResponseBody JwtResponse login(@RequestBody User user) throws Exception{
		String password = user.getPassword();
		User newUser = userServ.login(user);
		String jwt = authenticate(user.getUsername(), password);
		return new JwtResponse(jwt, newUser);

	}
	
	/**
	 * @author zacha
	 * 
	 * authenticate user for JWT
	 * @param User object
	 * @return String jwt Token
	 * 
	 */
	
	public String authenticate(String username, String password) throws Exception {
		//Get user to retrieve salt for hashing
		User tempUser = userServ.findByUsername(username);
		
		try {
			password = ToEncrypted.generateHash(password, tempUser.getSalt());
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		//Authenticate username and password

		try {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						username,
						password
				)
		);
		}catch(BadCredentialsException e) {
			throw new Exception("Invalid credentials", e);
		}
		//Since it authenticated get as user details an turn into JWT token
		final UserDetails userDetails = 
				userDetailsService.loadUserByUsername(username);
		final String token =
				jwtUtility.generateToken(userDetails);
		return token;
	}

}