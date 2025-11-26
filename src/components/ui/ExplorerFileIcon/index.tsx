import {
	Angular,
	AngularComponent,
	AngularDirective,
	AngularGuard,
	AngularModule,
	AngularPipe,
	AngularService,
	Astro,
	Audio,
	Babel,
	Biome,
	BracketsYellow,
	Bruno,
	Bun,
	CLang,
	CMake,
	Capacitor,
	Claude,
	Clojure,
	CodeBlue,
	CodeGreen,
	CodeOrange,
	CodePurple,
	CoffeeScript,
	Coldfusion,
	Commitlint,
	Contentlayer,
	Cplus,
	Crystal,
	Csharp,
	Csv,
	Cucumber,
	Cuda,
	Cypress,
	Dart,
	Database,
	Deno,
	Docker,
	Document,
	Docusaurus,
	Drawio,
	Drizzle,
	Dts,
	Dune,
	Earthfile,
	EditorConfig,
	Elixir,
	Erlang,
	Eslint,
	Exe,
	Firebase,
	Font,
	Fortran,
	Fsharp,
	Gatsbyjs,
	Gear,
	Gif,
	Git,
	Gitlab,
	Gleam,
	Go,
	GoGreen,
	GoMod,
	Gradle,
	Graphql,
	Gulp,
	H,
	Haml,
	Haskell,
	Http,
	Hugo,
	I18n,
	Ignore,
	Image,
	Ionic,
	Java,
	Jenkins,
	Jest,
	Js,
	JsTest,
	Julia,
	JuliaMarkdown,
	Keystatic,
	Knip,
	Kotlin,
	Laravel,
	License,
	Liquid,
	Lock,
	Lua,
	Luau,
	Lunaria,
	MCAddon,
	MDX,
	Markdown,
	MongoDB,
	NPM,
	Nest,
	NestController,
	NestDecorator,
	NestGuard,
	NestMiddleware,
	NestService,
	Netlify,
	Next,
	Nix,
	Nodemon,
	Notebook,
	Nunjucks,
	Nuxt,
	Orval,
	PDF,
	PHP,
	PKL,
	PNPM,
	PandaCSS,
	Patch,
	Perl,
	PostCSS,
	Prettier,
	Prisma,
	Proto,
	Pug,
	Pulumi,
	Puzzle,
	Python,
	R,
	Razor,
	ReactTest,
	Reactjs,
	Reactts,
	ReduxActions,
	ReduxEffects,
	ReduxFacade,
	ReduxReducer,
	ReduxSelector,
	Rescript,
	RescriptInterface,
	Robot,
	Rome,
	Ruby,
	Rust,
	SVG,
	SWC,
	Sanity,
	Sass,
	Sbt,
	Scala,
	Serverless,
	Shadcn,
	Shell,
	Solidity,
	StatamicAntlers,
	Storybook,
	Stylelint,
	Stylus,
	Supabase,
	Svelte,
	SvelteTS,
	Swift,
	Tailwind,
	Tauri,
	Terraform,
	Tex,
	Text,
	TsTest,
	Tsconfig,
	Turborepo,
	Twig,
	TypeScript,
	UnoCSS,
	VanillaExtract,
	Vercel,
	Video,
	Vite,
	Vitest,
	Vlang,
	Vue,
	Webpack,
	XML,
	Yaml,
	Yarn,
	Zig
} from "@react-symbols/icons"

import React, { FC } from "react"

import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react"

type IconComponent = React.ComponentType<any>

interface FileIconMapping {
	fileName?: Record<string, IconComponent>
	filePattern?: Array<{ pattern: RegExp; icon: IconComponent }>
	extension?: Record<string, IconComponent>
}

