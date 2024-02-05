<?php
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );
function my_theme_enqueue_styles() {
    $parent_style = 'dt-the7-style'; // This is 'dt-the7-style' for The7 theme.

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        '1.2'
    );
    
    // Enqueue all scripts of the parent theme
    foreach( wp_scripts()->queue as $handle ) :
        wp_dequeue_script( $handle );
        wp_enqueue_script( $handle );
    endforeach;

    // Enqueue all styles of the parent theme
    foreach( wp_styles()->queue as $handle ) :
        wp_dequeue_style( $handle );
        wp_enqueue_style( $handle );
    endforeach;
}

add_action('wp_enqueue_scripts', 'add_and_remove_parent_script', 20120207);
function add_and_remove_parent_script()
{
    wp_dequeue_script('tutor-course-builder');
    wp_enqueue_script('child_theme_script_handle', get_stylesheet_directory_uri().'/tutor/assets/js/tutor-course-builder.min.js', array('jquery', 'tutor-script'));
}

function my_custom_scripts() {
    wp_enqueue_script(
        'my-custom-script', 
        get_stylesheet_directory_uri() . '/custom.js', 
        array('jquery'), 
        '1.5', 
        true 
    );
}
add_action( 'wp_enqueue_scripts', 'my_custom_scripts' );

function my_child_theme_load_textdomain() {
    $locale = get_locale();
    $text_domain = 'dt-the7-child'; 
    $theme_directory = get_stylesheet_directory();
    $languages_directory = $theme_directory . '/languages';

    load_theme_textdomain( $text_domain, $languages_directory );
    load_theme_textdomain( $text_domain, $theme_directory . '/languages/child-theme' );
    load_theme_textdomain( $text_domain, $theme_directory . '/languages/child-theme-' . $locale );
}
add_action( 'after_setup_theme', 'my_child_theme_load_textdomain' );

function add_commission_rate_block () {
    $current_user = wp_get_current_user();
    $commission_type = get_user_meta($current_user->ID, 'tutor_instructor_amount_type', true);
	$commission_amount = (double)get_user_meta( $current_user->ID, 'tutor_instructor_amount', true );
    $currency_symbol = '%';
    if ($commission_type == 'default') {
        $commission_amount = get_tutor_option('earning_instructor_commission');
    } else if ($commission_type == 'fixed') {
		$currency_symbol = esc_html(get_woocommerce_currency_symbol());
	}

	echo '<div style="position: relative;">';
    echo '<div id="commissionVal">';
    _e( 'My commission rate, derived from the course price, is {commission}.', 'tutor-pro' );
    echo '</div></div>';
    echo '<script>var commissionVal = "' . $commission_amount . $currency_symbol . '";</script>';
}
add_action('tutor/dashboard_course_builder_form_field_before', 'add_commission_rate_block');

function show_teacher_room_link_block($course_id) {	
	$course_room_link = get_post_field('course_room_link', $course_id);

	echo '<div class="tutor-mb-32">';
    echo '<div style="display:flex;justify-content:space-between;"><h4>' . __( "Teacher's room", 'tutor' ) . '</h4>';
	echo '<button class="expand-room-btn tutor-btn tutor-btn-outline-primary">'.__("Expand", 'tutor').'</button></div>';
	echo '<div class="room-container tutor-form-control tutor-mt-12" style="position: relative; padding: 30px; height: 580px;">';
	echo '<div class="shrink-room-btn" style="position: absolute; padding: 10px; top: 5px; right: 0px; font-size: 40px; line-height: 0; display: none; cursor: pointer;">&times;</div>';
	if ($course_room_link) {
		echo '<iframe src="' . $course_room_link . '" allow="camera; microphone;" style="height: 100%; width: 100%; border: none; display: none;"></iframe>';
	} else {
		echo '<div>The room does not exist.</div>';
	}
	echo '</div>';
}
add_action('tutor_course/single/after/topics', 'show_teacher_room_link_block');

function add_dynamic_room_link () {
	echo '<div class="tutor-mb-32">';
	echo '<label class="tutor-course-field-label tutor-fs-6 tutor-color-black" for="course-room-link">'.__("Add video conferencing to your course by clicking Add", 'tutor').'</label>';
	echo '<div style="display: flex; align-items: center; justify-content: center;">';
	echo '<input name="course_room_link" id="course-room-link" type="text" 
		value="' . esc_attr( get_post_meta( get_the_ID(), 'course_room_link', true ) ) . '" class="tutor-form-control" style="margin: 0 10px 0 0;"/>';
	echo '<input type="button" class="tutor-btn tutor-btn-primary" id="add_room_link_btn" value="'.__("Add", 'tutor').'"/>';
	echo '</div>';
	echo '</div>';
}
add_action('tutor/frontend_course_edit/after/description', 'add_dynamic_room_link');

function my_save_custom_course_settings_fields( $post_id ) {
    if ( isset( $_POST['course_room_link'] ) ) {
        $course_room_link = sanitize_text_field( $_POST['course_room_link'] );
        update_post_meta( $post_id, 'course_room_link', $course_room_link );
    }
}
add_action( 'save_tutor_course', 'my_save_custom_course_settings_fields' );

?>