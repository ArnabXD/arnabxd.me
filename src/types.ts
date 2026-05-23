export type Experience = {
	title: string;
	company: string;
	period: string;
	responsibilities: string[];
};

export type Education = {
	institution: string;
	degree: string;
	period: string;
	cgpa: string;
};

export type Project = {
	title: string;
	period: string;
	description: string;
	tech: string[];
	link?: string;
	confidential?: boolean;
	client?: {
		industry: string;
		region: string;
	};
	role?: string;
	outcome?: string;
};

export type SkillGroup = {
	title: string;
	skills: string[];
};

export type SiteData = {
	site: {
		name: string;
		handle: string;
		title: string;
		description: string;
		keywords: string;
		url: string;
		ogImage: string;
		status: string;
		tagline: string;
	};
	nav: { label: string; href: string; short: string }[];
	contact: {
		email: string;
		location: { text: string; country: string; url: string };
		socials: {
			github: string;
			linkedin: string;
			twitter: string;
			upwork: string;
		};
		notice: string;
		terminalIntro: string;
	};
	experience: Experience[];
	education: Education[];
	projects: Project[];
	skills: SkillGroup[];
	easterEgg: {
		hint: string;
		konamiSequence: string[];
		hackTrigger: string;
		terminal: {
			title: string;
			initialHistory: string[];
			commands: Record<string, string>;
			jokes: string[];
		};
	};
};