const fileIconMapping: FileIconMapping = {
	// Точные имена файлов
	fileName: {
		"package.json": NPM,
		"package-lock.json": NPM,
		"yarn.lock": Yarn,
		".yarnrc": Yarn,
		".yarnrc.yml": Yarn,
		"pnpm-lock.yaml": PNPM,
		"pnpm-workspace.yaml": PNPM,
		"bun.lockb": Bun,
		"tsconfig.json": Tsconfig,
		"jsconfig.json": Js,
		".eslintrc": Eslint,
		".eslintrc.js": Eslint,
		".eslintrc.json": Eslint,
		".eslintignore": Eslint,
		"eslint.config.js": Eslint,
		".prettierrc": Prettier,
		".prettierrc.json": Prettier,
		".prettierignore": Prettier,
		"prettier.config.js": Prettier,
		".gitignore": Git,
		".gitattributes": Git,
		".gitmodules": Git,
		dockerfile: Docker,
		Dockerfile: Docker,
		"docker-compose.yml": Docker,
		"docker-compose.yaml": Docker,
		".dockerignore": Docker,
		"vite.config.ts": Vite,
		"vite.config.js": Vite,
		"vitest.config.ts": Vitest,
		"vitest.config.js": Vitest,
		"jest.config.js": Jest,
		"jest.config.ts": Jest,
		"next.config.js": Next,
		"next.config.ts": Next,
		"nuxt.config.js": Nuxt,
		"nuxt.config.ts": Nuxt,
		"webpack.config.js": Webpack,
		"tailwind.config.js": Tailwind,
		"tailwind.config.ts": Tailwind,
		"postcss.config.js": PostCSS,
		"astro.config.mjs": Astro,
		"svelte.config.js": Svelte,
		"capacitor.config.ts": Capacitor,
		"capacitor.config.json": Capacitor,
		"nest-cli.json": Nest,
		"angular.json": Angular,
		".angular-cli.json": Angular,
		"vercel.json": Vercel,
		"netlify.toml": Netlify,
		"firebase.json": Firebase,
		".firebaserc": Firebase,
		"supabase.config.js": Supabase,
		"terraform.tfvars": Terraform,
		"go.mod": GoMod,
		"go.sum": GoMod,
		"Cargo.toml": Rust,
		"Cargo.lock": Rust,
		Gemfile: Ruby,
		"Gemfile.lock": Ruby,
		Rakefile: Ruby,
		"build.gradle": Gradle,
		"settings.gradle": Gradle,
		"build.sbt": Sbt,
		"pom.xml": Java,
		"CMakeLists.txt": CMake,
		dune: Dune,
		"dune-project": Dune,
		Makefile: Gear,
		"gulpfile.js": Gulp,
		"nodemon.json": Nodemon,
		LICENSE: License,
		"LICENSE.md": License,
		"LICENSE.txt": License,
		".editorconfig": EditorConfig,
		".babelrc": Babel,
		"babel.config.js": Babel,
		"prisma.schema": Prisma,
		"drizzle.config.ts": Drizzle,
		"panda.config.ts": PandaCSS,
		"panda.config.js": PandaCSS,
		"unocss.config.ts": UnoCSS,
		"biome.json": Biome,
		"rome.json": Rome,
		"turbo.json": Turborepo,
		"sanity.config.ts": Sanity,
		"gatsby-config.js": Gatsbyjs,
		"contentlayer.config.ts": Contentlayer,
		"contentlayer.config.js": Contentlayer,
		"serverless.yml": Serverless,
		"knip.json": Knip,
		"stylelint.config.js": Stylelint,
		".stylelintrc": Stylelint,
		"commitlint.config.js": Commitlint,
		"orval.config.ts": Orval,
		"tauri.conf.json": Tauri,
		".cursorrules": Claude,
		".clinerules": Claude,
		"shadcn.json": Shadcn,
		".swcrc": SWC,
		"cucumber.js": Cucumber,
		"robots.txt": Robot,
		"Pulumi.yaml": Pulumi,
		"pulumi.yaml": Pulumi,
		"lunaria.config.json": Lunaria,
		"keystatic.config.ts": Keystatic,
		Jenkinsfile: Jenkins,
		".gitlab-ci.yml": Gitlab,
		"docusaurus.config.js": Docusaurus,
		"deno.json": Deno,
		"deno.jsonc": Deno,
		"cypress.config.js": Cypress,
		"cypress.config.ts": Cypress
	},

	// Паттерны (regexp)
	filePattern: [
		// Test files
		{ pattern: /\.test\.ts$/, icon: TsTest },
		{ pattern: /\.test\.tsx$/, icon: ReactTest },
		{ pattern: /\.spec\.ts$/, icon: TsTest },
		{ pattern: /\.spec\.tsx$/, icon: ReactTest },
		{ pattern: /\.test\.js$/, icon: JsTest },
		{ pattern: /\.test\.jsx$/, icon: ReactTest },
		{ pattern: /\.spec\.js$/, icon: JsTest },
		{ pattern: /\.spec\.jsx$/, icon: ReactTest },

		// Docker
		{ pattern: /^Dockerfile\./, icon: Docker },
		{ pattern: /docker-compose.*\.ya?ml$/, icon: Docker },

		// Angular
		{ pattern: /\.component\.ts$/, icon: AngularComponent },
		{ pattern: /\.service\.ts$/, icon: AngularService },
		{ pattern: /\.directive\.ts$/, icon: AngularDirective },
		{ pattern: /\.guard\.ts$/, icon: AngularGuard },
		{ pattern: /\.module\.ts$/, icon: AngularModule },
		{ pattern: /\.pipe\.ts$/, icon: AngularPipe },

		// Svelte

		{ pattern: /\.svelte\.ts$/, icon: SvelteTS },
		{ pattern: /\.svelte\.js$/, icon: Svelte },

		// StoryBook

		{ pattern: /\.stories\.js$/, icon: Storybook },
		{ pattern: /\.stories\.ts$/, icon: Storybook },
		{ pattern: /\.stories\.tsx$/, icon: Storybook },
		{ pattern: /\.stories\.jsx$/, icon: Storybook },

		// MongoDb

		{ pattern: /\.mongodb\.js$/, icon: MongoDB },

		// Hugo

		{ pattern: /\.hugo\..*$/, icon: Hugo },

		// Laravel

		{ pattern: /\.blade\.php$/, icon: Laravel },

		// Nest.js
		{ pattern: /\.service\.ts$/, icon: NestService },
		{ pattern: /\.controller\.ts$/, icon: NestController },
		{ pattern: /\.guard\.ts$/, icon: NestGuard },
		{ pattern: /\.decorator\.ts$/, icon: NestDecorator },
		{ pattern: /\.middleware\.ts$/, icon: NestMiddleware },

		// Redux
		{ pattern: /\.actions\.ts$/, icon: ReduxActions },
		{ pattern: /\.effects\.ts$/, icon: ReduxEffects },
		{ pattern: /\.facade\.ts$/, icon: ReduxFacade },
		{ pattern: /\.reducer\.ts$/, icon: ReduxReducer },
		{ pattern: /\.selectors?\.ts$/, icon: ReduxSelector },

		// Config files
		{ pattern: /.*rc\.json$/, icon: Gear },
		{ pattern: /.*rc\.ya?ml$/, icon: Gear },
		{ pattern: /.*\.config\.(js|ts|mjs|cjs)$/, icon: Gear },

		// Go variants
		{ pattern: /\.go$/, icon: Go },
		{ pattern: /_test\.go$/, icon: GoGreen },

		// Lock files
		{ pattern: /.*\.lock$/, icon: Lock },
		{ pattern: /.*lockfile$/, icon: Lock },

		// i18n files
		{ pattern: /\/locales\/.*\.json$/, icon: I18n },
		{ pattern: /\/translations\/.*\.json$/, icon: I18n },
		{ pattern: /\/i18n\/.*\.(json|ya?ml)$/, icon: I18n }
	],

	// Расширения файлов
	extension: {
		// JavaScript/TypeScript
		".js": Js,
		".jsx": Reactjs,
		".ts": TypeScript,
		".tsx": Reactts,
		".mjs": Js,
		".cjs": Js,
		".d.ts": Dts,

		// Web
		".html": CodeOrange,
		".htm": CodeOrange,
		".css": CodeBlue,
		".scss": Sass,
		".sass": Sass,
		".less": CodePurple,
		".styl": Stylus,
		".xml": XML,

		// Data
		".json": BracketsYellow,
		".yaml": Yaml,
		".yml": Yaml,
		".toml": Gear,
		".csv": Csv,
		".tsv": Csv,

		// Documentation
		".md": Markdown,
		".mdx": MDX,
		".markdown": Markdown,
		".txt": Text,
		".pdf": PDF,

		// Programming Languages
		".py": Python,
		".pyc": Python,
		".pyw": Python,
		".pyx": Python,
		".go": Go,
		".rs": Rust,
		".rb": Ruby,
		".php": PHP,
		".java": Java,
		".class": Java,
		".jar": Java,
		".c": CLang,
		".cpp": Cplus,
		".cc": Cplus,
		".cxx": Cplus,
		".h": H,
		".hpp": H,
		".cs": Csharp,
		".fs": Fsharp,
		".fsx": Fsharp,
		".swift": Swift,
		".kt": Kotlin,
		".kts": Kotlin,
		".scala": Scala,
		".clj": Clojure,
		".cljs": Clojure,
		".erl": Erlang,
		".ex": Elixir,
		".exs": Elixir,
		".lua": Lua,
		".luau": Luau,
		".r": R,
		".jl": Julia,
		".dart": Dart,
		".zig": Zig,
		".v": Vlang,
		".cr": Crystal,
		".gleam": Gleam,
		".hs": Haskell,
		".lhs": Haskell,
		".f": Fortran,
		".f90": Fortran,
		".f95": Fortran,
		".sol": Solidity,
		".cu": Cuda,
		".pl": Perl,
		".pm": Perl,
		".cfm": Coldfusion,
		".cfc": Coldfusion,
		".feature": Cucumber,

		// Templates
		".vue": Vue,
		".svelte": Svelte,
		".astro": Astro,
		".pug": Pug,
		".jade": Pug,
		".haml": Haml,
		".ejs": CodeGreen,
		".hbs": CodeOrange,
		".njk": Nunjucks,
		".liquid": Liquid,
		".twig": Twig,
		".razor": Razor,
		".cshtml": Razor,
		".antlers.html": StatamicAntlers,

		// Config/Build
		".dockerfile": Docker,
		".tf": Terraform,
		".tfvars": Terraform,
		".graphql": Graphql,
		".gql": Graphql,
		".proto": Proto,
		".prisma": Prisma,
		".pkl": PKL,
		".nix": Nix,
		".ion": Ionic,

		// Shell
		".sh": Shell,
		".bash": Shell,
		".zsh": Shell,
		".fish": Shell,
		".ps1": Shell,
		".bat": Shell,
		".cmd": Shell,

		// Media
		".png": Image,
		".icns": Image,
		".jpg": Image,
		".jpeg": Image,
		".gif": Gif,
		".webp": Image,
		".ico": Image,
		".bmp": Image,
		".svg": SVG,
		".mp3": Audio,
		".wav": Audio,
		".ogg": Audio,
		".flac": Audio,
		".mp4": Video,
		".webm": Video,
		".avi": Video,
		".mov": Video,
		".mkv": Video,

		// Fonts
		".ttf": Font,
		".otf": Font,
		".woff": Font,
		".woff2": Font,
		".eot": Font,

		// Archives & Executables
		".exe": Exe,
		".dll": Exe,
		".so": Exe,
		".dylib": Exe,
		".zip": Puzzle,
		".rar": Puzzle,
		".7z": Puzzle,
		".tar": Puzzle,
		".gz": Puzzle,

		// Notebooks
		".ipynb": Notebook,
		".jmd": JuliaMarkdown,

		// Special
		".coffee": CoffeeScript,
		".tex": Tex,
		".drawio": Drawio,
		".http": Http,
		".rest": Http,
		".patch": Patch,
		".diff": Patch,
		".log": Text,
		".lock": Lock,
		".db": Database,
		".sql": Database,
		".sqlite": Database,
		".env": Gear,
		".gitignore": Ignore,
		".ignore": Ignore,
		".mcaddon": MCAddon,
		".bru": Bruno,
		".resi": RescriptInterface,
		".res": Rescript,
		".earthfile": Earthfile,
		".css.ts": VanillaExtract,
		".mongodb": MongoDB
	}
}

