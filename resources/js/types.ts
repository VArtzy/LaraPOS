type DateTime = string;

export type Nullable<T> = T | null;

export interface Team {
    id: number;
    name: string;
    personal_team: boolean;
    created_at: DateTime;
    updated_at: DateTime;
}

export interface User {
    id: number;
    name: string;
    email: string;
    google_id: Nullable<string>;
    current_team_id: Nullable<number>;
    profile_photo_path: Nullable<string>;
    profile_photo_url: string;
    two_factor_enabled: boolean;
    email_verified_at: Nullable<DateTime>;
    created_at: DateTime;
    updated_at: DateTime;
    notifications?: Notification[];
}

export interface Notification {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: number;
    data: {
        title: string;
        message: string;
        url?: string;
    };
    read_at?: Nullable<DateTime>;
    created_at: DateTime;
    updated_at: DateTime;
}

export interface Auth {
    user: Nullable<
        User & {
            all_teams?: Team[];
            current_team?: Team;
        }
    >;
}

export type InertiaSharedProps<T = {}> = T & {
    jetstream: {
        canCreateTeams: boolean;
        canManageTwoFactorAuthentication: boolean;
        canUpdatePassword: boolean;
        canUpdateProfileInformation: boolean;
        flash: any;
        hasAccountDeletionFeatures: boolean;
        hasApiFeatures: boolean;
        hasTeamFeatures: boolean;
        hasTermsAndPrivacyPolicyFeature: boolean;
        managesProfilePhotos: boolean;
        hasEmailVerification: boolean;
    };
    auth: Auth;
    errorBags: any;
    errors: any;
    notifications: Notification[];
    customers?: Customer[];
};

export interface Session {
    id: number;
    ip_address: string;
    is_current_device: boolean;
    agent: {
        is_desktop: boolean;
        platform: string;
        browser: string;
    };
    last_active: DateTime;
}

export interface ApiToken {
    id: number;
    name: string;
    abilities: string[];
    last_used_ago: Nullable<DateTime>;
    created_at: DateTime;
    updated_at: DateTime;
}

export interface JetstreamTeamPermissions {
    canAddTeamMembers: boolean;
    canDeleteTeam: boolean;
    canRemoveTeamMembers: boolean;
    canUpdateTeam: boolean;
}

export interface Role {
    key: string;
    name: string;
    permissions: string[];
    description: string;
}

export interface TeamInvitation {
    id: number;
    team_id: number;
    email: string;
    role: Nullable<string>;
    created_at: DateTime;
    updated_at: DateTime;
}

export interface Customer {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    avatar?: string | File;
    created_at: DateTime;
    updated_at: DateTime;
}

export type OmittedCustomer = Omit<Customer, "created_at" | "updated_at">;
