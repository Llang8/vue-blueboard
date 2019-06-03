CREATE TABLE users (
	id SERIAL Primary Key,
	email VARCHAR(100) NOT NULL,
	username VARCHAR(25) NOT NULL,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	password VARCHAR(100) NOT NULL,
	is_interviewer BOOLEAN DEFAULT FALSE,
	created_date TIMESTAMP DEFAULT NOW()
)

CREATE TABLE prompt (
	id SERIAL PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	body VARCHAR NOT NULL,
	editor_value VARCHAR,
	difficulty INTEGER NOT NULL,
	expected_value VARCHAR(255) NOT NULL,
	created_date TIMESTAMP DEFAULT NOW()
)

CREATE TABLE room (
	id SERIAL PRIMARY KEY,
	creator_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,
	editor_value VARCHAR NOT NULL,
	is_active BOOLEAN DEFAULT TRUE,
	created_date TIMESTAMP DEFAULT NOW(),
	FOREIGN KEY (creator_id) REFERENCES users(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
)

CREATE TABLE solution (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	prompt_id INTEGER NOT NULL,
	solution_value VARCHAR NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (prompt_id) REFERENCES prompt(id)
)

CREATE TABLE message (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	room_id INTEGER NOT NULL,
	body VARCHAR(255) NOT NULL,
	created_date TIMESTAMP DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (room_id) REFERENCES room(id)
)

CREATE TABLE admin (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	role VARCHAR(100),
	FOREIGN KEY (user_id) REFERENCES users(id)
)