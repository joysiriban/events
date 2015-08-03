<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package parallax-one
 */
?>

    <footer class="footer grey-bg">

        <div class="container">
            <div class="footer-widget-wrap">

				<?php
					if( is_active_sidebar( 'footer-area-2' ) ){
				?>
						<div class="col-md-3 col-sm-6 col-xs-12 widget-box">
							<?php
								dynamic_sidebar( 'footer-area-2' );
							?>
						</div>
				<?php
					}
					if( is_active_sidebar( 'footer-area-3' ) ){
				?>
						<div class="col-md-3 col-sm-6 col-xs-12 widget-box">
						   <?php
								dynamic_sidebar( 'footer-area-3' );
							?>
						</div>
				<?php
					}
					if( is_active_sidebar( 'footer-area-4' ) ){
				?>
						<div class="col-md-3 col-sm-6 col-xs-12 widget-box">
							<?php
								dynamic_sidebar( 'footer-area-4' );
							?>
						</div>
				<?php
					}
				?>

            </div><!-- .footer-widget-wrap -->



    </footer>

	<?php wp_footer(); ?>

</body>
</html>
