package example.service;


import example.model.User;

public interface UserService {
	
	/**
	 * @author zacha
	 * 
	 * Gets a User from database based on its Id
	 * @param Id integer based on id of user you want to find 
	 * @return Array list of User Objects
	 * 
	 */
	public User findByUserId(int id);
	/**
	 * @author zacha
	 * 
	 * Gets a user based on username
	 * @param username string
	 * @return Single User object
	 * 
	 */
	public User findByUsername(String username);
	/**
	 * @author zacha
	 * 
	 * Gets a user based on Username and Password
	 * @param Username and Password Strings
	 * @return User Object
	 * 
	 */
	public User findByUsernameAndPassword(String username, String password);
	
	//////////////CREATE\\\\\\\\\\\\\\
	/**
	 * @author zacha
	 * 
	 * add user to database
	 * @param User
	 * @return User object that was created
	 * 
	 */
	public User save(User user);
	
	//////////////DELETE\\\\\\\\\\\\\\
	/**
	 * @author zacha
	 * 
	 * Remove user from database
	 * @param User object
	 * @return none
	 * 
	 */
	public void delete(User user);
	
	
	
	/**
	 * @author zacha
	 * 
	 * check for existence of username in database
	 * @param User object
	 * @return Boolen
	 * 
	 */
	public Boolean existsByUserName(String userName);
	
	/**
	 * @author zacha
	 * 
	 * authenticate user for JWT
	 * @param User object
	 * @return String jwt Token
	 * 
	 */
	
	//public String authenticate(String username, String password) throws Exception;
	/**
	 * @author zacha
	 * 
	 * Check credentials for log in, retun id -1 if false
	 * @param User object
	 * @return logged in User object
	 * 
	 */
	
	public User login(User user);
	/**
	 * @author zacha
	 * 
	 * Add new user to database, checking it doesn't break any rules
	 * @param User object
	 * @return newly created User
	 * 
	 */
	
	public User signup(User user);
	/**
	 * @author zacha
	 * 
	 * saves changes to a user to the database
	 * @param User object
	 * @return changed User object
	 * 
	 */

	
	public User update(User user);



}
