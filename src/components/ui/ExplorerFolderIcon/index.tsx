import {
	Folder,
	FolderActions,
	FolderAndroid,
	FolderApp,
	FolderAssets,
	FolderAuth,
	FolderAws,
	FolderAzure,
	FolderBlueCode,
	FolderBruno,
	FolderBuild,
	FolderClaude,
	FolderConfig,
	FolderConstants,
	FolderContext,
	FolderCore,
	FolderCypress,
	FolderDatabase,
	FolderDrizzle,
	FolderEffects,
	FolderExpo,
	FolderFacade,
	FolderFirebase,
	FolderFonts,
	FolderGithub,
	FolderGitlab,
	FolderGradle,
	FolderGraphQL,
	FolderGrayOutline,
	FolderGreenCode,
	FolderHelpers,
	FolderHooks,
	FolderIOS,
	FolderImages,
	FolderInterceptors,
	FolderInterfaces,
	FolderLayout,
	FolderMail,
	FolderMiddleware,
	FolderModels,
	FolderModules,
	FolderMongoDB,
	FolderNginx,
	FolderNodeModules,
	FolderOpen,
	FolderPipes,
	FolderPrisma,
	FolderProviders,
	FolderReact,
	FolderReducer,
	FolderRouter,
	FolderSass,
	FolderSelector,
	FolderServices,
	FolderShared,
	FolderSrc,
	FolderSupabase,
	FolderTarget,
	FolderTina,
	FolderUtils,
	FolderVSCode,
	FolderVercel
} from "@react-symbols/icons"

import React from "react"

type IconComponent = React.ComponentType<any>

interface FolderIconMapping {
	folderName?: Record<string, IconComponent>
	folderPattern?: Array<{ pattern: RegExp; icon: IconComponent }>
}

const folderIconMapping: FolderIconMapping = {
	// Точные имена папок
	folderName: {
		// Source directories
		src: FolderSrc,
		source: FolderSrc,
		lib: FolderBlueCode,
		libs: FolderBlueCode,

		// Assets
		assets: FolderAssets,
		static: FolderAssets,
		public: FolderAssets,
		images: FolderImages,
		img: FolderImages,
		icons: FolderImages,
		fonts: FolderFonts,

		// Config
		config: FolderConfig,
		configs: FolderConfig,
		".config": FolderConfig,
		settings: FolderConfig,

		// Build/Output
		build: FolderBuild,
		dist: FolderBuild,
		out: FolderBuild,
		output: FolderBuild,
		target: FolderTarget,

		// Testing
		test: FolderCypress,
		tests: FolderCypress,
		__tests__: FolderCypress,
		cypress: FolderCypress,

		// Node
		node_modules: FolderNodeModules,

		// Mobile
		android: FolderAndroid,
		ios: FolderIOS,
		".expo": FolderExpo,
		expo: FolderExpo,

		// Framework specific
		components: FolderReact,
		pages: FolderReact,
		views: FolderReact,
		screens: FolderReact,
		layouts: FolderLayout,
		layout: FolderLayout,
		app: FolderApp,

		// State management
		store: FolderReducer,
		stores: FolderReducer,
		state: FolderReducer,
		redux: FolderReducer,
		actions: FolderActions,
		reducers: FolderReducer,
		selectors: FolderSelector,
		effects: FolderEffects,
		facade: FolderFacade,
		facades: FolderFacade,

		// Architecture
		core: FolderCore,
		shared: FolderShared,
		common: FolderShared,
		modules: FolderModules,
		features: FolderModules,
		domain: FolderModules,

		// Backend
		api: FolderGreenCode,
		server: FolderGreenCode,
		services: FolderServices,
		controllers: FolderGreenCode,
		middleware: FolderMiddleware,
		middlewares: FolderMiddleware,
		interceptors: FolderInterceptors,
		pipes: FolderPipes,
		guards: FolderAuth,
		providers: FolderProviders,
		models: FolderModels,
		entities: FolderModels,
		interfaces: FolderInterfaces,
		types: FolderInterfaces,
		schemas: FolderDatabase,
		migrations: FolderDatabase,

		// Routing
		routes: FolderRouter,
		router: FolderRouter,
		routing: FolderRouter,

		// Utils
		utils: FolderUtils,
		helpers: FolderHelpers,
		tools: FolderUtils,
		constants: FolderConstants,

		// Hooks & Context
		hooks: FolderHooks,
		context: FolderContext,
		contexts: FolderContext,

		// Database & Backend Services
		database: FolderDatabase,
		db: FolderDatabase,
		prisma: FolderPrisma,
		drizzle: FolderDrizzle,
		mongodb: FolderMongoDB,
		graphql: FolderGraphQL,
		gql: FolderGraphQL,

		// DevOps & Cloud
		".github": FolderGithub,
		".git": FolderGithub,
		".src": FolderSrc,
		".gitlab": FolderGitlab,
		".vercel": FolderVercel,
		firebase: FolderFirebase,
		".firebase": FolderFirebase,
		supabase: FolderSupabase,
		aws: FolderAws,
		azure: FolderAzure,
		nginx: FolderNginx,

		// AI
		".cursor": FolderClaude,
		".claude": FolderClaude,

		// IDE
		".vscode": FolderVSCode,

		// Tools & Others
		gradle: FolderGradle,
		bruno: FolderBruno,
		tina: FolderTina,
		mail: FolderMail,
		email: FolderMail,
		auth: FolderAuth,
		authentication: FolderAuth,

		// Styles
		styles: FolderSass,
		css: FolderSass,
		scss: FolderSass,
		sass: FolderSass
	},

	// Паттерны (regexp)
	folderPattern: [
		// Color-coded generic folders
		{ pattern: /^components?$/i, icon: FolderReact },
		{ pattern: /^pages?$/i, icon: FolderReact },
		{ pattern: /.*[-_]components?$/i, icon: FolderReact },

		// Config patterns
		{ pattern: /^\..*config$/i, icon: FolderConfig },
		{ pattern: /.*[-_]config$/i, icon: FolderConfig },

		// Test patterns
		{ pattern: /.*[-_]tests?$/i, icon: FolderCypress },
		{ pattern: /^e2e$/i, icon: FolderCypress },

		// Hidden folders
		{ pattern: /^\.[a-z]/i, icon: FolderGrayOutline }
	]
}

interface FolderIconProps {
	folderName: string
	isOpen?: boolean
	size?: number
	className?: string
}

export const ExplorerFolderIcon: React.FC<FolderIconProps> = ({
	folderName,
	isOpen = false,
	className
}) => {
	const getIcon = (): IconComponent => {
		// If folder is open, return open state
		if (isOpen) {
			return FolderOpen
		}

		const lowerFolderName = folderName.toLowerCase()

		// 1. Проверяем точное совпадение имени папки
		if (folderIconMapping.folderName?.[lowerFolderName]) {
			return folderIconMapping.folderName[lowerFolderName]
		}

		// 2. Проверяем паттерны
		if (folderIconMapping.folderPattern) {
			for (const { pattern, icon } of folderIconMapping.folderPattern) {
				if (pattern.test(lowerFolderName)) {
					return icon
				}
			}
		}

		// Default fallback
		return Folder
	}

	const IconComponent = getIcon()

	return <IconComponent className={className} />
}

