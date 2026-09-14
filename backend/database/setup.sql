-- Run this file while signed in to MySQL as an administrator (for example, root).
-- It is idempotent: it does not drop databases, tables, or users.
CREATE DATABASE IF NOT EXISTS zeromind
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'zeromind_user'@'localhost' IDENTIFIED BY 'your_mysql_password';
ALTER USER 'zeromind_user'@'localhost' IDENTIFIED BY 'your_mysql_password';
GRANT ALL PRIVILEGES ON zeromind.* TO 'zeromind_user'@'localhost';
FLUSH PRIVILEGES;