interface FileIconProps {
	fileName: string
	size?: number
	className?: string
}

export const ExplorerFileIcon: React.FC<FileIconProps> = ({
	fileName,
	className
}) => {
	const getIcon = (): IconComponent => {
		const lowerFileName = fileName.toLowerCase()

		// 1. Проверяем точное совпадение имени файла
		if (fileIconMapping.fileName?.[lowerFileName]) {
			return fileIconMapping.fileName[lowerFileName]
		}

		// 2. Проверяем паттерны
		if (fileIconMapping.filePattern) {
			for (const { pattern, icon } of fileIconMapping.filePattern) {
				if (pattern.test(lowerFileName)) {
					return icon
				}
			}
		}

		// 3. Проверяем расширение
		const ext = "." + lowerFileName.split(".").pop()
		if (fileIconMapping.extension?.[ext]) {
			return fileIconMapping.extension[ext]
		}

		// 4. Проверяем составные расширения (.test.ts, .d.ts и т.д.)
		const parts = lowerFileName.split(".")
		if (parts.length > 2) {
			const compoundExt = "." + parts.slice(-2).join(".")
			if (fileIconMapping.extension?.[compoundExt]) {
				return fileIconMapping.extension[compoundExt]
			}
		}

		// Default fallback
		return Document
	}

	const IconComponent = getIcon()

	return <IconComponent className={className} />
}

export const FolderExplorerIcon: FC<{ isOpen: boolean }> = ({ isOpen }) =>
	isOpen ? <FolderOpen /> : <Folder />

export const ChevronExplorerIcon: FC<{ isOpen: boolean }> = ({ isOpen }) =>
	isOpen ? <ChevronDown /> : <ChevronRight />

