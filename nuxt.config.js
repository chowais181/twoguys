import colors from "vuetify/es5/util/colors";
import webpack from "webpack";

export default {
	target: 'static',

	server: {
		host: '0.0.0.0',
		port: 3000, // default: 3000
	},

	router: {
		// parseQuery(q) {
		//   return require('qs').parse(q)
		// },
		// stringifyQuery(q) {
		//   const r = require('qs').stringify(q)
		//   return r ? '?' + r : ''
		// },
		extendRoutes(routes, resolve) {
			routes.push({
				name: 'custom',
				path: '*',
				component: resolve(__dirname, 'pages/index.vue'),
			});
		},
	},

	env: {
		baseURL: process.env.BASE_URL,
		webAppBaseURL: process.env.WEB_APP_BASE_URL,
		STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PK,
		STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PK,
		STRIPE_SMALL_FISH_PRICE_ID: process.env.STRIPE_SMALL_FISH_PRICE_ID,
		STRIPE_MEDIUM_FISH_PRICE_ID: process.env.STRIPE_MEDIUM_FISH_PRICE_ID,
		STRIPE_BIG_FISH_PRICE_ID: process.env.STRIPE_BIG_FISH_PRICE_ID,
		// STRIPE_SECRET_KEY: process.env.STRIPE_SK,
		// baseURL: "https://staging-api.2guys.app/",
		// webAppBaseURL: "https://twoguys.app",
		// baseURL: process.env.NODE_ENV !== 'production' ? 'http://192.168.89.161:3001/' : 'https://staging-api.2guys.app/v1/',
		// webAppBaseURL: process.env.NODE_ENV !== 'production' ? 'http://192.168.89.161:3000/' : 'https://staging-api.2guys.app/v1/',
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		// titleTemplate: '%s - web-app',
		titleTemplate: '',
		title: 'TwoGuysApp – The easiest way to find business partners',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content:
					'Create a post on the 🏆 #1 platform for business partner search ✔️ Share your business idea ✔️ For serious business people only ✔️',
			},
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'apple-touch-icon',
				sizes: '57x57',
				href: '/apple-icon-57x57.png',
			},
			{
				rel: 'apple-touch-icon',
				sizes: '60x60',
				href: '/apple-icon-60x60.png',
			},
			{
				rel: 'apple-touch-icon',
				sizes: '72x72',
				href: '/apple-icon-72x72.png',
			},
			{
				rel: 'apple-touch-icon',
				sizes: '76x76',
				href: '/apple-icon-76x76.png',
			},
			{
				rel: 'apple-touch-icon',
				sizes: '114x114',
				href: '/apple-icon-114x114.png',
			},
			{
				rel: 'apple-touch-icon',
				sizes: '120x120',
				href: '/apple-icon-120x120.png',
			},
			{
				rel: 'apple-touch-icon',
				sizes: '144x144',
				href: '/apple-icon-144x144.png',
			},
			{
				rel: 'apple-touch-icon',
				sizes: '152x152',
				href: '/apple-icon-152x152.png',
			},
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/apple-icon-180x180.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '192x192',
				href: '/android-icon-192x192.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicon-32x32.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '96x96',
				href: '/favicon-96x96.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicon-16x16.png',
			},
			{ rel: 'manifest', href: '/manifest.json' },
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: '~/plugins/time-picker' },
		{ src: '~/plugins/custom-sweet-alert' },
		{ src: '~/plugins/utils' },
		{ src: '~/plugins/chart', mode: 'client' },
		{ src: '~/plugins/vue-uuid', mode: 'client' },
		{ src: '~/plugins/country-flag' },
		{ src: '~/plugins/vue-stripe.js', ssr: false },
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: ['~/components'],

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		'@nuxtjs/dotenv',
		'@nuxtjs/vuetify',
		'@nuxtjs/router-extras',
	],

	dotenv: {
		filename: '.env.dev',
	},

	components: {
		dirs: ['~/components'],
	},

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/auth-next',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		// https://go.nuxtjs.dev/content
		'@nuxt/content',
		'vue-swatches/nuxt',
		'vue-sweetalert2/nuxt',
		'@nuxtjs/sitemap',
		'@nuxtjs/robots',
		'@nuxtjs/dayjs',
		[
			'@nuxtjs/i18n',
			{
				strategy: 'prefix_and_default',
				locales: ['en', 'de'],
				defaultLocale: 'en',
				vueI18n: {
					fallbackLocale: 'en',
					messages: {
						en: {
							greeting: 'Hello world!',
							loginToYourAccount: 'Login to your Account',
							signIn: 'Sign in',
							login: 'LOGIN',
							password: 'Password',
							forgotPassword: 'Forgot password?',
							createAccount: 'Create Account',
							frontBannerText1:
								'Want to find a business partner? Create a post on the',
							frontBannerText2:
								'#1 platform to search for \n business partners',
							frontBannerCountryText1: 'Create a post on the',
							frontBannerCountryText2:
								'#1 platform to search for business partners in',
							hideThis: 'Hide this',
							postMyIdea: 'Post My Idea',
							newIdeaPostedToday: 'new ideas posted today',
							apply: 'Apply',
							applyNow: 'Send Message',
							applyForThisJob: 'Apply Now',
							applied: 'applications',
							dashboard: 'Dashboard',
							myProfile: 'My Profile',

							create: 'Create',
							questions: 'Questions',
							youHaveBIdeaText: 'You have a Business idea?',
							shareYourIdeaText:
								'Share your idea and find your business partner.',
							ideaTitle: 'Title of your business idea',
							ideaDescription: 'Description of your idea',
							location: 'Location for my business',
							expectedYearlyRev: 'Expected yearly revenue',
							optional: 'optional',

							askQuestions: 'Questions',
							askQuestionText1:
								'You have the opportunity to ask questions to your applicants. Good questions can help you to find a suitable partner for your project.',
							askQuestionText2: 'Maximum of 5 questions only.',
							next: 'Next',
							back: 'Back',
							postText: `Your post will remain online for a maximum of 25 days and 50 users can apply. You can remove your post from the dashboard at any time. After publishing, your ad will be visible. After that it is possible for users to apply to your idea. When someone has applied, they will receive the user's application by email. They can then email the application to close a deal and contact their new business partner. If you agree with these terms of use you can click submit to publish the post`,
							publish: 'Publish',

							register: 'Register',
							username: 'Username',
							emailAddress: 'Email Address',
							signup: 'Sign up',
							logout: 'Logout',

							accountSuccessCreated:
								'Account successfully created.',
							editProfile: 'Edit Profile',
							changeImage: 'Change Image',
							gender: 'Gender',
							language: 'Language',
							male: 'Male',
							female: 'Female',
							age: 'Age',
							occupations: 'Occupations',
							startups: 'Business',
							addOccupation: 'Add occupation',
							addStartup: 'Add business',

							cancel: 'Cancel',
							save: 'Save',
							saveChanges: 'Save changes',
							profileCity: 'City',

							publishedPost: 'PUBLISHED POSTS',
							successfulPartnership: 'SUCCESSFUL PARTNERSHIPS',
							savePosts: 'SAVED POSTS',

							businessIdea: 'Business Idea',
							status: 'Status',
							partnerRequest: 'Partner Request',
							action: 'Action',
							partner: 'Partner',
							user: 'User',

							pleaseShare:
								'👉 Please share your experience with TwoGuys, Thanks!',
							whenYouApplyText1: `These offers of application do not come from TwoGuysApp but only from users, which have not been verified for accuracy. If you apply to find a partner, you should never have to pay for the application. Please be careful when contacting users. Also, you should only apply if you agree to have your email used to contact you after a confirmed deal. If you do not agree, you should change your email address in the account settings. TwoGuysApp cannot be held responsible for any possible damages caused by users. If you notice any fraudulent activity by users on our platform, we kindly ask you to send a message to report@twoguys.app immediately.`,
							report: 'Report',
							disclaimer: 'Disclaimer',
							filter: 'Add Filter',
							// whenYouApplyText2: "Read more to avoid scams",
							// whenYouApplyText3: `. If
							// you click the button to apply, you will leave Remote OK and go
							// to the application page for that company outside of this page.
							// Remote OK assumes no liability or responsibility if you rely
							// on the information on those (external) sites or here.`,

							accountCreation: 'Your account is being created.',
							showProfileInPremiumSearch:
								'Show my profile in the premium club search.',
						},
						de: {
							greeting: '¡Hola mundo!',
							loginToYourAccount: 'Ins Konto einloggen',
							signIn: 'Anmelden',
							login: 'ANMELDUNG',
							password: 'Passwort',
							forgotPassword: 'Passwort vergessen?',
							createAccount: 'Benutzerkonto anlegen',
							frontBannerText1:
								'Möchten Sie einen Geschäftspartner finden? Erstellen Sie einen Beitrag auf der',
							frontBannerText2:
								'Plattform Nr. 1, nach der gesucht werden muss \n Geschäftspartner',
							hideThis: 'Verberge das',
							postMyIdea: 'Poste meine Idee',
							newIdeaPostedToday: 'neue Ideen heute gepostet',
							apply: 'Anwenden',
							applyNow: 'Nachricht senden',
							applyForThisJob: 'Für diesen Job bewerben',
							applied: 'Anfragen',
							dashboard: 'Dashboard',
							myProfile: 'Mein Profil',

							create: 'Erstellen',
							questions: 'Fragen',
							youHaveBIdeaText: 'Sie haben eine Geschäftsidee?',
							shareYourIdeaText:
								'Teilen Sie Ihre Idee und finden Sie Ihren Geschäftspartner.',
							ideaTitle: 'Ideentitel',
							ideaDescription: 'Ideenbeschreibung',
							location: 'Standort',
							expectedYearlyRev: 'Erwarteter Jahresumsatz',
							optional: 'optional',

							askQuestions: 'Fragen stellen',
							askQuestionText1:
								'Stellen Sie Fragen, um den perfekten Partner herauszufiltern.',
							askQuestionText2: 'Nur maximal 5 Fragen.',
							next: 'Nächste',
							back: 'Zurück',
							postText: `Wenn Sie sich bei einem Geschäftspartner bewerben, stimmen Sie dem zu
              Ihr registrierter Vorname und Ihre E-Mail-Adresse werden
              mit dem Bewerber geteilt. Dies geschieht jedoch nur, wenn
              Sie bestätigen ihn als Ihren Partner. Dies geschieht damit
              Sie können den Ideengeber kontaktieren. Ihre Idee bleibt
              7 Tage gepostet. Es können maximal 50 Benutzer beantragt werden
              deine Post. Sie können den Beitrag jederzeit im löschen
              Instrumententafel. Wenn Sie mit diesen Nutzungsbedingungen einverstanden sind, klicken Sie auf
              Abschicken, um den Beitrag zu veröffentlichen. Viel Glück!`,
							publish: 'Veröffentlichen',

							register: 'Registrieren',
							username: 'Nutzername',
							emailAddress: 'E-Mail-Addresse',
							signup: 'Anmelden',
							logout: 'Ausloggen',

							accountSuccessCreated:
								'Konto erfolgreich erstellt.',
							editProfile: 'Profil bearbeiten',
							changeImage: 'Bild ändern',
							gender: 'Geschlecht',
							language: 'Sprache',
							male: 'Männlich',
							female: 'Weiblich',
							age: 'Alter',
							occupations: 'Berufe',
							startups: 'Geschäft',
							addOccupation: 'Beruf hinzufügen',
							addStartup: 'Unternehmen hinzufügen',

							cancel: 'Absagen',
							save: 'Speichern',
							saveChanges: 'Änderungen speichern',

							publishedPost: 'VERÖFFENTLICHTE BEITRÄGE',
							successfulPartnership:
								'ERFOLGREICHE PARTNERSCHAFTEN',
							savePosts: 'BEITRÄGE SPEICHERN',

							businessIdea: 'Geschäftsidee',
							status: 'Status',
							partnerRequest: 'Partneranfrage',
							action: 'Handlung',
							partner: 'Partner',
							user: 'Benutzer',

							pleaseShare:
								'👉 Bitte teilen Sie Ihre Erfahrungen mit TwoGuys, danke!',
							whenYouApplyText1: `Wenn Sie sich bewerben, um einen Partner zu finden, sollten Sie NIE bezahlen müssen
              für die Bewerbung. Sie sollten NIEMALS für etwas bezahlen müssen
              im gesamten Bewerbungsprozess. Das ist Betrug! Nicht teilen
              alle persönlichen Informationen in irgendeiner Form in dieser Anwendung
              Prozess. Posts, die auf Seiten mit dem Thema „Wie man online arbeitet“ verlinken, sind
              auch Betrug. Verwenden Sie sie nicht und zahlen Sie nicht dafür. Auch immer machen
              sicher, dass Sie tatsächlich mit dem Unternehmen im Job sprechen
              Posting und kein Betrüger. Eine gute Idee ist es, die Domain zu überprüfen
              Name der Website/E-Mail und prüfen Sie, ob es sich um die Hauptdomäne handelt
              Name der Firma. Betrug mit Fernarbeit ist weit verbreitet, seien Sie vorsichtig!`,

							whenYouApplyText2:
								'Lesen Sie mehr, um Betrug zu vermeiden',
							whenYouApplyText3: `. Ob
              Wenn Sie auf die Schaltfläche zum Anwenden klicken, verlassen Sie Remote OK und gehen
              zur Bewerbungsseite für dieses Unternehmen außerhalb dieser Seite.
              Remote OK übernimmt keine Haftung oder Verantwortung, wenn Sie sich darauf verlassen
              auf den Informationen auf diesen (externen) Seiten oder hier.`,
							report: 'Melden',
							disclaimer: 'Haftungsausschluss',
							filter: 'Filter hinzufügen',

							accountCreation: 'Dein Account wird erstellt.',
							showProfileInPremiumSearch:
								'Zeige mein Profil in der Premium Club Suche.',
						},
					},
				},
			},
		],
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		baseURL: process.env.AXIOS_BASE_URL,
		// baseURL: "http://0.0.0.0:8000/v1/",
		// baseURL: "https://2guys.yesbyt.com/v1/",
		// baseURL: process.env.NODE_ENV !== 'production' ? 'http://192.168.89.161:3001/v1/' : 'https://staging-api.2guys.app/v1/',
	},

	auth: {
		strategies: {
			local: {
				// token: {
				//   property: 'token',
				//   // global: true,
				//   // required: true,
				//   // type: 'Bearer'
				// },
				user: {
					property: 'user',
					autoFetch: false,
				},
				endpoints: {
					login: { url: '/user/login', method: 'post' },
					// logout: { url: '/api/auth/logout', method: 'post' },
					user: false,
				},
			},
		},
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		meta: {
			title: 'TwoGuysApp – The easiest way to find business partners',
			author: 'TwoGuysApp',
			description:
				'Create a post on the 🏆 #1 platform for business partner search ✔️ Share your business idea ✔️ For serious business people only ✔️',
			mobileAppIOS: true,
		},
		manifest: {
			name: 'TwoGuysApp',
			shortName: 'TwoGuys',
			lang: 'en',
		},
		icon: {
			fileName: 'icon-hd.png',
			sizes: [64, 120, 144, 152, 192, 384, 512],
		},
	},

	robots: [
		{
			UserAgent: '*',
			Allow: '/',
		},
		{
			Disallow: '/cookies-notice',
		},
		{
			Disallow: '/terms-of-service-and-privacy-policy',
		},
		{
			Disallow: '/imprint',
		},
	],

	sitemap: {
		hostname: 'https://twoguys.app',
		lastmod: '2022-07-01',
		changefreq: 'daily',
		priority: 1,
		gzip: true,
		exclude: [
			'/change-password',
			'/admin/**',
			'/Admin/**',
			'/cookies-notice',
			'/customer',
			'/dashboard',
			'/forgot-password',
			'/imprint',
			'/inspire',
			'/new-leads',
			'/profile',
			'/request-sent',
			'/view-profile',
			'/pitch-my-idea',
			'/messages',
			'/terms-of-service-and-privacy-policy',
			'/PitchIdea',
			'/pitch-posts',
			'/v1/pitch-my-idea',
		],
		routes: [
			{
				url: '/register',
				changefreq: 'daily',
				priority: 0.9,
				lastmod: '2022-07-01',
			},
			{
				url: '/login',
				changefreq: 'daily',
				priority: 0.9,
				lastmod: '2022-07-01',
			},
		],
	},

	// Content module configuration: https://go.nuxtjs.dev/config-content
	content: {},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/scss/variables.scss'],
		treeShake: true,
		theme: {
			themes: {
				light: {
					primary: '#4F4FFF',
					accent: '#00314b',
					secondary: '#66dcdc',
				},

				dark: {
					primary: '#FF5F58',
					accent: '#132F60',
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,
				},
			},
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		plugins: [
			new webpack.ProvidePlugin({
				// global modules
				_: 'lodash',
			}),
		],
		devMiddleware: {
			headers: {
				'Cache-Control': 'no-store',
				Vary: '*',
			},
		},
	},

	watchers: {
		webpack: {
			aggregateTimeout: 300,
			poll: 1000,
		},
	},
};
