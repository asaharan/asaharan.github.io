import { component$, isBrowser, useVisibleTask$, isDev } from "@builder.io/qwik";
import posthog from 'posthog-js';
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
	const head = useDocumentHead();
	const loc = useLocation();
	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(() => {
		if (isBrowser && !isDev) {
			posthog.init('phc_I0Y7H2N3NwbAd2PKsAeMr5iNVf9epoTAk1pqKGI4JMA', {
				api_host: 'https://us.posthog.com',
				person_profiles: 'always',
				capture_performance: true
			})
		}
	});

	return (
		<>
			<title>{head.title}</title>
			<link rel="canonical" href={loc.url.href} />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link rel="icon" href="/me.ico" type="image/x-icon" />

			{head.meta.map((m) => (
				<meta key={m.key} {...m} />
			))}

			{head.links.map((l) => (
				<link key={l.key} {...l} />
			))}

			{head.styles.map((s) => (
				<style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
			))}
		</>
	);
});
