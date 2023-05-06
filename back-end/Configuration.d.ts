/**
 * Structure for an object of project's configuration
 */
interface Configuration {
	/**
	 * "auto" | "light" | "dark"
	 */
	default_theme: string;
	description: string;
	base_color: string;
	/**
	 * "card_square"
	 * "card_landscape"
	 * "landscape"
	 * "square"
	 */
	home_image_style: string;
	home_description: string;
	enable_check_update: boolean;
	/**
	 * Link to dev page
	 */
	google_play_dev: string;
	use_flat_card: boolean;
	navigation_view_header_title: string;
	enable_apply: boolean;
	enable_icons_sort: boolean;
	show_icon_name: boolean;
	includes_adaptive_icons: boolean;
	enable_icon_request: boolean;
	enable_icon_request_limit: boolean;
	icon_request_limit: number;
	reset_icon_request_limit: boolean;
	json_check_before_request: boolean;
	enable_premium_request: boolean;
	enable_non_mail_app_request: boolean;
	hide_missing_app_count: boolean;
	/**
	 * "email" | "pacific"
	 */
	regular_request_method: string;
	/**
	 * "email" | "pacific"
	 */
	premium_request_method: string;
	regular_request_email: string;
	premium_request_email: string;
	regular_request_email_subject: string;
	premium_request_email_subject: string;
	about_image: string;
	about_profile_image: string;
	about_title: string;
	about_desc: string;
	about_social_links: Array<string>;
	show_contributors_dialog: boolean;
	privacy_policy_link: string;
	terms_and_conditions_link: string;
	enable_donation: boolean;
	show_intro: boolean;
}
