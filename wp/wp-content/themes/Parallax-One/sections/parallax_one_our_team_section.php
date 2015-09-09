
<!-- =========================
 SECTION: TEAM
============================== -->
<?php
    $parallax_one_our_team_title = get_theme_mod('parallax_one_our_team_title','Our Team');
    $parallax_one_our_team_subtitle = get_theme_mod('parallax_one_our_team_subtitle','Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    $parallax_one_team_content = get_theme_mod('parallax_one_team_content',
        json_encode(
            array(
                    array('image_url' => parallax_get_file('/images/team/1.jpg'),'title' => esc_html__('Albert Jacobs','parallax-one'),'subtitle' => esc_html__('Founder & CEO','parallax-one')),
                    array('image_url' => parallax_get_file('/images/team/2.jpg'),'title' => esc_html__('Tonya Garcia','parallax-one'),'subtitle' => esc_html__('Account Manager','parallax-one')),
                    array('image_url' => parallax_get_file('/images/team/3.jpg'),'title' => esc_html__('Linda Guthrie','parallax-one'),'subtitle' => esc_html__('Business Development','parallax-one'))
            )
        )
    );

    if(!empty($parallax_one_our_team_title) || !empty($parallax_one_our_team_subtitle) || !empty($parallax_one_team_content)){
?>
        <section class="team" id="team">
            <div class="section-overlay-layer">
                <div class="container center">

                    <?php
                    if( is_active_sidebar( 'footer-area-2' ) ){
                ?>
                        <div class="col-md-3 col-sm-6 col-xs-12 widget-box">
                            <?php
                                dynamic_sidebar( 'footer-area-2' );
                            ?>
                        </div>
                    <?php } ?>
                </div>
            </div><!-- container  -->
        </section><!-- #section9 -->

<?php
    }
?>
