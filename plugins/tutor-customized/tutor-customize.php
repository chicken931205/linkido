<?php
/**
 * Plugin Name: Tutor LMS Customized
 * Description: This plugin is a customized version of Tutor LMS.
 * Author: Golden
 * Author URI: https://www.linkido.com
 * Version: 1.0.0
 * @package Tutor_Customized
 */

define( 'TUTOR_CUSTOMIZED_VERSION', '1.0.0' );
define( 'TUTOR_CUSTOMIZED_FILE', __FILE__ );

add_action( 'admin_enqueue_scripts', function() {
    if ( isset( $_GET['page'] ) && $_GET['page'] === "tutor-instructors" ) {
        wp_enqueue_script( 'set_linkido', tutor()->url . 'assets/js/customized/admin/set_linkido.js', array( 'jquery' ), TUTOR_CUSTOMIZED_VERSION, true );
    }
} );

add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_script( 'calc-price', tutor()->url . 'assets/js/customized/calc-price.js', array( 'jquery' ), TUTOR_CUSTOMIZED_VERSION, true );
} );

add_action( 'tutor_edit_instructor_form_fields_after', function( $instructor_id ) {
	$status   = get_user_meta( $instructor_id, '_tutor_instructor_status', true );
	$linkido_percentage = get_user_meta( $instructor_id, 'linkido_percentage', true );


    if ( $status === "approved" ) {
        ?>
        <div class="tutor-rows">
            <div class="tutor-col">
                <label class="tutor-form-label">
                    <?php esc_html_e( 'Linkido', 'tutor-pro' ); ?>
                </label>
                <div class="tutor-mb-16">
                    <input
                        value="<?php echo esc_attr( $linkido_percentage ); ?>" 
                        type="text" id="show_linkido_percentage_<?php echo $instructor_id; ?>" oninput="handle_change_linkido( <?php echo $instructor_id ?> )" class="tutor-form-control tutor-mb-12" placeholder="<?php esc_attr_e( 'Enter Linkido', 'tutor-pro' ); ?>"/>
                </div>
                <div class="tutor-mb-16">
                    <input value="" type="hidden" id="hidden_linkido_percentage_<?php echo $instructor_id ?>" name="linkido_percentage"/>
                </div>
            </div>
        </div>
        <?php
    }
}, 11);

add_action( 'wp_ajax_tutor_update_instructor_data', function() {
    $linkido_percentage = \TUTOR\Input::post( 'linkido_percentage', '');
    $user_id            = \TUTOR\Input::post( 'user_id' );

    if ( $linkido_percentage && is_numeric( $linkido_percentage ) ) {
        update_user_meta( $user_id, 'linkido_percentage', $linkido_percentage );
        $net_rate = get_user_meta( $user_id, 'net_rate', true );
        if ( $net_rate ) {
            $end_price = $net_rate + $net_rate * $linkido_percentage / 100;
            update_user_meta( $user_id, 'end_price', $end_price );
        }
    } elseif ( $linkido_percentage === "" || (int) $linkido_percentage === 0) {
        delete_user_meta( $user_id, 'linkido_percentage');
        $net_rate = get_user_meta( $user_id, 'net_rate', true );
        if ( $net_rate ) {
            $end_price = $net_rate;
            update_user_meta( $user_id, 'end_price', $end_price );
        } else {
            delete_user_meta( $user_id, 'end_price');
        }
    }
} );

add_filter( 'tutor/user/profile/completion', function($required_fields) {
    $required_fields['net_rate'] = __( 'Set Your Net Rate', 'tutor' );

    $settings_url = tutor_utils()->tutor_dashboard_url( 'settings' );
    $user_id = get_current_user_id();

    $required_fields[ 'net_rate' ] = array(
        'text'   => __( 'Set Your Net Rate', 'tutor' ),
        'is_set' => get_user_meta( $user_id, 'net_rate', true ) ? true : false,
        'url'    => $settings_url,
    );

    return $required_fields;
} );