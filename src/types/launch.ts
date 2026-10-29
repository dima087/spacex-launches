export interface OrbitParams {
    reference_system: string;
    regime: string;
    longitude: number | null;
    semi_major_axis_km: number | null;
    eccentricity: number | null;
    periapsis_km: number | null;
    apoapsis_km: number | null;
    inclination_deg: number | null;
    period_min: number | null;
    lifespan_years: number | null;
    epoch: string | null;
    mean_motion: number | null;
    raan: number | null;
    arg_of_pericenter: number | null;
    mean_anomaly: number | null;
}

export interface Payload {
    payload_id: string;
    norad_id: number[];
    reused: boolean;
    customers?: string[];
    nationality?: string;
    manufacturer?: string | null;
    payload_type: string;
    payload_mass_kg: number | null;
    payload_mass_lbs: number | null;
    orbit: string;
    orbit_params: OrbitParams;
    cap_serial?: string;
    mass_returned_kg?: number | null;
    mass_returned_lbs?: number | null;
    flight_time_sec?: number;
    cargo_manifest?: string | null;
}

export interface Core {
    core_serial: string;
    flight: number;
    block: number | null;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    land_success: boolean | null;
    landing_intent: boolean;
    landing_type: string | null;
    landing_vehicle: string | null;
}

export interface FirstStage {
    cores: Core[];
}

export interface SecondStage {
    block: number;
    payloads: Payload[];
}

export interface Fairings {
    reused: boolean;
    recovery_attempt: boolean;
    recovered: boolean;
    ship: string | null;
}

export interface Rocket {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
    first_stage: FirstStage;
    second_stage: SecondStage;
    fairings: Fairings | null;
}

export interface LaunchSite {
    site_id: string;
    site_name: string;
    site_name_long: string;
}

export interface Links {
    mission_patch: string | null;
    mission_patch_small: string | null;
    reddit_campaign: string | null;
    reddit_launch: string | null;
    reddit_recovery: string | null;
    reddit_media: string | null;
    presskit: string | null;
    article_link: string | null;
    wikipedia: string | null;
    video_link: string | null;
    youtube_id: string | null;
    flickr_images: string[];
}

export interface LaunchFailureDetails {
    time: number;
    altitude: number | null;
    reason: string;
}

export interface Timeline {
    webcast_liftoff?: number;
    go_for_prop_loading?: number;
    rp1_loading?: number;
    stage1_lox_loading?: number;
    stage2_lox_loading?: number;
    engine_chill?: number;
    prelaunch_checks?: number;
    propellant_pressurization?: number;
    go_for_launch?: number;
    ignition?: number;
    liftoff?: number;
    maxq?: number;
    meco?: number;
    stage_sep?: number;
    second_stage_ignition?: number;
    seco_1?: number;
    dragon_separation?: number;
    dragon_solar_deploy?: number;
    dragon_bay_door_deploy?: number;
    fairing_deploy?: number;
    second_stage_restart?: number;
    seco_2?: number;
    payload_deploy?: number;
}

export interface Launch {
    flight_number: number;
    mission_name: string;
    mission_id: string[];
    upcoming: boolean;
    launch_year: string;
    launch_date_unix: number;
    launch_date_utc: string;
    launch_date_local: string;
    is_tentative: boolean;
    tentative_max_precision: string;
    tbd: boolean;
    launch_window: number;
    rocket: Rocket;
    ships: string[];
    telemetry: {
        flight_club: string | null;
    };
    launch_site: LaunchSite;
    launch_success: boolean | null;
    launch_failure_details: LaunchFailureDetails | null;
    links: Links;
    details: string | null;
    static_fire_date_utc: string | null;
    static_fire_date_unix: number | null;
    timeline: Timeline;
}

export interface LaunchesResponse {
    launches: Launch[];
}