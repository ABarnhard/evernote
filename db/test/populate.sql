INSERT INTO users (username,password,avatar,token) VALUES ('a1','b','c','d');
INSERT INTO users (username,password,avatar,token) VALUES ('a2','b','c','d');
INSERT INTO users (username,password,avatar,token) VALUES ('a3','b','c','d');

DELETE FROM users;

INSERT INTO users (id,username,password,avatar,token) VALUES (1,'bob','$2a$08$nCUsVXX7i7kMK7IuFIQMOOhZR4MGOlRSTd7aWL01jO7JsEiPGPUAW','https://s3.amazonaws.com/adam-evernote-test/token/avatar.png','token');
