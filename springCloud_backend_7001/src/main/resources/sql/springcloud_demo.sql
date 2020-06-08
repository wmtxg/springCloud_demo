/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50640
Source Host           : localhost:3306
Source Database       : springcloud_demo

Target Server Type    : MYSQL
Target Server Version : 50640
File Encoding         : 65001

Date: 2020-05-23 21:16:51
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(12) NOT NULL,
  `name` varchar(12) NOT NULL,
  `pwd` varchar(21) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO user VALUES ('dsfsfdsfsfd', 'test123', 'test123');
