<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         ':=b7S6v6r@LRZ_h`[bK^o.(*o9]}27:7nI>)SF&@LjYtiJ>`LS,vR*]I+---i+:K');
define('SECURE_AUTH_KEY',  'lK6es;x<. YI|~ivRysp+:{|_IW(1^@a|7U/[Zoz0<YE.)p).Peka6c|#Wy+5IVZ');
define('LOGGED_IN_KEY',    'L-aR@W_zD,t3X0KCSedBo3h9j@CNNRO1{xd17WXKM-0|6{N_FV|i;{zax-Y|q_@:');
define('NONCE_KEY',        'A~<AZZOX|g=WVjS9Y+Npzd=grz_XIYRhEOv*[Yxs9&$z;gjN#yRA[8=VZno|KT9Z');
define('AUTH_SALT',        '.6ZnCtlRdSQNTKQqM*YVZ6,-<3%-A|TXK:VCbIBo{3^/Ku)UF!/+Flmw?<`@#RzG');
define('SECURE_AUTH_SALT', '(4U=25_C>WC$x~OLB4n7qG%@4~kBXH!5-l%E9]b4345R#[VdiC-l~-[`_?rH%Z?:');
define('LOGGED_IN_SALT',   '*i8Z5y?zi0CB9g)Jk;Jn~5?aAk&! Hor2$?q;k/M6[|g91PM^&<F u;7M@^j4RG5');
define('NONCE_SALT',       '($4Y/F1v43;+JHU-9m+ABy}DtzHA+v;?:6idb-!D0OQvSR$csgCk@<5e*;X>;,#m');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
