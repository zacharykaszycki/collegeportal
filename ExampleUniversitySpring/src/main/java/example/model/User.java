package example.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OrderColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.ColumnDefault;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@EqualsAndHashCode
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="Users")
public class User {

	
	@Id
	@Column(name="user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	
	@Column(name="username", nullable = false, unique = true)
	private String username;
	
	@Column(name="first_name", nullable = false)
	private String firstName;
	
	@Column(name="last_name", nullable = false)
	private String lastName;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(name="password", nullable = false)
	private String password;
	
	@ElementCollection
    @OrderColumn(name = "user_salt", nullable = false)
    private byte[] salt;
	
	@Column(name="date_of_birth", nullable = false)
	@Temporal(TemporalType.DATE)
	private Date dateOfBirth;
	
	@Column(name="street_address", nullable = false)
	private String streetAddress;
	
	@Column(name="state", nullable = false)
	private String state;
	
	
	@Column(name="zip_code", nullable = false)
	private String zipcode;
	
	@Column(name="profile_picture", nullable = false)
	@ColumnDefault(value="'Default.png'")
	private String profilePicture;

	public User(int userId) {
		super();
		this.userId = userId;
	}

	public User(String username, String firstName, String lastName, String password, Date dateOfBirth,
			String streetAddress, String city, String state, String zipcode, String profilePicture) {
		super();
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.dateOfBirth = dateOfBirth;
		this.streetAddress = streetAddress;
		this.state = state;
		this.zipcode = zipcode;
		this.profilePicture = profilePicture;
	}
	
	
	
	@JsonIgnore
	public byte[] getSalt(){
		return this.salt;
	}

	public User(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	
	
	
	
	
}