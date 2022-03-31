<script lang="ts">
	import Sidebar from './common/_Sidebar.svelte';
	import FullSidebar from './common/_FullSidebar.svelte';
	import UserInfo from './common/_UserInfo.svelte';

	import auth from '$lib/services/auth';
	import { isAuthenticated, user } from '$lib/stores/auth';
	import { loadingMsg } from '$lib/stores/common';
	import { onMount } from 'svelte';

	let loading = true;
	let auth0Client;

	onMount(async () => {
		auth0Client = await auth.createClient();
		console.log('Auth0Client - 1:: %o', auth0Client);

		isAuthenticated.set(await auth0Client.isAuthenticated());
		console.log('After Auth check - 1:: %o', auth0Client);
		user.set(await auth0Client.getUser());

		isAuthenticated.subscribe((value) => {
			console.log('Auth0Client - 2 :: %o', auth0Client);
			console.log('Is Authenticed : %s', value);
			if (!value) {
				login();
			}
		});

		user.subscribe((value) => {
			console.log('User Info: %o', value);
		});
		loading = false;
	});
	function login() {
		auth.loginWithPopup(auth0Client, null);
	}
	function logout() {
		auth.logout(auth0Client);
	}
</script>

<!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          cyan: colors.cyan,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->

<!--Hack to get tailwind styles included-->
<!-- span class="mr-4 text-cyan-100 text-cyan-200 hover:text-white hover:bg-cyan-600" /-->

{#if !$isAuthenticated || loading}
	<div>{$loadingMsg}</div>
{:else}
	<div class="min-h-full">
		<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
		<div class="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
			<!--
      Off-canvas menu overlay, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    -->
			<div class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" />

			<!--
      Off-canvas menu, show/hide based on off-canvas menu state.

      Entering: "transition ease-in-out duration-300 transform"
        From: "-translate-x-full"
        To: "translate-x-0"
      Leaving: "transition ease-in-out duration-300 transform"
        From: "translate-x-0"
        To: "-translate-x-full"
    -->
			<div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
				<!--
        Close button, show/hide based on off-canvas menu state.

        Entering: "ease-in-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in-out duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
				<div class="absolute top-0 right-0 -mr-12 pt-2">
					<button
						type="button"
						class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					>
						<span class="sr-only">Close sidebar</span>
						<!-- Heroicon name: outline/x -->
						<svg
							class="h-6 w-6 text-white"
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
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<div class="flex-shrink-0 flex items-center px-4">
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
						alt="Easywire logo"
					/>
				</div>
				<Sidebar />
			</div>

			<div class="flex-shrink-0 w-14" aria-hidden="true">
				<!-- Dummy element to force sidebar to shrink to fit close icon -->
			</div>
		</div>

		<!-- Static sidebar for desktop -->
		<div class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
			<!-- Sidebar component, swap this element with another sidebar if you like -->
			<div class="flex flex-col flex-grow bg-indigo-700 pt-5 pb-4 overflow-y-auto">
				<div class="flex items-center flex-shrink-0 px-4">
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
						alt="Easywire logo"
					/>
				</div>
				<nav
					class="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
					aria-label="Sidebar"
				>
					<div class="px-2 space-y-1">
						<FullSidebar />
					</div>
				</nav>
			</div>
		</div>

		<div class="lg:pl-64 flex flex-col flex-1 ">
			<div
				class="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-t lg:border-gray-200"
			>
				<button
					type="button"
					class="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
				>
					<span class="sr-only">Open sidebar</span>
					<!-- Heroicon name: outline/menu-alt-1 -->
					<svg
						class="h-6 w-6"
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
							d="M4 6h16M4 12h8m-8 6h16"
						/>
					</svg>
				</button>
				<!-- Search bar -->
				<div class="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
					<div class="flex-1 flex">
						<form class="w-full flex md:ml-0" action="#" method="GET">
							<label for="search-field" class="sr-only">Search</label>
							<div class="relative w-full text-gray-400 focus-within:text-gray-600">
								<div
									class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
									aria-hidden="true"
								>
									<!-- Heroicon name: solid/search -->
									<svg
										class="h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
								<input
									id="search-field"
									name="search-field"
									class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
									placeholder="Search"
									type="search"
								/>
							</div>
						</form>
					</div>
					<div class="ml-4 flex items-center md:ml-6">
						<button
							type="button"
							class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
						>
							<span class="sr-only">View notifications</span>
							<!-- Heroicon name: outline/bell -->
							<svg
								class="h-6 w-6"
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
									d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
								/>
							</svg>
						</button>

						<!-- Profile dropdown -->
						<UserInfo />
					</div>
				</div>
			</div>
			<slot><!-- optional fallback --></slot>
		</div>
	</div>
{/if}

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
