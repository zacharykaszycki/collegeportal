package example.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import example.model.User;
import example.service.UserService;



@RestController
@CrossOrigin("*")
@RequestMapping("/user-service")
public class UserController {
	
	private UserService userServ;


	

	@Autowired
	public UserController(UserService userServ) {
		super();
		this.userServ = userServ;
	}
	
	
	/**
	 * Takes in a user object with wanted changes and saves changes
	 * @author zacha
	 * @param user object
	 * @return User object
	 * 
	 */

	@PostMapping(value="/update")
	public @ResponseBody User update(@RequestBody User user){
		return userServ.update(user);
		
	}



}
