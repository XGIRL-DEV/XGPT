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
	async deleteVerificationPhotos(userUID: string): Promise<void> {
		const {error} = await supabase.from("VPhoto").delete().match({userUID});
		if (error) {
			throw new Error(`Error deleting verification photos: ${error.message}`);
		}
	}

	async deleteStories(userUID: string): Promise<void> {
		const {error} = await supabase.from("stories").delete().match({userUID});
		if (error) {
			throw new Error(`Error deleting stories: ${error.message}`);
		}
	}

	async deleteProfile(userUID: string): Promise<void> {
		const {error} = await supabase.from("ProfilesData").delete().match({userUID});
		if (error) {
			throw new Error(`Error deleting profile: ${error.message}`);
		}
	}

	async deleteAccount(userUID: string): Promise<void> {
		await this.deleteStories(userUID);
		await this.deleteVerificationPhotos(userUID);
		await this.deleteProfile(userUID);

		const response = await fetch("/api/delete-account", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({userId: userUID}),
		});

		const result = await response.json();
		if (!response.ok) {
			throw new Error(result.error);
		}

		const {error} = await supabase.auth.signOut();
		if (error) {
			throw new Error("Error logging out: " + error.message);
		}
	}

	async updateProfileStatus(userUID: string, status: boolean): Promise<void> {
		const {error} = await supabase.from("ProfilesData").update({status}).match({userUID});

		if (error) {
			throw new Error(`Error updating status: ${error.message}`);
		}
	}

	async fetchProfileStatus(userUID: string): Promise<boolean> {
		const {data, error} = await supabase.from("ProfilesData").select("status").eq("userUID", userUID).single();

		if (error) {
			throw new Error(`Error fetching status: ${error.message}`);
		}

		return data.status;
	}

	static async createProfile(userData: UserProfileData): Promise<null> {
		const {data: profileData, error: profileError} = await supabase.from("ProfilesData").insert([userData]);

		if (profileError) {
			throw new Error(`Erro ao inserir dados na tabela ProfilesData: ${profileError.message}`);
		}

		return profileData;
	}

	static async uploadProfilePhotos(userUID: string, photoURLs: string[]): Promise<null> {
		const photoInsertions = photoURLs.map(photoURL => ({
			userUID,
			imageurl: photoURL,
		}));

		const {data: photoData, error: photoError} = await supabase.from("profilephoto").insert(photoInsertions);

		if (photoError) {
			throw new Error(`Erro ao inserir URLs das fotos na tabela profilephoto: ${photoError.message}`);
		}

		return photoData;
	}

	static async uploadVerificationPhotos(userUID: string, photoURLs: string[]): Promise<null> {
		const photoInsertions = photoURLs.map(photoURL => ({
			userUID,
			imageurl: photoURL,
		}));

		const {data: photoData, error: photoError} = await supabase.from("VPhoto").insert(photoInsertions);

		if (photoError) {
			throw new Error(`Erro ao inserir URLs das fotos de verificação: ${photoError.message}`);
		}

		return photoData;
	}
}

export const profileDataService = new ProfileDataService();
