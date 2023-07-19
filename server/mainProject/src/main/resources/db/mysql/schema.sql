CREATE TABLE member (
    member_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_name VARCHAR(8) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    active BOOLEAN NOT NULL,
    activity_area VARCHAR(255),
    post_count BIGINT NOT NULL,
    created_at datetime,
    modified_at datetime
);

CREATE TABLE post (
    post_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    member_id BIGINT NOT NULL,
    category VARCHAR(255) NOT NULL,
    kcal BIGINT,
    created_at datetime,
    modified_at datetime,
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

CREATE TABLE crewing (
    crewing_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    max_people INT NOT NULL,
    current_people INT NOT NULL,
    member_id BIGINT NOT NULL,
    activity_area varchar(255),
    activity_date varchar(255) NOT NULL,
    dead_line varchar(255) NOT NULL,
    max_limit boolean NOT NULL,
    is_completed boolean NOT NULL,
    created_at datetime,
    modified_at datetime,
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

CREATE TABLE comment (
    comment_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(255) NOT NULL,
    member_id BIGINT NOT NULL,
    post_id BIGINT,
    crewing_id BIGINT,
    created_at datetime,
    modified_at datetime,
    FOREIGN KEY (member_id) REFERENCES member(member_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id),
    FOREIGN KEY (crewing_id) REFERENCES crewing(crewing_id)
);

CREATE TABLE crewing_members (
  member_id BIGINT NOT NULL,
  crewing_id BIGINT NOT NULL,
  PRIMARY KEY (member_id, crewing_id),
  created_at datetime,
  modified_at datetime,
  FOREIGN KEY (member_id) REFERENCES member(member_id),
  FOREIGN KEY (crewing_id) REFERENCES crewing(crewing_id)
);

CREATE TABLE follow (
    follower_id BIGINT NOT NULL,
    following_id BIGINT NOT NULL,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES member(member_id),
    FOREIGN KEY (following_id) REFERENCES member(member_id)
);

CREATE TABLE member_roles (
    member_member_id BIGINT NOT NULL,
    roles VARCHAR(255),
    FOREIGN KEY (member_member_id) REFERENCES member(member_id)
);

