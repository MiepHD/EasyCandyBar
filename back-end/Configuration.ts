/**
 * Structure for an object of project's configuration
 */

export class Configuration {
	/**
	 * "auto" | "light" | "dark"
	 */
	public default_theme: string;
	public description: string;
	public base_color: string;
	/**
	 * "card_square"
	 * "card_landscape"
	 * "landscape"
	 * "square"
	 * Has to be converted to home_image_style
	 */
	public home_image_type: boolean;
	public home_image_orientation: boolean;
	public home_description: string;
	public enable_check_update: boolean;
	/**
	 * Link to dev page
	 */
	public google_play_dev: string;
	public use_flat_card: boolean;
	public navigation_view_header_title: string;
	public enable_apply: boolean;
	public enable_icons_sort: boolean;
	public show_icon_name: boolean;
	public includes_adaptive_icons: boolean;
	public enable_icon_request: boolean;
	public enable_icon_request_limit: boolean;
	public icon_request_limit: number;
	public reset_icon_request_limit: boolean;
	public json_check_before_request: boolean;
	public enable_premium_request: boolean;
	public enable_non_mail_app_request: boolean;
	public hide_missing_app_count: boolean;
	/**
	 * "email" | "pacific"
	 */
	public regular_request_method: string;
	/**
	 * "email" | "pacific"
	 */
	public premium_request_method: string;
	public regular_request_email: string;
	public premium_request_email: string;
	public regular_request_email_subject: string;
	public premium_request_email_subject: string;
	public about_image: string;
	public about_profile_image: string;
	public about_title: string;
	public about_desc: string;
	public about_social_links: Array<string>;
	public show_contributors_dialog: boolean;
	public privacy_policy_link: string;
	public terms_and_conditions_link: string;
	public enable_donation: boolean;
	public show_intro: boolean;

	public constructor() {
		this.default_theme = "";
		this.description = "";
		this.base_color = "";
		/**
		 * "card_square"
		 * "card_landscape"
		 * "landscape"
		 * "square"
		 * Has to be converted to home_image_style
		 */
		this.home_image_type = false;
		this.home_image_orientation = false;
		this.home_description = "";
		this.enable_check_update = false;
		/**
		 * Link to dev page
		 */
		this.google_play_dev = "";
		this.use_flat_card = false;
		this.navigation_view_header_title = "";
		this.enable_apply = false;
		this.enable_icons_sort = false;
		this.show_icon_name = false;
		this.includes_adaptive_icons = false;
		this.enable_icon_request = false;
		this.enable_icon_request_limit = false;
		this.icon_request_limit = 0;
		this.reset_icon_request_limit = false;
		this.json_check_before_request = false;
		this.enable_premium_request = false;
		this.enable_non_mail_app_request = false;
		this.hide_missing_app_count = false;
		/**
		 * "email" | "pacific"
		 */
		this.regular_request_method = "";
		/**
		 * "email" | "pacific"
		 */
		this.premium_request_method = "";
		this.regular_request_email = "";
		this.premium_request_email = "";
		this.regular_request_email_subject = "";
		this.premium_request_email_subject = "";
		this.about_image = "";
		this.about_profile_image = "";
		this.about_title = "";
		this.about_desc = "";
		this.about_social_links = [];
		this.show_contributors_dialog = false;
		this.privacy_policy_link = "";
		this.terms_and_conditions_link = "";
		this.enable_donation = false;
		this.show_intro = false;
	}
}
