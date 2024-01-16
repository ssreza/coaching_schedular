CREATE TABLE Users (
    UserID int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,

   	 Email varchar(255) NOT NULL,
	PRIMARY KEY (UserID)
);
CREATE TABLE TimeSlots (
    TimeSlotID integer primary key generated always as identity,
   	start_at TIME NOT NULL,
   	end_at TIME NOT NULL,
	available Boolean NOT NULL,
	 coach_id integer REFERENCES users (userid),
	student_id integer REFERENCES users (userid)
)