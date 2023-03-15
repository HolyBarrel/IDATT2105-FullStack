###Follow these steps to create the corresponding databases: 

1. Go to http://localhost:8080/h2-console 

2. Log in with: 
    username: sa
    password: password

3. Execute the following SQL-queries: 

    first: 
    `
    `
    CREATE TABLE CALC_USERS (
    USER_ID INT AUTO_INCREMENT PRIMARY KEY,
    USER_NAME VARCHAR(255) NOT NULL,
    USER_PASSWORD VARCHAR(255) NOT NULL
    );
    `

    second: 
    `
    CREATE TABLE CALC_EQUATIONS (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    FIRST_NUMBER DOUBLE NOT NULL,
    OPERATOR VARCHAR(10) NOT NULL,
    SECOND_NUMBER DOUBLE NOT NULL,
    RESULT DOUBLE,
    USER_ID INT,
    FOREIGN KEY (USER_ID) REFERENCES CALC_USERS(USER_ID)
    );  
    `
    
    `