// services/profileService.ts
import {supabase} from "../database/supabase";

export class ProfileDataService {
	async fetchProfileData(profile: Profile) {
		const profileWithPhoto = await this.fetchProfilePhotos(profile);
		const profileWithVPhoto = await this.fetchProfileVPhotos(profileWithPhoto);
		return profileWithVPhoto;
	}

	private async fetchProfilePhotos(profile: Profile) {
		const {data: profilePhotoData} = await supabase.from("profilephoto").select("*").eq("userUID", profile.userUID);

		const profilePhotoURL = profilePhotoData && profilePhotoData.length > 0 ? profilePhotoData[0].imageurl : null;

		return {
			...profile,
			photoURL: profilePhotoURL,
		};
	}

	private async fetchProfileVPhotos(profile: Profile) {
		const {data: profileVPhotoData, error: profileVPhotoDataError} = await supabase.from("VPhoto").select("*").eq("userUID", profile.userUID);

		if (profileVPhotoDataError) {
			console.error("Error fetching verification photo:", profileVPhotoDataError.message);
			return {
				...profile,
				vphotoURL: null,
			};
		}

		const profileVPhotoURL = profileVPhotoData?.[0]?.imageurl || null;

		return {
			...profile,
			vphotoURL: profileVPhotoURL,
		};
	}

	async getPendingProfiles(): Promise<Profile[]> {
		const {data, error} = await supabase.from("ProfilesData").select("*").is("status", null);

		if (error) throw error;

		return Promise.all(data.map(profile => this.fetchProfileData(profile)));
	}

	async getApprovedProfiles(): Promise<Profile[]> {
		const {data, error} = await supabase.from("ProfilesData").select("*").eq("status", true);

		if (error) throw error;

		return Promise.all(data.map(profile => this.fetchProfileData(profile)));
	}

	async getInactiveProfiles(): Promise<Profile[]> {
		const {data, error} = await supabase.from("ProfilesData").select("*").eq("status", false);

		if (error) throw error;

		return Promise.all(data.map(profile => this.fetchProfileData(profile)));
	}

	async getCertificatedProfiles(): Promise<Profile[]> {
		const {data, error} = await supabase.from("ProfilesData").select("*").eq("certificado", true);

		if (error) throw error;

		return Promise.all(data.map(profile => this.fetchProfileData(profile)));
	}

	async getNonCertificatedProfiles(): Promise<Profile[]> {
		const {data, error} = await supabase.from("ProfilesData").select("*").eq("certificado", false);

		if (error) throw error;

		return Promise.all(data.map(profile => this.fetchProfileData(profile)));
	}

	async approveProfile(id: number): Promise<void> {
		const {error} = await supabase.from("ProfilesData").update({status: true}).eq("id", id);

		if (error) throw error;
	}

	async rejectProfile(id: number): Promise<void> {
		const {error} = await supabase.from("ProfilesData").update({status: false}).eq("id", id);

		if (error) throw error;
	}

	async rejectCertificate(id: number): Promise<void> {
		const {error} = await supabase.from("ProfilesData").update({certificado: false}).eq("id", id);

		if (error) throw error;
	}

	async acceptCertificate(id: number): Promise<void> {
		const {error} = await supabase.from("ProfilesData").update({certificado: true}).eq("id", id);

		if (error) throw error;
	}
}

export const profileDataService = new ProfileDataService();
