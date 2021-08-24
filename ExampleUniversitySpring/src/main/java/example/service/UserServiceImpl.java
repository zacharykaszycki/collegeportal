package example.service;

import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import example.model.User;
import example.repo.UserDao;
import example.util.ToEncrypted;

@Service
public class UserServiceImpl implements UserService{
	
	private UserDao userDao;
	
	
	@Autowired
	public UserServiceImpl(UserDao userDao) {
		super();
		this.userDao = userDao;
	}
	

	
	/**
	 * @author zacha
	 * 
	 * Gets a User from database based on its Id
	 * @param Id integer based on id of user you want to find 
	 * @return Array list of User Objects
	 * 
	 */

	@Override
	public User findByUserId(int id) {
		return userDao.findByUserId(id);
	}
	

	/**
	 * @author zacha
	 * 
	 * Gets a user based on username
	 * @param username string
	 * @return Single User object
	 * 
	 */

	@Override
	public User findByUsername(String username) {

		return userDao.findByUsername(username);
	}
	
	/**
	 * @author zacha
	 * 
	 * Gets a user based on Username and Password
	 * @param Username and Password Strings
	 * @return User Object
	 * 
	 */

	@Override
	public User findByUsernameAndPassword(String username, String password) {

		return userDao.findByUsernameAndPassword(username, password);
	}
	
	/**
	 * @author zacha
	 * 
	 * add user to database
	 * @param User
	 * @return User object that was created
	 * 
	 */

	@Override
	public User save(User user) {

		return userDao.save(user);
	}
	
	/**
	 * @author zacha
	 * 
	 * Remove user from database
	 * @param User object
	 * @return none
	 * 
	 */

	@Override
	public Boolean existsByUserName(String userName) {
		return userDao.existsByUsername(userName);
	}
	
	/**
	 * @author zacha
	 * 
	 * Remove user from database
	 * @param User object
	 * @return none
	 * 
	 */

	@Override
	public void delete(User user) {
		userDao.delete(user);
		
	}
	


	/**
	 * @author zacha
	 * 
	 * Check credentials for log in, return id -1 if false
	 * @param User object
	 * @return logged in User object
	 * 
	 */
	@Override
	public User login(User user) {
		//get user to retrieve salt for hashing
		User tempUser = userDao.findByUsername(user.getUsername());
		try {
			user.setPassword(ToEncrypted.generateHash(user.getPassword(), tempUser.getSalt()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		//after hashing go find user based on Username and Password
		User loguser = userDao.findByUsernameAndPassword(user.getUsername(),user.getPassword());
		//if null login failed
		if (loguser == null) {
			loguser = new User();
			loguser.setUserId(-1);
		}	
		return loguser;
	}

	/**
	 * @author zacha
	 * 
	 * Add new user to database, checking it doesn't break any rules
	 * @param User object
	 * @return newly created User
	 * 
	 */
	@Override
	public User signup(User user) {
		//Make sure username doesn't already exist

		if (userDao.existsByUsername(user.getUsername()))
			return new User(-1);
		//Create Salt for hashing
		user.setSalt(ToEncrypted.createSalt());
		//Hash the Password
		try {
			user.setPassword(ToEncrypted.generateHash(user.getPassword(), user.getSalt()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return userDao.save(user);
	}
	
	/**
	 * @author zacha
	 * 
	 * saves changes to a user to the database
	 * @param User object
	 * @return changed User object
	 * 
	 */

	@Override
	public User update(User user) {
		// TODO Auto-generated method stub
		return userDao.save(user);
	}

}
