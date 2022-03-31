<script>
	import { page } from '$app/stores';
</script>

<nav
	class="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
	aria-label="Sidebar"
>
	<div class="px-2 space-y-1">
		<!-- Current: "bg-cyan-800 text-white", Default: "text-cyan-100 hover:text-white hover:bg-cyan-600" -->
		<a
			href="/"
			class:active={$page.url.pathname === '/'}
			class="bg-cyan-800 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
			aria-current="page"
		>
			<!-- Heroicon name: outline/home -->
			<svg
				class="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
				/>
			</svg>
			Home
		</a>

		<a
			href="/analytics"
			class:active={$page.url.pathname === '/analytics'}
			class="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
		>
			<!-- Heroicon name: outline/document-report -->
			<svg
				class="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				/>
			</svg>
			Analytics
		</a>
	</div>
</nav>
