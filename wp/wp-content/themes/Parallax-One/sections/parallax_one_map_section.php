<!-- =========================
INTERGEO MAPS
============================== -->
<?php
    // echo "geo"; exit;
    $parallax_one_frontpage_map_shortcode = get_theme_mod('parallax_one_frontpage_map_shortcode');
    // var_dump($parallax_one_frontpage_map_shortcode);
    if( !empty($parallax_one_frontpage_map_shortcode) ){
?>
[intergeo id="cTM"][/intergeo]
        <div id="container-fluid">
            <div class="parallax_one_map_overlay"></div>
            <div id="cd-google-map">
                <?php echo do_shortcode($parallax_one_frontpage_map_shortcode);?>
            </div>
        </div><!-- .container-fluid -->
<?php
     }
?>
