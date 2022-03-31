<script>
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { isAuthenticated, user } from '$lib/stores/auth';

	let show = false; // menu state
	let menu = null; // menu wrapper DOM reference

	onMount(() => {
		const handleOutsideClick = (event) => {
			if (show && !menu.contains(event.target)) {
				show = false;
			}
		};

		const handleEscape = (event) => {
			if (show && event.key === 'Escape') {
				show = false;
			}
		};

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});
</script>

<div class="ml-3 relative">
	<div>
		<button
			type="button"
			class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
			id="user-menu-button"
			aria-expanded="false"
			aria-haspopup="true"
			on:click={() => (show = !show)}
		>
			<img class="h-8 w-8 rounded-full" src={$user.picture} alt="" />
			<span class="hidden ml-3 text-gray-700 text-sm font-medium lg:block"
				><span class="sr-only">Open user menu for </span>{$user.name}</span
			>
			<!-- Heroicon name: solid/chevron-down -->
			<svg
				class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
	{#if show}
		<div
			class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="user-menu-button"
			tabindex="-1"
		>
			<!-- Active: "bg-gray-100", Not Active: "" -->
			<a
				href="."
				class="block px-4 py-2 text-sm text-gray-700"
				role="menuitem"
				tabindex="-1"
				id="user-menu-item-0">Your Profile</a
			>
			<a
				href="."
				class="block px-4 py-2 text-sm text-gray-700"
				role="menuitem"
				tabindex="-1"
				id="user-menu-item-1">Settings</a
			>
			<a
				href="."
				class="block px-4 py-2 text-sm text-gray-700"
				role="menuitem"
				tabindex="-1"
				id="user-menu-item-2">Logout</a
			>
		</div>
	{/if}
</div>
